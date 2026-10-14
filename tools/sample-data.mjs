// Dummy catalogue used by the static preview and the Shopify product import CSV.
// Product copy here is placeholder text — replace it in Shopify admin.

export const products = [
  {
    id: 1,
    handle: 'hushlegs-support-pair',
    title: 'HushLegs Support Pair',
    vendor: 'HushLegs',
    type: 'Foot Wrap',
    tags: ['restless legs', 'sleep', 'foot wrap'],
    subtitle: 'The deep-pressure foot wrap for restless, fidgety legs at night.',
    description:
      '<p>HushLegs is a deep-pressure foot wrap — a firm, contoured pad held snug under each arch by an adjustable strap. Wear it to bed to help quiet the crawling, can\'t-sit-still feeling in your legs so you can finally fall asleep.</p>' +
      '<ul><li>One pair (left + right)</li><li>Firm, removable EVA pressure pad</li><li>Soft, breathable knit wrap with adjustable strap</li><li>Machine washable</li><li>Free eBook: The Calm Night Protocol</li></ul>' +
      '<p><em>HushLegs is a comfort product, not a medical device.</em></p>',
    option: 'Size',
    variants: [
      { id: 1001, option: 'S/M', sku: 'HL-PAIR-SM', price: 4499, compare_at_price: 5999, grams: 120, requires_shipping: true },
      { id: 1002, option: 'L/XL', sku: 'HL-PAIR-LXL', price: 4499, compare_at_price: 5999, grams: 140, requires_shipping: true }
    ],
    images: ['product-pair-1.svg', 'product-pair-2.svg', 'product-pair-3.svg', 'product-pair-4.svg', 'product-pair-5.svg'],
    template_suffix: ''
  },
  {
    id: 2,
    handle: 'the-calm-night-protocol-ebook',
    title: 'The Calm Night Protocol (eBook)',
    vendor: 'HushLegs',
    type: 'eBook',
    tags: ['ebook', 'digital'],
    subtitle: 'A 20-minute read for quieter, calmer evenings.',
    description:
      '<p>Our 20-minute guide to quieter evenings: the simple wind-down routine, gentle stretches, and sleep habits that pair perfectly with HushLegs.</p>' +
      '<p>Yours free with any HushLegs pair — or buy it on its own.</p>',
    option: null,
    variants: [{ id: 2001, option: 'Default Title', sku: 'HL-EBOOK', price: 2000, compare_at_price: null, grams: 0, requires_shipping: false }],
    images: ['ebook-cover.svg'],
    template_suffix: 'ebook'
  }
];
