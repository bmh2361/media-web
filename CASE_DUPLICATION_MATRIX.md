# Case Duplication Matrix

Audit date: 2026-07-11. This matrix describes the pre-refactor concept records in `content/cases/index.ts`.

| Field                       | Six-record comparison                                                      | Commercial or media mismatch risk                                                                               |
| --------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Challenge                   | Lightly paraphrased duplicate (same overseas brief / UK execution problem) | Does not distinguish fashion, technology, events, beauty, automotive, or jewellery.                             |
| Objective                   | Near duplicate                                                             | All describe a generic route to handoff rather than a client decision or outcome.                               |
| Example brief / client need | Near duplicate                                                             | No industry-specific approval, audience, or usage dependency.                                                   |
| Potential FrameBridge role  | Near duplicate                                                             | Same scoping, specialist identification, coordination, and delivery claim.                                      |
| Production scope            | Exact duplicate array                                                      | All use feasibility, supplier coordination, and planning regardless of media.                                   |
| Deliverables                | Exact duplicate array                                                      | The same scope, asset plan, and handoff appears in every record.                                                |
| Formats                     | Exact duplicate array                                                      | Does not distinguish stills, 4:5, 9:16, demos, stage capture, or interview assets.                              |
| Usage context               | Exact duplicate array                                                      | Does not distinguish paid, organic, PR, exhibition, or confidential internal use.                               |
| Constraints                 | Exact duplicate                                                            | Omits seasonal casting, technical accuracy, vehicle permits, event AV, or jewellery usage constraints.          |
| Visual direction            | Exact duplicate                                                            | Generic future-tense statement cannot be evaluated against the case media.                                      |
| Outcome                     | Missing                                                                    | No intended outcome or completed-project result was stated.                                                     |
| CTA                         | Missing from record                                                        | Detail-page CTA was derived only from the first service pillar.                                                 |
| Related services            | Only differing operational field with industry/title/media                 | `technology-content` had no dedicated service page; media IDs varied but the accompanying case content did not. |

## Exact Duplicate Strings and Arrays

- `projectType`, `productionScope`, `deliverables`, `formats`, `usageContext`, `constraints`, `location`, `market`, and `visualDirection` were identical across all six cases.
- Every record used `status: "concept"` and `disclosureLevel: "illustrative"`.
- All media IDs followed the same `{prefix}-concept-*` template. The assets could not be assessed as evidence of a completed project and must remain illustrative.

## Refactor Requirements Derived From This Audit

1. Every case must have a distinct commercial problem, operational constraint, approval dependency, workflow decision, and deliverable group.
2. Concept records must describe a possible route, not a completed client result.
3. Future real cases require evidence governance, client/media permissions, and a typed record compatible with the same page components.
