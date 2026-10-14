// Writes import/products.csv (Shopify product import format) from sample-data.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { products } from './sample-data.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cols = ['Handle', 'Title', 'Body (HTML)', 'Vendor', 'Type', 'Tags', 'Published', 'Option1 Name', 'Option1 Value', 'Variant SKU', 'Variant Grams', 'Variant Inventory Tracker', 'Variant Inventory Qty', 'Variant Inventory Policy', 'Variant Fulfillment Service', 'Variant Price', 'Variant Compare At Price', 'Variant Requires Shipping', 'Variant Taxable', 'Gift Card', 'SEO Title', 'SEO Description', 'Variant Weight Unit', 'Status'];
const esc = (v) => {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const money = (c) => (c == null ? '' : (c / 100).toFixed(2));
const rows = [cols];
for (const p of products) {
  p.variants.forEach((v, i) => {
    const first = i === 0;
    rows.push([
      p.handle, first ? p.title : '', first ? p.description : '', first ? p.vendor : '', first ? p.type : '', first ? p.tags.join(', ') : '',
      first ? 'TRUE' : '', first ? (p.option || 'Title') : '', v.option, v.sku, v.grams, 'shopify', 100, 'deny', 'manual',
      money(v.price), money(v.compare_at_price), v.requires_shipping ? 'TRUE' : 'FALSE', 'TRUE', 'FALSE',
      first ? p.title : '', first ? p.subtitle : '', 'g', first ? 'active' : ''
    ]);
  });
}
fs.writeFileSync(path.join(root, 'import', 'products.csv'), rows.map((r) => r.map(esc).join(',')).join('\n') + '\n');
console.log('wrote import/products.csv');
