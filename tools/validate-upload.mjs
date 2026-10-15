// Checks the rules Shopify's theme uploader enforces that Theme Check does not:
// schema defaults, setting values in JSON templates, block types and limits.
// Usage: node tools/validate-upload.mjs   (also run by `npm run check`)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const errors = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);

const RICHTEXT_TAGS = new Set(['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a', 'span', 'ul', 'li']);
const URL_DEFAULTS = new Set(['/collections', '/collections/all']);

function checkRichtext(file, id, value) {
  if (typeof value !== 'string' || value === '') return;
  if (!/^\s*<(p|ul)[\s>]/.test(value)) err(file, `${id}: rich text must start with <p> or <ul>`);
  for (const [, tag] of value.matchAll(/<\s*([a-z0-9]+)/gi)) {
    if (!RICHTEXT_TAGS.has(tag.toLowerCase())) err(file, `${id}: <${tag}> is not allowed in rich text`);
  }
}

function checkValue(file, def, value, where) {
  const id = `${where}${def.id}`;
  switch (def.type) {
    case 'range': {
      if (typeof value !== 'number') { err(file, `${id}: range value must be a number`); break; }
      if (value < def.min || value > def.max) err(file, `${id}: ${value} outside ${def.min}–${def.max}`);
      const steps = (value - def.min) / (def.step ?? 1);
      if (Math.abs(steps - Math.round(steps)) > 1e-6) err(file, `${id}: ${value} is not on a step of ${def.step}`);
      break;
    }
    case 'select':
    case 'radio':
      if (!def.options.some((o) => o.value === value)) err(file, `${id}: "${value}" is not one of the options`);
      break;
    case 'checkbox':
      if (typeof value !== 'boolean') err(file, `${id}: checkbox value must be true/false`);
      break;
    case 'richtext':
      checkRichtext(file, id, value);
      break;
  }
}

function checkSettingDefs(file, defs = [], where = '') {
  const seen = new Set();
  for (const def of defs) {
    if (!def.id) continue;
    if (seen.has(def.id)) err(file, `${where}${def.id}: duplicate setting id`);
    seen.add(def.id);
    if (!('default' in def)) {
      if (def.type === 'range') err(file, `${where}${def.id}: range needs a default`);
      continue;
    }
    const d = def.default;
    if (def.type === 'url' && !URL_DEFAULTS.has(d)) err(file, `${where}${def.id}: url default may only be /collections or /collections/all`);
    if (['text', 'textarea', 'html', 'richtext', 'inline_richtext'].includes(def.type) && d === '') err(file, `${where}${def.id}: default can't be an empty string (omit it)`);
    if (['product', 'collection', 'image_picker', 'page', 'blog', 'article'].includes(def.type)) err(file, `${where}${def.id}: ${def.type} settings can't have a default`);
    if (def.type === 'range' && (def.max - def.min) / (def.step ?? 1) > 101) err(file, `${where}${def.id}: range has more than 101 steps`);
    checkValue(file, def, d, where);
  }
}

// Section schemas
const schemas = {};
for (const f of fs.readdirSync(path.join(root, 'sections')).filter((f) => f.endsWith('.liquid'))) {
  const file = `sections/${f}`;
  const m = read(file).match(/\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/);
  if (!m) { err(file, 'missing {% schema %}'); continue; }
  const schema = JSON.parse(m[1]);
  schemas[f.replace('.liquid', '')] = schema;
  if (!schema.name || schema.name.length > 25) err(file, 'section name must be 1–25 characters');
  checkSettingDefs(file, schema.settings);
  for (const b of schema.blocks || []) {
    if (b.type === '@app') continue;
    if (!b.name || b.name.length > 25) err(file, `block "${b.type}" name must be 1–25 characters`);
    checkSettingDefs(file, b.settings, `${b.type}.`);
  }
}

// Theme settings
const settingsSchema = JSON.parse(read('config/settings_schema.json'));
const themeDefs = settingsSchema.flatMap((g) => g.settings || []);
checkSettingDefs('config/settings_schema.json', themeDefs);
const data = JSON.parse(read('config/settings_data.json'));
for (const [name, preset] of Object.entries({ current: typeof data.current === 'object' ? data.current : {}, ...data.presets })) {
  for (const [k, v] of Object.entries(preset)) {
    if (k === 'sections' || k === 'content_for_index' || k === 'blocks') continue;
    const def = themeDefs.find((d) => d.id === k);
    if (!def) err('config/settings_data.json', `${name}.${k}: no matching setting in settings_schema.json`);
    else checkValue('config/settings_data.json', def, v, `${name}.`);
  }
}

// JSON templates and section groups
function checkSectionData(file, id, s) {
  const schema = schemas[s.type];
  if (!schema) { err(file, `${id}: section type "${s.type}" does not exist`); return; }
  for (const [k, v] of Object.entries(s.settings || {})) {
    const def = (schema.settings || []).find((d) => d.id === k);
    if (!def) err(file, `${id}.${k}: not a setting of ${s.type}`);
    else checkValue(file, def, v, `${id}.`);
  }
  const blocks = s.blocks || {};
  const order = s.block_order || [];
  if (order.length !== Object.keys(blocks).length || order.some((b) => !blocks[b])) err(file, `${id}: block_order doesn't match blocks`);
  if (schema.max_blocks && order.length > schema.max_blocks) err(file, `${id}: more than ${schema.max_blocks} blocks`);
  const counts = {};
  for (const [bid, b] of Object.entries(blocks)) {
    const def = (schema.blocks || []).find((d) => d.type === b.type);
    if (!def) { if (!b.type.startsWith('shopify://')) err(file, `${id}.${bid}: block type "${b.type}" not in ${s.type}`); continue; }
    counts[b.type] = (counts[b.type] || 0) + 1;
    if (def.limit && counts[b.type] > def.limit) err(file, `${id}: more than ${def.limit} "${b.type}" blocks`);
    for (const [k, v] of Object.entries(b.settings || {})) {
      const sdef = (def.settings || []).find((d) => d.id === k);
      if (!sdef) err(file, `${id}.${bid}.${k}: not a setting of block ${b.type}`);
      else checkValue(file, sdef, v, `${id}.${bid}.`);
    }
  }
}
const jsonFiles = [
  ...fs.readdirSync(path.join(root, 'templates')).filter((f) => f.endsWith('.json')).map((f) => `templates/${f}`),
  ...fs.readdirSync(path.join(root, 'sections')).filter((f) => f.endsWith('.json')).map((f) => `sections/${f}`)
];
for (const file of jsonFiles) {
  const t = JSON.parse(read(file));
  if (t.order.length > 25) err(file, 'more than 25 sections');
  if (t.order.length !== Object.keys(t.sections).length || t.order.some((id) => !t.sections[id])) err(file, "order doesn't match sections");
  for (const [id, s] of Object.entries(t.sections)) checkSectionData(file, id, s);
}

// Required files
for (const f of ['layout/theme.liquid', 'config/settings_schema.json', 'config/settings_data.json', 'locales/en.default.json',
  'templates/index.json', 'templates/product.json', 'templates/collection.json', 'templates/list-collections.json', 'templates/cart.json',
  'templates/page.json', 'templates/blog.json', 'templates/article.json', 'templates/search.json', 'templates/404.json',
  'templates/password.json', 'templates/gift_card.liquid', ...['account', 'activate_account', 'addresses', 'login', 'order', 'register', 'reset_password'].map((c) => `templates/customers/${c}.liquid`)]) {
  if (!fs.existsSync(path.join(root, f))) err(f, 'required file is missing');
}

if (errors.length) { console.log(errors.join('\n')); console.log(`${errors.length} upload problem(s)`); process.exit(1); }
console.log('Upload validation passed: schemas, templates, settings and required files');
