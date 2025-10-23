const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Paths
const CSV_PATH = './Rules/Posts Export Oct 23 2025 (1).csv';
const BLOG_DIR = './src/app/blog';
const IMAGES_DIR = './public/images/blog-post';

// Helper function to convert title to slug
function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to convert title to image filename format
function titleToImageName(title) {
  return title
    .replace(/[\s–—]+/g, '-')  // Replace spaces and em/en dashes with hyphens
    .replace(/['']/g, '')       // Remove curly apostrophes
    .replace(/:/g, '')          // Remove colons
    .replace(/\./g, '')         // Remove periods
    .replace(/[^\w\-]/g, '-')   // Replace other special chars with hyphens
    .replace(/-+/g, '-')        // Collapse multiple hyphens
    .replace(/^-|-$/g, '');     // Remove leading/trailing hyphens
}

// Helper function to normalize title for matching
function normalizeForMatching(str) {
  return str
    .toLowerCase()
    .replace(/[:\-–—]/g, '') // Remove colons and different types of dashes
    .replace(/[^\w\s]/g, '') // Remove other punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper function to find matching image for a title
function findMatchingImage(title) {
  const images = fs.readdirSync(IMAGES_DIR);
  const expectedName = titleToImageName(title);

  // Try to find image with expected filename pattern
  for (const img of images) {
    const imgNameWithoutExt = img.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
    if (imgNameWithoutExt === expectedName) {
      return img;
    }
  }

  // Try case-insensitive match
  for (const img of images) {
    const imgNameWithoutExt = img.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
    if (imgNameWithoutExt.toLowerCase() === expectedName.toLowerCase()) {
      return img;
    }
  }

  return null;
}

// Helper function to convert WordPress HTML to Markdown
function convertWPtoMarkdown(html) {
  if (!html) return '';

  let markdown = html;

  // Preserve iframes (especially YouTube embeds) by temporarily replacing them
  // Also convert HTML attributes to JSX-compatible format
  const iframes = [];
  markdown = markdown.replace(/<iframe[^>]*>.*?<\/iframe>/gis, (match) => {
    let iframe = match;
    // Convert HTML attributes to JSX/React-compatible format
    iframe = iframe.replace(/\sclass=/g, ' className=');
    iframe = iframe.replace(/\sframeborder="[^"]*"/g, '');
    iframe = iframe.replace(/\sallowfullscreen/gi, ' allowFullScreen');
    // Remove inline style attribute as the MDX component handles styling
    iframe = iframe.replace(/\sstyle="[^"]*"/g, '');
    iframes.push(iframe);
    return `__IFRAME_${iframes.length - 1}__`;
  });

  // Remove WordPress comment blocks
  markdown = markdown.replace(/<!-- wp:[^>]+ -->/g, '');
  markdown = markdown.replace(/<!-- \/wp:[^>]+ -->/g, '');

  // Convert headings
  markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n');
  markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n');
  markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n');
  markdown = markdown.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n');
  markdown = markdown.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n');
  markdown = markdown.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n');

  // Convert strong/bold
  markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');

  // Convert emphasis/italic
  markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

  // Convert links
  markdown = markdown.replace(/<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

  // Convert lists
  markdown = markdown.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
    return '\n' + content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
  });

  markdown = markdown.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
    let counter = 1;
    return '\n' + content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`) + '\n';
  });

  // Convert paragraphs
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '\n$1\n');

  // Convert images
  markdown = markdown.replace(/<img\s+[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi, '\n![$2]($1)\n');
  markdown = markdown.replace(/<img\s+[^>]*src="([^"]+)"[^>]*>/gi, '\n![]($1)\n');

  // Convert figures with images
  markdown = markdown.replace(/<figure[^>]*>(.*?)<\/figure>/gis, '$1');

  // Convert blockquotes
  markdown = markdown.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (match, content) => {
    return '\n> ' + content.trim().replace(/\n/g, '\n> ') + '\n';
  });

  // Remove remaining HTML tags (except our preserved iframes)
  markdown = markdown.replace(/<[^>]+>/g, '');

  // Restore iframes
  iframes.forEach((iframe, index) => {
    markdown = markdown.replace(`__IFRAME_${index}__`, `\n\n${iframe}\n\n`);
  });

  // Clean up extra whitespace
  markdown = markdown.replace(/\n{3,}/g, '\n\n');
  markdown = markdown.trim();

  return markdown;
}

// Extract old slug from permalink
function extractOldSlug(permalink) {
  if (!permalink) return null;

  try {
    const url = new URL(permalink);
    const pathParts = url.pathname.split('/').filter(Boolean);
    return pathParts[pathParts.length - 1];
  } catch (e) {
    return null;
  }
}

// Parse date from permalink
function extractDateFromPermalink(permalink) {
  if (!permalink) return new Date().toISOString().split('T')[0];

  const match = permalink.match(/\/(\d{4})\/(\d{2})\//);
  if (match) {
    return `${match[1]}-${match[2]}-01`;
  }

  return new Date().toISOString().split('T')[0];
}

// Main import function
function importBlogPosts() {
  console.log('Starting blog post import...\n');

  // Read and parse CSV
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    relax_quotes: true,
  });

  console.log(`Found ${records.length} blog posts in CSV\n`);

  const redirects = [];
  const imported = [];
  const skipped = [];

  for (const record of records) {
    const title = record.Title?.trim();
    const content = record.Content?.trim();
    const metaTitle = record._seopress_titles_title?.trim() || title;
    const metaDescription = record._seopress_titles_desc?.trim() || '';
    const permalink = record.Permalink?.trim();

    if (!title || !content) {
      console.log(`⚠️  Skipping post with missing title or content`);
      skipped.push({ reason: 'Missing title or content', record });
      continue;
    }

    // Find matching image
    const matchingImage = findMatchingImage(title);

    if (!matchingImage) {
      console.log(`⚠️  No matching image found for: "${title}"`);
      skipped.push({ reason: 'No matching image', title });
      continue;
    }

    // Generate slug
    const slug = titleToSlug(title);
    const postDir = path.join(BLOG_DIR, slug);

    // Extract date from permalink
    const date = extractDateFromPermalink(permalink);

    // Convert content to markdown
    const markdownContent = convertWPtoMarkdown(content);

    // Create MDX content (no URL encoding needed since filenames are clean)
    const mdxContent = `export const article = {
  date: '${date}',
  title: '${title.replace(/'/g, "\\'")}',
  description: '${(metaDescription || markdownContent.substring(0, 150).replace(/\n/g, ' ')).replace(/'/g, "\\'")}',
  author: {
    name: 'CR Express',
    role: 'Logistics Team',
    image: { src: '/team/cr-express-team.jpg', width: 48, height: 48 }
  },
}

export const metadata = {
  title: '${metaTitle.replace(/'/g, "\\'")}',
  description: '${(metaDescription || markdownContent.substring(0, 160).replace(/\n/g, ' ')).replace(/'/g, "\\'")}',
}

<div className="relative my-10 overflow-hidden rounded-4xl bg-neutral-100 max-sm:-mx-6 aspect-[16/10]">
  <img src="/images/blog-post/${matchingImage}" alt="${title}" className="absolute inset-0 h-full w-full object-cover" />
</div>

${markdownContent}
`;

    // Create directory and write file
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }

    fs.writeFileSync(path.join(postDir, 'page.mdx'), mdxContent);

    console.log(`✅ Imported: ${title} -> /blog/${slug}`);
    imported.push({ title, slug });

    // Add redirect if we have an old permalink
    if (permalink) {
      const oldSlug = extractOldSlug(permalink);
      if (oldSlug && oldSlug !== slug) {
        redirects.push({
          source: `/${oldSlug}`,
          destination: `/blog/${slug}`,
          permanent: true,
        });

        // Also add redirect from old full path structure
        const url = new URL(permalink);
        if (url.pathname !== `/${oldSlug}`) {
          redirects.push({
            source: url.pathname.replace(/\/$/, ''),
            destination: `/blog/${slug}`,
            permanent: true,
          });
        }
      }
    }
  }

  // Save redirects to a JSON file
  fs.writeFileSync(
    './blog-redirects.json',
    JSON.stringify(redirects, null, 2)
  );

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('IMPORT SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successfully imported: ${imported.length} posts`);
  console.log(`⚠️  Skipped: ${skipped.length} posts`);
  console.log(`🔀 Generated redirects: ${redirects.length}`);
  console.log('\nRedirects saved to: blog-redirects.json');
  console.log('\nNext steps:');
  console.log('1. Review the imported posts');
  console.log('2. Add the redirects from blog-redirects.json to next.config.mjs');
  console.log('3. Test the redirects\n');

  if (skipped.length > 0) {
    console.log('\nSkipped posts:');
    skipped.forEach((skip, i) => {
      console.log(`${i + 1}. ${skip.title || 'Unknown'} - ${skip.reason}`);
    });
  }
}

// Run the import
try {
  importBlogPosts();
} catch (error) {
  console.error('Error during import:', error);
  process.exit(1);
}
