const fs = require('fs');
const path = require('path');

const pageFiles = [
  'pages/index.js',
  'pages/projects/index.js',
  'pages/services.js',
  'pages/process.js',
  'pages/about.js',
  'pages/journal/index.js',
  'pages/contact.js',
  'pages/projects/[slug].js',
  'pages/journal/[slug].js'
];

console.log('=== SEO & ACCESSIBILITY AUDIT ===\n');

pageFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');

  const hasSEO = content.includes('<SEO') || content.includes('title=') || content.includes('<title>');
  const titleMatch = content.match(/title=["']([^"']+)["']/);
  const descMatch = content.match(/description=["']([^"']+)["']/);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

  console.log(`PAGE: ${file}`);
  console.log(`- SEO Component: ${hasSEO ? 'Yes' : 'No'}`);
  console.log(`- Title: ${titleMatch ? titleMatch[1] : 'Dynamic / Defined'}`);
  console.log(`- Description: ${descMatch ? descMatch[1].substring(0, 60) + '...' : 'Dynamic / Defined'}`);
  console.log(`- H1 Present: ${h1Match ? 'Yes' : 'No'}`);
  console.log('---');
});
