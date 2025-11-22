# Scripture Data Quick Start Guide

## For Other Agents

### Using SCRIPTURE_DATA

```javascript
// Access the complete scripture data
const SCRIPTURE_DATA = {
  metadata: { version, totalBooks, totalVerses, categories },
  books: { "Genesis": { category, testament, verses, metadata } },
  categories: { protestant, deuterocanonical, lost, earlyChurch },
  filters: { protestantOnly, catholic, orthodox, everything }
};

// Get a book
const genesis = SCRIPTURE_DATA.books["Genesis"];

// Get verses
const chapter1 = genesis.verses[1]; // Array of verse strings

// Get metadata
const author = genesis.metadata.author;
const context = genesis.metadata.context;

// Filter by category
const protestantBooks = Object.entries(SCRIPTURE_DATA.books)
  .filter(([name, book]) => book.category === 'protestant');
```

### Files You Need

1. **scripture-data-complete.json** - All data
2. **scripture-metadata.json** - Book metadata
3. **scripture-complete.html** - Working reader

### Running Scripts

```bash
# Download scripture data
node fetch-all-scripture.js

# Integrate into HTML
node integrate-all-scripture.js
```

### Testing

Open `scripture-complete.html` in browser to test your changes.

---

**Questions?** See SCRIPTURE_DATA_SPEC.md for full documentation.
