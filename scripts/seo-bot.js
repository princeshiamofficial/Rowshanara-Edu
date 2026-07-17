const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, '../src/app');
const componentsDir = path.join(__dirname, '../src/components');

// ANSI escape codes for coloring terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m"
};

// Helper function to find all page.tsx files recursively
function getPageFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Ignore API routes, admin panels, and special Next.js directories
      if (entry.name !== 'api' && entry.name !== 'admin' && !entry.name.startsWith('_') && !entry.name.startsWith('(')) {
        getPageFiles(fullPath, files);
      }
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      files.push(fullPath);
    }
  }
  return files;
}

// Find all components files recursively
function getComponentFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getComponentFiles(fullPath, files);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      files.push(fullPath);
    }
  }
  return files;
}

async function runAudit() {
  console.log(`${colors.bold}${colors.cyan}===============================================`);
  console.log("          ROWSHANARA EDU - AUTO SEO BOT         ");
  console.log(`===============================================${colors.reset}\n`);

  console.log("Analyzing project structure...");
  const pageFiles = getPageFiles(srcAppDir);
  const componentFiles = getComponentFiles(componentsDir);
  const layoutFile = path.join(srcAppDir, 'layout.tsx');

  console.log(`Found ${pageFiles.length} page routes to audit.\n`);

  let totalScore = 100;
  const auditReport = [];
  const recommendations = [];

  // 1. Audit Root Layout (layout.tsx)
  console.log(`${colors.bold}Auditing Root Layout (layout.tsx)...${colors.reset}`);
  if (fs.existsSync(layoutFile)) {
    const content = fs.readFileSync(layoutFile, 'utf8');
    
    // Check metadataBase
    if (content.includes('metadataBase')) {
      console.log(`  [${colors.green}✓${colors.reset}] metadataBase defined`);
    } else {
      console.log(`  [${colors.red}✗${colors.reset}] metadataBase missing`);
      totalScore -= 10;
      recommendations.push("Root Layout: Add `metadataBase` to allow correct generation of absolute OG images and canonical tags.");
    }

    // Check OpenGraph
    if (content.includes('openGraph:')) {
      console.log(`  [${colors.green}✓${colors.reset}] OpenGraph defaults configured`);
    } else {
      console.log(`  [${colors.red}✗${colors.reset}] OpenGraph defaults missing`);
      totalScore -= 10;
      recommendations.push("Root Layout: Configure default OpenGraph tags to support rich media links when sharing on Facebook/Slack.");
    }

    // Check JSON-LD
    if (content.includes('application/ld+json')) {
      console.log(`  [${colors.green}✓${colors.reset}] Structured Data JSON-LD schemas embedded`);
    } else {
      console.log(`  [${colors.red}✗${colors.reset}] Structured Data JSON-LD schemas missing`);
      totalScore -= 15;
      recommendations.push("Root Layout: Inject JSON-LD schemas for EducationalOrganization to enable Google Rich Snippets.");
    }
  } else {
    console.log(`  [${colors.red}✗${colors.reset}] Root layout.tsx not found!`);
    totalScore -= 30;
  }
  console.log("");

  // 2. Audit Page Routes
  console.log(`${colors.bold}Auditing Page Routes...${colors.reset}`);
  for (const pagePath of pageFiles) {
    const route = '/' + path.relative(srcAppDir, path.dirname(pagePath)).replace(/\\/g, '/');
    const displayRoute = route === '/' ? '/ (Home)' : route;
    console.log(`Auditing ${colors.bold}${displayRoute}${colors.reset}...`);

    const content = fs.readFileSync(pagePath, 'utf8');

    // Check metadata exports
    const hasMetadata = content.includes('export const metadata');
    const isClientPage = content.includes('"use client"') || content.includes("'use client'");

    if (hasMetadata) {
      console.log(`  [${colors.green}✓${colors.reset}] Metadata exported`);
      
      // Parse Title
      const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
      if (titleMatch) {
        const title = titleMatch[1];
        if (title.length < 30 || title.length > 60) {
          console.log(`  [${colors.yellow}!${colors.reset}] Title length is not optimal: "${title}" (${title.length} chars. Optimal: 30-60)`);
          recommendations.push(`${displayRoute}: Title length is currently ${title.length} chars. Adjust to 30-60 characters for search listings.`);
        } else {
          console.log(`  [${colors.green}✓${colors.reset}] Title: "${title}" (${title.length} chars)`);
        }
      }

      // Parse Description
      const descMatch = content.match(/description:\s*["']([^"']+)["']/);
      if (descMatch) {
        const desc = descMatch[1];
        if (desc.length < 120 || desc.length > 160) {
          console.log(`  [${colors.yellow}!${colors.reset}] Description length is not optimal: (${desc.length} chars. Optimal: 120-160)`);
          recommendations.push(`${displayRoute}: Description is ${desc.length} chars. Adjust to 120-160 characters to avoid snippet truncation.`);
        } else {
          console.log(`  [${colors.green}✓${colors.reset}] Description verified (${desc.length} chars)`);
        }
      } else {
        console.log(`  [${colors.red}✗${colors.reset}] Description missing`);
        totalScore -= 5;
        recommendations.push(`${displayRoute}: Missing meta description in metadata export.`);
      }

      // Check Canonical
      if (content.includes('canonical:')) {
        console.log(`  [${colors.green}✓${colors.reset}] Canonical URL set`);
      } else {
        console.log(`  [${colors.red}✗${colors.reset}] Canonical URL missing`);
        totalScore -= 5;
        recommendations.push(`${displayRoute}: Add alternates.canonical tag in page metadata to avoid duplicate content indexing.`);
      }

    } else if (isClientPage) {
      console.log(`  [${colors.yellow}!${colors.reset}] Page is client component ("use client") - metadata must be defined in layout or parent component`);
    } else {
      console.log(`  [${colors.red}✗${colors.reset}] No metadata exported!`);
      totalScore -= 10;
      recommendations.push(`${displayRoute}: Define and export page metadata for search visibility.`);
    }

    // Check for H1 presence
    const hasH1 = content.includes('<h1') || content.includes('hero-title') || content.includes('title=') || content.includes('title:');
    if (hasH1) {
      console.log(`  [${colors.green}✓${colors.reset}] Primary header (H1 title) indicator verified`);
    } else {
      console.log(`  [${colors.yellow}!${colors.reset}] Primary H1 header could not be verified in this route file`);
    }
    console.log("");
  }

  // 3. Scan for Images without ALT attributes in components and pages
  console.log(`${colors.bold}Auditing Images for ALT Attributes...${colors.reset}`);
  let missingAltsCount = 0;
  const allCodeFiles = [...pageFiles, ...componentFiles];
  const missingAltList = [];

  for (const filePath of allCodeFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(path.join(__dirname, '..'), filePath).replace(/\\/g, '/');
    
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/<(Image|img)[^>]*>/);
      if (match) {
        const tag = match[0];
        if (!tag.includes('alt=') || tag.includes('alt=""') || tag.includes('alt={\x22\x22}') || tag.includes('alt={\'\'}')) {
          missingAltsCount++;
          missingAltList.push(`${relativePath}:${i + 1} (${tag.trim().substring(0, 40)}...)`);
        }
      }
    }
  }

  if (missingAltsCount === 0) {
    console.log(`  [${colors.green}✓${colors.reset}] All scanned images have ALT attributes defined.`);
  } else {
    console.log(`  [${colors.yellow}!${colors.reset}] Found ${colors.bold}${missingAltsCount}${colors.reset} image instances missing ALT attributes:`);
    missingAltList.forEach(item => console.log(`    - ${item}`));
    totalScore -= Math.min(10, missingAltsCount * 2);
    recommendations.push(`Images: Add descriptive 'alt' values to all ${missingAltsCount} missing images for crawler image indexing.`);
  }
  console.log("");

  // Final summary
  const finalScore = Math.max(0, totalScore);
  console.log(`${colors.bold}${colors.cyan}===============================================`);
  console.log(`                  AUDIT SUMMARY                `);
  console.log(`===============================================${colors.reset}`);
  
  let scoreColor = colors.green;
  if (finalScore < 85) scoreColor = colors.yellow;
  if (finalScore < 70) scoreColor = colors.red;
  
  console.log(`SEO Audit Score: ${scoreColor}${colors.bold}${finalScore}/100${colors.reset}`);
  
  if (recommendations.length > 0) {
    console.log(`\n${colors.bold}${colors.yellow}Recommendations for Google Top Ranking:${colors.reset}`);
    recommendations.forEach((rec, idx) => {
      console.log(`${idx + 1}. ${rec}`);
    });
  } else {
    console.log(`\n${colors.green}Excellent! Your site is fully optimized for top Google ranking!${colors.reset}`);
  }
  console.log(`${colors.cyan}===============================================${colors.reset}\n`);

  // Write audit results markdown file in the workspace
  const reportPath = path.join(__dirname, '../seo-report.md');
  let reportMd = `# SEO Audit Report - Rowshanara Edu\n\n`;
  reportMd += `Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n`;
  reportMd += `## Overall Score: **${finalScore}/100**\n\n`;
  
  if (recommendations.length > 0) {
    reportMd += `### Action Items / Recommendations\n`;
    recommendations.forEach((rec, idx) => {
      reportMd += `- [ ] ${rec}\n`;
    });
  } else {
    reportMd += `### Excellent!\nNo actions required. Your site is fully SEO optimized!\n`;
  }
  
  fs.writeFileSync(reportPath, reportMd);
  console.log(`Markdown report written to: ${colors.green}seo-report.md${colors.reset}`);
}

runAudit();
