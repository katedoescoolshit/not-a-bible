# Quick Start Guide - Not A Bible

## 🚀 Get the Full Bible in 5 Minutes

### Option 1: Using curl (Recommended)

```bash
# 1. Download KJV data
curl -o kjv-raw.json https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json

# 2. Integrate into HTML
node integrate-bible-data.js

# 3. Open and test
start bible-complete.html
```

### Option 2: Manual Download

1. Visit: https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json
2. Right-click → Save As → `kjv-raw.json`
3. Save in this folder
4. Run: `node integrate-bible-data.js`
5. Open: `bible-complete.html`

### Option 3: Using wget

```bash
wget -O kjv-raw.json https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json
node integrate-bible-data.js
start bible-complete.html
```

## ✅ Testing Checklist

After integration, verify:

1. **Open bible-complete.html** in your browser
2. **Turn off WiFi** (this is critical!)
3. **Click through books** - All 66 should work
4. **Search for "love"** - Should find verses
5. **Toggle theme** - Light/dark should work
6. **Adjust font size** - A+/A- buttons
7. **Check DevTools** - No 404s, no errors
8. **Bookmark a verse** - Refresh, should persist
9. **Test on mobile** - Should be responsive
10. **Check file size** - Should be ~5 MB

## 🎯 What You Get

- **66 books** - Complete Old and New Testament
- **1,189 chapters** - Every chapter
- **31,102 verses** - Full KJV text
- **~5 MB file** - Single HTML file
- **100% offline** - Zero dependencies
- **Zero tracking** - Complete privacy

## 🐛 Troubleshooting

### "kjv-raw.json not found"
- Make sure you saved the file in the same folder as the scripts
- Check the filename is exactly `kjv-raw.json`

### "Cannot find module"
- Make sure Node.js is installed: `node --version`
- If not installed, download from: https://nodejs.org/

### "File too large"
- This is normal - the full Bible is ~5 MB
- Still well under the 15 MB target
- Compresses well for distribution

### "Integration failed"
- Check that kjv-raw.json is valid JSON
- Try downloading again
- Make sure you have enough disk space

### "Browser won't open file"
- Try a different browser
- Check file permissions
- Try copying to a different location

## 📦 Distribution

Once tested, you can:

1. **Rename**: `bible-complete.html` → `bible.html`
2. **ZIP it**: Create `not-a-bible.zip`
3. **Share**: Email, USB, CD, cloud storage
4. **Host**: GitHub Pages, Netlify, Vercel
5. **Burn**: To CD/DVD for physical distribution

## 🎨 Customization

Want to customize? Edit `bible-complete.html`:

- **Colors**: Change CSS variables in `:root`
- **Fonts**: Update `font-family` in CSS
- **Features**: Add/remove JavaScript functions
- **Content**: Add more translations

## 📚 Next Steps

After you have the full Bible working:

1. **Test thoroughly** - Run through all quality checks
2. **Create landing page** - Use Next.js
3. **Set up GitHub** - Make repo public
4. **Launch** - Share with the world
5. **Iterate** - Add features based on feedback

## 💬 Need Help?

- Check `GET_BIBLE_DATA.md` for detailed instructions
- Read `PROGRESS.md` for project status
- Review `.internal/QUALITY_STANDARDS.md` for testing
- Open an issue on GitHub

## 🎉 Success!

If all tests pass, you now have:
- A complete, offline Bible
- Zero dependencies
- Zero tracking
- Ready to share with the world

**Congratulations! You've built something that can't be deleted.**

---

**Time to complete**: 5-10 minutes
**Difficulty**: Easy
**Result**: Indestructible scripture
