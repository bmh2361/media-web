# Motion Design System

Source of truth: `lib/motion-system.ts`.

## Hierarchy

- Micro: 160–220ms for links, buttons, filters, focus and pointer labels.
- Component: 340–760ms for media reveals, panels, cards and preview changes.
- Section: 620–960ms for route slates, sticky chapters, process lines and hero sequences.
- Opening: 920ms total, shown once per session and skipped under reduced motion.

## Tokens

| Group      | Tokens                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------ |
| Durations  | `instant`, `micro`, `control`, `fast`, `component`, `media`, `route`, `section`, `opening` |
| Easings    | `editorial`, `curtain`, `standard`, `precise`                                              |
| Springs    | `pointer`, `magnetic`, `panel`                                                             |
| Distances  | `micro`, `small`, `medium`, `hero`, `section`                                              |
| Stagger    | `tight`, `standard`, `editorial`, `cta`                                                    |
| Thresholds | `enter`, `chapter`, `media`                                                                |
| Limits     | desktop/mobile parallax, pointer offset, blur, scale and minimum opacity                   |

## Rules

- Animate transforms, opacity and clip paths; avoid repeated layout-property animation.
- Ambient movement must stop with reduced motion and remain limited to selected sections.
- Pointer effects run only with `(hover: hover) and (pointer: fine)` and use `requestAnimationFrame`.
- Mobile removes sticky storytelling, custom pointer behaviour and parallax.
- Text paragraphs remain static; only headings, labels and structural elements receive choreographed entry.
- Content is never hidden as a reduced-motion fallback.

## Reduced-motion alternatives

- Opening overlay is skipped.
- Sticky media changes remain available through static vertical cards.
- Moving rails become wrapping static lists.
- Parallax resolves to zero.
- Route transitions resolve to effectively instant opacity.
- All links, disclosures, forms and media remain present.
