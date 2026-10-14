# HushLegs — Shopify theme

A Shopify Online Store 2.0 theme for **HushLegs** (hushlegs.com): a one-product store
for a deep-pressure foot wrap for restless legs at night, plus a companion eBook.
The layout and selling flow follow the nightlegs.com store, with new branding and
dummy images and copy you can replace.

## What's included

| Area | Details |
|---|---|
| **Homepage** | Rotating announcement bar · sticky header + mobile menu · hero with rating, bullets, CTA and guarantee badge · trust bar · "2am" problem section · how it works (3 steps) · icon features · comparison table (vs. $200+ prescription wrap, medication, stretching) · reviews wall with rating summary and "load more" · full buy box (featured product) · 90-night guarantee · eBook bonus promo · FAQ (with FAQ schema) · newsletter · footer with disclaimer and payment icons |
| **Product page** | Gallery with thumbnails and swipe · rating · price with compare-at and "Save %" · benefits list · size picker + size guide popup · **bundle / quantity breaks** (1, 2, 3 pairs) · eBook add-on checkbox · stock note · delivery-date estimate · assurance icons · mini review · info tabs · **sticky add to cart** · Product JSON-LD |
| **eBook page** | Separate `product.ebook` template with an upsell to the Support Pair |
| **Cart** | Slide-out AJAX cart drawer with quantity controls, savings line, eBook upsell, optional free-shipping progress bar · full cart page fallback |
| **Other pages** | Collection (`/collections/all`), Contact, Write a Review, FAQ, How it works, search, blog/article, 404, password, all customer account pages |

Every section is editable in the theme editor (text, images, colours, blocks, order).

## Products (2)

| Product | Handle | Price | Template |
|---|---|---|---|
| HushLegs Support Pair (Size: S/M, L/XL) | `hushlegs-support-pair` | $44.99 (was $59.99) | `product` |
| The Calm Night Protocol (eBook) | `the-calm-night-protocol-ebook` | $20.00 | `product.ebook` |

Until you upload real photos, the theme shows the dummy SVG images in `assets/`.

## Install on Shopify

1. **Upload the theme:** run `npm install && npm run package`, then go to *Online Store › Themes › Add theme › Upload zip file* and pick `dist/hushlegs-theme.zip`.
   Or use the Shopify CLI: `shopify theme push --unpublished`.
2. **Import the products:** *Products › Import* → `import/products.csv`.
   Then open the eBook product and set *Theme template* to **ebook**, and (for a digital download) untick "This is a physical product".
3. **Create menus** (*Online Store › Navigation*):
   - `main-menu`: Shop → `/collections/all`, How it works → `/#how-it-works`, Reviews → `/#reviews`, FAQ → `/pages/faq`, Contact → `/pages/contact`
   - `footer`: HushLegs Support Pair, The Calm Night Protocol, All products
   - `help`: FAQ, Contact us, Write a review, Refund / Shipping / Privacy / Terms policies
4. **Create pages** (*Online Store › Pages*) and pick their templates:
   `Contact` → `page.contact`, `Write a Review` (handle `review`) → `page.review`, `FAQ` → `page.faq`, `How it works` → `page.how-it-works`.
5. **Bundle discounts:** the 2-pair (15%) and 3-pair (25%) prices in the buy box are display-only.
   Create matching automatic discounts in *Discounts* (e.g. "Buy 2 or more, 15% off").
6. **Free eBook with a pair:** create an automatic "Buy X get Y" discount (buy Support Pair, get the eBook 100% off).
7. **Policies:** add your refund (90-night guarantee), shipping, privacy and terms policies under *Settings › Policies*.

## Development

```bash
npm install
npm run check     # Shopify Theme Check (official linter)
npm run preview   # renders the real Liquid with dummy data into ./preview
npm run package   # dist/hushlegs-theme.zip
npm run csv       # regenerate import/products.csv from tools/sample-data.mjs
```

Open `preview/index.html` in a browser to see the store without Shopify. The preview
uses a localStorage cart, and its forms don't submit.

## Structure

```
assets/      theme.css, theme.js, dummy SVG images
config/      theme settings (colours, fonts, cart, reviews, social)
layout/      theme.liquid, password.liquid
locales/     en.default.json (all storefront strings)
sections/    every page section + header/footer groups
snippets/    product buy box, gallery, cards, icons, cart drawer…
templates/   JSON templates for each page type, customers/*
tools/       preview builder, theme check, packager, CSV builder
import/      products.csv for Shopify import
preview/     generated static preview (npm run preview)
```

> HushLegs is a comfort product, not a medical device. Keep the footer disclaimer,
> and only use health claims you can back up.
