// Runs Shopify Theme Check on the theme. Usage: npm run check
import { themeCheckRun } from '@shopify/theme-check-node';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const res = await themeCheckRun(root, undefined, () => {});
const offenses = res.offenses ?? res;
for (const o of offenses) {
  const level = ['ERROR', 'WARN', 'INFO'][o.severity] ?? o.severity;
  console.log(`${level} ${o.check} ${o.uri.replace(/^.*?\/(sections|snippets|templates|layout|config|locales|assets)\//, '$1/')}:${o.start.line + 1} ${o.message}`);
}
console.log(`${offenses.length} offense(s)`);
process.exit(offenses.some((o) => o.severity === 0) ? 1 : 0);
