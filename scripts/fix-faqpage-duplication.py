#!/usr/bin/env python3
"""
Fix FAQ Page Schema Duplication in Static Course Pages

Google Search Console is reporting "Duplicate field 'FAQPage'" errors because:
1. Static course pages have hardcoded FAQPage schemas
2. The dynamic [slug].tsx routes ALSO add FAQPage via CMSCourseFAQSchemaWrapper
3. This causes validation errors

Solution: Remove the hardcoded FAQPage schemas from all static course pages.
The dynamic schema from the API is the correct source of truth.
"""

import os
import re
import glob

COURSES_DIR = '/Users/wilfred/admi-website/src/pages/courses'

def extract_faqpage_block(content):
    """
    Find and extract the FAQPage script block in the file.
    Returns the block to remove or None if not found.
    """
    # Pattern to match the FAQPage schema block in TSX format
    # Matches from <script to </script> when it contains '@type': 'FAQPage'
    pattern = r'<script\s+type="application/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(\{\s*[\'"]@context[\'"]:\s*[\'"]https://schema\.org[\'"],\s*[\'"]@type[\'"]:\s*[\'"]FAQPage[\'"][\s\S]*?\}\)\s*\}\s*\}\s*/>\s*'
    
    matches = re.finditer(pattern, content, re.MULTILINE | re.DOTALL)
    blocks_to_remove = []
    
    for match in matches:
        blocks_to_remove.append(match.group(0))
    
    if blocks_to_remove:
        return blocks_to_remove
    
    # Fallback: Find by simple text matching if regex fails
    # Look for the script tag containing FAQPage
    lines = content.split('\n')
    blocks = []
    in_faqpage_block = False
    start_line = -1
    brace_count = 0
    
    for i, line in enumerate(lines):
        if '<script' in line and 'application/ld+json' in line:
            in_faqpage_block = True
            start_line = i
            brace_count = 0
        
        if in_faqpage_block:
            brace_count += line.count('{') - line.count('}')
            
            if 'FAQPage' in line:
                # Mark that we found a FAQPage block
                found_faqpage = True
            
            if '</script>' in line and brace_count <= 0:
                # End of block
                if start_line >= 0:
                    block_text = '\n'.join(lines[start_line:i+1])
                    if 'FAQPage' in block_text:
                        blocks.append((start_line, i+1, block_text + '\n'))
                in_faqpage_block = False
                start_line = -1
    
    return blocks if blocks else []

def remove_faqpage_schemas(file_path):
    """
    Remove FAQPage schema blocks from a course file.
    Returns True if changes were made, False otherwise.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    # Find and remove FAQPage blocks
    blocks_to_remove = extract_faqpage_block(original_content)
    
    if not blocks_to_remove:
        return False
    
    modified_content = original_content
    
    # Handle both string blocks and (start, end, text) tuples
    for block_info in blocks_to_remove:
        if isinstance(block_info, tuple):
            # (start_line, end_line, text) format
            block = block_info[2]
        else:
            # String format
            block = block_info
        
        modified_content = modified_content.replace(block, '', 1)
    
    # Write back only if changes were made
    if modified_content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(modified_content)
        return True
    
    return False

def main():
    # Find all static course files (exclude dynamic [slug].tsx)
    static_files = glob.glob(os.path.join(COURSES_DIR, '*.tsx'))
    static_files = [f for f in static_files if '[' not in os.path.basename(f)]
    
    print(f"Found {len(static_files)} static course files")
    
    fixed_count = 0
    errors = []
    
    for file_path in sorted(static_files):
        file_name = os.path.basename(file_path)
        try:
            if remove_faqpage_schemas(file_path):
                print(f"✓ Fixed: {file_name}")
                fixed_count += 1
            else:
                print(f"- No changes: {file_name}")
        except Exception as e:
            errors.append((file_name, str(e)))
            print(f"✗ Error processing {file_name}: {e}")
    
    print(f"\n{'='*60}")
    print(f"Summary: Fixed {fixed_count}/{len(static_files)} files")
    
    if errors:
        print(f"\nErrors encountered ({len(errors)}):")
        for file_name, error in errors:
            print(f"  - {file_name}: {error}")
    
    return len(errors) == 0

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)
