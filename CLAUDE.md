# Ship It With AI: guide file

Read this at the start of every session. Add every new lesson here, with the reason.

## What this is
Project inquiry, booking, and learning site for Jake Kennedy ("Ship It With AI"). Lead with custom websites, small business ERP, and workflow tools. Use Crossroads as the in-house example and describe bookkeeping as work in progress until it is verified in use. Present workshops and talks as additional offers.
The front door is the free consultation and prototype (`public/free-prototype/`): two to four hours with the person who does the slow job, then a prototype built around how they already work. It is Jake's solo version of The Tech Therapists' Shadow Day (repo `the_tech_therapists`). Voice: plain, warm, blue collar. "Betty" keeps the office running and is never the problem; the fix bends to her, she doesn't bend to it. Ongoing care (`public/services/ongoing-care/`) is the managed services plan: monthly, optional, quoted with the project.
Plain HTML, no build step. Netlify publishes the `public/` folder on every push to `main`.

## Hosting
- Netlify project `shipitwithai` (team legal-leaf-market). Production publishes `main`; Deploy Previews are free and sit behind Netlify team login.
- Address: https://shipitwithai.heartofcolumbus.shop (a subdomain in the heartofcolumbus.shop Netlify DNS zone). shipitwithai.netlify.app also works.
- Booking requests: Netlify > Forms > `booking`, and an email to Jake's Gmail for each one (Forms > Submission notifications).
- Heart of Columbus links here with `/?session=consulting#book`. Keep `?session=workshop|talk|consulting` working.
- Every production deploy costs 15 Netlify credits (the team ran out on 2026-11-26). Batch changes into one merge, and put `[skip netlify]` in the commit message of a change that touches only this file or the README.

## Files
- `public/index.html`: Jake's intro, services, portfolio, and project inquiry (the booking form lives only here).
- `public/services/`: one page per service. `public/work/`: all projects and the Heart of Columbus case study. `public/how-i-work/`: process, ways to work together, FAQ.
- `public/tutorials/`, `public/demos/`, and `public/workshops/`: separate learning pages.
- `public/assets/`: shared styles, navigation, local demo behavior, and `time-back.js` (the calculator on /free-prototype/, nothing leaves the page).
- `public/thanks.html` and `public/404.html`: noindex pages in the site's own chrome.
- `public/robots.txt`, `public/sitemap.xml`: list every indexable page in the sitemap.
- `public/images/og.png`: the 1200x630 share image used by every page.
- `scripts/check-site.mjs`: run `node scripts/check-site.mjs` before every merge.
- `docs/seo-audit.md`: the audit, page plan and open decisions for Jake.
- `public/favicon.svg`: coral dot on ink.
- `public/images/workbench.webp`: compressed hero photograph.
- `netlify.toml`: tells Netlify to publish `public/`.

## Rules
1. Keep it simple. Use static HTML pages and shared assets. Keep detailed teaching material off the homepage. No frameworks or build step.
2. No long dashes (the em dash) anywhere in the copy. They read as machine-written. Use a period, a comma or a middle dot instead.
3. The booking form is a Netlify Form named `booking`. `?session=prototype|workshop|talk|consulting` preselects "What do you need?". Never rename the form or its field names (`name`, `email`, `organization`, `format`, `where`, `group-size`, `when`, `message`). Renaming hides past requests in the Netlify dashboard.
4. Never publish Jake's personal email or phone on the page. Requests come in through the form only.
5. Look: iron black, warm paper, and forge orange. Keep Barlow Condensed for headings, Inter for body text, and IBM Plex Mono for small labels. Use texture and hard shadows without compromising legibility.
6. Work on a branch and open a pull request so Netlify makes a preview. Check desktop and phone before merging.
7. After any change to the form, send one real test request on the live site and confirm it shows up in Netlify > Forms.
8. Netlify only finds the form when "form detection" is on, and only on the next deploy after it's switched on. It was switched on 2026-11-26. If booking requests ever stop showing up, check Netlify > Forms first, then redeploy.
9. Every page has its own `<title>`, meta description, `<link rel="canonical">` to https://shipitwithai.heartofcolumbus.shop plus its path, Open Graph tags with `og:image`, exactly one `<h1>`, and a JSON-LD block that states only what the page shows. Add each new page to `sitemap.xml`. `node scripts/check-site.mjs` fails otherwise. Reason: the site had none of this before 2026-11-27 and search engines saw duplicates of every page.
10. No invented testimonials, client counts, prices or promises. Prices and new commitments are Jake's to set; until then builds say "fixed quote" and care says "monthly, quoted with the project". Promises Jake confirmed on 2026-11-27: ownership agreed in writing, source files to the client, logins and hosting in the client's name, "if you don't need me, I'll say so", the free consultation and prototype. The one hard claim is Jake's: as a corporate process improvement analyst he cut 3 to 4 hour manual processes to 20 or 30 minutes. Reason: the same rule as Heart of Columbus, and the site sells trust.
11. The header and footer are repeated in every page. When the menu changes, change it in every file (grep for `desktop-nav`, `drawer-nav` and `footer-grid`).
12. Every footer ends with a `footer-family` row: Heart of Columbus, Crossroads, Kawaii Katz and Legal Leaf (labeled 21+), each link tagged `utm_source=shipitwithai`, and the tie said plainly ("my own businesses and my family's"). Reason: the cross promotion audit of 2026-11-27 (Jake asked for much more cross promotion across the five sites); the same block lives on the other four. Change it in every file, like the rest of the footer.
