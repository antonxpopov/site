import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** True when the file under public/ exists, so a missing mp3 never breaks the page. */
export function publicFileExists(urlPath: string): boolean {
  return existsSync(join(process.cwd(), 'public', urlPath));
}
