import json
import re

file_path = r'C:\Users\youhyun\.claude\projects\c--Users-youhyun-Desktop-Project-zerolabs-FE\995895c2-6310-42a6-a7c3-9bac5b9bf3bb\tool-results\mcp-figma-get_figma_data-1776388129438.txt'

try:
    with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # Find the section with 10:5435
    pattern = r'- id: 10:5435.*?(?=\n  - id:|$)'
    match = re.search(pattern, content, re.DOTALL)

    result = []
    
    if match:
        node_text = match.group(0)
        result.append("=== NODE 10:5435 WHOLESALE INQUIRY PAGE ===\n")
        result.append(f"Node size: {len(node_text)} characters\n")
        
        # Extract text elements
        texts = re.findall(r'text: ([^\n]+)', node_text)
        result.append(f"\nText Elements ({len(texts)} found):\n")
        for text in texts:
            if text.strip() and len(text) < 200:
                result.append(f"  - {text}\n")
        
        # Extract names/labels
        names = re.findall(r'name: ([^\n]+)', node_text)
        result.append(f"\nComponent Names ({len(names)} found):\n")
        for name in names[:50]:
            if name.strip() and not name.startswith('layout') and 'id:' not in name:
                result.append(f"  - {name}\n")
        
        # Look for imageRef
        result.append("\nImages (imageRef):\n")
        images = re.findall(r'imageRef: ([^\n]+)', node_text)
        for img in images:
            result.append(f"  - {img}\n")

    # Write output
    output_text = ''.join(result)
    with open(r'C:\Users\youhyun\Desktop\figma_wholesale_analysis.txt', 'w', encoding='utf-8') as f:
        f.write(output_text)
    
    print("SUCCESS: Analysis saved to figma_wholesale_analysis.txt")

except Exception as e:
    import traceback
    with open(r'C:\Users\youhyun\Desktop\figma_error.txt', 'w') as f:
        f.write(traceback.format_exc())
    print("ERROR: See figma_error.txt")
