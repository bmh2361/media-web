# Phase 14 before / after report

## Before

- 50 baseline screenshots are stored in `audit/phase-14-browser/before`.
- The browser matrix found 26 page/breakpoint combinations with repeated resources.
- Portfolio and capability components used separate image logic and most layouts supplied fixed cover ratios.

## After

- 83 final screenshots are stored in `audit/phase-14-browser/after`:
  - 15 English page and representative-case routes at 390, 768, 1440 and 1920 pixels;
  - 11 Chinese routes at 390 and 1440 pixels;
  - one 1440-pixel development media-review screenshot.
- 150 final browser checks cover 25 routes at 320, 390, 768, 1024, 1440 and 1920 pixels.
- Final matrix: 0 overflow, 0 broken images, 0 repeated content-media IDs and 0 repeated art-directed content sources.
- Repeated generic resources are limited to the Venus Bridge Media monogram used in persistent brand chrome; they are not portfolio-image duplication.
- Mobile, tablet and desktop `<picture>` selection produced 0 source-breakpoint mismatches.
- Crop validator checked 249 device crops across 83 assets with 0 protected-area failures and 0 missing files.

## Visual comparison

| Area           | Before                                                                              | After                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Image logic    | Portfolio and capability components had separate display rules.                     | One presentation-profile system drives both media types without merging their publication status.                                 |
| Crop behaviour | Fixed aspect utilities frequently forced centre-cover treatment.                    | Subject-specific ratios, focal points and protected areas choose a safe cover or deliberate matte.                                |
| Automotive     | Wide stage imagery created a large matte band in the expertise hero.                | A clear London vehicle-launch image leads the sector with the bus fully legible on mobile.                                        |
| Fashion        | The previous distant architectural editorial image read as location before fashion. | A commercial fashion portrait immediately establishes garment, makeup and campaign context.                                       |
| Entertainment  | Capability imagery risked reading as a generic artist gallery.                      | An asymmetric hero pairs one portrait performance image with a smaller live-crowd image and explicit capability-media disclosure. |
| Technology     | Technology imagery was present but not consistently protected.                      | AI and robotics lead; product bodies remain complete within cool-neutral editorial mattes.                                        |
| About          | No safe team photography existed.                                                   | The brand lock-up, accountable roles and operating model carry the page without invented staff photography.                       |
| Page rhythm    | Repeated centre crops reduced distinction between sectors.                          | Portrait, product, vehicle, group, interview and environment media use different ratios and background treatments.                |

## Screenshot index

Representative comparisons:

- Home: `before/home-390.png` and `after/home-390.png`
- Entertainment: `before/entertainment-1440.png` and `after/entertainment-1440.png`
- Technology: `before/technology-1440.png` and `after/technology-1440.png`
- Automotive: `before/automotive-390.png` and `after/automotive-390.png`
- Fashion: `before/fashion-1440.png` and `after/fashion-1440.png`
- About: `before/about-1440.png` and `after/about-1440.png`
- Chinese home: `before/zh-home-390.png` and `after/zh-home-390.png`
- Development review: `after/media-review-1440.png`

The machine-readable final results are in `audit/phase-14-browser/after-matrix.json`.
