// Converts the policies/*.md files to HTML for the preview (headings, paragraphs, lists, tables,
// bold, italic, links and hard line breaks: the subset the policy files use).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'policies');

export const POLICIES = [
  { handle: 'refund-policy', title: 'Refund policy' },
  { handle: 'shipping-policy', title: 'Shipping policy' },
  { handle: 'privacy-policy', title: 'Privacy policy' },
  { handle: 'terms-of-service', title: 'Terms of service' },
  { handle: 'contact-information', title: 'Contact information' }
];

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inline(text) {
  return escape(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\w)/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

export function markdownToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let para = [];
  const flush = () => {
    if (!para.length) return;
    const raw = para.map((l) => l.trim()).join(' ').replace(/\\ /g, '\u0000');
    out.push(`<p>${inline(raw).replace(/\u0000/g, '<br>')}</p>`);
    para = [];
  };
  for (let i = 0; i < lines.length; ) {
    const line = lines[i];
    const s = line.trim();
    let m;
    if (!s) { flush(); i++; continue; }
    if ((m = s.match(/^(#{1,4})\s+(.*)/))) { flush(); out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); i++; continue; }
    if (s === '---') { flush(); out.push('<hr>'); i++; continue; }
    if (s.startsWith('|')) {
      flush();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
      const [head, , ...body] = rows;
      out.push(`<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
      continue;
    }
    if ((m = line.match(/^(-|\d+\.)\s+/))) {
      flush();
      const tag = /\d/.test(m[1]) ? 'ol' : 'ul';
      const items = [];
      while (i < lines.length) {
        const l = lines[i];
        const mm = l.match(/^(-|\d+\.)\s+(.*)/);
        if (mm) items.push(mm[2].trim());
        else if (/^\s+\S/.test(l) && items.length) items[items.length - 1] += ' ' + l.trim();
        else break;
        i++;
      }
      out.push(`<${tag}>${items.map((x) => `<li>${inline(x)}</li>`).join('')}</${tag}>`);
      continue;
    }
    para.push(s);
    i++;
  }
  flush();
  return out.join('\n');
}

// The policy body as the storefront shows it: without the "# Title" line (Shopify adds the title
// itself) and without any setup notes above a "---" line.
export function policyHtml(handle) {
  let md = fs.readFileSync(path.join(DIR, `${handle}.md`), 'utf8').replace(/^# .*\n/, '');
  const rule = md.indexOf('\n---\n');
  if (rule !== -1) md = md.slice(rule + 5);
  return markdownToHtml(md);
}
