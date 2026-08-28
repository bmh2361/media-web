# Media Performance Budget

## Budgets

| Asset                    | Target                                                             |
| ------------------------ | ------------------------------------------------------------------ |
| LCP hero image           | responsive WebP/AVIF, normally under 350KB at common desktop width |
| Secondary hero image     | under 180KB                                                        |
| Below-fold still         | under 220KB per responsive candidate                               |
| Video poster             | under 250KB                                                        |
| Short muted preview      | under 2.5MB, loaded on intent or intersection                      |
| Full reel                | never globally preloaded                                           |
| Route-specific client JS | loaded only where needed                                           |

## Runtime rules

- image dimensions or aspect ratio are always reserved;
- only hero-critical media receives priority;
- videos require posters and remain muted by default;
- pointer movement is throttled with `requestAnimationFrame`;
- transforms and opacity are preferred;
- off-screen loops must stop;
- mobile does not render desktop sticky or pointer effects;
- WebGL is not introduced;
- one animation library is retained.

## Current limitation

Demo media is staging-only and not proof of production performance. Approved final assets require a fresh size, crop, LCP and data-saving audit.
