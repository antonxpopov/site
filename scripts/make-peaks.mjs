// Pre-computes the waveform of an mp3 so the player can draw it instantly
// without downloading and decoding the whole file in the browser.
//
//   npm run peaks -- public/audio/popov_auricle_2023.mp3
//
// Writes public/audio/popov_auricle_2023.peaks.json next to the mp3. Needs ffmpeg
// (macOS: `brew install ffmpeg`). Commit the generated .peaks.json together with the mp3.
import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const BUCKETS = 240;
const RATE = 8000;
const input = process.argv[2];
if (!input || !input.endsWith('.mp3')) {
  console.error('Usage: npm run peaks -- public/audio/<file>.mp3');
  process.exit(1);
}

const run = spawnSync(
  'ffmpeg',
  ['-v', 'error', '-i', input, '-ac', '1', '-ar', String(RATE), '-f', 's16le', '-'],
  { maxBuffer: 1024 * 1024 * 1024 }
);
if (run.error || run.status !== 0) {
  console.error('ffmpeg failed. Is it installed? (brew install ffmpeg)');
  console.error(run.stderr?.toString() ?? run.error);
  process.exit(1);
}

const samples = new Int16Array(
  run.stdout.buffer,
  run.stdout.byteOffset,
  Math.floor(run.stdout.byteLength / 2)
);
const size = Math.ceil(samples.length / BUCKETS);
const raw = [];
for (let b = 0; b < BUCKETS; b++) {
  let max = 0;
  for (let i = b * size; i < Math.min((b + 1) * size, samples.length); i++) {
    max = Math.max(max, Math.abs(samples[i]));
  }
  raw.push(max / 32768);
}
const top = Math.max(...raw) || 1;
const peaks = raw.map((v) => Math.round((v / top) * 100) / 100);
const duration = Math.round((samples.length / RATE) * 100) / 100;

const out = input.replace(/\.mp3$/, '.peaks.json');
writeFileSync(out, JSON.stringify({ duration, peaks }));
console.log(`${out}: ${peaks.length} peaks, ${duration}s`);
