const { BlogClient } = require('seobot');

// Your API key
const API_KEY = '195b4025-e796-4b16-8e65-5686cb65bc18';

async function testSeobotAPI() {
  console.log('Testing SEObot API...\n');

  try {
    const client = new BlogClient(API_KEY);

    // Test 1: Fetch articles (page 0, limit 5)
    console.log('1. Testing getArticles(0, 5)...');
    const articlesResult = await client.getArticles(0, 5);
    console.log('Articles fetched:', {
      total: articlesResult.total,
      count: articlesResult.articles?.length || 0,
      firstArticle: articlesResult.articles?.[0] ? {
        id: articlesResult.articles[0].id,
        slug: articlesResult.articles[0].slug,
        headline: articlesResult.articles[0].headline,
        published: articlesResult.articles[0].published,
      } : null
    });

    // Test 2: Get a specific article if we have one
    if (articlesResult.articles && articlesResult.articles.length > 0) {
      const firstSlug = articlesResult.articles[0].slug;
      console.log(`\n2. Testing getArticle('${firstSlug}')...`);
      const article = await client.getArticle(firstSlug);
      console.log('Article fetched:', {
        slug: article.slug,
        headline: article.headline,
        hasHtml: !!article.html,
        htmlLength: article.html?.length || 0,
      });
    }

    console.log('\n✅ API is working correctly!');

  } catch (error) {
    console.error('\n❌ API Error:', error.message);
    console.error('Full error:', error);
  }
}

testSeobotAPI();