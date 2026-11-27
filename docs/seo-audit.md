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
2. **Fix one thing**: a small fixed quote. The easy first yes.
3. **Build a project**: website, store, campaign or ERP, in steps with previews.
4. **Keep it running**: ongoing care after launch. Recurring revenue.
5. **One-on-one consulting**: for owners who want advice, not a build.
6. **Workshops and talks**: groups, chambers, schools. Each one is a room of leads.

Heart of Columbus feeds the top of this ladder (its Founders Club links to
consulting) and is the strongest proof on the site.

## Decisions for Jake

- **Prices.** The site says every project is quoted first. Publishing "starting at" prices
  per service usually lifts inquiries and qualifies them; add them when you are ready.
- **"Keep it running" care plan.** New offer on /how-i-work/. It says "ask about it" and
  has no price. Remove it if you don't want to offer ongoing care.
- **Promises in /how-i-work/.** "Who owns it is agreed in writing", "you get the source files",
  "logins in your name", "if you don't need me I will say so", "you approve every post".
  Confirm each is how you want to work, or edit it.
- **Testimonials.** None on the site, on purpose. Add real ones, in the client's words and
  with permission, when you have them. They are the biggest missing trust signal.
- **Google Business Profile.** A service area business profile for Ship It With AI
  (no street address shown) is the single biggest local search win left, and it can't be done
  from the code.
- **Search Console.** Verify the domain and submit `/sitemap.xml` after the merge.

## Next pages worth writing

- One case study each for Crossroads booking software and the Legal Leaf catalog, once there
  are screenshots and facts to show.
- A tutorial per common question from real inquiries. Inquiries are the best keyword research.
