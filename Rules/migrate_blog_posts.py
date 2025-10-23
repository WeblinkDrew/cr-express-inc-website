#!/usr/bin/env python3
"""
WordPress XML to MDX Blog Post Converter
Parses WordPress XML export and creates MDX files for Next.js blog
"""

import xml.etree.ElementTree as ET
import re
import os
import json
from pathlib import Path
from html import unescape

def clean_wordpress_content(content):
    """
    Remove WordPress block comments and convert HTML to clean Markdown
    """
    # Remove WordPress block comments
    content = re.sub(r'<!-- wp:[^>]+ -->\n?', '', content)
    content = re.sub(r'<!-- /wp:[^>]+ -->\n?', '', content)

    # Convert HTML paragraph tags to markdown
    content = re.sub(r'<p>(.*?)</p>', r'\1\n', content, flags=re.DOTALL)

    # Convert HTML headings to markdown
    content = re.sub(r'<h1>(.*?)</h1>', r'# \1', content)
    content = re.sub(r'<h2>(.*?)</h2>', r'## \1', content)
    content = re.sub(r'<h3>(.*?)</h3>', r'### \1', content)
    content = re.sub(r'<h4>(.*?)</h4>', r'#### \1', content)
    content = re.sub(r'<h5>(.*?)</h5>', r'##### \1', content)
    content = re.sub(r'<h6>(.*?)</h6>', r'###### \1', content)

    # Convert HTML lists to markdown
    content = re.sub(r'<ul>\s*', '', content)
    content = re.sub(r'</ul>\s*', '\n', content)
    content = re.sub(r'<ol>\s*', '', content)
    content = re.sub(r'</ol>\s*', '\n', content)
    content = re.sub(r'<li>(.*?)</li>', r'- \1', content, flags=re.DOTALL)

    # Convert HTML strong/bold to markdown
    content = re.sub(r'<strong>(.*?)</strong>', r'**\1**', content)
    content = re.sub(r'<b>(.*?)</b>', r'**\1**', content)

    # Convert HTML emphasis/italic to markdown
    content = re.sub(r'<em>(.*?)</em>', r'*\1*', content)
    content = re.sub(r'<i>(.*?)</i>', r'*\1*', content)

    # Convert HTML links to markdown
    content = re.sub(r'<a href="(.*?)"[^>]*>(.*?)</a>', r'[\2](\1)', content)

    # Convert HTML images to markdown
    content = re.sub(r'<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*/?>', r'![\2](\1)', content)
    content = re.sub(r'<img[^>]*src="([^"]+)"[^>]*/>', r'![](\1)', content)

    # Convert HTML blockquotes to markdown
    content = re.sub(r'<blockquote>\s*(.*?)\s*</blockquote>', r'> \1', content, flags=re.DOTALL)

    # Convert HTML code blocks
    content = re.sub(r'<pre><code>(.*?)</code></pre>', r'```\n\1\n```', content, flags=re.DOTALL)
    content = re.sub(r'<code>(.*?)</code>', r'`\1`', content)

    # Convert HTML line breaks
    content = re.sub(r'<br\s*/?>', '\n', content)

    # Unescape HTML entities
    content = unescape(content)

    # Clean up multiple newlines
    content = re.sub(r'\n\n\n+', '\n\n', content)

    # Strip leading/trailing whitespace
    content = content.strip()

    return content

def extract_description(content, max_length=200):
    """
    Extract first paragraph or first N characters as description
    """
    # Get first paragraph (text before first double newline)
    paragraphs = content.split('\n\n')
    first_para = paragraphs[0] if paragraphs else content

    # Remove markdown formatting for description
    desc = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', first_para)  # Remove links
    desc = re.sub(r'[*_`#]', '', desc)  # Remove markdown symbols
    desc = desc.strip()

    # Truncate if too long
    if len(desc) > max_length:
        desc = desc[:max_length].rsplit(' ', 1)[0] + '...'

    return desc

def slugify(text):
    """
    Convert text to URL-friendly slug
    """
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

def create_mdx_file(post_data, blog_dir):
    """
    Create an MDX file for a blog post
    """
    title = post_data['title']
    slug = post_data['slug']
    date = post_data['date']
    content = post_data['content']
    description = post_data['description']
    featured_image = post_data['featured_image']

    # Create directory for blog post
    post_dir = os.path.join(blog_dir, slug)
    os.makedirs(post_dir, exist_ok=True)

    # Escape single quotes in title and description
    title_escaped = title.replace("'", "\\'")
    description_escaped = description.replace("'", "\\'")

    # Create MDX content with frontmatter
    mdx_content = f"""export const article = {{
  date: '{date}',
  title: '{title_escaped}',
  description: '{description_escaped}',
  author: {{
    name: 'CR Express',
    role: 'Logistics Team',
  }},
}}

export const metadata = {{
  title: article.title,
  description: article.description,
}}

"""

    # Add featured image if available
    if featured_image:
        mdx_content += f"![{title}]({featured_image})\n\n"

    # Add content
    mdx_content += content

    # Write MDX file
    mdx_path = os.path.join(post_dir, 'page.mdx')
    with open(mdx_path, 'w', encoding='utf-8') as f:
        f.write(mdx_content)

    return mdx_path

def parse_xml_and_create_posts(xml_path, blog_dir):
    """
    Parse WordPress XML export and create MDX blog posts
    """
    # Parse XML
    tree = ET.parse(xml_path)
    root = tree.getroot()

    posts_created = []
    posts_with_issues = []

    # Process each post
    for post in root.findall('post'):
        try:
            # Extract post data
            post_id = post.find('id').text if post.find('id') is not None else ''
            title = post.find('Title').text if post.find('Title') is not None else 'Untitled'
            content_elem = post.find('Content')
            raw_content = content_elem.text if content_elem is not None else ''
            slug_elem = post.find('Slug')
            slug = slug_elem.text if slug_elem is not None and slug_elem.text else slugify(title)
            date = post.find('Date').text if post.find('Date') is not None else '2023-01-01'
            featured_image = post.find('ImageFeatured').text if post.find('ImageFeatured') is not None else ''

            # Clean content
            cleaned_content = clean_wordpress_content(raw_content)

            # Extract description
            description = extract_description(cleaned_content)

            # Create post data
            post_data = {
                'id': post_id,
                'title': title,
                'content': cleaned_content,
                'slug': slug,
                'date': date,
                'description': description,
                'featured_image': featured_image
            }

            # Create MDX file
            mdx_path = create_mdx_file(post_data, blog_dir)

            posts_created.append({
                'title': title,
                'slug': slug,
                'date': date,
                'path': mdx_path
            })

            print(f"✓ Created: {title} ({slug})")

        except Exception as e:
            posts_with_issues.append({
                'title': title if 'title' in locals() else 'Unknown',
                'error': str(e)
            })
            print(f"✗ Error creating post: {title if 'title' in locals() else 'Unknown'} - {str(e)}")

    return posts_created, posts_with_issues

def main():
    """
    Main execution function
    """
    xml_path = '/Users/andrewsimic/Developer/CR EXPRESS Updated Site/studio-ts/Rules/Posts Export Oct 16 2025.xml'
    blog_dir = '/Users/andrewsimic/Developer/CR EXPRESS Updated Site/studio-ts/src/app/blog'

    print("WordPress XML to MDX Converter")
    print("=" * 50)
    print(f"XML File: {xml_path}")
    print(f"Blog Directory: {blog_dir}")
    print("=" * 50)
    print()

    # Parse and create posts
    posts_created, posts_with_issues = parse_xml_and_create_posts(xml_path, blog_dir)

    # Print summary
    print()
    print("=" * 50)
    print("MIGRATION SUMMARY")
    print("=" * 50)
    print(f"Total posts created: {len(posts_created)}")
    print(f"Posts with issues: {len(posts_with_issues)}")
    print()

    if posts_created:
        print("CREATED POSTS:")
        print("-" * 50)
        for post in posts_created:
            print(f"  • {post['title']}")
            print(f"    Slug: {post['slug']}")
            print(f"    Date: {post['date']}")
            print()

    if posts_with_issues:
        print("POSTS WITH ISSUES:")
        print("-" * 50)
        for post in posts_with_issues:
            print(f"  • {post['title']}")
            print(f"    Error: {post['error']}")
            print()

    # Save summary to JSON
    summary = {
        'posts_created': posts_created,
        'posts_with_issues': posts_with_issues,
        'total_created': len(posts_created),
        'total_issues': len(posts_with_issues)
    }

    summary_path = os.path.join(blog_dir, 'migration_summary.json')
    with open(summary_path, 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2)

    print(f"Summary saved to: {summary_path}")

if __name__ == '__main__':
    main()
