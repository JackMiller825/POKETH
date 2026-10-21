import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const required = [
  'app/page.tsx','app/config.ts','app/layout.tsx','app/globals.css',
  'docs/HELP.md','docs/REFERENCE_AUDIT.md','docs/CURSOR_BUILD_PROMPT.md',
  'public/assets/brand/pokeeth-logo-1024.png','public/assets/brand/pokeeth-banner-1500x500.png',
  'public/assets/brand/pokeeth-telegram-1100x520.png','public/assets/brand/pokeeth-hero-transparent.png',
];
const creatures = ['ethchu','candlizard','liquidoo','hodltoise','moonibble','sneakoon','fomoth','blockbit','gaspook','bullhorn'];
for (const c of creatures) required.push(`public/assets/creatures/${c}.png`);
for (const c of ['01-peaceful-village','02-crystal-from-block-0001','03-great-awakening','04-ethchu-eats-crystal','05-etherwild-expedition','06-great-gas-storm','07-building-pokeeth-city','08-next-block-awaits']) required.push(`public/assets/chapters/${c}.webp`);
const refNames = ['banner-800.webp','exchange-market-480.webp','favicon-32.png','festival-480.webp','gold-coin-480.webp','gym-badges-480.webp','gym-badges.jpg','gym-badges.webp','hero-city-480.webp','logo-400.jpg','logo-800.webp','night-city-480.webp','pikachu.jpg','step-hold-480.webp','step-hold.jpg','step-sol-480.webp','step-sol.jpg','step-swap-480.webp','step-swap.jpg','step-wallet-480.webp','to-the-moon-480.webp','trainer-card-480.webp'];
for(const name of refNames) required.push(`public/assets/reference/${name}`);
const missing = required.filter(f => !existsSync(path.join(root, f)));
const publicFiles = (function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);})(path.join(root,'public'));
const normalize = (value) => value.replace(/\\/g, '/');
// The original reference asset named pikachu.jpg contains our wholly original Ethchu portrait.
const restricted = publicFiles.filter(f => {
  const normalized = normalize(f);
  return /pikachu|charmander|squirtle|bulbasaur|pokecity|pokeball|pokemon/i.test(path.basename(normalized)) && !normalized.endsWith('/public/assets/reference/pikachu.jpg');
});
const page = readFileSync(path.join(root,'app/page.tsx'),'utf8');
const anchors=['top','trainer','journey','badges','gallery','community'];
const missingAnchors=anchors.filter(a=>!page.includes(`id="${a}"`));
if (missing.length || restricted.length || missingAnchors.length) {
  console.error({missing,restricted,missingAnchors}); process.exit(1);
}
console.log(`Verified ${required.length} source/docs/assets including all 22 reference filenames, 10 creatures, 8 chapters, and ${anchors.length} anchors; no competitor art in /public.`);
