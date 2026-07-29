/**
 * Encode the Higgsfield background renders into web-ready loops.
 *
 *   node scripts/encode-bg-video.mjs <dark.mp4> <light.mp4>
 *
 * Sources arrive as 1920x1080, 24fps, ~8s, ~37 Mbps H.264 (≈35 MB each) — far
 * too heavy to ship. This produces AV1/WebM + H.264/MP4 at 1280x720 plus AVIF
 * poster frames.
 *
 * NO CROSS-FADE. Loops are closed with a hard cut at a measured frame, because a
 * cross-fade over flowing content reads as a visible dip — the two halves are
 * briefly double-exposed. Instead the script SEARCHES for the cut:
 *
 *   1. Render the full clip through scale → grade → slow → interpolate.
 *   2. Compare every candidate end frame against frame 0 (mean absolute
 *      difference on greyscale thumbnails).
 *   3. Cut at the frame with the quietest join, and report it against that
 *      clip's own average frame-to-frame motion. Below 1.0x means the seam is
 *      smaller than normal movement, i.e. invisible.
 *
 * Searching AFTER interpolation matters: it roughly doubles the frame count and
 * therefore the number of candidate cut points, and it avoids the earlier
 * mistake of measuring cuts on the original timeline and rescaling them (which
 * landed on fractional frame boundaries and made the seam worse).
 *
 * Interpolation must also come BEFORE the cut for a second reason: at a clip's
 * end `minterpolate` has no future frame to estimate from, so its final
 * synthesised frames are poor — and those are exactly the frames a loop lands on.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const FPS = 24;
const OUT_DIR = resolve('public/videos');
const TMP_DIR = resolve('.tmp-video');
const W = 1280;
const H = 720;

/**
 * Playback speed. 0.6 = 40% slower. Slowing via `setpts` alone would leave only
 * ~14 unique frames/sec and judder, so `minterpolate` synthesises
 * motion-compensated in-between frames to restore a true 24fps. Soft flowing
 * silk is ideal for this: no hard edges or occlusions to confuse the estimator.
 *
 * This is by far the slowest stage — expect minutes per clip.
 */
const SPEED = 0.6;

/** Only consider cuts in this portion of the clip, so loops stay a usable length. */
const SEARCH_FROM = 0.55;

const VARIANTS = {
  dark: { grade: null },
  light: {
    /**
     * The light render arrived as a mid-slate blue (channel means 99/133/156),
     * far too dark for light mode where the palette runs #FAF9F7 → #DCE6EE.
     *
     * The first pass (brightness 0.28 / contrast 0.62 / gamma 1.25) landed at
     * 205/226/234 — correctly light, but so far up the curve that the folds lost
     * nearly all their tonal separation and it read as flat white. Lowering
     * brightness while RAISING contrast keeps it in the same light family but
     * gives the folds back their definition. Targeting ~178/200/214.
     *
     * Still safe for text: under the 62% ivory veil that composites to roughly
     * #DDE4E8, leaving navy body text around 15:1.
     */
    grade: 'eq=brightness=0.22:contrast=0.74:saturation=0.6:gamma=1.18',
  },
};

const run = (args) =>
  execFileSync(ffmpegPath, ['-hide_banner', '-v', 'error', ...args], { stdio: 'inherit' });

/** Full-length processed stream: scale → grade → slow → interpolate. */
function renderIntermediate(src, grade, dest) {
  const chain = [
    'setpts=PTS-STARTPTS',
    `scale=${W}:${H}:flags=lanczos`,
    grade,
    SPEED === 1
      ? null
      : `setpts=PTS/${SPEED},minterpolate=fps=${FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1`,
    'format=yuv420p',
  ]
    .filter(Boolean)
    .join(',');

  // Near-lossless, so the delivery encodes and the frame analysis both read
  // the same pixels and interpolation only runs once.
  run(['-i', src, '-vf', chain, '-an',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '14',
    '-pix_fmt', 'yuv420p', '-y', dest]);
}

/** Find the end frame whose join back to frame 0 is quietest. */
async function findLoopCut(mid, workDir) {
  rmSync(workDir, { recursive: true, force: true });
  mkdirSync(workDir, { recursive: true });
  run(['-i', mid, '-vf', 'scale=96:54', '-y', `${workDir}/f%05d.png`]);

  const files = readdirSync(workDir).sort();
  const bufs = [];
  for (const f of files) {
    bufs.push(await sharp(`${workDir}/${f}`).greyscale().raw().toBuffer());
  }

  const mae = (a, b) => {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
    return s / a.length;
  };

  // This clip's own average motion — the yardstick the seam is judged against.
  let motion = 0;
  for (let i = 1; i < bufs.length; i++) motion += mae(bufs[i - 1], bufs[i]);
  motion /= bufs.length - 1;

  let best = { frames: bufs.length, seam: Infinity };
  for (let i = Math.floor(bufs.length * SEARCH_FROM); i < bufs.length; i++) {
    const seam = mae(bufs[0], bufs[i]);
    // i is a 0-based index; keeping i frames ends on frame i-1, so the join is
    // frame i-1 → frame 0. Compare against frame i for that reason.
    if (seam < best.seam) best = { frames: i, seam };
  }

  rmSync(workDir, { recursive: true, force: true });
  return { ...best, motion, total: bufs.length };
}

async function encode(name, src, cfg) {
  const mid = `${TMP_DIR}/${name}-full.mp4`;
  renderIntermediate(src, cfg.grade, mid);

  const cut = await findLoopCut(mid, `${TMP_DIR}/${name}-frames`);

  const mp4 = `${OUT_DIR}/bg-${name}.mp4`;
  const webm = `${OUT_DIR}/bg-${name}.webm`;
  const poster = `${OUT_DIR}/bg-${name}-poster.avif`;
  const trim = ['-vf', `trim=end_frame=${cut.frames},setpts=PTS-STARTPTS`];

  // H.264 — universal fallback. Smooth gradients band easily, so we lean on a
  // moderate CRF rather than a hard bitrate cap.
  run(['-i', mid, ...trim, '-an', '-c:v', 'libx264', '-preset', 'veryslow', '-crf', '30',
    '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-y', mp4]);

  // AV1 — roughly 2.5x smaller for this kind of soft gradient content.
  run(['-i', mid, ...trim, '-an', '-c:v', 'libaom-av1', '-crf', '42', '-b:v', '0',
    '-cpu-used', '5', '-row-mt', '1', '-tiles', '2x1', '-pix_fmt', 'yuv420p', '-y', webm]);

  // Poster: frame 1 of the processed video, so playback starts without a flash.
  run(['-i', mid, '-frames:v', '1',
    '-c:v', 'libaom-av1', '-crf', '32', '-still-picture', '1', '-y', poster]);

  const kb = (p) => (statSync(p).size / 1024).toFixed(0) + ' KB';
  const ratio = cut.seam / cut.motion;
  console.log(
    `${name.padEnd(6)} ${(cut.frames / FPS).toFixed(2)}s hard cut at frame ${cut.frames}/${cut.total}` +
      `  ·  seam ${cut.seam.toFixed(2)} vs motion ${cut.motion.toFixed(2)} = ${ratio.toFixed(2)}x` +
      ` ${ratio <= 1 ? '(invisible)' : '(check)'}` +
      `  ·  mp4 ${kb(mp4)}  ·  webm ${kb(webm)}  ·  poster ${kb(poster)}`,
  );
}

const [darkSrc, lightSrc] = process.argv.slice(2);
if (!darkSrc || !lightSrc) {
  console.error('usage: node scripts/encode-bg-video.mjs <dark.mp4> <light.mp4>');
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });
try {
  await encode('dark', darkSrc, VARIANTS.dark);
  await encode('light', lightSrc, VARIANTS.light);
} finally {
  rmSync(TMP_DIR, { recursive: true, force: true });
}
