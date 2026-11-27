# Ship It With AI: guide file

Read this at the start of every session. Add every new lesson here, with the reason.

## What this is
One-page project inquiry and booking site for Jake Kennedy ("Ship It With AI"). Lead with custom websites, small business ERP, and workflow tools. Use Crossroads as the in-house example and describe bookkeeping as work in progress until it is verified in use. Present workshops and talks as additional offers.
Plain HTML, no build step. Netlify publishes the `public/` folder on every push to `main`.

## Hosting
- Netlify project `shipitwithai` (team legal-leaf-market). Production publishes `main`; Deploy Previews are free and sit behind Netlify team login.
- Address: https://shipitwithai.heartofcolumbus.shop (a subdomain in the heartofcolumbus.shop Netlify DNS zone). shipitwithai.netlify.app also works.
- Booking requests: Netlify > Forms > `booking`, and an email to Jake's Gmail for each one (Forms > Submission notifications).
- Heart of Columbus links here with `/?session=consulting#book`. Keep `?session=workshop|talk|consulting` working.
- Every production deploy costs 15 Netlify credits (the team ran out on 2026-11-26). Batch changes into one merge, and put `[skip netlify]` in the commit message of a change that touches only this file or the README.

## Files
- `public/index.html`: the whole page, styles included.
- `public/thanks.html`: where the booking form lands after sending.
- `public/favicon.svg`: coral dot on ink.
- `public/images/workbench.webp`: compressed hero photograph.
- `netlify.toml`: tells Netlify to publish `public/`.

## Rules
1. Keep it simple. One page. No frameworks, no build step, no new pages unless Jake asks.
2. No long dashes (the em dash) anywhere in the copy. They read as machine-written. Use a period, a comma or a middle dot instead.
3. The booking form is a Netlify Form named `booking`. Never rename the form or its field names (`name`, `email`, `organization`, `format`, `where`, `group-size`, `when`, `message`). Renaming hides past requests in the Netlify dashboard.
4. Never publish Jake's personal email or phone on the page. Requests come in through the form only.
5. Look: iron black, warm paper, and forge orange. Keep Barlow Condensed for headings, Inter for body text, and IBM Plex Mono for small labels. Use texture and hard shadows without compromising legibility.
6. Work on a branch and open a pull request so Netlify makes a preview. Check desktop and phone before merging.
7. After any change to the form, send one real test request on the live site and confirm it shows up in Netlify > Forms.
8. Netlify only finds the form when "form detection" is on, and only on the next deploy after it's switched on. It was switched on 2026-11-26. If booking requests ever stop showing up, check Netlify > Forms first, then redeploy.
