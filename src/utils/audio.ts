import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** True when the file under public/ exists, so a missing mp3 never breaks the page. */
export function publicFileExists(urlPath: string): boolean {
  return existsSync(join(process.cwd(), 'public', urlPath));
}

export interface Peaks {
  duration: number;
  peaks: number[];
}

/**
 * Waveform pre-computed by `npm run peaks` and stored next to the mp3
 * (`/audio/x.mp3` → `public/audio/x.peaks.json`). Undefined when there is none.
 */
export function readPeaks(urlPath: string): Peaks | undefined {
  const file = join(process.cwd(), 'public', urlPath.replace(/\.mp3$/i, '.peaks.json'));
  if (!existsSync(file)) return undefined;
  try {
    const data = JSON.parse(readFileSync(file, 'utf8')) as Peaks;
    return Array.isArray(data.peaks) && data.duration > 0 ? data : undefined;
  } catch {
    return undefined;
  }
}
