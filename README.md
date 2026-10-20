# Royal Red & Purple Khmer digital wedding invitation

A mobile-first Next.js 16 sample invitation with royal red, purple, champagne gold, and ivory styling. The couple names were provided by the user; dates, parental names, venues, story, and ceremony descriptions remain sample content. This is **not yet a verified real event**.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Production checks:

```bash
npm run lint
npm run typecheck
npm run build
```

For interaction and width checks, start the dev server in one terminal, run `npx playwright install chromium` once, then run `npm run smoke` in another terminal. The smoke script checks 320, 375, 390, 430, 768, 1024, and 1440px, plus the click-to-open envelope, music play/pause, gallery, RSVP, browser errors, reduced motion, butterfly flight, the scroll-drawn ceremony line, and readable content without JavaScript. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` when using an existing Chromium binary.

## Personalize

Edit [`src/config/wedding.ts`](src/config/wedding.ts). The `WeddingConfig` type in `src/types/wedding.ts` documents the available fields. Replace the names, parental details, formal wording, ISO date and time (`+07:00` for Asia/Phnom_Penh), venues, coordinates, ceremony order, story, gallery, and feature flags. Set `sample` to `false` only after replacing all fictional details and art. Families should review ceremonial wording and schedule for their own customs.

The supplied `public/images/gallery/scene1.png` is used in the hero and first gallery position. The other supplied photos are used in the story and gallery. They show different couples, so the photos and gallery are clearly labeled as examples rather than images of the named couple. The gallery is a horizontal, swipeable carousel that advances automatically while visible; it pauses for interaction, the lightbox, or reduced-motion settings. Photos fit inside their frames without cropping. Replace the image paths, `alt`, and captions in the config with photographs of the actual couple before publishing. Use appropriately sized local JPEG/WebP/AVIF images for production.

Set `NEXT_PUBLIC_SITE_URL` to the final absolute site URL when deploying, so Open Graph image links resolve to the published domain.

The bundled `public/audio/wedding-music.mp3` is configured in `src/config/wedding.ts` at 35% volume and loops. The envelope remains closed on every page load. Music starts only when the guest clicks its Open Invitation button, fades in, and can be paused or resumed from the existing floating control. Replace the audio file or change `audio.src`, `audio.volume`, and `features.music` in the configuration to customize it.

Reception and ceremony venues are separate. A map link uses coordinates when provided, otherwise the configured address. Check final coordinates before sharing.

## RSVP behavior

The form validates guest name and guest count, then shows a **local demonstration confirmation**. It does not send or save personal information. `submitDemoRSVP` in `WeddingRSVP.tsx` is the isolated point to replace with a future API call. Add a backend, privacy copy, delivery confirmation, and server-side validation before collecting real RSVPs.

## Design and structure

`DESIGN.md` records visual decisions. `src/components/wedding` contains each invitation section and the reusable butterfly, ornament parallax, and divider motion; `src/components/ui` contains the shared section reveal. Next.js Server Components render the static content. Small client components handle the envelope, timer, gallery, RSVP, controls, and decorative motion. Metadata and a generated sharing image live in `src/app`.
