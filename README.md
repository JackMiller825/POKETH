# PokeETH / $POKETH — Reference-Matched Website V2

A Next.js 15 / React 19 single-page website featuring original Etherwild characters and 22 corresponding replacements for the Pokecity art pack. Main layout and interactions mirror the supplied site's anatomy.

## Run
```bash
npm install
npm run verify:assets
npm run typecheck
npm run build
npm run dev
```
Windows: double-click `START_POKEETH.cmd`.

## Files
- `app/page.tsx` — complete interactive page.
- `app/globals.css` — reference-aligned layout, PokeETH palette, responsive fixes.
- `app/config.ts` — characters, 8 chapters, token and socials configuration.
- `public/assets/reference` — **22 corresponding image replacements**, same file dimensions/extensions as reference.
- `public/assets/creatures` — 10 approved mascots.
- `public/assets/chapters` — eight Chronicle story previews.
- `docs/HELP.md` — updated complete help.
- `docs/CURSOR_BUILD_PROMPT.md` — QA and implementation brief.
- `docs/V2_CHANGES.md` — change log.

The Ethereum contract and social account links are intentionally unset. The name PokeETH still warrants trademark review before commercial use. This is an original character and story adaptation, not an officially licensed Pokémon product.
