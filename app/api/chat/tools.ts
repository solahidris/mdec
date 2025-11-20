import { tool } from "ai";
import { source } from "@/lib/source";
import { z } from "zod";

export const searchDocumentation = tool({
  description: 'Search MDEC documentation for information about programmes (MTEP, DE Rantau, Expats), eligibility requirements, application processes, required documents, and other programme details. Use specific keywords and programme names for better results.',
  inputSchema: z.object({
    query: z.string().describe('A specific search query using keywords like programme names (MTEP, DE Rantau, Expats), topics (eligibility, application, documents, requirements), or specific terms. Examples: "mtep", "de rantau eligibility", "expats documents"'),
  }),
  execute: async ({ query }: { query: string }) => {
    const pages = source.getPages();
    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(/\s+/).filter(k => k.length > 0);
    
    const results: Array<{
      title: string;
      url: string;
      description: string;
      content: string;
    }> = [];

    for (const page of pages) {
      const title = page.data.title.toLowerCase();
      const description = page.data.description?.toLowerCase() || '';
      const url = page.url.toLowerCase();
      const content = await page.data.getText('processed');
      const contentLower = content.toLowerCase();

      // Check if ANY keyword matches in title, description, URL, or content
      const matchesAny = keywords.some(keyword => 
        title.includes(keyword) || 
        description.includes(keyword) || 
        url.includes(keyword) ||
        contentLower.includes(keyword)
      );

      if (matchesAny) {
        results.push({
          title: page.data.title,
          url: page.url,
          description: page.data.description || '',
          content: content.substring(0, 1500),
        });
      }
    }

    return {
      query,
      results: results.slice(0, 8), // Return top 8 results
      totalFound: results.length,
    };
  },
});
