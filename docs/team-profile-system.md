# Team profile system

## Data structure

`content/team.ts` is the single ordered source. Each approved member contains an order, name, externally understandable role, specialist domain, primary project contribution, expertise summary, concise credibility line, project responsibility, client value, expertise list, image, bilingual alt text and individual focal point. Publication remains gated by the existing `public` and `approved` flags.

## Profile content architecture

The visible profile follows a role-first sequence:

1. name;
2. company role or operational function;
3. primary contribution to Venus Bridge projects;
4. specialist expertise;
5. one concise verified credential or relevant professional-background signal.

Expanded details explain project responsibility, client value and the capability enabled. Previous long CV-style paragraphs and multi-degree histories are no longer presented. Education supports credibility rather than leading the profile. No new employer, degree, relationship or project claim was introduced.

## Portrait system

Every viewport uses a 4:5 portrait frame, `object-fit: cover`, a shared border/background treatment and the member's explicit `focalPoint`. This creates a uniform external frame while respecting different source compositions. See `docs/team-portrait-guidelines.md` for future source requirements.

## Grid scalability

The DOM and visual order are driven by `order`: 包铭涵 博士, Vivian Wang, Richard Bußmann, Dr. Patrick Lenihan and Dr. Fei Cao. Featured leadership occupies the first two equal desktop columns. Remaining members use a six-column grid expressed as three equal cards per row. When the final core row contains two cards, both receive equal half-width spans; a single remainder stays left-aligned rather than being artificially centred. Mobile is always one semantic column.

The same algorithm supports 6–10+ approved members. An eight-member browser simulation (two leadership plus six core profiles) is used during release QA and is removed by reloading the page; no test members are stored in production data.
