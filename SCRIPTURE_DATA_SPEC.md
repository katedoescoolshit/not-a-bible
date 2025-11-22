# Scripture Data Architecture Specification v2.0

## Overview
Complete data structure for ALL scripture texts including Protestant Canon, Deuterocanonical Books, Lost Books, and Early Church Writings.

## Data Structure

### Core Schema
```javascript
const SCRIPTURE_DATA = {
  metadata: {
    version: "2.0.0",
    totalBooks: 100+,
    totalChapters: 1500+,
    totalVerses: 35000+,
    categories: ["protestant", "deuterocanonical", "lost", "early-church"],
    lastUpdated: "2025-11-22"
  },
  
  books: {
    "Genesis": {
      category: "protestant",
      testament: "old",
      canonical: ["protestant", "catholic", "orthodox"],
      chapters: 50,
      verses: { /* chapter: [verse1, verse2, ...] */ },
      metadata: {
        author: "Moses (traditional)",
        dateWritten: "~1400 BC",
        context: "First book of Torah, creation and patriarchs",
        whyDisputed: null
      }
    },
    // ... more books
  },
  
  categories: {
    protestant: {
      name: "Protestant Canon",
      description: "66 books accepted by Protestant denominations",
      bookCount: 66,
      books: ["Genesis", "Exodus", ...]
    },
    deuterocanonical: {
      name: "Deuterocanonical Books",
      description: "Books in Catholic/Orthodox Bibles but not Protestant",
      bookCount: 15,
      books: ["Tobit", "Judith", "Wisdom", ...]
    },
    lost: {
      name: "Lost & Disputed Books",
      description: "Ancient texts excluded from most canons",
      bookCount: 20+,
      books: ["1 Enoch", "Jubilees", "Jasher", ...]
    },
    earlyChurch: {
      name: "Early Church Writings",
      description: "First and second century Christian texts",
      bookCount: 10+,
      books: ["Didache", "1 Clement", ...]
    }
  },
  
  filters: {
    protestantOnly: [...], // 66 books
    catholic: [...],       // 73 books
    orthodox: [...],       // 78+ books
    everything: [...]      // All books
  }
}
```

## Book Categories

### 1. Protestant Canon (66 books)
**Source**: KJV (already available)
- Old Testament: 39 books
- New Testament: 27 books
- Status: Complete ✓

### 2. Deuterocanonical Books (15 books)
**Sources**: 
- sacred-texts.com/bib/apo/
- CCEL (Christian Classics Ethereal Library)

Books:
1. Tobit
2. Judith
3. Wisdom of Solomon
4. Sirach (Ecclesiasticus)
5. Baruch
6. Letter of Jeremiah
7. 1 Maccabees
8. 2 Maccabees
9. Additions to Esther
10. Prayer of Azariah
11. Susanna
12. Bel and the Dragon
13. 1 Esdras
14. 2 Esdras
15. Prayer of Manasseh

### 3. Lost & Disputed Books (20+ books)
**Sources**:
- sacred-texts.com/bib/boe/ (Book of Enoch)
- sacred-texts.com/chr/apo/jasher/
- sacred-texts.com/bib/jub/

Books:
1. 1 Enoch (Book of Enoch)
2. 2 Enoch (Slavonic Enoch)
3. 3 Enoch (Hebrew Enoch)
4. Book of Jubilees
5. Book of Jasher
6. Assumption of Moses
7. Testament of the Twelve Patriarchs
8. Psalms of Solomon
9. Odes of Solomon
10. 3 Maccabees
11. 4 Maccabees
12. Psalm 151
13. Letter of Aristeas
14. 4 Baruch
15. Apocalypse of Baruch
16. Apocalypse of Abraham
17. Apocalypse of Elijah
18. Apocalypse of Zephaniah
19. Testament of Job
20. Testament of Solomon

### 4. Early Church Writings (10+ texts)
**Source**: earlychristianwritings.com

Texts:
1. Didache (Teaching of the Twelve Apostles)
2. 1 Clement
3. 2 Clement
4. Epistle of Barnabas
5. Shepherd of Hermas
6. Ignatius' Letters (7 epistles)
7. Polycarp to the Philippians
8. Martyrdom of Polycarp
9. Gospel of Thomas
10. Gospel of Peter
11. Infancy Gospel of James
12. Apocalypse of Peter

## Metadata Fields

Each book includes:
- **author**: Traditional and/or scholarly attribution
- **dateWritten**: Approximate date or range
- **context**: Brief historical/literary context
- **whyDisputed**: Reason for exclusion from canon (if applicable)
- **canonical**: Which traditions include it
- **relatedTexts**: Cross-references to related books

## File Size Targets

- Protestant Canon (KJV): ~4.5 MB
- Deuterocanonical: ~1.5 MB
- Lost Books: ~3 MB
- Early Church: ~1 MB
- **Total Target**: < 15 MB

## Data Sources

### Primary Sources (Public Domain)
1. **KJV**: Already integrated
2. **Apocrypha**: sacred-texts.com/bib/apo/
3. **Lost Books**: sacred-texts.com/chr/apo/
4. **Early Church**: earlychristianwritings.com

### Attribution Requirements
All sources must be:
- Public domain
- Properly attributed
- Historically accurate
- Unbiased presentation

## Implementation Files

1. **scripture-data-structure.json** - Complete schema definition
2. **fetch-all-scripture.js** - Automated download script
3. **integrate-all-scripture.js** - Integration script
4. **scripture-metadata.json** - All book metadata
5. **scripture-complete.html** - Test file with all texts

## Backwards Compatibility

- Maintain `BIBLE_DATA` structure for KJV
- Extend to `SCRIPTURE_DATA` for all texts
- Existing code continues to work
- New features access extended data

## Version History

- **v1.0**: KJV only (66 books)
- **v2.0**: All scripture texts (100+ books)

---

**Status**: Foundation Phase - Week 1
**Priority**: CRITICAL - Blocks all other agents
**Timeline**: 7 days
