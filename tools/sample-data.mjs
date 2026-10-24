// Catalogue used by the static preview and the Shopify product import CSV.
// The same copy is in PRODUCT_LISTING.md, ready to paste into Shopify admin.

const pairDescription = [
  '<p class="ln-lead"><strong>Firm pressure, right under the arch. Held until morning.</strong></p>',
  '<p>Legs Night is a deep-pressure foot wrap for restless, fidgety legs at night. A firm, contoured pad sits under each arch, and a soft woven-elastic band crosses in an X over the top of your foot to hold it snug. That steady pressure gives your legs something calm to focus on, so you can stop shifting and finally fall asleep.</p>',
  '<h3>Why it helps</h3>',
  '<ul class="ln-points">',
  '<li><strong>Targeted arch pressure.</strong> The firm pad presses right where it counts: the middle of the sole.</li>',
  '<li><strong>Criss-cross hold.</strong> The X-shaped wrap keeps the pressure in place all night, even when you turn over.</li>',
  '<li><strong>Made for sleep.</strong> Low-profile and breathable, with toes and heel left open so your feet stay cool.</li>',
  '<li><strong>Drug-free.</strong> No pills, no prescription, no side effects.</li>',
  '</ul>',
  '<h3>What\'s in the box</h3>',
  '<ul class="ln-box">',
  '<li>2 Legs Night wraps (left and right)</li>',
  '<li>2 firm, removable arch pads</li>',
  '<li>Fit and care card</li>',
  '<li>Free eBook: The Calm Night Protocol</li>',
  '</ul>',
  '<h3>Details</h3>',
  '<table class="ln-specs"><tbody>',
  '<tr><th>Wrap</th><td>Soft, breathable woven stretch elastic, matte black</td></tr>',
  '<tr><th>Pad</th><td>Firm, contoured EVA foam, removable</td></tr>',
  '<tr><th>Fastening</th><td>Adjustable strap that tightens to a snug fit</td></tr>',
  '<tr><th>Sizes</th><td>S/M: US women\'s 5–9, men\'s 4–8<br>L/XL: US women\'s 9.5–13, men\'s 8.5–14</td></tr>',
  '<tr><th>Care</th><td>Remove the pad, hand or machine wash cold, air dry</td></tr>',
  '<tr><th>Guarantee</th><td>90 nights. If your legs aren\'t calmer, get a full refund.</td></tr>',
  '</tbody></table>',
  '<p class="ln-note">Legs Night is a comfort product, not a medical device. It is not intended to diagnose, treat, cure or prevent any disease. If you have a medical condition, talk to your doctor before use.</p>'
].join('');

const ebookDescription = [
  '<p class="ln-lead"><strong>Your 20-minute guide to calmer evenings.</strong></p>',
  '<p>The Calm Night Protocol is a short, practical guide to the evening habits that help restless legs settle. Read it once, then follow the simple routine each night alongside your Legs Night wraps.</p>',
  '<h3>Inside the guide</h3>',
  '<ul class="ln-points">',
  '<li><strong>The 10-minute wind-down routine</strong> to start before bed</li>',
  '<li><strong>5 gentle stretches</strong> for calves, hamstrings and feet</li>',
  '<li><strong>What to avoid in the evening</strong> and why it matters</li>',
  '<li><strong>How to get the best fit</strong> from your Legs Night wraps</li>',
  '</ul>',
  '<h3>Details</h3>',
  '<table class="ln-specs"><tbody>',
  '<tr><th>Format</th><td>PDF for phone, tablet or computer</td></tr>',
  '<tr><th>Reading time</th><td>About 20 minutes</td></tr>',
  '<tr><th>Delivery</th><td>Download link by email right after checkout</td></tr>',
  '<tr><th>Price</th><td>Free with any Legs Night pair</td></tr>',
  '</tbody></table>',
  '<p class="ln-note">This guide shares general wellness tips. It is not medical advice.</p>'
].join('');

export const products = [
  {
    id: 1,
    handle: 'legs-night-support-pair',
    title: 'Legs Night Support Pair',
    vendor: 'Legs Night',
    type: 'Foot Wrap',
    tags: ['restless legs', 'sleep', 'foot wrap', 'deep pressure', 'bestseller'],
    subtitle: 'The deep-pressure foot wrap for restless, fidgety legs at night.',
    seo_title: 'Legs Night Support Pair | Deep-Pressure Foot Wrap for Restless Legs',
    seo_description: 'Firm pressure right under the arch, held all night. A drug-free foot wrap for restless, fidgety legs. Free shipping and a 90-night guarantee.',
    description: pairDescription,
    option: 'Size',
    variants: [
      { id: 1001, option: 'S/M', sku: 'LN-PAIR-SM', price: 4499, compare_at_price: 5999, grams: 150, requires_shipping: true },
      { id: 1002, option: 'L/XL', sku: 'LN-PAIR-LXL', price: 4499, compare_at_price: 5999, grams: 170, requires_shipping: true }
    ],
    images: ['product-pair-1.svg', 'product-pair-2.svg', 'product-pair-3.svg', 'product-pair-4.svg', 'product-pair-5.svg'],
    template_suffix: ''
  },
  {
    id: 2,
    handle: 'the-calm-night-protocol-ebook',
    title: 'The Calm Night Protocol (eBook)',
    vendor: 'Legs Night',
    type: 'eBook',
    tags: ['ebook', 'digital', 'sleep guide'],
    subtitle: 'A 20-minute read for quieter, calmer evenings.',
    seo_title: 'The Calm Night Protocol eBook | Legs Night',
    seo_description: 'A 20-minute guide to calmer evenings: a simple wind-down routine, gentle stretches and sleep habits for restless legs. Free with any Legs Night pair.',
    description: ebookDescription,
    option: null,
    variants: [{ id: 2001, option: 'Default Title', sku: 'LN-EBOOK', price: 2000, compare_at_price: null, grams: 0, requires_shipping: false }],
    images: ['ebook-cover.svg'],
    template_suffix: 'ebook'
  }
];
