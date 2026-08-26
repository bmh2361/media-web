# Mobile experience design system

## Scope

The enhanced system applies at `max-width: 1199px`. Protected desktop layouts at 1200px and above retain their existing composition. The experience uses native scrolling, the existing Motion dependency where already justified, CSS transitions, and Intersection Observer.

## Motion tokens

Source: `lib/motion-system.ts`.

- Micro: 160ms — press and state feedback.
- Standard: 340ms — controls, progress state, header compression.
- Editorial: 720ms — headings, section rules, and staged copy.
- Cinematic: 900ms — media and carousel transitions.
- Primary easing: `[0.22, 1, 0.36, 1]`.
- Mobile reveal distance: 18px.
- Stagger: 45ms.
- Sticky header offset: 64px after scroll.
- Touch scale: 0.99.
- Maximum mobile transition duration: 900ms.

## Interaction principles

1. Motion must explain hierarchy, interaction, spatial continuity, reveal, or progress.
2. Text remains readable before and without animation.
3. Mobile controls use at least a 44px interaction target.
4. Native scroll is never intercepted.
5. One section should not combine multiple high-intensity effects.
6. Gold indicates current state or progress, not decoration.

## Animation hierarchy

- High: Homepage entry and project media sequence.
- Medium: Full-screen menu, indexed journeys, expandable case previews, team portrait staging.
- Low: Proof sections, form content, CTA closings, supporting paragraphs.

Recommended page rhythm: `HIGH → LOW → MEDIUM → LOW → PROOF → CTA`.

## Mobile navigation

- Initial header height: 76px.
- Compact height after 56px scroll: 64px.
- Full-screen panel begins below the current header height.
- Links reveal with 45ms stagger and keep the existing information architecture.
- Current route uses a restrained gold square; other links use a directional mark.
- `aria-expanded`, `aria-controls`, dialog semantics, Escape dismissal, focus cycling, trigger focus restoration, body scroll lock, and an immediately visible CTA are retained.
- Main content recedes by 1.5% only while the menu is open.

## Section progress

The shared mobile experience layer identifies semantic page sections, observes a central reading band, and renders a compact fixed progress control after the first 120px of scroll. Markers are tappable and use `aria-current="step"`. The control disappears while the menu is open.

## Sticky storytelling

Four sections use the shared indexed story:

1. Company opportunity journey.
2. Partner project process.
3. How We Work project journey.
4. About operating frame.

The status bar is briefly sticky below the compact header. Each step keeps native document flow, has a bounded natural height, and remains fully readable. There is no pinning of the page or scroll velocity manipulation.

## Media and carousel

- Existing six-second autoplay is retained.
- Active mobile navigation expands from a square into a 28px gold progress bar.
- Progress pauses whenever autoplay is paused.
- Project and portrait media use a 760ms clipped reveal with a 1.012→1 settle.
- Selected case-detail media may break to viewport width below 768px.
- Current and next carousel images retain their existing eager/preload strategy.

## Case interaction

- Only one mobile case preview can be expanded.
- `aria-expanded` and `aria-controls` communicate state.
- A short gold rule replaces the generic plus/minus pattern.
- Preview media reveals with opacity and a bottom clip over 560ms.

## Team interaction

- Existing 4:5 portraits and role-first content remain unchanged.
- Portrait reveals first, then name, role, contribution, evidence, and the existing detail control.
- Expanded responsibility remains a normal document-flow disclosure.

## Page transition

The existing Motion page crossfade remains at 280ms. A View Transitions dependency was not added because the current Next.js 15 architecture already provides an immediate progressive route transition.

## Reduced motion

Under `prefers-reduced-motion: reduce`:

- Reveals have no clipping, translation, or scale.
- Headings and team copy remain fully visible.
- Indexed story steps remain fully opaque.
- Autoplay behavior continues to follow the existing reduced-motion carousel rule.
- Marquees and other continuous movement stop.

## Performance rules

- No WebGL, canvas, shader, particle, smooth-scroll, or new animation dependency.
- No permanent `requestAnimationFrame` loop.
- Intersection Observer handles section state and one-shot reveals.
- Passive scroll handling performs only compact header/progress visibility work.
- Prefer transform, opacity, and small clip paths.
- Avoid animated layout dimensions except the existing short disclosure transitions.
