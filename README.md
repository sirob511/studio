# Odd Logic Studio

A custom studio portfolio built with React, Vinext, and a Cloudflare Worker through Sites.

## Run locally

Use Node 24 (Node 22.13+ is required by the starter). Install with the Sites dependency helper, then `npm run dev`. Production builds use the Sites `scripts/build-site.mjs` helper. `npm run start` runs the built Worker.

## Content and assets

- `lib/projects.ts`: eight projects, three services, live URLs, descriptions, and attribution.
- `app/`: homepage, work index, case studies, service pages, about, contact, privacy, sitemap, and robots.
- `components/studio/`: navigation, project cards, inquiry form, videos, and analytics.
- `public/images/`: real live-site captures, captured November 17, 2026, with responsive WebP variants.
- `public/clips/`: user-initiated public-demo captures. No autoplay.
- `public/fonts/`: locally hosted Bricolage Grotesque and Instrument Sans from Google Fonts.

The portfolio and credits were checked against https://oddlogic.ai/. That portfolio groups OneSuitcase, Tulsa, A Planet of Her Own, and Centennial Fountain under “Client & partner work.” BuildPlane and Website X-Ray are explicitly credited here as Odd Logic AI products. Compute4Cure is labeled an initiative. The studio’s scope and founder AWS background come from the supplied launch brief. No performance or business-results metrics have been invented.

## Inquiries

The user-selected destination is `hello@oddlogicstudio.com`. FormSubmit is the default delivery provider; the user confirmed inbox activation. The server validates the form, sends only allowlisted fields, and treats provider failure or activation responses as errors. The browser preserves entered values and confirms success only after acceptance. Optional Resend configuration is supported by the variable names in `.env.example`; never commit keys.

## Measurement

`POST /api/events` writes allowlisted event names and project slugs to D1. No IP, email, browser ID, free text, or URL parameters are stored. Do Not Track suppresses the client request. The migration is in `drizzle/`; Sites applies it on publication.

## Launch status

The Sites version is private for review and intentionally sends `noindex` and `robots.txt` disallow. Canonical URLs target `https://oddlogicstudio.com`. After domain routing and public access are confirmed, update `app/layout.tsx` robots to index/follow and `app/robots.ts` to allow `/`, then publish the same Site.

Before the public launch, verify the custom-domain DNS and HTTPS, redirect the alternate hostname, confirm inbox receipt, and add the studio link to OddLogic.ai. Do not change mail routing records when adding website DNS.
