const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, '../src/app');
const publicDir = path.join(__dirname, '../public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Colors for terminal logs
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m"
};

// 1. Generate IndexNow Key (Used by Bing & Yandex to verify site ownership for instant indexing)
function getOrCreateIndexNowKey() {
  const keyFileName = 'rowshanara-seo-key.txt';
  const keyFilePath = path.join(publicDir, keyFileName);
  let key = '';

  if (fs.existsSync(keyFilePath)) {
    key = fs.readFileSync(keyFilePath, 'utf8').trim();
    console.log(`  [${colors.green}✓${colors.reset}] IndexNow key verified: ${key}`);
  } else {
    // Generate a random 32-character hex key
    key = [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    fs.writeFileSync(keyFilePath, key);
    console.log(`  [${colors.green}✓${colors.reset}] Generated new IndexNow key: ${key}`);
  }

  return { key, keyFileName };
}

// Helper to get active site routes
function getRoutes(dir, routes = []) {
  if (!fs.existsSync(dir)) return routes;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'api' && entry.name !== 'admin' && !entry.name.startsWith('_') && !entry.name.startsWith('(')) {
        getRoutes(fullPath, routes);
      }
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      const routePath = '/' + path.relative(srcAppDir, path.dirname(fullPath)).replace(/\\/g, '/');
      routes.push(routePath === '/' ? '' : routePath);
    }
  }
  return routes;
}

// 2. Track Search Rankings on Google
async function trackGoogleRanking(keyword) {
  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&num=30`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) return 'Blocked (CAPTCHA)';
    
    const html = await response.text();
    // Search for references to rowshanaraedu.com in search results
    const matches = html.match(/rowshanaraedu\.com/g) || [];
    
    if (matches.length > 0) {
      // Find approximate ranking card position in results
      const parts = html.split('rowshanaraedu.com');
      let estimatedRank = 1;
      
      // Simple algorithm estimating ranking based on search result page split structures
      for (let i = 0; i < parts.length - 1; i++) {
        const segment = parts[i];
        const searchResultIndicators = (segment.match(/href="https:\/\//g) || []).length;
        estimatedRank = Math.max(1, searchResultIndicators);
      }
      return `Page 1 (Est. Position: #${estimatedRank})`;
    }
    
    return 'Not found in Top 30';
  } catch (err) {
    return 'Error querying ranking';
  }
}

// 3. Ping IndexNow API to trigger instant indexing
async function submitToIndexNow(host, key, keyFileName, urls) {
  const endpoint = 'https://api.indexnow.org/indexnow';
  const payload = {
    host: host,
    key: key,
    keyLocation: `https://${host}/${keyFileName}`,
    urlList: urls.map(url => `https://${host}${url}`)
  };

  try {
    console.log(`Submitting ${urls.length} URLs to IndexNow (Bing/Yandex instant indexing)...`);
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`  [${colors.green}✓${colors.reset}] IndexNow submission successful! (Status: ${res.status})`);
      return true;
    } else {
      console.log(`  [${colors.red}✗${colors.reset}] IndexNow rejected submission (Status: ${res.status})`);
      return false;
    }
  } catch (err) {
    console.log(`  [${colors.red}✗${colors.reset}] IndexNow connection error:`, err.message);
    return false;
  }
}

async function runAgent() {
  console.log(`${colors.bold}${colors.cyan}=================================================`);
  console.log("       ROWSHANARA EDU - SEO AUTOMATION AGENT     ");
  console.log(`=================================================${colors.reset}\n`);

  // Step 1: Manage IndexNow authentication keys
  console.log(`${colors.bold}Step 1: Setting up IndexNow Keys...${colors.reset}`);
  const { key, keyFileName } = getOrCreateIndexNowKey();
  console.log("");

  // Step 2: Track current keyword search positions
  console.log(`${colors.bold}Step 2: Tracking Google Search Positions...${colors.reset}`);
  const keywords = [
    "Rowshanara Edu",
    "Rowshanara Edu Dhaka Office",
    "Education Consultancy in Dhaka"
  ];
  
  const rankings = {};
  for (const kw of keywords) {
    console.log(`  Tracking: "${kw}"...`);
    const rank = await trackGoogleRanking(kw);
    console.log(`    Result: ${colors.bold}${rank}${colors.reset}`);
    rankings[kw] = rank;
  }
  console.log("");

  // Step 3: Run Page Auditing
  console.log(`${colors.bold}Step 3: Discovering Pages...${colors.reset}`);
  const routes = getRoutes(srcAppDir);
  console.log(`  Discovered pages: ${routes.join(', ') || '/'}`);
  console.log("");

  // Step 4: Submit to IndexNow Search Engines (Instant indexing)
  console.log(`${colors.bold}Step 4: Broadcasting Updates...${colors.reset}`);
  const host = "rowshanaraedu.com";
  const indexSuccess = await submitToIndexNow(host, key, keyFileName, routes);
  console.log("");

  // Step 5: Save Agent Activity Log
  console.log(`${colors.bold}Step 5: Logging Activity...${colors.reset}`);
  const logPath = path.join(__dirname, '../seo-agent-log.md');
  let logContent = `# SEO Automation Agent Log\n\n`;
  logContent += `Timestamp: ${new Date().toISOString()}\n\n`;
  logContent += `## 1. IndexNow Verification\n`;
  logContent += `- Key: \`${key}\`\n`;
  logContent += `- Location: \`https://${host}/${keyFileName}\`\n\n`;
  logContent += `## 2. Google Search Positions\n`;
  for (const [kw, rank] of Object.entries(rankings)) {
    logContent += `- **"${kw}"**: ${rank}\n`;
  }
  logContent += `\n## 3. Broadcast Status\n`;
  logContent += `- Submission: ${indexSuccess ? "✅ Successful (Instant Indexing Triggered)" : "❌ Failed"}\n`;
  logContent += `- Broadcasted URLs:\n`;
  routes.forEach(url => {
    logContent += `  - \`https://${host}${url}\`\n`;
  });

  fs.writeFileSync(logPath, logContent);
  console.log(`Activity ledger written to: ${colors.green}seo-agent-log.md${colors.reset}\n`);

  console.log(`${colors.bold}${colors.cyan}=================================================`);
  console.log("           SEO AUTOMATION AGENT COMPLETE         ");
  console.log(`=================================================${colors.reset}\n`);
}

runAgent();
