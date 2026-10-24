# Product listing — Legs Night

Everything to fill in when you add the two products in Shopify admin (*Products › Add product*),
plus the discounts that make the bundle prices work at checkout.

**Faster option:** *Products › Import* → `import/products.csv` creates both products with this
copy, prices, variants, SKUs, weights and SEO already filled in. You then only add the images,
the category, the eBook template and the discounts (sections 1–4 below say where).

> **Keep the URL handles exactly as written.** The theme finds the products by handle
> (`legs-night-support-pair` and `the-calm-night-protocol-ebook`). A different handle means the
> homepage buy box and the free-gift eBook won't show.

**Check before you publish.** The materials, the pad, the sizes, what's in the box and the
weights below are written for the product in the photos. Change any line that doesn't match
what your supplier actually ships.

---

## 1. Legs Night Support Pair

### Title

```
Legs Night Support Pair
```

### Description

In the description box, click **Show HTML** (the `</>` button), delete what's there and paste
this. The theme styles it as a lead line, check-mark benefits, a "What's in the box" grid and a
details table.

```html
<p class="ln-lead"><strong>Firm pressure, right under the arch. Held until morning.</strong></p>
<p>Legs Night is a deep-pressure foot wrap for restless, fidgety legs at night. A firm, contoured pad sits under each arch, and a soft woven-elastic band crosses in an X over the top of your foot to hold it snug. That steady pressure gives your legs something calm to focus on, so you can stop shifting and finally fall asleep.</p>

<h3>Why it helps</h3>
<ul class="ln-points">
  <li><strong>Targeted arch pressure.</strong> The firm pad presses right where it counts: the middle of the sole.</li>
  <li><strong>Criss-cross hold.</strong> The X-shaped wrap keeps the pressure in place all night, even when you turn over.</li>
  <li><strong>Made for sleep.</strong> Low-profile and breathable, with toes and heel left open so your feet stay cool.</li>
  <li><strong>Drug-free.</strong> No pills, no prescription, no side effects.</li>
</ul>

<h3>What's in the box</h3>
<ul class="ln-box">
  <li>2 Legs Night wraps (left and right)</li>
  <li>2 firm, removable arch pads</li>
  <li>Fit and care card</li>
  <li>Free eBook: The Calm Night Protocol</li>
</ul>

<h3>Details</h3>
<table class="ln-specs">
  <tbody>
    <tr><th>Wrap</th><td>Soft, breathable woven stretch elastic, matte black</td></tr>
    <tr><th>Pad</th><td>Firm, contoured EVA foam, removable</td></tr>
    <tr><th>Fastening</th><td>Adjustable strap that tightens to a snug fit</td></tr>
    <tr><th>Sizes</th><td>S/M: US women's 5–9, men's 4–8<br>L/XL: US women's 9.5–13, men's 8.5–14</td></tr>
    <tr><th>Care</th><td>Remove the pad, hand or machine wash cold, air dry</td></tr>
    <tr><th>Guarantee</th><td>90 nights. If your legs aren't calmer, get a full refund.</td></tr>
  </tbody>
</table>

<p class="ln-note">Legs Night is a comfort product, not a medical device. It is not intended to diagnose, treat, cure or prevent any disease. If you have a medical condition, talk to your doctor before use.</p>
```

### Media (images)

Upload in this order. To add alt text, click an image › **Add alt text**. Prompts for each
photo are in `IMAGE_PROMPTS.md` › section 4. Size: 2000 × 2000 px, JPG or WebP.

| # | Image | Alt text |
|---|---|---|
| 1 | Main shot: both feet wearing the wraps | `Legs Night Support Pair: black criss-cross foot wraps worn on both feet` |
| 2 | Close-up on one foot | `Close-up of the Legs Night wrap crossing in an X over the top of the foot` |
| 3 | Fabric detail | `Woven stretch-elastic band of the Legs Night wrap` |
| 4 | Worn in bed | `Legs Night foot wrap worn in bed for restless legs at night` |
| 5 | Packaging | `Legs Night Support Pair box` |

Image 1 is also the small picture in the bundle picker, the cart and the sticky add-to-cart bar.

### Category

Choose **Health & Beauty › Health Care › Supports & Braces**. If Shopify doesn't list it, pick
the closest match it suggests (start typing "brace" or "foot support"). Shopify uses the
category for tax rules.

### Pricing

| Field | Value |
|---|---|
| Price | `44.99` |
| Compare-at price | `59.99` |
| Charge tax on this product | ✓ ticked |
| Cost per item | Your supplier cost per pair, including shipping to you. Shopify uses it for profit reports; shoppers never see it. |

### Variants

Click **Add options like size or color**:

- **Option name:** `Size`
- **Option values:** `S/M`, then `L/XL`

Then set each variant:

| Variant | Price | Compare-at | SKU | Weight | Quantity |
|---|---|---|---|---|---|
| S/M | 44.99 | 59.99 | `LN-PAIR-SM` | 150 g | your stock |
| L/XL | 44.99 | 59.99 | `LN-PAIR-LXL` | 170 g | your stock |

Barcode (GTIN/UPC) is optional. Leave it empty unless you've bought barcodes.

### Inventory

| Field | Value |
|---|---|
| Track quantity | ✓ ticked |
| Continue selling when out of stock | Unticked |

### Shipping

| Field | Value |
|---|---|
| This is a physical product | ✓ ticked |
| Weight | 150 g (S/M) / 170 g (L/XL). Weigh one packed box and use that. |
| Country/Region of origin | Where your supplier makes it (for example China) |
| HS code | Ask your supplier. Only needed if you ship internationally. |

### Search engine listing

Click **Edit** on the *Search engine listing* card:

| Field | Value |
|---|---|
| Page title | `Legs Night Support Pair \| Deep-Pressure Foot Wrap for Restless Legs` |
| Meta description | `Firm pressure right under the arch, held all night. A drug-free foot wrap for restless, fidgety legs. Free shipping and a 90-night guarantee.` |
| URL handle | `legs-night-support-pair` |

### Right-hand column

| Field | Value |
|---|---|
| Status | Active |
| Publishing (sales channels) | Online Store, plus Shop if you use it |
| Product type | `Foot Wrap` |
| Vendor | `Legs Night` |
| Collections | Leave empty, or add it to a "Shop" collection if you make one |
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
<p class="ln-lead"><strong>Your 20-minute guide to calmer evenings.</strong></p>
<p>The Calm Night Protocol is a short, practical guide to the evening habits that help restless legs settle. Read it once, then follow the simple routine each night alongside your Legs Night wraps.</p>

<h3>Inside the guide</h3>
<ul class="ln-points">
  <li><strong>The 10-minute wind-down routine</strong> to start before bed</li>
  <li><strong>5 gentle stretches</strong> for calves, hamstrings and feet</li>
  <li><strong>What to avoid in the evening</strong> and why it matters</li>
  <li><strong>How to get the best fit</strong> from your Legs Night wraps</li>
</ul>

<h3>Details</h3>
<table class="ln-specs">
  <tbody>
    <tr><th>Format</th><td>PDF for phone, tablet or computer</td></tr>
    <tr><th>Reading time</th><td>About 20 minutes</td></tr>
    <tr><th>Delivery</th><td>Download link by email right after checkout</td></tr>
    <tr><th>Price</th><td>Free with any Legs Night pair</td></tr>
  </tbody>
</table>

<p class="ln-note">This guide shares general wellness tips. It is not medical advice.</p>
```

### Other fields

| Field | Value |
|---|---|
| Media | Cover image, 1200 × 1600 px (prompt in `IMAGE_PROMPTS.md` › section 5). Alt text: `The Calm Night Protocol eBook cover` |
| Category | **Media › Books › E-books** (or the closest match) |
| Price | `20.00` |
| Compare-at price | Leave empty |
| Charge tax | ✓ ticked (check your local rules for digital goods) |
| SKU | `LN-EBOOK` |
| Track quantity | Unticked |
| This is a physical product | **Unticked**, so it needs no shipping |
| Page title | `The Calm Night Protocol eBook \| Legs Night` |
| Meta description | `A 20-minute guide to calmer evenings: a simple wind-down routine, gentle stretches and sleep habits for restless legs. Free with any Legs Night pair.` |
| URL handle | `the-calm-night-protocol-ebook` |
| Product type | `eBook` |
| Vendor | `Legs Night` |
| Tags | `ebook, digital, sleep guide` |
| Theme template | **`ebook`** (this one is important) |

**Delivering the PDF:** install Shopify's free **Digital Downloads** app, open the eBook
product, and under *More actions › Digital Downloads* attach the PDF. Customers get a download
link by email after checkout.

You need the eBook itself as a PDF. The four "Inside the guide" lines above are what it should
cover; change them if your guide covers something else.

---

## 3. Size guide

Nothing to add. The size guide pop-up is built into the product page (*Customize › Product
information › Variant picker › Size guide*). It uses the same sizes as the description:

| Size | US women | US men | EU |
|---|---|---|---|
| S/M | 5 – 9 | 4 – 8 | 35 – 40 |
| L/XL | 9.5 – 13 | 8.5 – 14 | 40 – 47 |

If your supplier's sizes differ, update the description table and the size guide.

---

## 4. Bundle discounts

The bundle picker on the product page and homepage shows these prices:

| Bundle | Price | Per pair | Struck-through | Free gift |
|---|---|---|---|---|
| 1 Pair | $44.99 | $44.99 | $59.99 | eBook ($20) |
| 2 Pairs (*Most popular*, selected by default) | $71.98 | $35.99 | $119.98 | eBook ($20) |
| 3 Pairs (*Best value*) | $94.48 | $31.49 | $179.97 | eBook ($20) |

The theme puts the right number of pairs and the eBook in the cart. **Shopify only charges these
prices after you create the 3 automatic discounts below.** Go to *Discounts › Create discount*.
The titles are what shoppers see in the cart and at checkout.

### Discount A: 2-pair bundle

- Type: **Amount off products** › Method: **Automatic discount**
- Title: `Bundle & save: 20% off 2 pairs`
- Discount value: **Percentage**, `20`
- Applies to: **Specific products** › Legs Night Support Pair
- Minimum purchase requirements: **Minimum quantity of items** › `2`
- Combinations: tick **Product discounts**
- Active dates: start today, no end date

### Discount B: 3-pair bundle

Same as A, except:

- Title: `Bundle & save: 30% off 3 pairs`
- Percentage: `30`
- Minimum quantity of items: `3`

With 3 or more pairs in the cart, Shopify applies 30% (the better of the two), never both.

### Discount C: free eBook

- Type: **Buy X get Y** › Method: **Automatic discount**
- Title: `Free eBook with your pair`
- Customer buys: **Minimum quantity of items** `1` › Specific products › Legs Night Support Pair
- Customer gets: quantity `1` › The Calm Night Protocol (eBook)
- At a discounted value: **Free**
- Maximum number of uses per order: ✓ ticked, `1`
- Combinations: tick **Product discounts**

### Test it

Add 2 pairs from the product page. The cart should show the 20% discount on the pairs and
the eBook at $0.00, with a subtotal of **$71.98**.

---

## 5. Bundle picker settings

*Online Store › Themes › Customize* › choose **Products › Default product** › **Product
information** › **Quantity breaks (bundles)**. The homepage buy box has the same block under
*Featured product*.

| Setting | Set to |
|---|---|
| Heading / note | "Bundle & save" / "Free shipping on every bundle" |
| Tier selected by default | 2 (the "Most popular" one). Set 1 to start on a single pair. |
| Show product images / price per item / savings badge | On |
| Pick a size for each item | On: buyers of 2+ pairs can choose a size for each pair |
| Gift product | The Calm Night Protocol (eBook) |
| Tier 1–3 | Quantity, title, subtitle, discount %, badge and "Include free gift" |

**If you change a discount % here, change the matching Shopify discount too,** or the cart
will charge a different price from the one shown.
