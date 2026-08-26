# About Us globe reference audit

Research completed before implementation on 2026-08-23. Primary repository, project documentation, release, issue and licence sources were used. The purpose of this audit is to choose a proportionate foundation for the `/en/about` and `/zh/about` signature geography section, not to copy a default component style.

## Decision summary

Select **pinned `cobe@2.0.1` with a custom Venus Bridge wrapper, an owned SVG/DOM route-and-label overlay, and an always-present static SVG fallback**.

Do not install Magic UI, Aceternity, Three, React Three Fiber, three-globe or react-globe.gl for this phase.

COBE is the only reviewed WebGL option whose graphic dotted cartography, dependency weight and runtime model are proportionate to a single fixed Beijing–London–Europe story. Detailed country geometry would not add material commercial meaning. The custom overlay retains exact one-shot route drawing, hierarchy and accessible labels; the SVG fallback keeps the chapter complete without WebGL.

## Reference audit

### 1. COBE v2.0.1

- **Reference:** COBE
- **Repository / URL:** [Repository](https://github.com/shuding/cobe), [v2.0.1 release](https://github.com/shuding/cobe/releases/tag/2.0.1), [current public types](https://github.com/shuding/cobe/blob/main/src/index.d.ts)
- **Relevant technique:** Compact shader-rendered dotted globe; configurable sample density, palette, scale and offset; native markers and arcs; marker/arc IDs for CSS-anchor labels; v2 exposes imperative `update()` and `destroy()`.
- **Visual strengths:** The strongest match for restrained editorial cartography. It can use the established ink, ivory and champagne palette without realistic texture or a dashboard aesthetic. Large cropped framing remains clean.
- **Visual weaknesses:** No country polygon layer. Native v2 arcs share global width/height and have no documented per-route draw-progress or dash choreography. Dense dots can moiré, and the default component treatment is still generic.
- **Performance implications:** The project describes itself as zero-dependency and approximately 5 KB. WebGL sample count and DPR still matter. The v2 manual update model means the settled globe does not require a permanent animation loop.
- **What Venus Bridge can learn:** Use COBE for the sphere and land field, keep a deliberately fixed China–Europe camera, and let site-native DOM/SVG handle hierarchy, labels and route timing.
- **Should we use the code?** **YES**, as a pinned foundation with a new wrapper; do not copy older wrappers.
- **License:** MIT.

### 2. three-globe 2.45.x

- **Reference:** three-globe
- **Repository / URL:** [Repository and API](https://github.com/vasturiano/three-globe)
- **Relevant technique:** Reusable Three.js globe object with polygons, points, paths, labels, HTML, custom layers and extensive arc controls including `arcDashLength`, `arcDashGap`, `arcDashInitialGap`, `arcDashAnimateTime` and `arcsTransitionDuration`.
- **Visual strengths:** The most complete reviewed route and cartographic system. It supports country outlines, controlled materials, precise altitude and layered route animation.
- **Visual weaknesses:** Defaults read as NASA/data visualisation. Country polygons, atmosphere and tube routes quickly become over-decorated. The renderer, camera and scene still need to be owned separately.
- **Performance implications:** Requires Three.js plus a broad dependency and geometry surface. Fine curvature, polygon and path resolution increase cost; continuous scene rendering must be managed.
- **What Venus Bridge can learn:** Its route API is the clearest reference for sequencing the primary connection before a quieter European network.
- **Should we use the code?** **PARTIALLY** as an interaction/API reference. Use only if a future country-outline prototype proves a material visual benefit.
- **License:** MIT.

### 3. r3f-globe 1.6.0

- **Reference:** r3f-globe
- **Repository / URL:** [Repository and API](https://github.com/vasturiano/r3f-globe)
- **Relevant technique:** React Three Fiber binding around three-globe for a user-owned Canvas, camera, lighting, controls, labels and render lifecycle.
- **Visual strengths:** Best route to a bespoke Three/R3F scene when custom camera choreography and lighting are essential.
- **Visual weaknesses:** It is not a visual language of its own and inherits three-globe's data-viz tendency. It is disproportionate for a fixed single-chapter story.
- **Performance implications:** Adds R3F and a Three scene runtime on top of three-globe. Canvas lifecycle, renderer size and camera synchronisation remain implementation work.
- **What Venus Bridge can learn:** Separate scene, camera, lighting and label concerns; pause animation and deliberately own the point of view.
- **Should we use the code?** **NO** for this phase.
- **License:** MIT.

### 4. react-globe.gl 2.38.x

- **Reference:** react-globe.gl
- **Repository / URL:** [Repository, API and examples](https://github.com/vasturiano/react-globe.gl)
- **Relevant technique:** React wrapper offering Arc Links, Hollow Globe, Map Labels, Path Lines, polygons, HTML markers, custom materials and pause controls.
- **Visual strengths:** A fast way to prototype a broad catalogue of globe layers; HTML markers and official examples are useful for capability evaluation.
- **Visual weaknesses:** Its owned renderer and controls are less suitable for a tightly art-directed fixed composition. Default examples remain generic dark-globe visualisations and encourage unnecessary layers.
- **Performance implications:** Carries the Three/globe.gl/three-globe stack. Pointer tracking and dense geometry add cost; the API exposes pause and merge options but they still require discipline.
- **What Venus Bridge can learn:** Keep labels outside WebGL, disable irrelevant pointer work and treat paths, arcs and polygons as optional layers rather than a checklist.
- **Should we use the code?** **NO** directly; **PARTIALLY** as a reference/prototype.
- **License:** MIT.

### 5. shehzadres/Webgl-Data-Globe

- **Reference:** Webgl-Data-Globe
- **Repository / URL:** [Repository](https://github.com/shehzadres/Webgl-Data-Globe), [architecture](https://github.com/shehzadres/Webgl-Data-Globe/blob/main/ARCHITECTURE.md)
- **Relevant technique:** React, Three, R3F/Drei and custom GLSL; constrained spherical camera; GSAP scene direction; great-circle route reveal with geometry draw ranges; billboard labels; adaptive DPR; shared geometry/materials and allocation-conscious rendering.
- **Visual strengths:** Strong cinematic geography, progressive layer reveal and purposeful route travel.
- **Visual weaknesses:** Realistic Earth, clouds, stars, spikes, particles and HUD language are precisely the futuristic dashboard direction Venus Bridge must avoid. It is a complete application, not a hardened reusable library.
- **Performance implications:** The project documents adaptive DPR, cached resources, shared draw calls and zero per-frame allocation, but it still ships a full texture/shader/GSAP/R3F application.
- **What Venus Bridge can learn:** Use one-shot route drawing, delta-time updates, constrained camera movement, resource reuse and explicit DPR tiers. Reject the ambience and HUD.
- **Should we use the code?** **PARTIALLY**, engineering patterns only.
- **License:** MIT; referenced NASA/Three texture assets have separate public-domain provenance.

### 6. Magic UI Globe

- **Reference:** Magic UI Globe
- **Repository / URL:** [Component documentation](https://magicui.design/docs/components/globe), [repository](https://github.com/magicuidesign/magicui), [current component source](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/globe.tsx), [performance issue #42](https://github.com/magicuidesign/magicui/issues/42)
- **Relevant technique:** Responsive React shell around COBE, element-width measurement, high-resolution backing canvas, drag damping and opacity handoff.
- **Visual strengths:** A clean responsive integration pattern and restrained dotted body.
- **Visual weaknesses:** It behaves as a decorative card/hero ornament with continuous rotation, fixed demo markers and no geographic hierarchy, accessible city-label strategy, visibility pause or narrative sequence.
- **Performance implications:** A user report documents severe Windows GPU/scroll load. The current wrapper continuously renders at 2x. More importantly, its source still targets COBE's old `onRender` API while the registry does not pin COBE and v2 exposes `update()` instead.
- **What Venus Bridge can learn:** Responsive measurement, subtle canvas handoff and damped interaction are useful ideas. Lifecycle, DPR, visibility and reduced-motion behaviour must be implemented independently.
- **Should we use the code?** **NO** direct copy or installation.
- **License:** Magic UI MIT; COBE MIT.

### 7. Aceternity GitHub Globe

- **Reference:** Aceternity GitHub Globe
- **Repository / URL:** [Component](https://ui.aceternity.com/components/github-globe), [current registry](https://ui.aceternity.com/registry/globe.json), [licence](https://ui.aceternity.com/licence)
- **Relevant technique:** three-globe, Three, React Three Fiber alpha and Drei; GeoJSON hex-country treatment, animated dash arcs, points, rings, atmosphere, lights and orbital controls.
- **Visual strengths:** Strong globe framing on dark surfaces; country silhouette and route depth are immediately legible.
- **Visual weaknesses:** It explicitly imitates GitHub's globe and uses dense routes, rings and auto-rotation. Western Europe would become crowded and the result would read as a technology/network demo.
- **Performance implications:** Current source uses uncapped `window.devicePixelRatio`, auto-rotation, a repeating ring interval, country JSON/hex polygons and the complete Three/R3F/Drei stack.
- **What Venus Bridge can learn:** Large cropped framing and low-contrast polygon density can work. Do not inherit random rings, route density or defaults.
- **Should we use the code?** **NO**. If Three becomes necessary, use the upstream MIT library and write a smaller owned integration.
- **License:** **Custom Aceternity License, not MIT.** It permits end-product use and modification while restricting redistribution/resale of component source. The registry data provenance is not clear enough to copy into a distributable codebase without legal review.

### 8. GitHub globe engineering

- **Reference:** GitHub's production globe engineering
- **Repository / URL:** [How we built the GitHub globe](https://github.blog/engineering/how-we-built-the-github-globe/), [homepage performance follow-up](https://github.blog/engineering/user-experience/making-githubs-new-homepage-fast-and-performant/)
- **Relevant technique:** Three/WebGL; approximately 12,000 instanced five-sided land circles, small alpha land mask, five purposeful layers, route draw ranges, distance-based dot fading, inline SVG placeholder and dynamic quality tiers.
- **Visual strengths:** A globe used as a narrative hero rather than a widget; excellent land/route hierarchy and purposeful motion.
- **Visual weaknesses:** Its blue/pink activity layer and point-cloud identity are recognisably GitHub. The real-time contribution story is not relevant to Venus Bridge.
- **Performance implications:** GitHub disabled antialiasing, used a cheap halo to hide edges, faded distant dots to reduce moiré, crossfaded from SVG and reduced DPR, geometry and raycast frequency when average frame rate missed its threshold.
- **What Venus Bridge can learn:** Tell one clear story, ship an instant placeholder, degrade quality by device evidence, and solve performance limits through art direction rather than hiding them.
- **Should we use the code?** **PARTIALLY**, concepts only.
- **License:** No reusable production package or open-source licence accompanies the article snippets; treat them as proprietary reference material.

### 9. globe.gl (supplementary)

- **Reference:** globe.gl
- **Repository / URL:** [Repository and API](https://github.com/vasturiano/globe.gl)
- **Relevant technique:** Standalone UI wrapper around three-globe with renderer, controls, labels, layers and pause/resume.
- **Visual strengths:** Rich layer catalogue without React.
- **Visual weaknesses:** The same data-viz defaults and broad feature surface remain; an extra wrapper does not improve Venus Bridge art direction.
- **Performance implications:** Full Three/three-globe renderer stack; geometry, pointers and animation still require pausing and quality reduction.
- **What Venus Bridge can learn:** The core capability comes from three-globe; wrapper convenience is not a visual reason to adopt a system.
- **Should we use the code?** **NO**.
- **License:** MIT.

## Explicit COBE versus R3F + three-globe decision

### Option A — COBE: selected

The required geography is deliberately small: Beijing, London and selected European capitals. The absence of country polygons does not weaken the commercial story because the map describes project geography, not political boundaries or office presence. A warm dotted sphere is also closer to Venus Bridge's editorial visual system.

COBE v2's manual update model is particularly useful: render during the short entry sequence and any optional constrained gesture, then remain static. The library's native arcs may support the settled sphere, but the owned SVG route overlay supplies exact primary/secondary weights and timings.

### Option B — R3F + three-globe: rejected

This option has the highest geometry, country and camera capability, but the current project has no Three or R3F runtime. The added dependency graph, GPU lifecycle, build compatibility and visual-regression surface are not justified unless precise country geometry or custom camera choreography produces a demonstrable improvement. Neither is needed for this fixed narrative.

## Production constraints

- Pin `cobe@2.0.1`; do not copy Magic UI's old `onRender` wrapper.
- Load the enhancement only on the client and only when the chapter approaches the viewport.
- Keep the static SVG layer in the markup before WebGL is ready, on context loss, and when WebGL is unavailable.
- Cap desktop DPR at 1.5 and mobile DPR around 1.25.
- Start around 10,000–12,000 map samples on desktop and 6,000–8,000 on mobile, then reduce if profiling misses the target.
- Use no permanent rotation, particle train or ambient RAF. Cancel any short-lived RAF on exit, `document.hidden`, reduced motion and unmount.
- Show the final route state immediately for `prefers-reduced-motion: reduce`.
- Use HTML/SVG labels and a textual legend as the baseline. COBE's CSS-anchor labels are progressive enhancement only because older browsers do not support CSS Anchor Positioning consistently.
- Keep Beijing to London as the only primary route. Reveal London to Europe only after London resolves.
- Keep location language neutral: project geography and market context, never offices, permanent teams or formal partners.
- Profile visible and off-screen behaviour. Off-screen GPU work must be effectively zero.

## Licensing note

An MIT rendering library does not automatically clear copied example GeoJSON, textures or demo datasets. Venus Bridge will keep its location data local and minimal. If future country geometry is introduced, its exact source and licence must be documented separately. Aceternity's downloaded `globe.json` is not used.
