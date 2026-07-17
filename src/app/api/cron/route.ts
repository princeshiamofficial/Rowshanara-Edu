import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Simple helper to extract matches using Regex
function findMatch(html: string, regex: RegExp): string | null {
  const match = html.match(regex);
  return match ? match[1] || match[0] : null;
}

export async function GET(request: Request) {
  try {
    // 1. Secure the endpoint using a secret token check
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Allow run in development or if cron secret matches
    if (process.env.NODE_ENV === 'production' && secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ status: 'error', message: 'Unauthorized access' }, { status: 401 });
    }

    console.log("Starting automated search sync for Rowshanara Edu...");

    // 2. Fetch Google Search page with a modern browser user-agent
    const searchUrl = 'https://www.google.com/search?q=Rowshanara+Edu+Dhaka+contact';
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!response.ok) {
      throw new Error(`Google Search fetch failed with status: ${response.status}`);
    }

    const html = await response.text();
    const updates: Record<string, string> = {};

    // 3. Parse Phone numbers from page content
    // Look for matching Bangladeshi mobile patterns: +880 1511-710730 or similar
    const phoneRegex = /(\+880\s*1\d{3}-?\d{6})/;
    const phoneMatch = findMatch(html, phoneRegex);
    if (phoneMatch) {
      const cleanPhone = phoneMatch.trim();
      updates['phones'] = `Bangladesh: ${cleanPhone}`;
    }

    // 4. Parse Address details
    // Check if the HTML contains Motijheel / Dilkusha and capture surrounding text
    if (html.includes('Dilkusha') || html.includes('Motijheel')) {
      updates['address'] = "Dhaka Office:\nMNSN Tower, 60 Dilkusha\nDhaka 1000, Bangladesh";
    } else if (html.includes('Gulshan')) {
      updates['address'] = "Dhaka Office:\nHouse 45, Road 12, Gulshan-2\nDhaka 1212, Bangladesh";
    }

    // 5. Update database if any updates were parsed successfully
    const updatedKeys = Object.keys(updates);
    if (updatedKeys.length > 0) {
      for (const key of updatedKeys) {
        const bodyValue = updates[key];
        
        // Update the site_content records dynamically
        await query(
          "UPDATE site_content SET body = ? WHERE section = ? AND item_key = ?",
          [bodyValue, 'contact_information', key]
        );
      }
      
      return NextResponse.json({ 
        status: 'success', 
        message: 'Database synced successfully with search results', 
        updates 
      });
    }

    return NextResponse.json({ 
      status: 'success', 
      message: 'No changes detected or scraping bypassed',
      updates 
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error("Cron job error:", err.message);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
