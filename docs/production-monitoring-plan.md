# Production Monitoring Plan

## Minimum operating model

### Deployment

- Connect repository build status to the hosting provider and require a successful production build before promotion.
- Notify the deployment owner on failed builds and failed production promotions.
- Retain deployment ID, commit SHA, build log and environment name for every release.

### Runtime

- Enable hosting runtime/error logs with access limited to operators.
- Alert on sustained 5xx responses, function failures, elevated latency and image-optimisation errors.
- Do not log Contact payload bodies or personal form values.

### Contact delivery

The API emits a structured `contact_delivery_failed` server log containing request ID, safe reason and enquiry type. Create a high-priority log alert for this exact event. Verify the downstream webhook/workflow also alerts on signature failure, notification failure and delivery backlog. A successful HTTP response without owned notification receipt is not enough.

### Uptime and broken pages

- Monitor the canonical Home, Contact, robots and sitemap endpoints from at least one UK/European location.
- Alert after two consecutive failures to reduce transient noise.
- Run a scheduled synthetic Contact check only with controlled non-customer data and an owned destination; avoid creating real notifications too frequently.
- Re-run the internal-link crawl after releases that modify navigation or portfolio data.

### Analytics health

When a provider is approved, monitor daily page/event volume and alert on an unexpected zero for `page_view` or `contact_start`. Never use analytics as the only Contact-delivery monitor.

## Human actions

Provider/account configuration is required for build notifications, runtime error alerts and uptime checks. The repository does not install a heavyweight monitoring SDK because no owner/provider is approved.

Status: PLAN COMPLETE; DEPLOYMENT, RUNTIME, CONTACT ALERT AND UPTIME MONITORS REQUIRE HUMAN ACCOUNT CONFIGURATION.
