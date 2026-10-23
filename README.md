# Rose Gold & Ivory Khmer digital wedding invitation

A mobile-first Next.js 16 sample invitation with rose gold, warm ivory, soft pink, dusty mauve, and deep plum styling. The couple names were provided by the user; dates, parental names, venues, story, and ceremony descriptions remain sample content. This is **not yet a verified real event**.

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

Edit [`src/config/wedding.ts`](src/config/wedding.ts). The `WeddingConfig` type in `src/types/wedding.ts` documents the available fields. Replace the names, parental details, formal wording, ISO date and time (`+07:00` for Asia/Phnom_Penh), venues, coordinates, ceremony order, story, gallery, and feature flags. Set each image's `width` and `height` to its original pixel dimensions so hero, story, and gallery frames preserve the complete photo without cropping. Set `sample` to `false` only after replacing all fictional details and art. Families should review ceremonial wording and schedule for their own customs.

The supplied `public/images/gallery/story2.png` is used in the hero and closing. The seven `story1.png` through `story7.png` photographs in that folder form a responsive gallery grid: one column on small phones, two on tablets, and three on desktop. Captions sit below their images, and photos retain their original proportions without cropping. Selecting a photo opens a full-screen lightbox with previous/next buttons, arrow-key navigation, a current/total counter, and Escape to close. These photos show different couples and remain labeled as examples. Replace the image paths, dimensions, `alt`, and captions in the config with photographs of the actual couple before publishing. Use appropriately sized local JPEG/WebP/AVIF images for production.

Social sharing previews use `public/socail-share.png`, served at `/socail-share.png`, for both the main invitation and personalized links, including Open Graph and Twitter cards. Its shared metadata is configured in `weddingShareImage` in `src/config/wedding.ts`. `NEXT_PUBLIC_SITE_URL` can explicitly set the public domain. Otherwise, metadata uses Vercel's production domain, its deployment domain, or the project's production URL as a final production fallback. Local development uses localhost; production ignores localhost overrides so sharing apps always receive a public image URL.

Each invitation emits its own canonical URL and `og:url`, a title, description, site name, and PNG image metadata. `htmlLimitedBots: /.*/` keeps sharing tags in the initial HTML head for crawlers that do not run JavaScript. Personalized sharing metadata uses generic invitation copy and never includes a guest's name.

Run `npm run check:sharing` against the local server, or set `SHARE_CHECK_URL=https://your-domain` to verify production. It checks both invitation routes with Telegram, Facebook, and browser user agents, requires the card metadata in the initial HTML head, and confirms the public PNG matches the supplied file.

The bundled `public/audio/wedding-music.mp3` is configured in `src/config/wedding.ts` at 35% volume and loops. The envelope remains closed on every page load. Music starts only when the guest clicks its Open Invitation button, fades in, and can be paused or resumed from the existing floating control. Replace the audio file or change `audio.src`, `audio.volume`, and `features.music` in the configuration to customize it.

Reception and ceremony venues are separate. A map link uses coordinates when provided, otherwise the configured address. Check final coordinates before sharing.

## RSVP behavior

The form validates guest name and guest count, then shows a **local demonstration confirmation**. It does not send or save personal information. `submitDemoRSVP` in `WeddingRSVP.tsx` is the isolated point to replace with a future API call. Add a backend, privacy copy, delivery confirmation, and server-side validation before collecting real RSVPs.

## Personalized invitation links

The standard invitation remains at `/`. Fictional demo links `/invite/sample-dara` and `/invite/sample-family` display a guest greeting in the formal letter and prefill the local RSVP name. Unknown slugs display the standard invitation; URL text is never used as a guest name. Personalized routes request `noindex` and use generic sharing metadata without guest names.

Replace demo guests in `src/config/guests.ts` only with data approved for public distribution. `src/lib/wedding-guests.ts` is the lookup boundary for a future server-side source. This local sample is public data: a slug is not authentication, and real private guest details require suitable server-side storage and unguessable invitation identifiers. Do not add private contact details, addresses, or RSVP data to URLs. The RSVP remains local-only on personalized pages.

The monogram uses `monogram.initials` in `src/config/wedding.ts`; the three visibility flags control its envelope, hero, and closing appearances. The formal letter always includes the wedding signature. The closing photograph currently reuses `images.hero` with its native aspect ratio and sample disclosure. To change it, update that configured image source, dimensions, alt text, and caption after placing the real photo in `public/images`.

## Design and structure

`DESIGN.md` records visual decisions. `src/components/wedding` contains each invitation section and the reusable butterfly, ornament parallax, and divider motion; `src/components/ui` contains the shared section reveal. Next.js Server Components render the static content. Small client components handle the envelope, timer, gallery, RSVP, controls, and decorative motion. Metadata and a generated sharing image live in `src/app`.
