# The Outdoor Living Co.

A complete static garden site with 43 pages, an 18-product planned catalogue, project enquiries, seasonal planner, five original garden guides and the Potting Bench.

Public site: https://taccountant2026.github.io/Turf-Right/

The repository keeps the historic `Turf-Right` name; the public brand is The Outdoor Living Co..

## Build and checks

No third-party dependencies are required. Use Node 22+ and Python 3:

```
node scripts/build.mjs
node --test tests/*.test.mjs
python3 scripts/check-links.py
```

The generator writes tracked HTML, sitemap, robots and favicon files into the repository root. Commit both source and regenerated outputs. The existing GitHub Pages workflow publishes the root, so all links include the correct project path. `catalogue.mjs` is the single catalogue and journal source; `garden-core.mjs` contains basket and planning rules; `app.mjs` supplies browser interactions. Images and original SVG illustrations are local, with no external font or tracking scripts.

## What works now

- All 18 planned products have details, original illustrations and related products.
- Catalogue search, job/category filters, sorting, collections and deep links.
- Persistent saved basket, legacy `gardenCart` migration, quantity controls and integer-pence totals.
- Seasonal planner with 192 combinations, checkboxes, optional local saving, copy, download and print.
- Project brief builder with copy/download and explicit private submission.
- Private contact form with product context, Garden Company route labels, validation, honeypot, origin checks and safe retry IDs.
- Five original guides with primary RHS references, community challenges and prompts.
- About, questions, contact, shop/delivery status, privacy, terms, orders/returns and a recovery page.
- Links to the owner's Bytova and RetroReplay UK businesses.

## Private enquiry connection

Explicitly submitted enquiries go to `https://retroreplay.uk/api/leads`, the existing owner-controlled private service. The RRUK service accepts this exact GitHub Pages origin and validates brand `garden`, approved routes, read-privacy confirmation and bounded fields. Messages cannot become public stories. The private owner pipeline at https://retroreplay.uk/admin#funnels has a Garden Company filter, next actions, dates and manual reply drafts.

Owner alerts use the existing enabled owner-email configuration. Garden enquiries do not automatically send a customer acknowledgement, book a visit, place an order or subscribe anyone to marketing. Do not send real test enquiries without the owner's authorization: they can create records and owner alerts.

## Shop launch gates

`checkoutEnabled` and `stockConfirmed` remain **false**. Every product is coming soon. Saving a basket does not reserve stock; the review page collects no address or payment. Prices are planned. £3.99 delivery / free from £50 are proposed figures only, with no promised delivery area or speed.

The previous launch plan named Gem Imports as a prospective supplier. That does not mean an account is verified, delivered costs confirmed or stock bought/reserved. Before taking orders:

1. Confirm the supplier account, final models/pack details, delivered costs and actual stock.
2. Decide actual sale prices, delivery coverage/carriers and dispatch/return arrangements.
3. Supply verified seller contact/business details and appropriate sale/delivery/returns policies.
4. Connect secure real payments and implement trusted server-side pricing, orders, stock controls, confirmations and fulfilment. A browser flag alone cannot safely open sales.
5. Complete a full authorized test order and delivery/refund checks before enabling checkout.

## Projects and contact

The owner chose shop plus garden projects, with **each job discussed first**. No fixed service commitment or service area is invented. Scope, location, access, timing and a written quote must be agreed before work. Garden phone, public email and coverage details are still to follow; the working private enquiry form is the current contact route.

## Imagery and community

The original home image is generated garden inspiration, not completed customer work. Product SVGs are illustrations, not confirmed supplier photographs. The Potting Bench currently offers prompts, challenges, private questions and guides; there are no public uploads, member accounts, fabricated reviews or newsletter signups.
