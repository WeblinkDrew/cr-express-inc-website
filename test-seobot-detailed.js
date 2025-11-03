const { BlogClient } = require('seobot');

// Your API key
const API_KEY = '195b4025-e796-4b16-8e65-5686cb65bc18';

async function testSeobotAPIDetailed() {
  console.log('Testing SEObot API in detail...\n');

  try {
    const client = new BlogClient(API_KEY);

    // Fetch all articles to see what we have
    console.log('Fetching all articles...');
    const result = await client.getArticles(0, 100);

    console.log('\n=== SUMMARY ===');
    console.log('Total articles:', result.total);
    console.log('Articles returned:', result.articles?.length || 0);

    console.log('\n=== ALL ARTICLES ===');
    if (result.articles && result.articles.length > 0) {
      result.articles.forEach((article, index) => {
        console.log(`\n${index + 1}. ${article.headline}`);
        console.log('   Slug:', article.slug);
        console.log('   Published:', article.published);
        console.log('   PublishedAt:', article.publishedAt);
        console.log('   CreatedAt:', article.createdAt);
        console.log('   Category:', article.category?.title || 'None');
        console.log('   Tags:', article.tags?.length || 0);
      });
    } else {
      console.log('No articles found');
    }

    // Check the raw response structure
    console.log('\n=== RAW FIRST ARTICLE ===');
    if (result.articles && result.articles.length > 0) {
      console.log(JSON.stringify(result.articles[0], null, 2));
    }

  } catch (error) {
    console.error('\n❌ API Error:', error.message);
    console.error('Full error:', error);
  }
}

testSeobotAPIDetailed();