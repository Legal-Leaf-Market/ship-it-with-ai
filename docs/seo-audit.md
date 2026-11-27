# SEO audit and site plan (2026-11-27)

Audit of the site as it stood at commit 236fa63, and what this branch changes.
The live site could not be fetched from the build sandbox, so the audit reads the
files Netlify publishes.

## What was wrong

| Issue | Why it matters | Fix in this branch |
| --- | --- | --- |
| No canonical links | `?session=` links from Heart of Columbus and `shipitwithai.netlify.app` both serve the same pages, so search engines see duplicates | Every page has `<link rel="canonical">` to the custom domain; netlify.toml 301s the netlify.app host |
| No robots.txt or sitemap.xml | Crawlers had to guess which pages exist | Both added; `scripts/check-site.mjs` fails if the sitemap and the pages disagree |
| No structured data | Nothing told search engines this is a local business in Columbus, Indiana | JSON-LD: ProfessionalService + Person + WebSite on home, Service + FAQPage on service pages, TechArticle on tutorials, BreadcrumbList everywhere |
| No og:image, og:url or Twitter card; inner pages had no Open Graph at all | Shared links showed no picture | One share image (`/images/og.png`, 1200x630) and full Open Graph on every page |
| One page carried every service | A single page cannot rank for "website designer Columbus Indiana", "small business ERP" and "bookkeeping automation" at once | One page per service under `/services/` |
| H1 "Hi, I'm Jake." with no keyword | The strongest on-page signal said nothing about the offer | Kept Jake's greeting; added a line inside the H1: "I build websites and small business software in Columbus, Indiana." |
| Portfolio only on the home page | No page to link to or rank for a case study | `/work/` and a full Heart of Columbus case study |
| No pricing or process page | The top question before an inquiry ("what does it cost, how does it work") had no answer | `/how-i-work/` with steps, ways to work together and FAQ |
| No 404 page; thank-you page used the old fonts and colors | Broken links landed on Netlify's default page | Branded 404 and thanks pages, both noindex |
| Three tutorials, ~500 words each | Thin for the search terms they target | Two new tutorials aimed at real small business searches (local search, card payout reconciliation) |

## Page plan

```
/                          Home (Jake's intro, services, work, booking form)
/services/                 Hub: five services + workshops
  websites/                "small business website Columbus Indiana"
  small-business-erp/      "small business ERP", "booking and deposit software"
  marketing/               "small business marketing Columbus"
  custom-tools/            "business automation", "payout reconciliation"
  consulting/              "AI consultant small business", HoC referral target
/work/                     All projects
  heart-of-columbus/       Case study
/how-i-work/               Process, ways to work together, FAQ
/tutorials/                Five tutorials (two new)
/demos/                    Booking demo, campaign planner, website builder
/workshops/                Workshop and talk
```

Every service page has the same shape: who it is for, what you get, proof
(a real project), questions, and one call to action into the booking form.

## Business model: the offer ladder

1. **Tutorials and demos** (free): bring in search traffic and show the work.
2. **Free consultation and prototype** (`/free-prototype/`): Jake spends two to four hours
   with the person who does the slow job ("Betty"), then builds a working prototype around
   how she already works. The solo version of the Shadow Day from The Tech Therapists. This
   is the front door: every header button and closing call to action points here.
3. **Fix one thing**: a small fixed quote.
4. **Build a project**: website, store, campaign or ERP, fixed price, in steps with previews.
5. **Ongoing care** (`/services/ongoing-care/`): the managed services plan. Monthly,
   quoted with the project, never required. Recurring revenue.
6. **One-on-one consulting** and **workshops and talks**.

Heart of Columbus feeds the top of this ladder (its Founders Club links to
consulting) and is the strongest proof on the site.

## Decided by Jake (2026-11-27)

- Ongoing care is a real offer (managed services).
- The promises stand: who owns the work is agreed in writing, the client gets the source
  files, logins and hosting stay in the client's name, and "if you don't need me, I'll say so".
- The first consultation and prototype are free: two to four hours with the person who does
  the work, then a prototype built around their process. Don't make Betty bend or break.

## Still open

- **Dollar figures.** "Starting at" prices for a build and for ongoing care. Until Jake sets
  them, pages say "fixed quote" and "monthly, quoted with the project".
- **Testimonials.** None on the site, on purpose. Add real ones, in the client's words and
  with permission, when you have them.
- **Google Business Profile** and **Search Console**: set up outside the code. The profile
  brief is kept out of this public repo because it holds a street address.

## Next pages worth writing

- One case study each for Crossroads booking software and the Legal Leaf catalog, once there
  are screenshots and facts to show.
- A tutorial per common question from real inquiries. Inquiries are the best keyword research.
