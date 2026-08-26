# Production Rollback Runbook

## Ownership and baseline

- Current repository branch: `main`.
- Git remote: `origin` on GitHub.
- Recommended release checkpoint: reviewed commit plus annotated `v1.0.0-rc1`, followed by `v1.0.0` only after every P0 gate passes.
- Production branch and deployment owner are not configured in the repository and must be assigned.

## Release procedure

1. Review and commit the current approved dirty tree; do not tag unreviewed local state.
2. Run the complete Phase 6 validation matrix.
3. Create the annotated release-candidate tag and push it without rewriting history.
4. Deploy a preview from the exact candidate commit.
5. Complete deployed-domain, Contact, social and device checks.
6. Promote that immutable deployment to production and record its deployment ID.

## Rollback trigger

Rollback immediately for lost Contact delivery, broken key routes, widespread 5xx, exposed secrets, incorrect public indexing, serious mobile rendering breakage, or a security/privacy incident. For a single content correction with no service impact, use a normal forward fix.

## Managed-host rollback

1. Identify the last known-good production deployment and commit.
2. Pause new promotion if the incident is ongoing.
3. Use the provider dashboard or supported rollback command to reassign production to that immutable deployment.
4. Verify Home, Contact, robots, sitemap, security headers and one controlled enquiry.
5. Record incident time, affected deployment, rollback deployment and Contact request IDs.
6. Correct forward on a new branch/commit; do not rewrite the released tag.

For the recommended Vercel path, `vercel rollback <deployment-id-or-url>` is the reference command; account-plan rollback depth must be confirmed before launch.

## Environment and data

- Production environment variables are owned in the hosting provider, with an offline ownership record and least-privilege access.
- Public media is versioned in Git/repository backups; do not overwrite a published filename when cache invalidation is uncertain.
- The application stores no enquiries locally. The webhook/workflow owner must document retention, export, backup and deletion for submitted data.

Status: RUNBOOK COMPLETE; OWNER, RELEASE COMMIT/TAG, DEPLOYMENT ID AND ROLLBACK DRILL REQUIRE HUMAN ACTION.
