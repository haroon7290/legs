// Catalogue used by the static preview and the Shopify product import CSV.
// The same copy is in PRODUCT_LISTING.md, ready to paste into Shopify admin.

const pairDescription = [
  '<p class="lr-lead"><strong>Firm pressure, wrapped all the way round. Held until morning.</strong></p>',
  '<p>Legs Relief is a deep-pressure foot wrap for restless, fidgety legs at night. A soft, wide woven-elastic band wraps in layers around the middle of your foot and crosses in an X over the top, holding firm, steady pressure all night. That steady pressure gives your legs something calm to focus on, so you can stop fidgeting and finally drift off.</p>',
  '<h3>Why it helps</h3>',
  '<ul class="lr-points">',
  '<li><strong>Wrap-around pressure.</strong> Wide elastic layers press evenly around the middle of the foot.</li>',
  '<li><strong>Criss-cross hold.</strong> The X-shaped wrap keeps the pressure in place all night, even when you turn over.</li>',
  '<li><strong>Made for sleep.</strong> Low-profile and breathable, with toes and heel left open so your feet stay cool.</li>',
  '<li><strong>Drug-free.</strong> No pills, no prescription, no side effects.</li>',
  '</ul>',
  '<h3>What\'s in the box</h3>',
  '<ul class="lr-box">',
  '<li>2 Legs Relief wraps (left and right)</li>',
  '<li>Fit and care card</li>',
  '<li>Free eBook: The Calm Night Protocol</li>',
  '</ul>',
  '<h3>Details</h3>',
  '<table class="lr-specs"><tbody>',
  '<tr><th>Wrap</th><td>Soft, breathable woven stretch elastic, matte black</td></tr>',
  '<tr><th>Fastening</th><td>Adjustable strap that tightens to a snug fit</td></tr>',
  '<tr><th>Sizes</th><td>S/M: UK 3–7 (EU 35–40)<br>L/XL: UK 7½–12 (EU 41–47)</td></tr>',
  '<tr><th>Care</th><td>Hand or machine wash at 30°C, air dry</td></tr>',
  '<tr><th>Delivery</th><td>Free tracked UK delivery, usually 2–3 working days</td></tr>',
  '<tr><th>Guarantee</th><td>90 nights. If your legs aren\'t calmer, get your money back.</td></tr>',
  '</tbody></table>',
  '<p class="lr-note">Legs Relief is a comfort product, not a medical device. It is not intended to diagnose, treat, cure or prevent any disease. If you have a medical condition or are pregnant, speak to your GP before use.</p>'
].join('');

const ebookDescription = [
  '<p class="lr-lead"><strong>Your 20-minute guide to calmer evenings.</strong></p>',
  '<p>The Calm Night Protocol is a short, practical guide to the evening habits that help restless legs settle. Read it once, then follow the simple routine each night alongside your Legs Relief wraps.</p>',
  '<h3>Inside the guide</h3>',
  '<ul class="lr-points">',
  '<li><strong>The 10-minute wind-down routine</strong> to start before bed</li>',
  '<li><strong>5 gentle stretches</strong> for calves, hamstrings and feet</li>',
  '<li><strong>What to avoid in the evening</strong> and why it matters</li>',
  '<li><strong>How to get the best fit</strong> from your Legs Relief wraps</li>',
  '</ul>',
  '<h3>Details</h3>',
  '<table class="lr-specs"><tbody>',
  '<tr><th>Format</th><td>PDF for phone, tablet or computer</td></tr>',
  '<tr><th>Reading time</th><td>About 20 minutes</td></tr>',
  '<tr><th>Delivery</th><td>Download link by email right after checkout</td></tr>',
  '<tr><th>Price</th><td>Free with any Legs Relief pair</td></tr>',
  '</tbody></table>',
  '<p class="lr-note">This guide shares general wellness tips. It is not medical advice.</p>'
].join('');

export const products = [
  {
    id: 1,
    handle: 'legs-relief-support-pair',
    title: 'Legs Relief Support Pair',
    vendor: 'Legs Relief',
    type: 'Foot Wrap',
    tags: ['restless legs', 'sleep', 'foot wrap', 'deep pressure', 'bestseller'],
    subtitle: 'The deep-pressure foot wrap for restless, fidgety legs at night.',
    seo_title: 'Legs Relief Support Pair | Foot Wrap for Restless Legs | UK',
    seo_description: 'Firm pressure around the foot, held all night. A drug-free foot wrap for restless legs. Free tracked UK delivery and a 90-night guarantee.',
    description: pairDescription,
    option: 'Size',
    variants: [
      { id: 1001, option: 'S/M', sku: 'LR-PAIR-SM', price: 3499, compare_at_price: null, grams: 150, requires_shipping: true },
      { id: 1002, option: 'L/XL', sku: 'LR-PAIR-LXL', price: 3499, compare_at_price: null, grams: 170, requires_shipping: true }
    ],
    images: ['product-pair-1.svg', 'product-pair-2.svg', 'product-pair-3.svg', 'product-pair-4.svg', 'product-pair-5.svg'],
    template_suffix: ''
  },
  {
    id: 2,
    handle: 'the-calm-night-protocol-ebook',
    title: 'The Calm Night Protocol (eBook)',
    vendor: 'Legs Relief',
    type: 'eBook',
    tags: ['ebook', 'digital', 'sleep guide'],
    subtitle: 'A 20-minute read for quieter, calmer evenings.',
    seo_title: 'The Calm Night Protocol eBook | Legs Relief',
    seo_description: 'A 20-minute guide to calmer evenings: a simple wind-down routine, gentle stretches and sleep habits for restless legs. Free with any Legs Relief pair.',
    description: ebookDescription,
    option: null,
    variants: [{ id: 2001, option: 'Default Title', sku: 'LR-EBOOK', price: 1499, compare_at_price: null, grams: 0, requires_shipping: false }],
    images: ['ebook-cover.svg'],
    template_suffix: 'ebook'
  }
];
