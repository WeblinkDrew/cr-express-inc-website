#!/usr/bin/env python3
"""
WordPress XML to MDX Converter
Converts WordPress export XML to clean MDX blog posts with NO HTML tags.
"""

import xml.etree.ElementTree as ET
import re
import os
from pathlib import Path
from html import unescape
from datetime import datetime


def clean_html_to_markdown(html_content):
    """Convert HTML to clean markdown with NO HTML tags remaining."""
    if not html_content:
        return ""

    content = html_content.strip()

    # Remove WordPress block comments
    content = re.sub(r'<!--\s*wp:.*?-->', '', content, flags=re.DOTALL)
    content = re.sub(r'<!--\s*/wp:.*?-->', '', content, flags=re.DOTALL)

    # Remove CDATA markers
    content = content.replace('<![CDATA[', '').replace(']]>', '')

    # Convert headings (h1-h6) to markdown
    for i in range(1, 7):
        content = re.sub(
            rf'<h{i}[^>]*>(.*?)</h{i}>',
            lambda m: f"{'#' * i} {m.group(1).strip()}\n",
            content,
            flags=re.DOTALL | re.IGNORECASE
        )

    # Convert strong/bold tags
    content = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<b[^>]*>(.*?)</b>', r'**\1**', content, flags=re.DOTALL | re.IGNORECASE)

    # Convert em/italic tags
    content = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', content, flags=re.DOTALL | re.IGNORECASE)
    content = re.sub(r'<i[^>]*>(.*?)</i>', r'*\1*', content, flags=re.DOTALL | re.IGNORECASE)

    # Convert links to markdown
    content = re.sub(
        r'<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>',
        r'[\2](\1)',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )

    # Convert blockquotes
    content = re.sub(
        r'<blockquote[^>]*>(.*?)</blockquote>',
        lambda m: '\n> ' + m.group(1).strip().replace('\n', '\n> ') + '\n',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )

    # Convert unordered lists
    def convert_ul(match):
        list_content = match.group(1)
        items = re.findall(r'<li[^>]*>(.*?)</li>', list_content, flags=re.DOTALL | re.IGNORECASE)
        return '\n' + '\n'.join(f"- {item.strip()}" for item in items) + '\n'

    content = re.sub(r'<ul[^>]*>(.*?)</ul>', convert_ul, content, flags=re.DOTALL | re.IGNORECASE)

    # Convert ordered lists
    def convert_ol(match):
        list_content = match.group(1)
        items = re.findall(r'<li[^>]*>(.*?)</li>', list_content, flags=re.DOTALL | re.IGNORECASE)
        return '\n' + '\n'.join(f"{i+1}. {item.strip()}" for i, item in enumerate(items)) + '\n'

    content = re.sub(r'<ol[^>]*>(.*?)</ol>', convert_ol, content, flags=re.DOTALL | re.IGNORECASE)

    # Convert tables to markdown
    def convert_table(match):
        table_html = match.group(0)
        rows = []

        # Extract headers
        headers = re.findall(r'<th[^>]*>(.*?)</th>', table_html, flags=re.DOTALL | re.IGNORECASE)
        if headers:
            headers = [h.strip() for h in headers]
            rows.append('| ' + ' | '.join(headers) + ' |')
            rows.append('| ' + ' | '.join(['---'] * len(headers)) + ' |')

        # Extract data rows
        tr_matches = re.findall(r'<tr[^>]*>(.*?)</tr>', table_html, flags=re.DOTALL | re.IGNORECASE)
        for tr in tr_matches:
            cells = re.findall(r'<td[^>]*>(.*?)</td>', tr, flags=re.DOTALL | re.IGNORECASE)
            if cells:
                cells = [c.strip() for c in cells]
                rows.append('| ' + ' | '.join(cells) + ' |')

        return '\n' + '\n'.join(rows) + '\n' if rows else ''

    content = re.sub(r'<table[^>]*>.*?</table>', convert_table, content, flags=re.DOTALL | re.IGNORECASE)

    # Convert iframes to links
    def convert_iframe(match):
        src = re.search(r'src=["\']([^"\']+)["\']', match.group(0))
        if src:
            url = src.group(1)
            if 'youtube' in url or 'vimeo' in url:
                return f'\n[Watch Video]({url})\n'
            return f'\n[Embedded Content]({url})\n'
        return ''

    content = re.sub(r'<iframe[^>]*>.*?</iframe>', convert_iframe, content, flags=re.DOTALL | re.IGNORECASE)

    # Convert images to markdown
    content = re.sub(
        r'<img\s+[^>]*src=["\']([^"\']+)["\'][^>]*alt=["\']([^"\']*)["\'][^>]*>',
        r'![\2](\1)',
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r'<img\s+[^>]*alt=["\']([^"\']*)["\'][^>]*src=["\']([^"\']+)["\'][^>]*>',
        r'![\1](\2)',
        content,
        flags=re.IGNORECASE
    )
    content = re.sub(
        r'<img\s+[^>]*src=["\']([^"\']+)["\'][^>]*>',
        r'![](\1)',
        content,
        flags=re.IGNORECASE
    )

    # Remove figure tags but keep content
    content = re.sub(r'<figure[^>]*>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'</figure>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<figcaption[^>]*>.*?</figcaption>', '', content, flags=re.DOTALL | re.IGNORECASE)

    # Remove code/pre tags but keep content
    content = re.sub(r'<code[^>]*>', '`', content, flags=re.IGNORECASE)
    content = re.sub(r'</code>', '`', content, flags=re.IGNORECASE)
    content = re.sub(r'<pre[^>]*>', '\n```\n', content, flags=re.IGNORECASE)
    content = re.sub(r'</pre>', '\n```\n', content, flags=re.IGNORECASE)

    # Remove superscript citations
    content = re.sub(r'<sup[^>]*>\[?\d+\]?</sup>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<sup[^>]*>.*?</sup>', '', content, flags=re.DOTALL | re.IGNORECASE)

    # Remove remaining paragraph tags
    content = re.sub(r'<p[^>]*>', '\n', content, flags=re.IGNORECASE)
    content = re.sub(r'</p>', '\n', content, flags=re.IGNORECASE)

    # Remove br tags
    content = re.sub(r'<br\s*/?>', '\n', content, flags=re.IGNORECASE)

    # Remove divs and spans but keep content
    content = re.sub(r'<div[^>]*>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'</div>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'<span[^>]*>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'</span>', '', content, flags=re.IGNORECASE)

    # Remove any remaining HTML tags
    content = re.sub(r'<[^>]+>', '', content)

    # Unescape HTML entities
    content = unescape(content)

    # Clean up whitespace
    content = re.sub(r'\n{3,}', '\n\n', content)
    content = re.sub(r' +', ' ', content)
    content = content.strip()

    return content


def escape_frontmatter_string(text):
    """Escape apostrophes and quotes in frontmatter strings."""
    if not text:
        return ""
    # Escape single quotes
    text = text.replace("'", "\\'")
    # Remove newlines
    text = text.replace('\n', ' ').replace('\r', ' ')
    # Clean up multiple spaces
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def generate_description(content, max_length=150):
    """Generate a clean description from content."""
    # Remove markdown syntax
    desc = re.sub(r'[#*`\[\]()]', '', content)
    desc = desc.strip()

    # Get first sentence or max_length chars
    sentences = re.split(r'[.!?]', desc)
    if sentences and sentences[0]:
        desc = sentences[0].strip()

    if len(desc) > max_length:
        desc = desc[:max_length].rsplit(' ', 1)[0] + '...'

    return escape_frontmatter_string(desc)


def create_mdx_file(post_data, target_dir):
    """Create an MDX file from post data."""
    slug = post_data['slug']
    title = post_data['title']
    content = post_data['content']
    date = post_data['date']
    featured_image = post_data['featured_image']

    # Create post directory
    post_dir = os.path.join(target_dir, slug)
    os.makedirs(post_dir, exist_ok=True)

    # Generate description from content
    description = generate_description(content)

    # Escape title for frontmatter
    escaped_title = escape_frontmatter_string(title)

    # Format date
    try:
        date_obj = datetime.strptime(date, '%Y-%m-%d')
        formatted_date = date_obj.strftime('%Y-%m-%d')
    except:
        formatted_date = date

    # Create MDX content
    mdx_content = f"""import {{ BlogLayout }} from '@/components/BlogLayout'

export const metadata = {{
  title: '{escaped_title}',
  description: '{description}',
  author: {{
    name: 'CR Express',
    role: 'Logistics Team',
    image: {{ src: '/team/cr-express-team.jpg' }}
  }},
  date: '{formatted_date}'
}}

export default (props) => <BlogLayout metadata={{metadata}} {{...props}} />

![{escaped_title}]({featured_image})

{content}
"""

    # Write file
    mdx_file = os.path.join(post_dir, 'page.mdx')
    with open(mdx_file, 'w', encoding='utf-8') as f:
        f.write(mdx_content)

    return mdx_file


def verify_no_html_tags(file_path):
    """Verify that a file contains no HTML tags."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip the first 15 lines (frontmatter)
    lines = content.split('\n')
    body_content = '\n'.join(lines[15:])

    # Check for HTML tags (excluding markdown image syntax)
    # Match < followed by letters (not just <)
    html_pattern = r'<[a-zA-Z/][^>]*>'
    matches = re.findall(html_pattern, body_content)

    # Filter out false positives (like email addresses)
    actual_html = [m for m in matches if not re.match(r'<[^@>]*@[^>]*>', m)]

    return len(actual_html) == 0, actual_html


def main():
    """Main conversion function."""
    xml_file = '/Users/andrewsimic/Developer/CR EXPRESS Updated Site/studio-ts/Rules/Posts Export Oct 16 2025.xml'
    target_dir = '/Users/andrewsimic/Developer/CR EXPRESS Updated Site/studio-ts/src/app/blog'

    print(f"Parsing XML file: {xml_file}")

    # Parse XML
    tree = ET.parse(xml_file)
    root = tree.getroot()

    posts = []
    errors = []

    # Extract all posts
    for post_elem in root.findall('post'):
        try:
            post_id = post_elem.find('id').text if post_elem.find('id') is not None else 'unknown'
            title = post_elem.find('Title').text if post_elem.find('Title') is not None else 'Untitled'
            content_elem = post_elem.find('Content')
            content = content_elem.text if content_elem is not None else ''
            slug = post_elem.find('Slug').text if post_elem.find('Slug') is not None else f'post-{post_id}'
            date = post_elem.find('Date').text if post_elem.find('Date') is not None else '2023-01-01'
            featured_image = post_elem.find('ImageFeatured').text if post_elem.find('ImageFeatured') is not None else ''

            # Convert HTML to markdown
            clean_content = clean_html_to_markdown(content)

            posts.append({
                'id': post_id,
                'title': title,
                'content': clean_content,
                'slug': slug,
                'date': date,
                'featured_image': featured_image
            })

            print(f"✓ Extracted post: {title} (ID: {post_id})")

        except Exception as e:
            errors.append(f"Error processing post {post_id}: {str(e)}")
            print(f"✗ Error processing post {post_id}: {str(e)}")

    print(f"\nExtracted {len(posts)} posts")
    print(f"Creating MDX files in: {target_dir}\n")

    # Create MDX files
    created_files = []
    html_check_errors = []

    for post in posts:
        try:
            mdx_file = create_mdx_file(post, target_dir)
            created_files.append(mdx_file)

            # Verify no HTML tags
            is_clean, html_tags = verify_no_html_tags(mdx_file)
            if not is_clean:
                html_check_errors.append({
                    'file': mdx_file,
                    'tags': html_tags
                })
                print(f"⚠ WARNING: HTML tags found in {mdx_file}")
                for tag in html_tags[:5]:  # Show first 5
                    print(f"    {tag}")
            else:
                print(f"✓ Created clean MDX: {post['slug']}/page.mdx")

        except Exception as e:
            errors.append(f"Error creating MDX for {post['slug']}: {str(e)}")
            print(f"✗ Error creating MDX for {post['slug']}: {str(e)}")

    # Print summary
    print("\n" + "="*60)
    print("CONVERSION SUMMARY")
    print("="*60)
    print(f"Total posts processed: {len(posts)}")
    print(f"MDX files created: {len(created_files)}")
    print(f"Errors encountered: {len(errors)}")
    print(f"Files with HTML tags: {len(html_check_errors)}")

    if html_check_errors:
        print("\n⚠ WARNING: The following files contain HTML tags:")
        for item in html_check_errors:
            print(f"  - {item['file']}")
            print(f"    Tags found: {', '.join(item['tags'][:3])}")
    else:
        print("\n✓ SUCCESS: All MDX files are clean (no HTML tags)")

    if errors:
        print("\nErrors:")
        for error in errors:
            print(f"  - {error}")

    print("\nTarget directory: " + target_dir)


if __name__ == '__main__':
    main()
