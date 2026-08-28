# Portfolio import report

## Result

- Scanned image records: **261**.
- Selected source images: **67**.
- Generated responsive files: **268** (WebP, AVIF, mobile WebP and thumbnail WebP).
- Internal-only records excluded: **54**.
- Other publishable candidates not imported: **140**.
- Selected-source weight: **10858 KB**.
- Total generated responsive weight: **13559 KB** across four variants per source.
- Rights state for every selected record: website use, media rights and copyright approved; no credit required; public.

## Selection by project

| Project id                   | Imported source images |
| ---------------------------- | ---------------------: |
| byd-bd11-london              |                      7 |
| catl-open-day-2025           |                      7 |
| changan-europe-launch-2025   |                      7 |
| commercial-fashion-styling   |                      8 |
| creative-beauty-makeup       |                      4 |
| european-road-lifestyle      |                      7 |
| leapmotor-iaa-2023           |                      7 |
| london-automotive-brand-film |                      7 |
| talent-categories            |                      6 |
| teal-editorial-series        |                      7 |

## Why images were not imported

The 54 records under `04_internal_only_do_not_publish` were excluded categorically and were never copied into `public`. The remaining 140 candidates were held outside the public build because they were near-duplicates, weaker variations of a selected frame, less useful for B2B proof, compositionally unsuitable for the available responsive crops, or unnecessary for the page assignment. No source files were modified.

## Processing

Sharp applies EXIF orientation and writes fresh derivative files, removing source EXIF/GPS/device metadata. Full WebP and AVIF variants are bounded at 1600 px; mobile WebP is bounded at 900 px; thumbnails are bounded at 640 px. Source aspect ratios are preserved in the files and safe display crops are controlled by the manifest's desktop/mobile object position.

No runtime path points to the source drive. All website files live under `public/media/portfolio`.
