import { getServerSideSitemap } from 'next-sitemap'
import db from '@/lib/db'  // Adjust the path according to your database connection file

// Function to escape special characters in XML
function escapeXML(str: string): string {
    return str.replace(/[&<>"']/g, (char) => {
      switch (char) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&apos;';
        default:
          return char;
      }
    });
  }
  
  // Now use this function to escape the URL in your sitemap generation
  
  export async function GET(request: Request) {
    try {
      const [articles]: any = await db.execute(
        `SELECT title_slug, updated_at FROM posts`
      );
  
      const articleSitemap = articles.map((article: any) => ({
        loc: `${process.env.BACKEND_URL}/post/${escapeXML(article.title_slug)}`, // Escape the URL here
        lastmod: article.updated_at ? new Date(article.updated_at).toISOString() : new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9,
      }));
  
      return getServerSideSitemap(articleSitemap);
  
    } catch (error) {
      console.error('Error fetching articles:', error);
      return getServerSideSitemap([]);
    }
  }
  