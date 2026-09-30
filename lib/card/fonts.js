import { readFile } from 'node:fs/promises';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'assets/fonts');

// family → [file, weight, style]
const FILES = {
  Cormorant: [
    ['CormorantGaramond-300.ttf', 300, 'normal'],
    ['CormorantGaramond-500.ttf', 500, 'normal'],
    ['CormorantGaramond-300-italic.ttf', 300, 'italic'],
    ['CormorantGaramond-400-italic.ttf', 400, 'italic'],
  ],
  Montserrat: [
    ['Montserrat-300.ttf', 300, 'normal'],
    ['Montserrat-400.ttf', 400, 'normal'],
    ['Montserrat-500.ttf', 500, 'normal'],
  ],
  'Great Vibes': [['GreatVibes-400.ttf', 400, 'normal']],
  Allura: [['Allura-400.ttf', 400, 'normal']],
  'Alex Brush': [['AlexBrush-400.ttf', 400, 'normal']],
  Parisienne: [['Parisienne-400.ttf', 400, 'normal']],
  Tangerine: [['Tangerine-700.ttf', 700, 'normal']],
  Pinyon: [['PinyonScript-400.ttf', 400, 'normal']],
  Sacramento: [['Sacramento-400.ttf', 400, 'normal']],
  'Petit Formal': [['PetitFormalScript-400.ttf', 400, 'normal']],
  Italianno: [['Italianno-400.ttf', 400, 'normal']],
  Italiana: [['Italiana-400.ttf', 400, 'normal']],
  Cinzel: [
    ['Cinzel-400.ttf', 400, 'normal'],
    ['Cinzel-600.ttf', 600, 'normal'],
  ],
  'Poiret One': [['PoiretOne-400.ttf', 400, 'normal']],
  Josefin: [
    ['JosefinSans-300.ttf', 300, 'normal'],
    ['JosefinSans-400.ttf', 400, 'normal'],
  ],
  Bodoni: [
    ['BodoniModa-400.ttf', 400, 'normal'],
    ['BodoniModa-400-italic.ttf', 400, 'italic'],
  ],
  Playfair: [
    ['PlayfairDisplay-400.ttf', 400, 'normal'],
    ['PlayfairDisplay-400-italic.ttf', 400, 'italic'],
  ],
  Marcellus: [['Marcellus-400.ttf', 400, 'normal']],
  'Old Standard': [
    ['OldStandardTT-400.ttf', 400, 'normal'],
    ['OldStandardTT-400-italic.ttf', 400, 'italic'],
  ],
  Prata: [['Prata-400.ttf', 400, 'normal']],
  Dancing: [['DancingScript-700.ttf', 700, 'normal']],
  Playball: [['Playball-400.ttf', 400, 'normal']],
  Abril: [['AbrilFatface-400.ttf', 400, 'normal']],
  'DM Serif': [
    ['DMSerifDisplay-400.ttf', 400, 'normal'],
    ['DMSerifDisplay-400-italic.ttf', 400, 'italic'],
  ],
  Bebas: [['BebasNeue-400.ttf', 400, 'normal']],
  Unbounded: [
    ['Unbounded-400.ttf', 400, 'normal'],
    ['Unbounded-700.ttf', 700, 'normal'],
  ],
  'Plex Mono': [
    ['IBMPlexMono-400.ttf', 400, 'normal'],
    ['IBMPlexMono-500.ttf', 500, 'normal'],
  ],
  Monoton: [['Monoton-400.ttf', 400, 'normal']],
  Pacifico: [['Pacifico-400.ttf', 400, 'normal']],
  Yeseva: [['YesevaOne-400.ttf', 400, 'normal']],
  Marck: [['MarckScript-400.ttf', 400, 'normal']],
  Amatic: [['AmaticSC-700.ttf', 700, 'normal']],
  Caveat: [['Caveat-500.ttf', 500, 'normal']],
  Fraktur: [['UnifrakturMaguntia-400.ttf', 400, 'normal']],
  Delafield: [['MrsSaintDelafield-400.ttf', 400, 'normal']],
  Muellerhoff: [['HerrVonMuellerhoff-400.ttf', 400, 'normal']],
  Fraunces: [
    ['Fraunces-600.ttf', 600, 'normal'],
    ['Fraunces-400-italic.ttf', 400, 'italic'],
  ],
};

const cache = new Map();
const read = (file) => {
  if (!cache.has(file)) cache.set(file, readFile(path.join(DIR, file)));
  return cache.get(file);
};

// Cormorant is always included last so any glyph missing elsewhere (e.g. Cyrillic) falls back to it.
export async function loadFonts(families) {
  const list = [...new Set([...families, 'Cormorant'])];
  const fonts = [];
  for (const name of list) {
    for (const [file, weight, style] of FILES[name]) {
      fonts.push({ name, data: await read(file), weight, style });
    }
  }
  return fonts;
}
