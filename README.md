# Kath birthday website

A mobile-first three-part gift: tap the illustrated cake, open the handwritten card, then swipe through the photo album.

## Run locally

```powershell
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`). Run `npm run build` to create the deployable `dist/` folder.

## Photos

Put JPG, JPEG, PNG, or WEBP files in `PIC/`. The site discovers them during Vite's build. The same sorted collection appears in the falling prints and album. Rename files with numeric prefixes such as `01-first.jpg`, `02-second.jpg` to choose album order, then rebuild or let the dev server refresh. Remove a file to remove it from both phases. The originals are never modified.

HEIC/HEIF files need conversion to JPG, PNG, or WEBP first. The album shows a warning if any are present.

For faster falling prints, optional small copies live in `public/print-thumbs/`. After changing photos, run `python scripts/make_thumbnails.py` (requires Pillow). If a small copy is missing, the site falls back to the original photo automatically.

## Deploy

The `vite.config.ts` relative base works for a GitHub Pages project path and for Vercel. On Vercel, use the Vite preset, build command `npm run build`, and output directory `dist`. The included GitHub Pages workflow builds and publishes `dist/` after a future push to `main`; enable GitHub Pages with **GitHub Actions** as its source in the repository settings. Nothing has been pushed or deployed.
