# Store setup — Legs Relief (UK)

Everything to set up in Shopify admin, in order. Work through it on a computer. The theme,
products, copy, discounts and policies are all written for you; the only things you add are your
photos and your own business details (marked **[like this]**).

Domain: **legrelief.co.uk** (and **legsrelief.co.uk**) · Support email: **support@legsrelief.co.uk** · Currency: **GBP (£)**

---

## 1. Store details — *Settings › General*

| Field | Set to |
|---|---|
| Store name | `Legs Relief` (the theme uses this as the logo) |
| Store email / Sender email | `support@legsrelief.co.uk` |
| Legal business name | **[your company or your own name if you're a sole trader]** |
| Business address | **[your UK business address]** (shown on invoices and policies) |
| Store currency | **British pound (GBP £)**. Set this before your first sale; it can't be changed afterwards. |
| Unit system / weight | Metric · Kilograms (kg) |
| Time zone | (GMT+00:00) London |

## 2. Domain — *Settings › Domains*

1. **Connect existing domain** › `legrelief.co.uk`, follow the DNS steps for your registrar,
   then set it as the **primary domain**.
2. Your support email is on `legsrelief.co.uk` (with an **s**). Connect that domain here too;
   Shopify redirects it to the primary domain, so customers who type either address find the
   shop. If you'd rather have `legsrelief.co.uk` as the main web address, set it as primary
   instead. Nothing in the theme or the policies needs changing either way.
3. Set up the `support@legsrelief.co.uk` mailbox with your domain provider (or Google Workspace /
   Zoho Mail) so you can reply to customers from it. Use the same address as the store and
   sender email in step 1, so order emails and policy contact details all match.

## 3. Markets — *Settings › Markets*

- **United Kingdom** is the primary market. Turn off International (or leave it inactive) — you
  only deliver in the UK for now.

## 4. VAT — *Settings › Taxes and duties › United Kingdom*

- **VAT-registered:** add your VAT number, and tick **Include sales tax in product price and
  shipping rate**. The prices in the theme (£34.99 etc.) then include VAT, and the basket says
  "Prices include VAT".
- **Not registered** (turnover under the £90,000 threshold): leave VAT collection off. Nothing
  else changes.

## 5. Delivery — *Settings › Shipping and delivery*

1. Under **General shipping rates**, keep one zone: **United Kingdom**. Delete any other zones.
2. Add a rate: name `Free tracked delivery (2–3 working days)`, price `£0.00`.
3. Set your **processing time** to *Same day* (or *1 business day*), to match "Order by 2pm for
   same-day dispatch".

If you can't dispatch the same day, change the countdown in *Customize › Default product ›
Delivery estimate* (set the cut-off to 0 to hide it) and edit the "Order by 2pm" line in the
announcement bar and in `policies/shipping-policy.md`.

## 6. Payments — *Settings › Payments*

- **Shopify Payments**: turn it on (cards, Apple Pay, Google Pay and Shop Pay come with it).
- **PayPal**: connect your PayPal Business account.
- The payment icons in the theme update by themselves to match what you turn on.

## 7. Checkout and privacy

- *Settings › Checkout*: customer contact method **Email**. For marketing, tick **Show a
  sign-up option at checkout** but leave **Preselect the sign-up option** unticked (UK GDPR
  doesn't allow pre-ticked boxes).
- *Settings › Customer privacy › Cookie banner*: **turn it on** for the UK. UK law requires
  consent before tracking cookies.

## 8. Policies — *Settings › Policies*

All five policies are written for you in the [`policies/`](policies/) folder, with the store
name and **support@legsrelief.co.uk** already in them:

| Policy | File |
|---|---|
| Refund policy (90-night guarantee, 14-day cancellation, faulty items) | [`policies/refund-policy.md`](policies/refund-policy.md) |
| Shipping policy | [`policies/shipping-policy.md`](policies/shipping-policy.md) |
| Privacy policy (UK GDPR and cookies) | [`policies/privacy-policy.md`](policies/privacy-policy.md) |
| Terms of service | [`policies/terms-of-service.md`](policies/terms-of-service.md) |
| Contact information | [`policies/contact-information.md`](policies/contact-information.md) |

Replace **[Legal business name]**, **[Business address]**, and **[Company number]** /
**[VAT number]** if they apply (delete those lines if not), then paste each one into its
policy and save. [`policies/README.md`](policies/README.md) has the details. Once saved, they
appear as links at the bottom of the footer automatically.

## 9. Theme — *Online Store › Themes*

1. Download **`legs-relief-theme.zip`** from the repository (open the file on GitHub › **Download
   raw file**). Don't use GitHub's green **Code › Download ZIP** button.
2. **Add theme › Upload zip file**, then **Publish**.
3. **Customize › Footer › Business details**: replace `Legs Relief · United Kingdom` with
   **[company name, company number and registered office]** if you're a limited company (UK
   law requires it on your website). Sole traders: your name and a business address.
4. *Customize › Theme settings › Social media*: add your social links (optional).

## 10. Products and discounts

Follow [`PRODUCT_LISTING.md`](PRODUCT_LISTING.md): import `import/products.csv`, add the photos,
set the eBook's theme template to **ebook**, install **Digital Downloads** for the PDF, and
create the **3 automatic discounts**. Without the discounts, checkout charges full price for
bundles.

## 11. Pages — *Online Store › Pages*

Create these three. Leave the content box empty; the theme fills it in.

| Title | Theme template |
|---|---|
| Contact | `page.contact` |
| FAQ | `page.faq` |
| How it works | `page.how-it-works` |

## 12. Menus — *Online Store › Navigation*

| Menu (handle) | Links |
|---|---|
| Main menu (`main-menu`) | Shop → *All products* · How it works → *Pages › How it works* · Guarantee → `/#guarantee` · FAQ → *Pages › FAQ* · Contact → *Pages › Contact* |
| Footer (`footer`) | Legs Relief Support Pair · The Calm Night Protocol · All products |
| Help (`help`, create it) | FAQ · Delivery → *Policies › Shipping policy* · Returns → *Policies › Refund policy* · Contact us |

## 13. Reviews

The review sections are switched off and star ratings are hidden until you have real reviews.
Since April 2025 it's illegal in the UK to publish fake reviews or ratings, or to hide genuine
bad ones (Digital Markets, Competition and Consumers Act 2024).

1. Install **Judge.me Product Reviews** (free plan). It emails customers after delivery asking
   for a review, and marks them as verified buyers.
2. In Judge.me's settings, turn on syncing ratings to Shopify product metafields. The theme then
   shows the stars and review count under the product title by itself.
3. Add the Judge.me review widget to the product page: *Customize › Default product › Add
   section › Apps*.
4. Once you have genuine reviews, you can also switch on the theme's **Reviews** section (eye
   icon in *Customize*) and paste real quotes into it, with the customer's permission.

## 14. Before launch

- [ ] Place a test order (*Settings › Payments* › test mode, or Shopify's Bogus Gateway): choose
      2 Pairs and check the basket shows **£55.98** with the eBook at **£0.00**.
- [ ] Check the order confirmation and eBook download emails arrive.
- [ ] Remove the store password (*Online Store › Preferences*).
- [ ] Pay the ICO data protection fee if it applies to you (most online shops that collect
      customer details must) — check at ico.org.uk/fee.
- [ ] Put your business name and a UK address on the packaging (UK product safety rules).
- [ ] Keep marketing claims to what's on the site: Legs Relief is a comfort product, so don't
      say it "treats" or "cures" restless legs syndrome (ASA advertising rules).
