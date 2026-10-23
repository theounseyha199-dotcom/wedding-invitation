# Rose Gold & Ivory Khmer Invitation — Updated Design Context

## North Star

A luxurious printed Cambodian wedding invitation brought to life through a delicate, romantic digital experience.

A guest opens an elegant rose-gold envelope with a soft-pink interior and ornamental seal, then moves through a quiet editorial wedding story.

The website should feel soft, romantic, luxurious, sophisticated, and culturally Khmer.

The primary audience is mobile guests opening invitation links through Telegram, Messenger, and other messaging applications.

This is a premium wedding invitation experience, not a generic business website.

## Signature

A muted rose-gold envelope, blush-pink lining, deep-plum circular seal, and delicate ivory ornamental details establish the opening ceremony.

After opening, the invitation unfolds as a single elegant editorial experience.

The visual language combines:

- Warm ivory wedding stationery
- Soft pink romantic sections
- Rose-gold ornamental borders
- Deep-plum Khmer typography
- Dusty-mauve decorative accents
- Refined Khmer Kbach patterns
- Delicate floral arrangements
- Gentle butterfly animations
- Full wedding portraits, with geometric crops in gallery previews

The result should evoke expensive, custom-made Cambodian wedding stationery.

## Color Palette and Runtime Mapping

`src/app/globals.css` owns the runtime design tokens.

Replace the previous royal red and purple palette with:

```css
:root {
  --rose-gold: #be8f83;
  --warm-ivory: #fff7f2;
  --soft-pink: #eedce4;
  --heart-pink: #df87a8;
  --dusty-mauve: #8c6a73;
  --deep-plum: #4e3a3a;

  --ink: #4e3a3a;
  --muted: #755860;
  --ornament: #be8f83;
  --ornament-ink: #75504a;
  --line: #d8c2bc;
}
```

### Color Usage

**Warm Ivory — #FFF7F2**

Primary background for the overall invitation, hero, formal letter, and gallery.

**Soft Pink — #EEDCE4**

Secondary background for romantic sections, the couple's story, and selected decorative areas.

**Rose Gold — #BE8F83**

Primary decorative color for ornamental borders, the envelope, monogram details, floral accents, and small decorative elements.

**Dusty Mauve — #8C6A73**

Supporting color for secondary typography, decorative details, and transitional surfaces.

**Deep Plum — #4E3A3A**

Primary color for important Khmer headings, body typography, dark ceremonial sections, and prominent buttons.

### Contrast Rules

- Use deep plum for important text on ivory and pink backgrounds.
- Use ivory text on deep-plum backgrounds.
- Use rose gold mainly for borders, ornaments, and decorations.
- Do not use pale rose-gold text for small typography on ivory.
- Use deep-plum text on rose-gold buttons.
- Preserve readable focus states, links, and form labels.

### Color Distribution

Approximately:

- 60% Warm Ivory
- 20% Soft Pink
- 10% Rose Gold
- 10% Deep Plum and Dusty Mauve

Avoid making every section the same pale pink.

Use dark plum selectively to provide contrast and create meaningful visual rhythm.

## Typography

Typography roles map to the CSS variables registered in `src/app/layout.tsx` and consumed in `src/app/globals.css`:

- Khmer OS Muol Light (`--font-khmer-display`) for formal wedding headings and Khmer couple names in the hero, invitation letter, and closing
- Noto Serif Khmer (`--font-khmer-serif`) for longer text, formal invitation paragraphs, blessings, and supporting Khmer content
- Noto Sans Khmer (`--font-khmer-sans`) for controls and utility labels
- Cormorant Garamond for English names and large countdown figures

Self-host the unmodified Khmer OS Muol Light font from `public/fonts/KhmerOS_muollight.ttf` using `next/font/local`. Keep its copyright notice and LGPL 2.1-or-later license alongside the asset. Use its regular 400 weight without synthetic bold or italic. Keep Noto Serif Khmer as the display fallback.

Preserve the Khmer line-height rules and responsive scale, adjusting heading sizes only where the wider display font needs room.

- Main Khmer body text: at least 16px
- Formal invitation: at least 18px
- Secondary notes: at least 14px

Khmer text must wrap naturally without inappropriate letter spacing.

## Opening Envelope

Redesign the existing envelope using the new color system.

### Exterior

- Muted rose-gold envelope
- Subtle ivory ornamental borders
- Fine Khmer-inspired decorative corners
- Elegant paper surface
- Delicate floral accents

### Interior

- Soft pink lining
- Ivory invitation paper
- Subtle embossed rose-gold details

### Seal

- Deep-plum circular seal
- Rose-gold lotus-inspired wedding monogram
- Refined ornamental outline

Preserve the existing envelope-opening mechanics.

The envelope remains closed on every page load until the guest clicks Open Invitation.

The click starts the existing single audio player with its gradual fade to 35% volume.

Do not introduce additional audio players.

## Layout and Photography

Preserve the current editorial invitation structure.

Alternate:

- Warm ivory sections
- Soft pink sections
- Occasional deep-plum ceremonial bands

Replace former royal red and royal purple backgrounds using the new palette according to semantic purpose.

### Hero

- Warm ivory background
- Deep-plum couple names
- Rose-gold ornamental frame
- Dusty-mauve supporting text
- Elegant floral details

Maintain the existing split desktop layout and stacked mobile composition.

### Formal Invitation

- Warm ivory paper
- Fine rose-gold Khmer Kbach borders
- Deep-plum formal Khmer text
- Lotus-inspired wedding monogram
- Subtle premium paper grain

Preserve the existing `public/images/khmer/khmer-style.png` artwork.

Where the asset contains permanent gold coloring, use an appropriate non-destructive recoloring approach or create a matching derivative asset if necessary.

Do not overwrite the source asset without a backup.

### Couple Story

- A quiet ivory surface tinted with soft pink (`72% --warm-ivory`, remaining `--soft-pink`)
- A restrained centered Khmer heading and the shared ornamental divider
- A centered, uncropped portrait in an ivory mount with a fine rose-gold double frame and an offset blush backing
- On desktop, the introduction and message flank the portrait, forming a three-part keepsake composition; avoid the former oversized portrait and dense text column
- On tablets, the portrait sits beside two short prose blocks; on phones, show the portrait, introduction, and message in one column
- Three dated milestones follow a continuous fine timeline: horizontal on desktop and tablet, vertical on phones
- Use the Khmer serif for dates, with diamond markers and readable prose; no table-like ruled rows
- Preserve story wording, chronology, natural photo proportions, and subtle decoration at the section edges

`CoupleStory.tsx` owns the story content and semantic milestone list. The `.story-*` rules in `src/app/globals.css` own this layout and derive all colors from the existing palette. Use a maximum 320px portrait mount on desktop and 300px on phones. Story text remains at least 16px. Keep all photo captions and sample notices removed.

### Wedding Gallery

- Warm ivory background
- Deep-plum centered Khmer heading
- Fine rose-gold divider
- Seven-photo geometric collage matching the supplied reference: a broad top panel, four diagonal side panels, a broad bottom panel, and a circular center photo
- Fine warm-ivory dividers between panels
- Uncaptioned photographs, without sample-photo notices
- Clickable photos with accessible full-screen lightbox navigation

Keep the collage at a 2:3 aspect ratio on phones, tablets, and desktop, with a maximum width of 1040px. The circular center photo is 32% of the collage width. `src/components/wedding/WeddingGallery.tsx` owns the panel markup and divider geometry; `.gallery-panel-*` and `.gallery-seams` in `src/app/globals.css` own the matching clip paths and responsive seams. Each photo remains an independent semantic button, and the whole collage reveals as one composition.

The supplied collage reference explicitly replaces the former staggered album layout and permits `object-fit: cover` and geometric clipping for gallery previews. Tune preview focal points to retain faces. Keep the original files and configured source dimensions unchanged, and show complete, uncropped images in the lightbox. Omit per-photo captions, decorative numbering, and sample-photo notices throughout the hero, story, gallery, and closing, as requested. Keep the lightbox’s current/total indicator. Use existing warm-ivory, plum, pink, and rose-gold tokens for dividers, interaction states, and the center expand indicator.

### Wedding Ceremony

- Ivory or pale pink background
- Deep-plum typography
- Rose-gold scroll-progress timeline
- Traditional Khmer ceremonial content

### RSVP

- Ivory or very soft pink surface
- Deep-plum headings and input text
- Rose-gold decorative accents
- Accessible dark buttons

RSVP remains a local-only interaction.

Never state that form data was transmitted.

Omit the introductory demo-storage paragraph at the user's request. Preserve the form's existing local-only behavior and accurate confirmation after submission.

### Cinematic Closing

- Deep-plum background
- Ivory Khmer blessing
- Rose-gold floral ornaments
- Wedding monogram
- Configured wedding photograph
- Subtle decorative butterflies

Keep the romantic editorial closing rather than replacing it with a generic footer.

## Image Requirements

Preserve the configured source image dimensions in `src/config/wedding.ts`.

- Use `story2.png` for the hero and closing (the former `scene1.png` photo).
- Use all seven supplied `public/images/gallery/story1.png` through `story7.png` photos in the gallery, with their actual intrinsic dimensions.
- Keep all source photo aspect ratios outside the geometric gallery previews.
- Use `object-fit: contain` outside the gallery previews and in the lightbox; the collage previews use `object-fit: cover`.
- Preserve full faces and clothing outside gallery previews. In the collage, tune focal points to keep faces visible; the lightbox always reveals the complete photo.
- Do not force uniform image heights outside the reference-driven gallery collage.
- Maintain the lightbox's full-image visibility.
- Omit visible sample-photo captions and notices at the user's request. Retain descriptive image alt text.

Do not introduce unrelated stock couple photography.

## Luxury Detail System

Keep the existing custom wedding monogram.

Recolor it to the new palette.

Use the same monogram across:

- Envelope
- Hero
- Formal invitation
- Cinematic closing

Maintain the Khmer Kbach ornamental system.

The shared `GoldDivider` uses `public/images/khmer/style.png` at the user's request. `.gold-divider-art` crops the source's transparent canvas through a CSS mask and tints the artwork with `currentColor`, inherited from `--ornament`. Preserve the PNG source. Keep existing reveal and parallax behavior around this shared divider.

Paper texture remains subtle and limited to appropriate editorial sections.

Floral decorations should use:

- Dusty rose
- Soft blush pink
- Muted mauve
- Ivory
- Rose-gold accents

Flowers remain on the outer decorative edges.

Do not obstruct names, paragraphs, images, or buttons.

## Interaction and Motion

Preserve all currently implemented behavior.

### Envelope

- Closed on every page load
- Opens only after clicking
- Starts background audio through user interaction

### Audio

- One shared audio player
- Fade to 35% volume
- Loop playback
- Existing pause/resume controls

### Scroll Reveals

- One-time reveal animations
- Short upward motion
- Restrained stagger
- Readable server-rendered text before JavaScript hydration

### Butterflies

Recolor existing SVG butterflies into:

- Soft rose
- Dusty mauve
- Muted pink
- Rose-gold accents

Keep their flight paths at the outer section edges.

Pause flight while sections are offscreen.

### Hearts on Scroll

At the user's request, scrolling releases a restrained pair of small pink hearts along the viewport margins. `ScrollHearts.tsx` owns the effect; `.scroll-heart*` in `globals.css` uses the decorative `--heart-pink: #df87a8` token for both sides, as explicitly requested. Hearts rise gently and disappear within 2.8 seconds, with at least 450ms between bursts and no more than eight hearts mounted. Keep the layer decorative, hidden from assistive technology, and unable to intercept pointer input. No new hearts appear while the envelope or lightbox is open, a form control is focused, or the document is hidden. Clear hearts when the page is hidden. Disable the effect for reduced motion, including changes to that preference during a visit. Keep hearts at the outer margins, clear of invitation text, photographs, and controls; no continuous particle loop.

### Parallax

Preserve the existing nine-pixel hero ornament movement.

Avoid introducing additional dramatic parallax.

### Gallery

Maintain:

- A static responsive geometric collage of all seven configured photographs
- Shaped photo previews without per-photo captions, with complete images in the lightbox
- Keyboard-accessible photo buttons
- Full-screen lightbox rendered outside the page layout
- Previous/next controls and a current/total indicator inside the lightbox
- Arrow-key navigation, Escape to close, focus trapping, and return focus to the opened photo
- Background interaction and page scrolling disabled while the lightbox is open

### Reduced Motion

Preserve all accessibility fallbacks.

Reduced-motion preference must disable:

- Butterfly flight
- Scroll-triggered hearts
- Decorative travel animations
- Parallax
- Smooth scrolling

The invitation must remain readable without JavaScript.

## Personalized Guests

Preserve guest-specific invitation URLs and greeting behavior.

Personalized guest names should use deep-plum Khmer typography.

Do not expose private guest data in public client bundles.

Keep the existing default invitation behavior.

## Browser and Device Icons

Update the existing wedding icon assets to reflect:

- Rose-gold background or warm ivory background
- Deep-plum lotus-Kbach emblem
- Appropriate maskable-safe padding

Maintain SVG, ICO, Apple touch icon, and Android manifest icon compatibility.

Use the supplied `public/images/socail-share.png` unchanged for Open Graph and Twitter sharing previews, including personalized invitation links. `weddingShareImage` in `src/config/wedding.ts` owns its URL, native 2048 × 1152 dimensions, and alt text. Preserve the supplied filename. Explicit metadata uses this shared image; do not restore a generated `opengraph-image` route that would override it.

Do not remove the existing icon infrastructure.

## Mobile Experience

Mobile-first remains a non-negotiable design principle.

Preserve:

- Responsive Khmer typography
- Stacked hero layout
- Natural photograph proportions
- Responsive geometric photo collage with full-image lightbox
- Two-column ceremony number/content rhythm
- Accessible RSVP form
- Horizontal floating controls

Keep the floating controls hidden while the formal letter, gallery, RSVP, or cinematic closing requires unobstructed space.

## Anti-References

Avoid:

- Royal red and purple as dominant colors
- Neon pink
- Strong saturated gradients
- Glassmorphism
- Rounded dashboard cards
- Excessive shadow effects
- Glitter and decorative particle explosions
- Random wedding photography
- Cropped wedding portraits outside the explicitly requested gallery collage previews
- Heavy floral overlays
- Excessive butterfly movement
- Fake Khmer lunar dates
- Inaccurate cultural claims
- New animations that compete with existing interactions

## Implementation Requirements

Inspect the existing repository before making changes.

1. Identify all existing theme tokens and hardcoded colors.
2. Replace the red/purple visual language with the rose-gold, ivory, pink, mauve, and plum palette.
3. Update the envelope, monogram, Kbach ornaments, and floral details.
4. Apply consistent colors to all existing invitation sections.
5. Update gradients only where already appropriate.
6. Recolor existing decorative butterfly assets.
7. Update icons, favicon, and Open Graph visuals.
8. Verify typography and accessible contrast.
9. Preserve all current functionality.
10. Run the existing TypeScript, lint, and production build checks.
11. Inspect the finished website at mobile, tablet, and desktop widths.

Do not change the architecture unnecessarily.

Do not rebuild components that already work.

Do not add dependencies unless clearly justified.

## Final Goal
2

Create a luxurious **Rose Gold & Ivory Khmer Digital Wedding Invitation**.

The finished experience should feel like opening an expensive, romantic Cambodian wedding invitation printed on soft ivory paper, decorated with rose-gold Khmer ornaments and delicate blush-pink flowers.

The result must be elegant, culturally respectful, beautifully composed, mobile-first, and fully compatible with all existing features.

Implement the new design system throughout the existing website without redesigning its information architecture or introducing functionality regressions.
