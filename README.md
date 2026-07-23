# KHADER Exchange — PWA

Nidaamka maamulka sariflaha (USD / Shilin Somaliland / Birr Itoobiya).
PIN: **1234**

## Faylasha
- `index.html` — app-ka oo dhan (hal fayl)
- `manifest.json` — si Android/Chrome loogu rakibo
- `sw.js` — service worker (offline + install)
- `icon-192.png`, `icon-512.png` — icons
- `icon-maskable-*.png` — Android adaptive icons

## Deploy (GitHub Pages)
1. Repo cusub samee, faylashan oo dhan geli (isku heer, folder aan lahayn).
2. Settings → Pages → Branch: `main` / root → Save.
3. Fur: `https://USERNAME.github.io/REPO/`

**MUHIIM:** dhammaan faylasha waa inay isku folder ku jiraan, haddii kale
manifest-ka iyo service worker-ku ma shaqeeyaan.

## Rakibida
- **Android (Chrome):** menu (⋮) → "Install app". Ama Dejinta app-ka gudihiisa → "Rakib App-ka".
- **iPhone (Safari):** Share → "Add to Home Screen".

## Cusboonaysiin
Marka aad `index.html` beddesho, `sw.js` ka beddel `sarifla-v1` → `sarifla-v2`
si cache-ku u cusboonaado.
