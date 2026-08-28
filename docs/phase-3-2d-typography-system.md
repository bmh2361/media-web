# Phase 3.2D typography system

## Principle

Hierarchy is created by scale, measure, weight, spacing and contrast together. Display text no longer compensates for weak composition, and secondary text never becomes microscopic.

| Role          | Desktop intent | Mobile intent | Measure               | Use                          |
| ------------- | -------------- | ------------- | --------------------- | ---------------------------- |
| Display Hero  | fluid 64–96px  | fluid 44–58px | EN 12–17ch; ZH 8–12em | Home proposition only        |
| Display Large | fluid 54–78px  | fluid 40–52px | EN 12–18ch; ZH 9–13em | Page openings and final CTA  |
| H1            | fluid 48–68px  | fluid 36–46px | 14–20ch               | Case and primary page titles |
| H2            | fluid 38–56px  | fluid 31–40px | 14–22ch               | Major chapter titles         |
| H3            | fluid 24–34px  | fluid 23–30px | 18–28ch               | Project/capability headings  |
| Lead          | 19–22px        | 18–20px       | 38–52ch               | Proposition support          |
| Body Large    | 18–20px        | 17–19px       | 42–60ch               | Primary explanation          |
| Body          | 16–18px        | 16–17px       | 50–68ch               | Standard content             |
| Body Small    | 14–15px        | 14–15px       | 55–72ch               | Secondary context            |
| Eyebrow       | 12px           | 12px          | short                 | Section identity             |
| Metadata      | 13–14px        | 13–14px       | short                 | Project facts and roles      |
| Caption       | 12–13px        | 12–13px       | 36–52ch               | Media context                |
| Button        | 13–14px        | 14px          | single line           | Primary/secondary actions    |
| Navigation    | 14–15px        | 15px          | single line           | Header/footer navigation     |

## Wrapping

- Major English headings use balanced wrapping where supported and avoid single-word final lines.
- Chinese display measure is independent and generally tighter than English.
- Manual checks are required at 1440, 1280, 1024, 768 and 390.
- Headline width—not forced line breaks—is the primary wrapping control.
- Body copy never shares the display measure.

## Weight and contrast

- Display and headings: normal to medium weight; no artificial bold luxury treatment.
- Body: regular weight with at least 65% foreground opacity on dark or light surfaces.
- Metadata: secondary by size and colour, never below the readable floor.
- Eyebrows: restrained tracking; accent may identify a chapter but not carry paragraphs.

## Language tuning

Chinese uses slightly smaller display scale, tighter line height and wider conceptual measure. Punctuation remains full-width and clauses are allowed to wrap semantically. English remains direct and avoids serial abstract nouns.
