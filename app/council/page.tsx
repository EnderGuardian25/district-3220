import { redirect } from 'next/navigation';

/** `/council` always means the current council. */
export default function CouncilIndex() {
  redirect('/council/2026-27');
}
