# Legs Night — Shopify theme

A Shopify Online Store 2.0 theme for **Legs Night** (legsnight.com): a one-product store
for a deep-pressure foot wrap for restless legs at night, plus a companion eBook.
It sells the same two products as the store it was modelled on, with its own name,
copy and visual identity. Images and text are dummies you can replace.

## Design

A calm, premium sleep-wellness look: lavender-white background, deep plum text,
a single iris-purple accent, soft shadows instead of outlines, and generous spacing.
Headings use Plus Jakarta Sans with Instrument Serif italics for accent words
(Google Fonts). You can switch to Shopify's own fonts in *Theme settings › Typography*.
Every section has a Background option (Default / Alternate / Contrast).

**Motion** (all of it turns off automatically for visitors with "reduce motion" on):
- Hero: staggered blur-in of the text on load, slowly drifting colour glows, gentle
  zoom and scroll parallax on the image, floating guarantee badge
- Scroll: sections, cards, reviews and FAQ items fade up with a stagger as they appear;
  comparison rows slide in one by one; the review score counts up
- Interaction: light sweep on buttons, lifting cards, underline sweeps in the menu,
  smooth FAQ and tab opening, crossfading product gallery, animated bundle selector,
  cart count bump, slide-in cart and menu drawers, floating sticky add-to-cart bar
- Ambient: scrolling announcement ticker and a rotating guarantee seal

## Products (2)

| Product | Handle | Price | Template |
|---|---|---|---|
| Legs Night Support Pair (Size: S/M, L/XL) | `legs-night-support-pair` | $44.99 (was $59.99) | `product` |
| The Calm Night Protocol (eBook) | `the-calm-night-protocol-ebook` | $20.00 | `product.ebook` |

Until you upload real photos, the theme shows the dummy SVG images in `assets/`.

## Install on Shopify

1. **Upload the theme.** Download **`legs-night-theme.zip`** from this repository (open the file
   on GitHub and click the download button). In Shopify go to *Online Store › Themes ›
   Add theme › Upload zip file* and pick it.
   > Don't use GitHub's green **Code › Download ZIP** button. That zip puts everything inside
   > an extra folder and includes non-theme files, so Shopify rejects it.

   Alternatives: connect this repository with *Add theme › Connect from GitHub*, or run
   `shopify theme push --unpublished` with the Shopify CLI. The zip upload is the simplest.
2. **Import the products:** *Products › Import* → `import/products.csv`.
   Then open the eBook product and set *Theme template* to **ebook**, and (for a digital download) untick "This is a physical product".
3. **Create menus** (*Online Store › Navigation*):
   - `main-menu`: Shop → `/collections/all`, How it works → `/#how-it-works`, Reviews → `/#reviews`, FAQ → `/pages/faq`, Contact → `/pages/contact`
   - `footer`: Legs Night Support Pair, The Calm Night Protocol, All products
   - `help`: FAQ, Contact us, Write a review
   Policy links (refund, shipping, privacy, terms) appear in the footer automatically.
4. **Create pages** (*Online Store › Pages*) and pick their templates:
   `Contact` → `page.contact`, `Write a Review` (handle `review`) → `page.review`, `FAQ` → `page.faq`, `How it works` → `page.how-it-works`.
5. **Bundle discounts:** the 2-pair (15%) and 3-pair (25%) prices in the buy box are display-only.
   Create matching automatic discounts in *Discounts* (e.g. "Buy 2 or more, 15% off").
6. **Free eBook with a pair:** create an automatic "Buy X get Y" discount (buy Support Pair, get the eBook 100% off).
7. **Policies:** add your refund (90-night guarantee), shipping, privacy and terms policies under *Settings › Policies*.
8. **Optional:** install Shopify's free *Search & Discovery* app to turn on collection filters
   and better product recommendations. Install a reviews app and add its block to the product
   page (*Add block › Apps*) when you have real reviews.

## What's in the theme

Every page type Shopify uses has a template:

| Page | Template | Highlights |
|---|---|---|
| Home | `index.json` | Hero, trust bar, problem, how it works, features, comparison, reviews, buy box, guarantee, eBook offer, FAQ, newsletter |
| Product | `product.json`, `product.ebook.json` | Gallery, sizes + size guide, bundles, quantity, eBook add-on, delivery estimate, app blocks, sticky add to cart, recommendations |
| Collection | `collection.json`, `list-collections.json` | Filters (Search & Discovery), sorting, active-filter pills, pagination |
| Cart | `cart.json` + slide-out cart | Upsell, savings line, notes, express checkout buttons |
| Search | `search.json` | Header search popup; product, article and page results |
| Blog | `blog.json`, `article.json` | Tag filter, pagination, comments with moderation |
| Pages | `page.json`, `page.contact.json`, `page.review.json`, `page.faq.json`, `page.how-it-works.json` | Contact form, write-a-review form, FAQ |
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
npm run package   # rebuild legs-night-theme.zip after changes
npm run csv       # regenerate import/products.csv from tools/sample-data.mjs
```

Open `preview/index.html` in a browser to see the store without Shopify. The preview
uses a localStorage cart, and its forms don't submit.

## Structure

```
legs-night-theme.zip   ready-to-upload theme (only the 7 theme folders)
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

> Legs Night is a comfort product, not a medical device. Keep the footer disclaimer,
> and only use health claims you can back up.
