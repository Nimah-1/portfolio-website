import re
import os

file_path = r'c:\Users\Chanet Lanka\Documents\portfolio-website\index.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Cloudinary URLs
    # Pattern: /upload/v<digits> -> /upload/f_auto,q_auto/v<digits>
    # ensuring we don't double up if it's already there (though the pattern /upload/v... assumes immediate 'v')
    
    # Check for existing f_auto,q_auto to be safe/debug
    # matches = re.findall(r'/upload/v(\d+)', content)
    # print(f"Found {len(matches)} Cloudinary URLs to optimize.")
    
    new_content = re.sub(r'/upload/v(\d+)', r'/upload/f_auto,q_auto/v\1', content)
    
    # 2. Add loading="lazy" to deco images if not present
    if '<img src="deco1.jpg" alt="" class="deco-img deco-1" loading="lazy">' not in new_content:
        new_content = new_content.replace(
            '<img src="deco1.jpg" alt="" class="deco-img deco-1">',
            '<img src="deco1.jpg" alt="" class="deco-img deco-1" loading="lazy">'
        )
        
    if '<img src="deco2.jpg" alt="" class="deco-img deco-2" loading="lazy">' not in new_content:
        new_content = new_content.replace(
            '<img src="deco2.jpg" alt="" class="deco-img deco-2">',
            '<img src="deco2.jpg" alt="" class="deco-img deco-2" loading="lazy">'
        )

    # 3. Add loading="lazy" to any other images that might miss it but have a src? 
    # (Most seem to have it, relying on manual check or specific replace is safer than global regex replace which might break things)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Successfully optimized index.html with Cloudinary params and lazy loading.")

except Exception as e:
    print(f"Error: {e}")
