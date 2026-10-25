# Product listing — Legs Relief (UK)

Everything to fill in for the two products in Shopify admin (*Products › Add product*), plus the
discounts that make the bundle prices work at checkout. Prices are in pounds (GBP).

**Faster option:** *Products › Import* → `import/products.csv` creates both products with this
copy, prices, sizes, SKUs, weights and SEO already filled in. You then only add the photos, the
category, the eBook template and the discounts.

> **Keep the URL handles exactly as written:** `legs-relief-support-pair` and
> `the-calm-night-protocol-ebook`. The theme finds the products by handle.

**Check before you publish.** The materials, the pad, the sizes, what's in the box and the
weights are written for the product in the photos. Change any line that doesn't match what you
actually sell.

---

## 1. Legs Relief Support Pair

### Title

```
Legs Relief Support Pair
```

### Description

In the description box, click **Show HTML** (`</>`), delete what's there and paste this:

```html
<p class="lr-lead"><strong>Firm pressure, right under the arch. Held until morning.</strong></p>
<p>Legs Relief is a deep-pressure foot wrap for restless, fidgety legs at night. A firm, contoured pad sits under each arch, and a soft woven-elastic band crosses in an X over the top of your foot to hold it snug. That steady pressure gives your legs something calm to focus on, so you can stop fidgeting and finally drift off.</p>

<h3>Why it helps</h3>
<ul class="lr-points">
  <li><strong>Targeted arch pressure.</strong> The firm pad presses right where it counts: the middle of the sole.</li>
  <li><strong>Criss-cross hold.</strong> The X-shaped wrap keeps the pressure in place all night, even when you turn over.</li>
  <li><strong>Made for sleep.</strong> Low-profile and breathable, with toes and heel left open so your feet stay cool.</li>
  <li><strong>Drug-free.</strong> No pills, no prescription, no side effects.</li>
</ul>

<h3>What's in the box</h3>
<ul class="lr-box">
  <li>2 Legs Relief wraps (left and right)</li>
  <li>2 firm, removable arch pads</li>
  <li>Fit and care card</li>
  <li>Free eBook: The Calm Night Protocol</li>
</ul>

<h3>Details</h3>
<table class="lr-specs">
  <tbody>
    <tr><th>Wrap</th><td>Soft, breathable woven stretch elastic, matte black</td></tr>
    <tr><th>Pad</th><td>Firm, contoured EVA foam, removable</td></tr>
    <tr><th>Fastening</th><td>Adjustable strap that tightens to a snug fit</td></tr>
    <tr><th>Sizes</th><td>S/M: UK 3–7 (EU 35–40)<br>L/XL: UK 7½–12 (EU 41–47)</td></tr>
    <tr><th>Care</th><td>Remove the pad, hand or machine wash at 30°C, air dry</td></tr>
    <tr><th>Delivery</th><td>Free tracked UK delivery, usually 2–3 working days</td></tr>
    <tr><th>Guarantee</th><td>90 nights. If your legs aren't calmer, get your money back.</td></tr>
  </tbody>
</table>

<p class="lr-note">Legs Relief is a comfort product, not a medical device. It is not intended to diagnose, treat, cure or prevent any disease. If you have a medical condition or are pregnant, speak to your GP before use.</p>
```

### Media (photos)

Upload in this order, 2000 × 2000 px, JPG or WebP. Click each photo › **Add alt text**.
Prompts for each photo are in `IMAGE_PROMPTS.md` › section 4.

| # | Photo | Alt text |
|---|---|---|
| 1 | Main shot: both feet wearing the wraps | `Legs Relief Support Pair: black criss-cross foot wraps worn on both feet` |
| 2 | Close-up on one foot | `Close-up of the Legs Relief wrap crossing in an X over the top of the foot` |
| 3 | Fabric detail | `Woven stretch-elastic band of the Legs Relief wrap` |
| 4 | Worn in bed | `Legs Relief foot wrap worn in bed for restless legs at night` |
| 5 | Packaging | `Legs Relief Support Pair box` |

Photo 1 is also the small picture in the bundle picker, the basket and the sticky "Add to basket" bar.

### Category

**Health & Beauty › Health Care › Supports & Braces**, or the closest match Shopify suggests
when you type "brace" or "foot support".

### Pricing

| Field | Value |
|---|---|
| Price | `34.99` |
| Compare-at price | **Leave empty** (see the note below) |
| Charge tax on this product | ✓ ticked |
| Cost per item | What you pay your supplier per pair, including delivery to you. Shoppers never see it. |

> **Why no "was" price:** UK pricing rules only allow a crossed-out "was £49.99" if you've
> genuinely sold at that price before. The bundle savings (2 pairs £55.98 instead of £69.98) are
> real, so those are shown instead. Add a compare-at price later only if it's a price you really
> charged.

### Variants

Click **Add options like size or colour**:

- **Option name:** `Size`
- **Option values:** `S/M`, then `L/XL`

| Variant | Price | SKU | Weight | Quantity |
|---|---|---|---|---|
| S/M | 34.99 | `LR-PAIR-SM` | 150 g | your stock |
| L/XL | 34.99 | `LR-PAIR-LXL` | 170 g | your stock |

Barcode (GTIN/EAN) is optional. Leave it empty unless you've bought barcodes.

### Inventory and shipping

| Field | Value |
|---|---|
| Track quantity | ✓ ticked |
| Continue selling when out of stock | Unticked |
| This is a physical product | ✓ ticked |
| Weight | 150 g (S/M) / 170 g (L/XL). Weigh one packed parcel and use that. |
| Country/Region of origin | Where it's made (for example China). |
| HS code | Only needed for shipping abroad. Leave empty while you sell in the UK only. |

### Search engine listing

| Field | Value |
|---|---|
| Page title | `Legs Relief Support Pair \| Foot Wrap for Restless Legs \| UK` |
| Meta description | `Firm pressure right under the arch, held all night. A drug-free foot wrap for restless legs. Free tracked UK delivery and a 90-night guarantee.` |
| URL handle | `legs-relief-support-pair` |

### Right-hand column

| Field | Value |
|---|---|
| Status | Active |
| Sales channels | Online Store (plus Shop, Google & YouTube if you install them) |
| Product type | `Foot Wrap` |
| Vendor | `Legs Relief` |
| Tags | `restless legs, sleep, foot wrap, deep pressure, bestseller` |
| Theme template | `Default product` |

---

## 2. The Calm Night Protocol (eBook)

### Title

```
The Calm Night Protocol (eBook)
```

### Description

```html
<p class="lr-lead"><strong>Your 20-minute guide to calmer evenings.</strong></p>
<p>The Calm Night Protocol is a short, practical guide to the evening habits that help restless legs settle. Read it once, then follow the simple routine each night alongside your Legs Relief wraps.</p>

<h3>Inside the guide</h3>
<ul class="lr-points">
  <li><strong>The 10-minute wind-down routine</strong> to start before bed</li>
  <li><strong>5 gentle stretches</strong> for calves, hamstrings and feet</li>
  <li><strong>What to avoid in the evening</strong> and why it matters</li>
  <li><strong>How to get the best fit</strong> from your Legs Relief wraps</li>
</ul>

<h3>Details</h3>
<table class="lr-specs">
  <tbody>
    <tr><th>Format</th><td>PDF for phone, tablet or computer</td></tr>
    <tr><th>Reading time</th><td>About 20 minutes</td></tr>
    <tr><th>Delivery</th><td>Download link by email right after checkout</td></tr>
    <tr><th>Price</th><td>Free with any Legs Relief pair</td></tr>
  </tbody>
</table>

<p class="lr-note">This guide shares general wellness tips. It is not medical advice.</p>
```

### Other fields

| Field | Value |
|---|---|
| Media | Cover image, 1200 × 1600 px (`IMAGE_PROMPTS.md` › section 5). Alt text: `The Calm Night Protocol eBook cover` |
| Category | **Media › Books › E-books** (or the closest match) |
| Price | `14.99` |
| Compare-at price | Leave empty |
| Charge tax | ✓ ticked |
| SKU | `LR-EBOOK` |
| Track quantity | Unticked |
| This is a physical product | **Unticked** (no delivery needed) |
| Page title | `The Calm Night Protocol eBook \| Legs Relief` |
| Meta description | `A 20-minute guide to calmer evenings: a simple wind-down routine, gentle stretches and sleep habits for restless legs. Free with any Legs Relief pair.` |
| URL handle | `the-calm-night-protocol-ebook` |
| Product type / Vendor | `eBook` / `Legs Relief` |
| Tags | `ebook, digital, sleep guide` |
| Theme template | **`ebook`** (important) |

**Delivering the PDF:** install Shopify's free **Digital Downloads** app, open the eBook, then
*More actions › Digital Downloads* › attach your PDF. Customers get the link by email.

---

## 3. Sizes

The size guide pop-up on the product page already uses these sizes:

| Size | UK shoe size | EU |
|---|---|---|
| S/M | 3 – 7 | 35 – 40 |
| L/XL | 7½ – 12 | 41 – 47 |

If your supplier's sizing is different, change it in the description above and in
*Customize › Default product › Variant picker › Size guide*.

---

## 4. Bundle discounts

The bundle picker shows these prices:

| Bundle | Price | Per pair | Normal price | You save | Free gift |
|---|---|---|---|---|---|
| 1 Pair | £34.99 | £34.99 | — | — | eBook (£14.99) |
| 2 Pairs (*Recommended*, selected first) | £55.98 | £27.99 | £69.98 | £14.00 | eBook (£14.99) |
| 3 Pairs (*Best value*) | £73.48 | £24.49 | £104.97 | £31.49 | eBook (£14.99) |

The theme puts the pairs and the eBook in the basket. **Checkout only charges these prices once
the 3 automatic discounts below exist.** Go to *Discounts › Create discount*. Shoppers see the
titles in the basket and at checkout.

### Discount A — 2-pair bundle

- **Amount off products** › Method: **Automatic discount**
- Title: `Bundle & save: 20% off 2 pairs`
- Value: **Percentage** `20`
- Applies to: **Specific products** › Legs Relief Support Pair
- Minimum purchase requirement: **Minimum quantity of items** `2`
- Combinations: tick **Product discounts**
- Start date: today, no end date

### Discount B — 3-pair bundle

Same as A, but title `Bundle & save: 30% off 3 pairs`, percentage `30`, minimum quantity `3`.
With 3 or more pairs Shopify gives the better one (30%), never both.

### Discount C — free eBook

- **Buy X get Y** › Method: **Automatic discount**
- Title: `Free eBook with your pair`
- Customer buys: minimum quantity `1` of Legs Relief Support Pair
- Customer gets: `1` × The Calm Night Protocol (eBook), **Free**
- Maximum uses per order: ✓ `1`
- Combinations: tick **Product discounts**

**Test it:** choose 2 Pairs and add to basket. The basket should show **£55.98** with the eBook
at **£0.00**.

If you change a percentage in the theme (*Customize › Default product › Quantity breaks*), change
the matching discount too, or the basket will charge a different price from the one shown.
