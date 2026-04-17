import json
import re

file_path = r'C:\Users\youhyun\.claude\projects\c--Users-youhyun-Desktop-Project-zerolabs-FE\995895c2-6310-42a6-a7c3-9bac5b9bf3bb\tool-results\mcp-figma-get_figma_data-1776388129438.txt'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for item in data:
        text_content = item.get('text', '')
        if '10:5435' in text_content:
            # Extract using regex
            pattern = r'- id: 10:5435\n((?:\n(?!  - id:).*)*)'
            match = re.search(pattern, text_content)
            if match:
                node_yaml = '- id: 10:5435\n' + match.group(1)
                
                # Write to output preserving encoding
                out_path = 'C:\\Users\\youhyun\\Desktop\\wholesale_node.txt'
                with open(out_path, 'w', encoding='utf-8') as out:
                    out.write(node_yaml)
                
                print("SUCCESS: Node extracted")
                print(f"Content size: {len(node_yaml)} characters")
                print("\nFirst 3000 chars:")
                print(node_yaml[:3000])
            break
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
