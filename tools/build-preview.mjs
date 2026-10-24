// Renders the real theme Liquid with liquidjs + dummy data into ./preview
// so the design can be reviewed without a Shopify store. Usage: npm run preview
//
// Only the Shopify features this theme uses are mocked. The output is a
// static demo: cart actions use a localStorage cart (window.LegsNightTheme.preview).
import { Liquid, Tag, Hash } from 'liquidjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { products as rawProducts } from './sample-data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'preview');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const readJson = (p) => JSON.parse(read(p));

const locale = readJson('locales/en.default.json');
const settingsSchema = readJson('config/settings_schema.json');
const settingsData = readJson('config/settings_data.json');

/* ------------------------------------------------------------ dummy data */
const PAGE_URLS = {
  index: 'index.html',
  collection: 'collection.html',
  contact: 'contact.html',
  review: 'review.html',
  faq: 'faq.html',
  cart: 'cart.html'
};

function buildProduct(p) {
  const variants = p.variants.map((v) => ({
    id: v.id,
    title: v.option,
    options: [v.option],
    option1: v.option,
    price: v.price,
    compare_at_price: v.compare_at_price,
    available: true,
    sku: v.sku,
    url: `${p.handle}.html?variant=${v.id}`,
    featured_media: null
  }));
  const minPrice = Math.min(...variants.map((v) => v.price));
  const compare = Math.max(...variants.map((v) => v.compare_at_price || 0));
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    vendor: p.vendor,
    type: p.type,
    url: `${p.handle}.html`,
    description: p.description,
    price: minPrice,
    compare_at_price: compare || null,
    available: true,
    media: [],
    featured_media: null,
    variants,
    selected_or_first_available_variant: variants[0],
    has_only_default_variant: !p.option,
    options_with_values: p.option ? [{ name: p.option, values: variants.map((v) => v.title), selected_value: variants[0].title }] : [],
    metafields: { custom: { subtitle: p.subtitle } },
    template_suffix: p.template_suffix,
    images: p.images
  };
}
const products = rawProducts.map(buildProduct);
const productsByHandle = Object.fromEntries(products.map((p) => [p.handle, p]));
const allCollection = {
  title: 'Products',
  handle: 'all',
  url: PAGE_URLS.collection,
  description: '',
  products,
  products_count: products.length,
  sort_options: [
    { name: 'Featured', value: 'manual' },
    { name: 'Best selling', value: 'best-selling' },
    { name: 'Price, low to high', value: 'price-ascending' },
    { name: 'Price, high to low', value: 'price-descending' }
  ],
  default_sort_by: 'manual',
  sort_by: 'manual',
  // Sample filters so the filter UI shows in the preview (Search & Discovery provides real ones)
  filters: [
    { label: 'Availability', type: 'list', param_name: 'filter.v.availability', active_values: [],
      values: [{ label: 'In stock', value: '1', count: 2, active: false, param_name: 'filter.v.availability' }] },
    { label: 'Product type', type: 'list', param_name: 'filter.p.product_type', active_values: [],
      values: [{ label: 'Foot Wrap', value: 'Foot Wrap', count: 1, active: false, param_name: 'filter.p.product_type' },
               { label: 'eBook', value: 'eBook', count: 1, active: false, param_name: 'filter.p.product_type' }] },
    { label: 'Price', type: 'price_range', param_name: 'filter.v.price', active_values: [], range_max: 4499,
      min_value: { param_name: 'filter.v.price.gte', value: null }, max_value: { param_name: 'filter.v.price.lte', value: null } }
  ]
};

const previewCatalog = {};
for (const p of products) {
  for (const v of p.variants) {
    previewCatalog[v.id] = {
      handle: p.handle,
      title: p.title,
      product_title: p.title,
      variant_title: v.title,
      price: v.price,
      compare_at_price: v.compare_at_price,
      image: `assets/${rawProducts.find((r) => r.handle === p.handle).images[0]}`,
      url: p.url
    };
  }
}

const link = (title, url) => ({ title, url, current: false });
const linklists = {
  'main-menu': { links: [link('Shop', PAGE_URLS.collection), link('How it works', 'index.html#how-it-works'), link('Reviews', 'index.html#reviews'), link('FAQ', PAGE_URLS.faq), link('Contact', PAGE_URLS.contact)] },
  footer: { links: [link('Legs Night Support Pair', 'legs-night-support-pair.html'), link('The Calm Night Protocol', 'the-calm-night-protocol-ebook.html'), link('All products', PAGE_URLS.collection)] },
  help: { links: [link('FAQ', PAGE_URLS.faq), link('Contact us', PAGE_URLS.contact), link('Track my order', '#track')] }
};

/* ---------------------------------------------------------------- engine */
const engine = new Liquid({ root: [path.join(ROOT, 'snippets')], extname: '.liquid', dynamicPartials: true, jsTruthy: false });

function kw(args) {
  const out = {};
  for (const a of args) if (Array.isArray(a)) out[a[0]] = a[1];
  return out;
}
function lookup(obj, key) { return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj); }
const money = (c) => (c == null || c === '' ? '' : '$' + (Number(c) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));

engine.registerFilter('t', (key, ...args) => {
  const vars = kw(args);
  let s = lookup(locale, key);
  if (s && typeof s === 'object') s = vars.count === 1 ? s.one : s.other;
  if (s == null) return `[missing ${key}]`;
  return String(s).replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (vars[k] ?? ''));
});
engine.registerFilter('money', money);
engine.registerFilter('money_with_currency', (c) => money(c) + ' USD');
engine.registerFilter('money_without_currency', (c) => (Number(c) / 100).toFixed(2));
engine.registerFilter('asset_url', (f) => `assets/${f}`);
engine.registerFilter('image_url', (img) => (typeof img === 'string' ? img : img?.src || ''));
engine.registerFilter('image_tag', (src, ...args) => {
  const a = kw(args);
  return `<img src="${src}" alt="${a.alt ?? ''}"${a.class ? ` class="${a.class}"` : ''} loading="${a.loading || 'lazy'}">`;
});
engine.registerFilter('stylesheet_tag', (u) => `<link rel="stylesheet" href="${u}">`);
engine.registerFilter('font_face', () => '');
engine.registerFilter('font_modify', (f) => f);
// Shopify's color_lighten / color_darken change HSL lightness by N percentage points
function shiftLightness(hex, amount) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''));
  if (!m) return hex;
  let [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  l = Math.min(1, Math.max(0, l + amount / 100));
  const hue = (p, q, t) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  [r, g, b] = s === 0 ? [l, l, l] : [hue(p, q, h + 1 / 3), hue(p, q, h), hue(p, q, h - 1 / 3)];
  return '#' + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
}
engine.registerFilter('color_lighten', (c, n) => shiftLightness(c, Number(n)));
engine.registerFilter('color_darken', (c, n) => shiftLightness(c, -Number(n)));
engine.registerFilter('payment_type_svg_tag', (type) => {
  const label = { visa: 'VISA', master: 'MC', american_express: 'AMEX', paypal: 'PayPal', apple_pay: 'Pay', shopify_pay: 'shop' }[type] || type;
  return `<svg viewBox="0 0 38 24" role="img" aria-label="${type}"><rect width="38" height="24" rx="4" fill="#fff"/><text x="19" y="15.5" font-size="8" font-family="Arial" font-weight="700" fill="#1a1f71" text-anchor="middle">${label}</text></svg>`;
});
engine.registerFilter('placeholder_svg_tag', (_, cls) => `<svg class="${cls || ''}" viewBox="0 0 100 100"><rect width="100" height="100"/></svg>`);
engine.registerFilter('default_errors', () => '');
engine.registerFilter('format_address', () => '');
engine.registerFilter('payment_button', () => '');
engine.registerFilter('media_tag', () => '');

// {% schema %} … {% endschema %} — ignored at render time
engine.registerTag('schema', class extends Tag {
  constructor(token, remain, liquid) {
    super(token, remain, liquid);
    while (remain.length) { const t = remain.shift(); if (t.name === 'endschema') return; }
  }
  * render() {}
});

// {% stylesheet %} … {% endstylesheet %}: Shopify bundles this CSS; the preview inlines it
engine.registerTag('stylesheet', class extends Tag {
  constructor(token, remain, liquid) {
    super(token, remain, liquid);
    this.css = '';
    while (remain.length) {
      const t = remain.shift();
      if (t.name === 'endstylesheet') return;
      this.css += t.getText();
    }
  }
  * render(ctx, emitter) { emitter.write(`<style>${this.css}</style>`); }
});

// {% javascript %} … {% endjavascript %}: Shopify bundles this script; the preview inlines it
engine.registerTag('javascript', class extends Tag {
  constructor(token, remain, liquid) {
    super(token, remain, liquid);
    this.js = '';
    while (remain.length) {
      const t = remain.shift();
      if (t.name === 'endjavascript') return;
      this.js += t.getText();
    }
  }
  * render(ctx, emitter) { emitter.write(`<script>${this.js}</script>`); }
});

// {% form 'type', … %} … {% endform %}
engine.registerTag('form', class extends Tag {
  constructor(token, remain, liquid) {
    super(token, remain, liquid);
    this.args = token.args;
    this.tpls = [];
    const stream = liquid.parser.parseStream(remain)
      .on('tag:endform', () => stream.stop())
      .on('template', (tpl) => this.tpls.push(tpl))
      .on('end', () => { throw new Error('form not closed'); });
    stream.start();
  }
  * render(ctx, emitter) {
    const type = (this.args.match(/'([^']+)'/) || [])[1];
    const id = (this.args.match(/id:\s*'([^']+)'/) || [])[1];
    const cls = (this.args.match(/class:\s*'([^']+)'/) || [])[1];
    const isProduct = type === 'product';
    ctx.push({ form: { posted_successfully: false, errors: null } });
    const html = yield this.liquid.renderer.renderTemplates(this.tpls, ctx);
    ctx.pop();
    const attrs = [id && `id="${id}"`, cls && `class="${cls}"`, isProduct ? 'data-product-form' : 'data-preview-form', 'action="#" method="post"'].filter(Boolean).join(' ');
    const msg = isProduct ? '' : '<p class="notice" data-preview-message hidden style="flex-basis:100%">Preview only — this form submits in your live Shopify store.</p>';
    emitter.write(`<form ${attrs}>${html}${msg}</form>`);
  }
});

// {% paginate collection.products by 12 %} … {% endpaginate %}
engine.registerTag('paginate', class extends Tag {
  constructor(token, remain, liquid) {
    super(token, remain, liquid);
    this.tpls = [];
    const stream = liquid.parser.parseStream(remain)
      .on('tag:endpaginate', () => stream.stop())
      .on('template', (tpl) => this.tpls.push(tpl))
      .on('end', () => { throw new Error('paginate not closed'); });
    stream.start();
  }
  * render(ctx, emitter) {
    ctx.push({ paginate: { pages: 1, current_page: 1, parts: [] } });
    emitter.write(yield this.liquid.renderer.renderTemplates(this.tpls, ctx));
    ctx.pop();
  }
});

// {% sections 'header-group' %}
engine.registerTag('sections', class extends Tag {
  constructor(token, remain, liquid) { super(token, remain, liquid); this.group = token.args.replace(/['"\s]/g, ''); }
  * render(ctx, emitter) {
    const group = readJson(`sections/${this.group}.json`);
    const globals = ctx.getAll();
    let html = '';
    for (const id of group.order) html += yield renderSection(id, group.sections[id], globals);
    emitter.write(html);
  }
});

/* -------------------------------------------------------- section render */
function parseSchema(src) {
  const m = src.match(/\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/);
  return m ? JSON.parse(m[1]) : {};
}
function resolveSetting(def, value) {
  if (value === undefined) value = def.default;
  if (def.type === 'product') return typeof value === 'string' ? productsByHandle[value] ?? null : value ?? null;
  if (def.type === 'collection') return typeof value === 'string' ? allCollection : null;
  if (def.type === 'link_list') return value ? linklists[value] : null;
  if (def.type === 'select' && /^\d+$/.test(String(value))) return value;
  return value ?? null;
}
function resolveSettings(defs = [], values = {}) {
  const out = {};
  for (const d of defs) if (d.id) out[d.id] = resolveSetting(d, values[d.id]);
  return out;
}

async function renderSection(id, data, globals) {
  const src = read(`sections/${data.type}.liquid`);
  const schema = parseSchema(src);
  const blocks = (data.block_order || []).map((bid) => {
    const b = data.blocks[bid];
    const def = (schema.blocks || []).find((x) => x.type === b.type) || {};
    return { id: bid, type: b.type, settings: resolveSettings(def.settings, b.settings), shopify_attributes: '' };
  });
  const section = { id: `${id}`, settings: resolveSettings(schema.settings, data.settings), blocks, shopify_attributes: '' };
  const tag = schema.tag || 'div';
  const body = await engine.parseAndRender(src, { ...globals, section });
  return `<${tag} id="shopify-section-${id}" class="shopify-section ${schema.class || ''}">${body}</${tag}>`;
}

/* ------------------------------------------------------------ page build */
const settings = resolveSettings(settingsSchema.flatMap((g) => g.settings || []), settingsData.presets.Default);
settings.type_heading_font = { family: '"Fraunces"', fallback_families: 'Georgia, serif' };
settings.type_body_font = { family: '"Inter"', fallback_families: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' };

const baseGlobals = {
  shop: { name: 'Legs Night', description: 'Deep-pressure foot wraps for restless legs at night.', money_format: '${{amount}}', enabled_payment_types: ['visa', 'master', 'american_express', 'paypal', 'apple_pay', 'shopify_pay'], customer_accounts_enabled: false,
    policies: [{ title: 'Refund policy', url: '#refund-policy' }, { title: 'Shipping policy', url: '#shipping-policy' }, { title: 'Privacy policy', url: '#privacy-policy' }, { title: 'Terms of service', url: '#terms-of-service' }] },
  settings,
  routes: { root_url: 'index.html', cart_url: PAGE_URLS.cart, cart_add_url: '#', cart_change_url: '#', all_products_collection_url: PAGE_URLS.collection, search_url: '#', account_url: '#', product_recommendations_url: '#' },
  localization: { available_countries: [], available_languages: [] },
  recommendations: { performed: false, products_count: 0, products: [] },
  cart: { item_count: 0, total_price: 0, currency: { iso_code: 'USD' }, items: [] },
  request: { locale: { iso_code: 'en' }, origin: 'https://legsnight.com', page_type: 'index' },
  all_products: productsByHandle,
  collections: { all: allCollection },
  canonical_url: 'https://legsnight.com/',
  current_page: 1
};

// Shopify exposes these objects inside {% render %}; liquidjs needs them as globals.
Object.assign(engine.options.globals, { shop: baseGlobals.shop, settings, routes: baseGlobals.routes, cart: baseGlobals.cart, request: baseGlobals.request, all_products: productsByHandle, collections: baseGlobals.collections, localization: baseGlobals.localization });

// Simulates the automatic discounts the README asks merchants to create, so the preview cart
// shows the same totals as checkout: 20% off 2+ pairs, 30% off 3+ pairs, one free eBook with a pair.
const previewPricing = `function (items) {
  var pairs = items.filter(function (i) { return i.handle === 'legs-night-support-pair'; });
  var count = pairs.reduce(function (n, i) { return n + i.quantity; }, 0);
  var pct = count >= 3 ? 30 : count >= 2 ? 20 : 0;
  pairs.forEach(function (i) {
    if (!pct) return;
    var amount = Math.round(i.price * i.quantity * pct / 100);
    i.final_line_price -= amount;
    i.line_level_discount_allocations.push({ amount: amount, discount_application: { title: count + '-pair bundle' } });
  });
  items.forEach(function (i) {
    if (i.handle !== 'the-calm-night-protocol-ebook' || !count) return;
    i.final_line_price -= i.price;
    i.line_level_discount_allocations.push({ amount: i.price, discount_application: { title: 'Free eBook with your pair' } });
  });
}`;
const previewHead = `<script>window.LegsNightTheme.preview = true; window.LegsNightTheme.previewCatalog = ${JSON.stringify(previewCatalog)}; window.LegsNightTheme.previewPricing = ${previewPricing};</script>
`;

async function buildPage(file, templateName, extra = {}) {
  const tpl = readJson(`templates/${templateName}.json`);
  const globals = { ...baseGlobals, ...extra, template: { name: templateName.split('.')[0] } };
  let content = '';
  for (const id of tpl.order) content += await renderSection(id, tpl.sections[id], globals);
  const layout = read('layout/theme.liquid');
  const html = await engine.parseAndRender(layout, { ...globals, content_for_layout: content, content_for_header: previewHead });
  fs.writeFileSync(path.join(OUT, file), html.replace(/\n\s*\n/g, '\n'));
  console.log('built', file);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
for (const f of fs.readdirSync(path.join(ROOT, 'assets'))) fs.copyFileSync(path.join(ROOT, 'assets', f), path.join(OUT, 'assets', f));

await buildPage('index.html', 'index', { page_title: 'Legs Night Storefront' });
for (const p of products) {
  const tplName = p.template_suffix ? `product.${p.template_suffix}` : 'product';
  await buildPage(`${p.handle}.html`, tplName, { product: p, page_title: p.title, request: { ...baseGlobals.request, page_type: 'product' } });
}
await buildPage('collection.html', 'collection', { collection: allCollection, page_title: 'Products' });
await buildPage('contact.html', 'page.contact', { page: { title: 'Contact us', content: '' }, page_title: 'Contact' });
await buildPage('review.html', 'page.review', { page: { title: 'Write a Review', content: '' }, page_title: 'Write a Review' });
await buildPage('faq.html', 'page.faq', { page: { title: 'FAQ', content: '' }, page_title: 'FAQ' });
await buildPage('404.html', '404', { page_title: 'Page not found' });
