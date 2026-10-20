# Royal Red & Purple Khmer Invitation — design context

## North Star

A printed Cambodian wedding invitation brought to life: a guest opens a deep red envelope with a purple interior, then moves through a quiet editorial sequence. The audience is mobile guests receiving a link through messaging apps. This is a brand experience with one small local-only RSVP interaction.

## Signature

A royal red envelope, purple lining, circular ruby seal, and fine gold ornament create the opening ceremony. After it opens, the content reads as a single invitation with large Khmer type, ivory and rose paper, dark ceremonial bands, and restrained photo framing.

## Palette and runtime mapping

`src/app/globals.css` owns runtime tokens: `--royal-red: #6E142F`, `--ruby-red: #A52A48`, `--royal-purple: #48205F`, `--soft-purple: #74448C`, `--champagne-gold: #D8B46A`, `--warm-ivory: #FFF8F0`, and `--light-rose: #F8E6EB`. `--ink`, `--muted`, `--gold-ink`, and line tokens support readable copy and boundaries. Red and purple carry ceremony and romance; gold stays ornamental. Small gold-toned text on ivory uses the darker `--gold-ink`. Text on dark red and purple uses ivory or champagne gold. The OG image and favicon mirror these tokens in static assets.

## Typography

Noto Serif Khmer carries headings and formal copy. Noto Sans Khmer carries supporting copy and controls. Cormorant Garamond carries English names and large countdown figures. Main Khmer body copy and form fields stay at 16px or above, formal invitation copy at 18px or above, and secondary notes at 14px. Khmer line height is generous and words wrap naturally; decorative Latin tracking is never applied to Khmer. The closing blessing uses the full invitation width so its sentence stays on one line from 700px upward; narrow phones allow a readable wrap. On narrow phones, the ceremony uses a two-column number/content rhythm and the gallery shows one large portrait with a hint of the next photo.

## Layout and imagery

The page alternates warm ivory and light rose with royal purple and red ceremonial bands. The hero uses a split composition on desktop and a stacked invitation-first composition on phones. Borders are hairline gold; selective red-to-purple gradients appear only in the envelope setting, countdown, and RSVP backdrop. There are no rounded cards in the invitation body. The selected `scene1.png` portrait appears in the hero and first gallery slide; other photos from `public/images` show different couples. All are labeled as examples until photographs of the named couple are supplied. The hero, story, and gallery use `object-fit: contain` so faces, clothing, and full portrait compositions remain visible inside their frames. The gallery heading stays concise in sample mode; the sample-photo disclosure appears below the carousel.

## Interaction and motion

The envelope stays closed on every page load until the guest clicks Open Invitation. That click starts the configured single audio player, which fades to 35% volume and loops; the existing floating control pauses and resumes it. One-time scroll reveals sequence ornamental dividers, Khmer headings, and readable content blocks with short vertical travel and restrained delays. Text starts at 94% opacity in server-rendered HTML so it remains legible if animation JavaScript fails. Photos start slightly smaller than their final size (97.5%) and never zoom beyond their uncropped frames. The gold ceremony line grows with scroll progress and keeps its furthest drawn position when guests scroll back. Section-bound SVG butterflies fly only along outer decorative edges in the hero, story, gallery, and closing; their CSS flight pauses offscreen. The hero gold ornament alone moves nine pixels with scroll. Hover movement is limited to two pixels.

The horizontal gallery uses native swipe/scroll and snap points. While at least 35% of the gallery is visible, it advances every 6.5 seconds. Pointer, wheel, and keyboard interaction pause it for eight seconds; focus within the carousel or an open lightbox pauses it for the duration. Reduced-motion preference hides butterflies and removes travel, parallax, smooth scrolling, and automatic carousel movement; the ceremony line remains fully visible. Without JavaScript, the envelope overlay is removed and the invitation remains readable. The photo viewer is a keyboard-accessible modal. RSVP feedback must state that nothing was transmitted. The mobile control bar sits horizontally at the bottom and hides while the RSVP section is visible so it never covers form labels or fields.

## Anti-references

No dashboard cards, glass effects, neon purple, broad saturated gradients, random stock couple photography, glitter, fake lunar dates, red text on purple, or claims that a sample ceremony order is universal.
