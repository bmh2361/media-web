# Homepage autoplay carousel

## Playback and transition

The homepage project carousel advances every 6000ms. Slides use a 900ms crossfade with a restrained `1.008 → 1` incoming scale. The media viewport has a fixed 16:10 ratio, so transitions do not create layout shift, nested frames or black gaps.

## Navigation and timer rules

Large previous/next arrows have been removed. Five 8px square indicators sit inside 36px buttons; only the active square uses the restrained Venus Bridge gold. Every button maps directly to one slide, exposes `aria-pressed`, and resets the six-second timer even when the current slide is selected. Left/Right keyboard control remains available on the labelled carousel region.

Autoplay pauses while a mouse pointer is over the media, while touch/pointer interaction is in progress, while the carousel is substantially offscreen, or while the document is hidden. It resumes from a fresh timer when the relevant condition clears.

## Mobile behavior

Mobile uses the same calm autoplay and square navigation. A horizontal pointer movement of at least 44px changes one slide; vertical page panning remains available through `touch-action: pan-y`. Pointer interaction pauses playback and restarts it after an 800ms settling delay.

## Accessibility and reduced motion

The component is a named carousel region. Each indicator has a bilingual accessible label and direct slide association. Metadata updates through a polite live region. With `prefers-reduced-motion: reduce`, autoplay is disabled and slide changes become instant.

## Performance strategy

Only the active visual is mounted and receives eager loading priority; after each change, the next responsive media source is preloaded. All visuals retain predictable dimensions and responsive source selection, avoiding eager loading of the full media library.
