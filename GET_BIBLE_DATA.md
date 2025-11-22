# How to Get Full KJV Bible Data

The `bible.html` file currently has only Genesis 1 as a demo. Here's how to get the full KJV Bible data:

## Option 1: Download Pre-formatted JSON (Recommended)

1. Go to: https://github.com/thiagobodruk/bible
2. Download the file: `json/en_kjv.json`
3. Save it as `kjv-raw.json` in this folder
4. Run: `node integrate-bible-data.js`
5. This will update `bible.html` with the full Bible

## Option 2: Manual Download

1. Visit: https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json
2. Copy all the JSON content
3. Save it as `kjv-raw.json` in this folder
4. Run: `node integrate-bible-data.js`

## Option 3: Use curl/wget

```bash
# Using curl
curl -o kjv-raw.json https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json

# Using wget
wget -O kjv-raw.json https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json

# Then integrate
node integrate-bible-data.js
```

## What the integration script does:

1. Reads `kjv-raw.json`
2. Formats it for our Bible reader
3. Embeds it into `bible.html`
4. Creates `bible-complete.html` with all 66 books

## Testing After Integration

1. Open `bible-complete.html` in your browser
2. Turn off WiFi
3. Navigate through all books
4. Test search functionality
5. Verify zero 404 errors in DevTools

## File Sizes

- Genesis only (demo): ~15 KB
- Full KJV Bible: ~4-5 MB
- Complete HTML file: ~5-6 MB

This is well under the 15 MB target!

## Troubleshooting

**If download fails:**
- Try a different browser
- Use curl/wget instead
- Download the entire repo as ZIP and extract the JSON file

**If integration fails:**
- Make sure `kjv-raw.json` is valid JSON
- Check that Node.js is installed
- Try running with: `node --max-old-space-size=4096 integrate-bible-data.js`

## Next Steps

After integration:
1. Test thoroughly offline
2. Run the quality checks
3. Create a ZIP for distribution
4. Build the Next.js landing site
