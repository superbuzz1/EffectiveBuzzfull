// src/backend/services/ScraperService.ts
import axios from 'axios';

export interface ScrapedData {
  title?: string;
  description?: string;
  keywords?: string;
  heroText?: string;
  rawText?: string;
}

export class ScraperService {
  /**
   * Scrapes a company website to extract context for AI drafting.
   */
  public static async scrapeDomain(domain: string): Promise<ScrapedData> {
    const url = domain.startsWith('http') ? domain : `https://${domain}`;
    
    try {
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const html = response.data;
      const result: ScrapedData = {};

      // Simple regex-based extraction to avoid heavy cheerio dependency for now
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      if (titleMatch) result.title = titleMatch[1].trim();

      const descMatch = html.match(/<meta name="description" content="(.*?)"/i);
      if (descMatch) result.description = descMatch[1].trim();

      const keywordsMatch = html.match(/<meta name="keywords" content="(.*?)"/i);
      if (keywordsMatch) result.keywords = keywordsMatch[1].trim();

      // Extract some "hero" text (first H1 or high-level divs)
      const h1Match = html.match(/<h1.*?>(.*?)<\/h1>/i);
      if (h1Match) result.heroText = h1Match[1].replace(/<.*?>/g, '').trim();

      // Basic text extraction (stripped of tags)
      result.rawText = html
        .replace(/<script.*?>.*?<\/script>/gs, '')
        .replace(/<style.*?>.*?<\/style>/gs, '')
        .replace(/<.*?>/g, ' ')
        .replace(/\s+/g, ' ')
        .substring(0, 2000); // Limit to first 2k chars for context

      return result;
    } catch (err: any) {
      console.warn(`[SCRAPER_SERVICE] Failed to scrape ${url}:`, err.message);
      return { description: "Content unavailable for scraping." };
    }
  }
}
