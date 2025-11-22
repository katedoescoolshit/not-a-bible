# Not A Bible

**They can't delete what you already have.**

A digital preservation project for scripture - fully offline, zero dependencies, built to last decades.

## 🎯 Mission

Make scripture indestructible through distributed digital preservation. In an era where access to religious content is increasingly controlled, this project ensures the Bible remains accessible, offline, and free forever.

## ✨ Features

- **100% Offline** - Works with zero internet connection
- **Zero Dependencies** - Pure HTML/CSS/JavaScript
- **Zero Tracking** - No analytics, no surveillance
- **Portable** - Works from USB, email, CD, anywhere
- **Fast** - Loads in < 2 seconds
- **Small** - Complete Bible in ~5 MB
- **Beautiful** - Clean, distraction-free design
- **Accessible** - Works in browsers from 2010+

## 🚀 Quick Start

### For Users

1. Download `bible-complete.html` (or `bible.html` for demo)
2. Double-click to open in any browser
3. That's it - you're reading scripture offline

### For Developers

1. Clone this repo
2. Download KJV data (see `GET_BIBLE_DATA.md`)
3. Run `node integrate-bible-data.js`
4. Test `bible-complete.html` offline
5. Ship it

## 📦 What's Included

- `bible.html` - Demo version with Genesis 1 (working prototype)
- `bible-complete.html` - Full KJV Bible (after integration)
- `landing.html` - Marketing page reference
- `GET_BIBLE_DATA.md` - Instructions for getting full Bible data
- `integrate-bible-data.js` - Script to embed Bible data
- `.internal/` - Complete project documentation

## 🛠️ Building the Complete Bible

See `GET_BIBLE_DATA.md` for detailed instructions.

**Quick version:**
```bash
# Download KJV data
curl -o kjv-raw.json https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json

# Integrate into HTML
node integrate-bible-data.js

# Test offline
# Open bible-complete.html and turn off WiFi
```

## ✅ Quality Standards

This project follows strict quality standards:

- **Zero 404 errors** (non-negotiable)
- **Zero console errors**
- **Works 100% offline** (the "Airplane Test")
- **Works from any location** (the "USB Drive Test")
- **Works on old systems** (the "20 Year Test")

See `.internal/QUALITY_STANDARDS.md` for complete testing checklist.

## 📖 Documentation

- **[START_HERE.md](START_HERE.md)** - Project overview and navigation
- **[PROJECT_BRIEF.md](.internal/PROJECT_BRIEF.md)** - Mission and goals
- **[TECHNICAL_SPEC.md](.internal/TECHNICAL_SPEC.md)** - Architecture details
- **[QUALITY_STANDARDS.md](.internal/QUALITY_STANDARDS.md)** - Testing requirements
- **[GET_BIBLE_DATA.md](GET_BIBLE_DATA.md)** - How to get full Bible data

## 🎨 Features

### Current
- ✅ Book navigation (Old & New Testament)
- ✅ Chapter navigation
- ✅ Verse display
- ✅ Search functionality
- ✅ Bookmarks (localStorage)
- ✅ Theme toggle (light/dark)
- ✅ Font size adjustment
- ✅ Responsive design

### Planned
- [ ] Cross-references
- [ ] Study notes
- [ ] Reading plans
- [ ] Multiple translations
- [ ] Audio Bible
- [ ] Verse highlighting

## 🧪 Testing

Before distributing, run through these tests:

1. **Airplane Test** - Turn off WiFi, everything should work
2. **USB Test** - Copy to USB, open from there
3. **Browser Test** - Test in Chrome, Firefox, Safari, Edge
4. **Mobile Test** - Test on iOS and Android
5. **DevTools Test** - Check for 404s and console errors

## 📊 Stats

- **66 books** - Complete Old and New Testament
- **1,189 chapters** - Every chapter included
- **31,102 verses** - Complete KJV text
- **~5 MB** - Total file size
- **0 dependencies** - Pure web standards
- **0 tracking** - Complete privacy

## 🤝 Contributing

Contributions welcome! Areas where you can help:

- Additional translations (ASV, WEB, etc.)
- Improved search algorithms
- Cross-references and study notes
- Mobile app wrapper
- Testing and bug reports

## 📜 License

- **Code**: MIT License (open source)
- **KJV Text**: Public domain (published before 1923)
- **Distribution**: Free to copy, share, and modify

## 🌟 Why This Matters

- Countries are banning Bible access
- Apps require internet and accounts
- Websites can be blocked or shut down
- Digital platforms can remove content at will
- **But a file on your device? That's yours forever.**

## 💬 Contact

Questions? Ideas? Want to help?

- Open an issue on GitHub
- Start a discussion
- Fork and submit a PR

---

**Built with urgency. Shared with love. Preserved for eternity.**
