# Case-study commercial narrative implementation report

## Model integration

The public narrative is a deliberately small projection of `FutureCommercialCaseIntake`, not a competing evidence system. `PublicCommercialCaseNarrative` reuses its geography, participant and verification concepts, then adds public claim classification and source IDs. Historic creative cases retain their existing evidence classes.

## Public sequence

Core cases now render: Hero market moment → Market Moment → Why It Mattered → Project Objective and case-specific challenge → visible Venus Bridge role boundary → Before / On the Ground / After → Verified Outputs → Verified Result → optional What Happened Next with no-attribution wording → Evidence & Claim Boundary.

Image count remains secondary under “Public evidence available”. The approach label is evidence-sensitive; all six current core cases use “Documentation Approach” because no wider commercial planning role is verified.

## Work and homepage hierarchy

Work is divided into Commercial Case Studies, Local Brand & Production Execution, and Creative & Cultural Experience. Core previews and homepage proof cards lead with the market moment, then show the verified role. Creative cases retain capability-oriented treatment.

## Taxonomy compatibility

Stable URLs and legacy `primaryPath` values remain unchanged. New `engagementType` and `geography` fields stop Germany cases being interpreted through a UK-only taxonomy without a risky route migration.

## Claim governance

Each rendered narrative claim has a controlled classification and source ID. `UNVERIFIED` cannot pass the focused publication test. Subsequent development requires both a source and bilingual no-attribution statement. Quantitative commercial claims were not introduced.

## Release governance

Production readiness now runs on pull requests targeting `main` and merge queue events as well as manual dispatch. Repository owners must select the `Production readiness / validate` check in the `main` branch ruleset and keep Cloudflare production deployment dependent on merged `main`; this repository does not silently deploy from the readiness workflow.
