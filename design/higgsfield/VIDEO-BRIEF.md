# Higgsfield background video — generation brief

Generate on **higgsfield.ai** in the browser (the CLI is plan-gated:
`free_trial_model_requires_plan`).

**Text-to-video, no start frame.** Because there's no approved frame, the prompt has to
control the composition itself — that's what the "left third stays dark" wording is doing,
and it is not optional. The site's headline sits in that area.

---

## 1. Colour scheme

Everything on the site is built from these. The video should read as if it came from the
same palette — **blue-navy dominant, cyan used sparingly as light, never as a mass.**

| Role | Hex | Where it should appear in the video |
|---|---|---|
| Base / deepest shadow | `#050C17` | Deepest valleys, the calm left area |
| Primary navy | `#0A1628` | The dominant colour of the whole frame |
| Mid navy | `#16243B` | Body of the folds |
| Lifted navy | `#1B3358` | Where folds catch ambient light |
| Steel blue | `#223451` | Broader mid-tones, keeps it from going black |
| Blue highlight | `#2E6FA8` | Brighter fold faces turning toward the light |
| **Interact cyan** | `#01B4E6` | **Rim-light on fold edges only — thin lines, not areas** |
| Cyan peak | `#6EDBFA` | Rare brightest specular glints |

**Rough proportions to aim for:** ~55% deep navy (`#050C17`–`#0A1628`), ~30% mid navy
(`#16243B`–`#223451`), ~12% blue highlight (`#2E6FA8`), **~3% cyan**. If cyan covers large
areas it stops looking premium and starts looking like a screensaver.

---

## 2. Model & settings

| Setting | Value | Why |
|---|---|---|
| Model | **Seedance 2.0** (1st) · **Kling 3.0** (2nd) · **Wan 2.7** (3rd) | Best at slow abstract motion without inventing objects. **Avoid Veo 3/3.1** — adds an audio track and tends to move the camera. |
| Aspect ratio | **16:9** | |
| Resolution | **1080p** | I downscale to 1280×720; it sits behind a scrim so more is wasted bytes. |
| Duration | **shortest available** (4–5s) | It loops. Longer = bigger file, no visual gain. |
| Camera / motion | **static, locked-off** | Any pan or zoom makes a seamless loop impossible. |
| Motion strength | **low** | It sits behind text. Fast motion makes text unreadable. |
| Seamless loop | **on** if offered | Saves me cross-fading the ends. |
| Audio | **off** | Background video must be muted to autoplay at all. |

---

## 3. DARK MODE prompt — copy this

```
Abstract premium 3D render, extremely slow continuous flowing motion of deep blue-navy
silk-like liquid folds filling the entire frame edge to edge. Rich blue-navy palette:
deepest shadows #050C17 and #0A1628, fold bodies in #16243B and #1B3358, broader
mid-tones in #223451, brighter fold faces catching light in #2E6FA8. Thin luminous cyan
#01B4E6 rim-light glides slowly along the crest edges of the folds only, as fine bright
lines, never as large areas. Matte satin surface, soft diffused studio lighting, smooth
clean gradients, subtle film grain.

Composition: the left third of the frame stays deep, dark, calm and almost empty for the
entire clip, with only the faintest slow movement. The folds and all visible motion are
concentrated in the middle-right and lower-right of the frame.

The fabric undulates gently and endlessly in place, like slow heavy silk moving
underwater. Static locked-off camera, absolutely no camera movement, no zoom, no pan, no
cuts. Deep, moody, cinematic, premium, elegant, hypnotic, seamless loop.
```

## 4. LIGHT MODE prompt — copy this

Same forms and same motion, inverted tonally. Generate this **second**, so you can match
the motion and framing to whatever the dark one gives you.

```
Abstract premium 3D render, extremely slow continuous flowing motion of pale silk-like
liquid folds filling the entire frame edge to edge. High-key airy palette: near-white
#FAF9F7 and #F1EFEA across the bright faces, soft cool grey-blue #DCE6EE and #C3D6E4 in
the shadows and valleys, gentle pale blue #A6D6EA in the deeper creases. Soft luminous
cyan #01B4E6 catches the crest edges of the folds only, as fine bright lines, never as
large areas. Matte satin surface, soft diffused daylight studio lighting, smooth clean
gradients, subtle film grain.

Composition: the left third of the frame stays pale, calm, bright and almost empty for
the entire clip, with only the faintest slow movement. The folds and all visible motion
are concentrated in the middle-right and lower-right of the frame.

The fabric undulates gently and endlessly in place, like slow heavy silk moving
underwater. Static locked-off camera, absolutely no camera movement, no zoom, no pan, no
cuts. Bright, clean, elegant, premium, airy, hypnotic, seamless loop.
```

## 5. Negative prompt — if the model offers one

```
text, letters, words, numbers, logos, watermark, signature, people, faces, hands, bodies,
objects, product, furniture, camera movement, camera pan, zoom, dolly, cuts, scene change,
flashing, strobing, fast motion, chaotic motion, sparkles, particles, glitter, bokeh,
lens flare, rainbow colours, purple, magenta, green, orange, oversaturated, neon,
distortion, warping, morphing, melting, low quality, blurry, noisy, compression artifacts
```

Note the colour exclusions — models love to drift a "blue" prompt toward purple/teal.
`purple, magenta, green` in the negative keeps it in the navy family.

---

## 6. Check before downloading

- **Left third dark/pale and calm?** If folds drift into it, regenerate — the headline goes there.
- **Camera perfectly still?** Any drift kills the loop.
- **Cyan still thin lines, not big glowing areas?** Large cyan reads cheap.
- **No hallucinated text or objects**, especially in corners.
- **Motion slow enough to ignore?** If your eye follows it, it's too fast.
- **Did it stay navy?** Reject anything that went purple or teal.

## 7. Send me the files

Download the highest-quality versions and give me the paths. I'll then:

1. Trim to a clean loop point, cross-fading the ends if it isn't seamless.
2. Encode **AV1/WebM** + **H.264/MP4**, targeting **under ~700 KB** each at 1280×720.
3. Generate poster frames (AVIF) so first paint never waits on video.
4. Wire with `autoplay muted loop playsinline preload="none"`, paused off-screen and when
   the tab is hidden, and **not loaded at all** on touch devices, reduced-motion, or
   `Save-Data` — those get the poster still.

The site currently runs a live animated canvas background that needs no video. The videos
would be a straight swap-in for desktop, not a rebuild — so there's no rush and no risk in
iterating on them.
