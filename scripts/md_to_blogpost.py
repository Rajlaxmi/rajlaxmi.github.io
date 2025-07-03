#!/usr/bin/env python3

import re
import json
import sys
import os
from datetime import datetime
from pathlib import Path

def parse_simple_markdown(content):
    """Parse simple markdown format without frontmatter"""
    lines = content.strip().split('\n')
    
    if not lines or not lines[0].startswith('#'):
        raise ValueError("First line must be a title starting with #")
    
    # Extract title (remove # and strip)
    title = lines[0][1:].strip()
    
    # Extract excerpt (second line)
    excerpt = lines[1].strip() if len(lines) > 1 else ""
    
    # Rest is content (skip first two lines)
    content_lines = lines[2:] if len(lines) > 2 else []
    markdown_body = '\n'.join(content_lines).strip()
    
    return title, excerpt, markdown_body

def parse_table(lines, start_index):
    """Parse a markdown table starting at the given index"""
    table_lines = []
    i = start_index
    
    # Collect all table lines
    while i < len(lines):
        line = lines[i].strip()
        if not line or not line.startswith('|'):
            break
        table_lines.append(line)
        i += 1
    
    if len(table_lines) < 2:
        return None, start_index
    
    # Parse header row
    header_line = table_lines[0]
    headers = [cell.strip() for cell in header_line.split('|')[1:-1]]  # Remove empty first/last elements
    
    # Skip separator line (usually contains |---|---|)
    if len(table_lines) > 1 and '---' in table_lines[1]:
        data_start = 2
    else:
        data_start = 1
    
    # Parse data rows
    rows = []
    for line in table_lines[data_start:]:
        cells = [cell.strip() for cell in line.split('|')[1:-1]]  # Remove empty first/last elements
        if cells:  # Only add non-empty rows
            rows.append(cells)
    
    table_data = {
        'type': 'table',
        'headers': headers,
        'rows': rows
    }
    
    return table_data, i

def convert_markdown_to_content(markdown):
    """Convert markdown content to blog post content array"""
    lines = markdown.split('\n')
    content = []
    current_paragraph = ''
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Skip empty lines
        if not line:
            # Finish current paragraph if exists
            if current_paragraph:
                content.append({
                    'type': 'paragraph',
                    'text': current_paragraph.strip()
                })
                current_paragraph = ''
            i += 1
            continue
        
        # Headings (## or more #s, but not single #)
        if line.startswith('##'):
            # Finish current paragraph if exists
            if current_paragraph:
                content.append({
                    'type': 'paragraph',
                    'text': current_paragraph.strip()
                })
                current_paragraph = ''
            
            # Extract heading text (remove ## and strip)
            text = re.sub(r'^#+\s*', '', line)
            content.append({
                'type': 'heading',
                'text': text
            })
            i += 1
            continue
        
        # Images
        image_match = re.match(r'!\[(.*?)\]\((.*?)\)', line)
        if image_match:
            # Finish current paragraph if exists
            if current_paragraph:
                content.append({
                    'type': 'paragraph',
                    'text': current_paragraph.strip()
                })
                current_paragraph = ''
            
            alt_text = image_match.group(1)
            src = image_match.group(2)
            
            image_item = {'type': 'image', 'src': src}
            if alt_text:
                image_item['alt'] = alt_text
            
            content.append(image_item)
            i += 1
            continue
        
        # Blockquotes
        if line.startswith('>'):
            # Finish current paragraph if exists
            if current_paragraph:
                content.append({
                    'type': 'paragraph',
                    'text': current_paragraph.strip()
                })
                current_paragraph = ''
            
            text = re.sub(r'^>\s*', '', line)
            content.append({
                'type': 'quote',
                'text': text
            })
            i += 1
            continue
        
        # Tables
        if line.startswith('|'):
            # Finish current paragraph if exists
            if current_paragraph:
                content.append({
                    'type': 'paragraph',
                    'text': current_paragraph.strip()
                })
                current_paragraph = ''
            
            table_data, new_index = parse_table(lines, i)
            if table_data:
                content.append(table_data)
                i = new_index
                continue
        
        # Regular text - add to current paragraph
        if current_paragraph:
            current_paragraph += ' ' + line
        else:
            current_paragraph = line
        
        i += 1
    
    # Add final paragraph if exists
    if current_paragraph:
        content.append({
            'type': 'paragraph',
            'text': current_paragraph.strip()
        })
    
    return content

def generate_slug(title):
    """Generate URL-friendly slug from title"""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def generate_variable_name(title):
    """Generate a valid TypeScript variable name from title"""
    # Remove special characters and convert to PascalCase
    words = re.findall(r'[a-zA-Z0-9]+', title)
    return ''.join(word.capitalize() for word in words)

def calculate_read_time(content):
    """Calculate estimated read time based on content"""
    words_per_minute = 200
    total_words = 0
    
    for item in content:
        if item['type'] in ['paragraph', 'heading', 'quote']:
            total_words += len(item['text'].split())
    
    minutes = max(1, (total_words + words_per_minute - 1) // words_per_minute)
    return f"{minutes} min read"

def convert_md_to_blogpost(input_path, output_dir='scripts'):
    """Convert markdown file to TypeScript blog post"""
    try:
        # Read markdown file
        with open(input_path, 'r', encoding='utf-8') as f:
            markdown_content = f.read()
        
        # Parse simple markdown format
        title, excerpt, markdown_body = parse_simple_markdown(markdown_content)
        
        # Convert markdown to content array
        content = convert_markdown_to_content(markdown_body)
        
        # Generate blog post object
        blog_post = {
            'id': '1',  # Default ID
            'title': title,
            'excerpt': excerpt,
            'date': '2024-01-15',  # Default date
            'readTime': calculate_read_time(content),
            'category': 'Reasoning',  # Default category
            'slug': generate_slug(title),
            'content': content
        }
        
        # If no excerpt provided, generate from first paragraph
        if not blog_post['excerpt']:
            first_paragraph = next((item for item in content if item['type'] == 'paragraph'), None)
            if first_paragraph:
                excerpt = first_paragraph['text'][:150]
                if len(first_paragraph['text']) > 150:
                    excerpt += '...'
                blog_post['excerpt'] = excerpt
        
        # Generate TypeScript file content
        file_name = Path(input_path).stem
        variable_name = generate_variable_name(title)
        
        # Format the content array for TypeScript with proper indentation
        content_lines = []
        content_lines.append('  content: [')
        
        for i, item in enumerate(blog_post['content']):
            if item['type'] == 'image' and 'alt' in item:
                line = f"    {{ type: '{item['type']}', src: '{item['src']}', alt: '{item['alt']}' }}"
            elif item['type'] == 'image':
                line = f"    {{ type: '{item['type']}', src: '{item['src']}' }}"
            elif item['type'] == 'table':
                # Format table data
                headers_str = "[" + ", ".join([f"'{h}'" for h in item['headers']]) + "]"
                rows_parts = []
                for row in item['rows']:
                    row_cells = [f"'{cell.replace(chr(39), chr(92) + chr(39))}'" for cell in row]
                    rows_parts.append("[" + ", ".join(row_cells) + "]")
                rows_str = "[" + ", ".join(rows_parts) + "]"
                line = f"    {{ type: 'table', headers: {headers_str}, rows: {rows_str} }}"
            else:
                # Escape single quotes in text
                text = item['text'].replace("'", "\\'")
                line = f"    {{ type: '{item['type']}', text: '{text}' }}"
            
            if i < len(blog_post['content']) - 1:
                line += ','
            content_lines.append(line)
        
        content_lines.append('  ],')
        content_str = '\n'.join(content_lines)
        
        ts_content = f"""import {{ BlogPost }} from './blogPosts';

export const {variable_name}: BlogPost = {{
  id: '{blog_post['id']}',
  title: '{blog_post['title']}',
  excerpt: '{blog_post['excerpt']}',
  date: '{blog_post['date']}',
  readTime: '{blog_post['readTime']}',
  category: '{blog_post['category']}',
  slug: '{blog_post['slug']}',
{content_str}
}};"""
        
        # Ensure output directory exists
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
        # Write TypeScript file
        output_path = Path(output_dir) / f"{file_name}.ts"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(ts_content)
        
        print(f"✅ Successfully converted {input_path} to {output_path}")
        print(f"📝 Blog post: \"{blog_post['title']}\"")
        print(f"🏷️  Category: {blog_post['category']}")
        print(f"⏱️  Read time: {blog_post['readTime']}")
        print(f"🔗 Slug: {blog_post['slug']}")
        print(f"📋 Variable name: {variable_name}")
        
        return str(output_path)
        
    except Exception as e:
        print(f"❌ Error converting {input_path}: {str(e)}")
        sys.exit(1)

def main():
    """Main CLI function"""
    if len(sys.argv) < 2:
        print("""
Usage: python scripts/md_to_blogpost.py <markdown-file> [output-directory]

Example:
  python scripts/md_to_blogpost.py example.md
  python scripts/md_to_blogpost.py example.md scripts

Markdown file format:
# Title
Excerpt text here

## Heading
Regular paragraph text here.

## Another Heading  
More paragraph text.
        """)
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else 'scripts'
    
    if not os.path.exists(input_path):
        print(f"❌ File not found: {input_path}")
        sys.exit(1)
    
    convert_md_to_blogpost(input_path, output_dir)

if __name__ == '__main__':
    main() 