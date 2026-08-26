# Pricing Removal Audit

Date: 2026-07-16

## Confirmed removals

| Area                    | Previous issue                                      | Result                                               |
| ----------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| Visible form            | predefined GBP ranges                               | removed                                              |
| Form payload            | `budget` field                                      | removed                                              |
| Server validation       | budget enum and accepted key                        | removed                                              |
| Contact pathways        | one range-led full form                             | replaced with quick and full bespoke routes          |
| Legacy services content | package labels and arrays                           | removed                                              |
| Public copy             | price/range/package language                        | replaced with scope-led commercial wording           |
| Privacy                 | budget collection statement                         | replaced with optional commercial-parameters wording |
| Terms                   | quote/fee wording                                   | replaced with proposal and commercial-terms wording  |
| Talent copy             | quotation reference                                 | replaced with commercial-terms wording               |
| Service proof           | budget ownership references                         | replaced with commercial parameters                  |
| Hidden fields           | no range hidden field remains                       | confirmed                                            |
| Metadata/JSON-LD        | no public price data found                          | confirmed                                            |
| Old routes              | no pricing route exists                             | confirmed                                            |
| Environment             | no pricing environment variable found               | confirmed                                            |
| Tests                   | source contract rejects prohibited language         | added                                                |
| Release validation      | source scan fails on pricing/package/range language | added                                                |

## Approved replacement language

- tailored production proposal;
- bespoke project quotation in direct client communication only;
- production scope developed around the brief;
- project-specific estimate after review;
- relevant commercial parameters as optional free text.

The public application contains no predefined commercial brackets.
