const http = require('http');

const projSlugs = [
  'the-santacruz-residence',
  'altitude-penthouse',
  'chapter-one-cafe',
  'the-sea-villa',
  'merit-office-campus'
];

const jourSlugs = [
  'the-material-conversation',
  'light-as-a-design-tool',
  'the-case-for-empty-space',
  'alibaug-coastal-villa-story',
  'rituals-of-daily-living',
  'custom-joinery-craftsmanship'
];

const mainRoutes = [
  '/',
  '/projects',
  '/services',
  '/process',
  '/about',
  '/journal',
  '/contact'
];

const dynamicRoutes = [
  ...projSlugs.map(s => `/projects/${s}`),
  ...jourSlugs.map(s => `/journal/${s}`)
];

const adminRoutes = [
  '/admin',
  '/admin/login',
  '/admin/dashboard'
];

const routes = [
  ...mainRoutes,
  ...dynamicRoutes,
  ...adminRoutes,
  '/404'
];

function fetchRoute(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path: urlPath, status: res.statusCode, length: data.length });
      });
    });
    req.on('error', (err) => resolve({ path: urlPath, status: 'ERROR', error: err.message }));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ path: urlPath, status: 'TIMEOUT' });
    });
  });
}

async function run() {
  console.log(`Auditing all ${routes.length} routes against live server...`);
  const results = [];
  for (const r of routes) {
    const res = await fetchRoute(r);
    const ok = (r === '/404') ? (res.status === 404) : (res.status === 200 || res.status === 307 || res.status === 302);
    console.log(`${ok ? '✓ PASS' : '✗ FAIL'} [HTTP ${res.status}] ${r} (${res.length || 0} bytes)`);
    results.push({ ...res, ok });
  }

  const failed = results.filter(r => !r.ok);
  console.log(`\nROUTE AUDIT SUMMARY:`);
  console.log(`Total: ${routes.length}`);
  console.log(`Passed: ${results.length - failed.length}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.error('Failed items:', failed);
    process.exit(1);
  }
}

run();
