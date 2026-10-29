# Legs Relief — Shopify theme

A Shopify Online Store 2.0 theme for **Legs Relief** (legrelief.co.uk), a UK store selling a
deep-pressure foot wrap for restless legs at night, plus a companion eBook. Prices are in
pounds, copy is in British English, and delivery, returns and VAT follow UK rules. Only the
photos are dummies.

**Setting up the store?** Start with [`STORE_SETUP.md`](STORE_SETUP.md): every Shopify setting
in order, with the refund and delivery policies ready to paste. Product details are in
[`PRODUCT_LISTING.md`](PRODUCT_LISTING.md), photo prompts in [`IMAGE_PROMPTS.md`](IMAGE_PROMPTS.md) and the
logo files in [`brand/`](brand/README.md).

## Design

A realistic DTC store look: warm **beige** backgrounds for light sections, **blue-black**
for the dark ones (hero, comparison, guarantee, footer) and a single solid **orange** for
buttons, prices and highlights. Flat surfaces with fine borders, no decorative gradients,
and product-photo style dummy images. Headings use Archivo, body text uses Figtree
(Google Fonts); switch to Shopify fonts in *Theme settings › Typography* if you prefer.

Every section has a Background option (Default beige / Alternate beige / Contrast dark),
and the hero has a Dark / Light colour scheme. Change the three main colours in
*Theme settings › Colors* (Background, Dark sections, Accent).

**Motion is kept light:** a short fade-in for the hero and for sections as they scroll
into view, smooth FAQ and tab opening, the basket and menu sliding in, the bundle picker
animating between options, and the scrolling announcement bar. All of it switches off for
visitors with "reduce motion" turned on.

## Products (2)

| Product | Handle | Price | Template |
|---|---|---|---|
| Legs Relief Support Pair (Size: S/M, L/XL) | `legs-relief-support-pair` | £34.99 · 2 for £55.98 · 3 for £73.48 | `product` |
| The Calm Night Protocol (eBook) | `the-calm-night-protocol-ebook` | £14.99, free with any pair | `product.ebook` |

Until you upload real photos, the theme shows the dummy SVG images in `assets/`.

## UK features

- **Delivery estimate in working days:** "Order within 3h 12m for dispatch today · arrives
  Wed 28 Oct – Thu 29 Oct", in UK time, skipping weekends and bank holidays (England and
  Wales dates to the end of 2028 are pre-filled and editable).
- **Bundle picker:** 1, 2 or 3 pairs at 0/20/30% off, a size for each pair, and the free eBook
  added to the basket automatically.
- **VAT-aware basket:** says "Prices include VAT" when your prices include tax.
- **Honest reviews:** star ratings only appear from a real reviews app; the review sections are
  off until you have genuine reviews (fake reviews are illegal in the UK).
- **No invented "was" prices:** savings shown are real bundle savings.
- **Footer business details** line for your company name, number and address.
- British English and "basket" wording throughout, `en-GB` language tags, and Google
  structured data for free UK delivery and the 90-day return window.

## Interactive product page

Below the buy box, each section gives the visitor something to do, not just to read:

- **Fit finder:** three taps (shoe size, who it's for, when legs act up) and it picks the size
  and bundle in the buy box for them.
- **A night with Legs Relief:** a sticky night-sky panel; the clock, sky and moon change from
  10:30pm to morning as you scroll.
- **Every part has a job:** numbered hotspots on a drawn foot, synced with a list; it cycles
  on its own until someone taps.
- **How it stacks up:** tabs for compression socks, heat pad, stretching and medication,
  compared on the same four questions.
- **Still on the fence?:** flip cards, a doubt on the front and the answer on the back.
- **What a calmer night costs:** a slider spreading the price over 30–365 nights (39p a night
  over 90).

All of them are normal sections with editable text, and stay readable when "reduce motion"
is turned on. The customer video and review sections are in the template but
switched off until you have real ones.

## Install on Shopify

1. **Upload the theme.** Download **`legs-relief-theme.zip`** from this repository (open the file
   on GitHub and click **Download raw file**). In Shopify go to *Online Store › Themes ›
   Add theme › Upload zip file*, pick it, then **Publish**.
   > Don't use GitHub's green **Code › Download ZIP** button. That zip puts everything inside
   > an extra folder and includes non-theme files, so Shopify rejects it.
2. **Follow [`STORE_SETUP.md`](STORE_SETUP.md)** for currency, domain, VAT, delivery, payments,
   policies, products, discounts, pages, menus and reviews.

## What's in the theme

Every page type Shopify uses has a template:

| Page | Template | Highlights |
|---|---|---|
| Home | `index.json` | Hero, trust bar, problem, how it works, features, comparison, reviews (off until real), buy box, guarantee, eBook offer, FAQ, newsletter |
| Product | `product.json`, `product.ebook.json` | Gallery, sizes + size guide, bundle picker (1/2/3 pairs, size per pair, free gift), quantity, delivery estimate, app blocks, sticky add to cart, recommendations |
| Collection | `collection.json`, `list-collections.json` | Filters (Search & Discovery), sorting, active-filter pills, pagination |
| Basket | `cart.json` + slide-out basket | Discount lines, savings line, VAT note, notes, express checkout buttons |
| Search | `search.json` | Header search popup; product, article and page results |
| Blog | `blog.json`, `article.json` | Tag filter, pagination, comments with moderation |
| Pages | `page.json`, `page.contact.json`, `page.faq.json`, `page.how-it-works.json` | Contact form, FAQ, how it works |
| Other | `404.json`, `password.json`, `gift_card.liquid`, `customers/*` (7 account pages) | Gift card with QR code and Apple Wallet |

Also included: header and footer groups, announcement ticker, country/currency and language
selectors (shown when you sell in several markets or languages), automatic policy links,
an **Apps** section and app blocks for any Shopify app, unit prices, SEO tags and product/FAQ
structured data.

## Development

```bash
npm install
npm run check     # Shopify Theme Check + upload-rule validation
npm run preview   # renders the real Liquid with dummy data into ./preview
npm run package   # rebuild legs-relief-theme.zip after changes
npm run csv       # regenerate import/products.csv from tools/sample-data.mjs
```

Open `preview/index.html` in a browser to see the store without Shopify. The preview
uses a localStorage cart, and its forms don't submit.

## Structure

```
legs-relief-theme.zip   ready-to-upload theme (only the 7 theme folders)
assets/      theme.css, theme.js, dummy SVG images
config/      theme settings (colours, fonts, cart, reviews, social)
layout/      theme.liquid, password.liquid
locales/     en.default.json (all storefront strings)
sections/    every page section + header/footer groups
snippets/    product buy box, gallery, cards, icons, cart drawer…
templates/   JSON templates for each page type, customers/*
tools/       preview builder, theme check, upload validator, packager, CSV builder
import/      products.csv for Shopify import
preview/     generated static preview (npm run preview)
```

> Legs Relief is a comfort product, not a medical device. Keep the footer disclaimer,
> and only use health claims you can back up.
