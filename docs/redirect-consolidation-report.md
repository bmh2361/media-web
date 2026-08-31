# Redirect consolidation report

`public/_redirects` is the authoritative Cloudflare production layer. The generated matrix currently contains **61 rules**. Retired capability, what-we-do, service, industry, expertise, talent, agency and non-public Work URLs now go directly to `/companies`, `/partners`, `/work` or a verified relevant anchor in one hop, preserving language. The validator checks statuses, loops, chains, final files, anchors, language, sitemap source and final canonical URLs.

Root `/ → /en` remains temporary (`307`) because it is a language-entry decision and may later become locale negotiation. Retired routes remain permanent (`308`). Existing route-level redirect components were retained because the static export still builds those paths and Cloudflare rules have not been live-host proven in this task; removing the fallback before that proof would be unsafe.

Machine evidence: `audit/redirect-matrix.json`. Real-host redirect/cache behaviour remains a post-deploy check.
