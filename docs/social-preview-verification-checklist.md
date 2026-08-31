# Social preview verification checklist

The build creates 42 deterministic 1200 × 630 cards under `/og/v20260831/`: core pages plus all 12 case routes in EN and ZH. Core URLs are unique; case cards use a branded rights-safe fallback instead of unverified project imagery.

After a real-host deployment:

- [ ] Open every core EN/ZH `og:image` and Twitter image URL directly.
- [ ] Confirm title, language, alt text, descriptor hierarchy and no “Venus Bridge Media” wording.
- [ ] Inspect priority case cards for truthful titles and no conceptual-project labels.
- [ ] Refresh LinkedIn Post Inspector and record the result.
- [ ] Share controlled URLs in WeChat and record the result.
- [ ] Share controlled URLs in WhatsApp and record the result.
- [ ] Check any other active owner sharing surface and record cache behaviour.
- [ ] Increment the version directory when a card changes.

None of these real-host platform checks has been claimed from local generation.
