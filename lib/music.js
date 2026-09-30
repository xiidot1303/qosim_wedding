import { existsSync } from 'node:fs';
import path from 'node:path';

// Drop a file at public/music.mp3 to use it instead of the built-in Canon in D.
export const musicSrc = () => (existsSync(path.join(process.cwd(), 'public', 'music.mp3')) ? '/music.mp3' : null);
