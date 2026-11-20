# Odd Logic Studio

Custom studio portfolio built with Next.js and deployed to Vercel.

## Repository and production

The project lives directly in `/home/boris/studio` on `main`, with GitHub origin `sirob511/studio`. There is no nested repository. Vercel project `studio` deploys this branch to `https://oddlogicstudio.com`. The former Sites preview is historical; new releases use Vercel.

## Run locally

Use Node 24. Run `npm ci`, then `npm run dev`. `npm run build` produces the native Next.js output in `.next`; `npm start` serves it. `npm run typecheck` checks TypeScript. Vercel uses the checked-in `vercel.json` and the root directory.

## Content and assets

- `lib/projects.ts`: ten projects, three services, live URLs, descriptions, and attribution.
- `app/`: homepage, consolidated portfolio, services overview, about, contact, privacy, sitemap, and robots.
- `components/studio/`: navigation, project previews, inquiry form, videos, and analytics.
- `public/images/`: actual portfolio screenshots with responsive WebP variants.
- `public/clips/`: user-initiated public-demo captures. No autoplay.
- `public/fonts/`: locally hosted Bricolage Grotesque and Instrument Sans.

The Services page contains three sections with scope and clearly labeled live project examples. Homepage service links jump to these sections. The former `/services/custom-websites`, `/services/interactive-web-experiences`, and `/services/web-applications` URLs permanently redirect to their matching anchors on `/services`.

The Portfolio page presents all ten projects with desktop and mobile previews, design notes and live links. A compact Portfolio title leads directly into the work, without a project index or video walkthroughs. Preview frames enter subtly before they reach the viewport, with no hidden text or layout shifts. Each project has a shareable `/work#project-slug` anchor. Home and About links jump directly to these sections; Services examples use clearly labeled Visit live site links that open the live projects in a new tab; the former `/work/project-slug` URLs permanently redirect to their matching anchors. Individual project URLs are omitted from the sitemap. Ownership credit blocks and repeated case-study navigation have been removed.

The project provenance was checked against https://oddlogic.ai/. That portfolio groups OneSuitcase, Tulsa, A Planet of Her Own, and Centennial Fountain under “Client & partner work.” BuildPlane and Website X-Ray are explicitly credited as Odd Logic AI products. Compute4Cure is labeled an initiative. The studio’s scope and founder AWS background come from the launch brief. No performance or business-results metrics have been invented.

## Inquiries

The destination is `hello@oddlogicstudio.com`. The browser validates the form and submits selected fields directly to FormSubmit’s cross-origin AJAX endpoint. It preserves text on failure and shows inline confirmation only after an affirmative response; activation-required responses count as errors. No delivery API key or runtime environment variable is needed. FormSubmit requires inbox activation for each hostname. The owner activated the canonical domain and former Sites review hostname, and confirmed the final Vercel production test arrived in the inbox. An earlier test arrived in spam; mark legitimate inquiries Not spam and allow their actual sender.

## Measurement

Vercel Web Analytics replaces the former Cloudflare D1 endpoint and is enabled on the Vercel project. Custom events require a supported Pro or Enterprise plan. There is no automatic plan upgrade in this repository.

The browser sends allowlisted event names and valid portfolio slugs for portfolio project views/opens, outbound portfolio links, project-start clicks, and accepted inquiries. Project views are counted when a project heading first enters the viewport during a Portfolio visit. It never passes inquiry fields to analytics. Before sending, URL query strings and fragments are stripped. Do Not Track suppresses script injection and custom events. Tracking runs only in production deployments. See `/privacy` for provider data handling.

## Indexing and launch

`VERCEL_ENV=production` enables index/follow and allows crawlers. Preview and local builds remain noindex/disallow. Canonical and sitemap URLs target `https://oddlogicstudio.com`.

`launch/DNS-SETUP.txt` contains the verified Vercel domain configuration. Both apex and `www` have valid TLS; `www` redirects permanently to the apex and preserves paths and query strings. Keep the DNS records and mail/catch-all settings. The old Sites DNS instructions no longer apply. Post-migration verification is recorded in `verification.json`. The contextual link from OddLogic.ai is published.
