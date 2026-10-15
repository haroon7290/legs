// Builds legs-night-theme.zip (repo root) containing only Shopify theme folders,
// ready for Online Store › Themes › Add theme › Upload zip file.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = ['assets', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates'];
const out = path.join(root, 'legs-night-theme.zip');
fs.rmSync(out, { force: true });
execFileSync('zip', ['-rq', out, ...dirs], { cwd: root, stdio: 'inherit' });
console.log('created', path.relative(root, out));
