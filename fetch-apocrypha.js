// Fetch Deuterocanonical Books (Apocrypha)
// Sources: Multiple public domain sources

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('📖 Fetching Deuterocanonical Books (Apocrypha)\n');

const DATA_DIR = './scripture-data';
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Apocrypha books available in the bible-master repo
const APOCRYPHA_BOOKS = {
  // These are typically included in Catholic/Orthodox Bibles
  // We'll need to source these from available public domain texts
  
  // For now, create placeholder structure
  "Tobit": {
    category: "deuterocanonical",
    testament: "old",
    canonical: ["catholic", "orthodox"],
    chapters: 14,
    verses: {}
  },
  "Judith": {
    category: "deuterocanonical",
    testament: "old",
    canonical: ["catholic", "orthodox"],
    chapters: 16,
    verses: {}
  },
  "Wisdom": {
    category: "deuterocanonical",
    testament: "old",
    canonical: ["catholic", "orthodox"],
    chapters: 19,
    verses: {}
  },
  "Sirach": {
    category: "deuterocanonical",
    testament: "old",
    canonical: ["catholic", "orthodox"],
    chapters: 51,
    verses: {}
  },
  "Baruch": {
    category: "deuterocanonical",
    testament: "old",
    canonical: ["catholic", "orthodox"],
    chapters: 6,
    verses: {}
  },
  "1 Maccabees": {
    category: "deuterocanonical",
    testament: "old",
    canonical: ["catholic", "orthodox"],
    chapters: 16,
    verses: {}
  },
  "2 Maccabees": {
    category: "deuterocanonical",
    testament: "old",
    canonical: ["catholic", "orthodox"],
    chapters: 15,
    verses: {}
  }
};

console.log('⚠️  Apocrypha texts require manual sourcing');
console.log('   Recommended sources:');
console.log('   1. https://www.sacred-texts.com/bib/apo/');
console.log('   2. https://www.ccel.org/');
console.log('   3. Project Gutenberg\n');

console.log('📝 Creating placeholder structure...');

// Save placeholder structure
fs.writeFileSync(
  path.join(DATA_DIR, 'deuterocanonical.json'),
  JSON.stringify(APOCRYPHA_BOOKS, null, 2)
);

console.log('✅ Placeholder created: scripture-data/deuterocanonical.json');
console.log('   Books: 7');
console.log('   Status: Structure ready, texts need to be added\n');

console.log('📋 Next steps:');
console.log('1. Download texts from sources above');
console.log('2. Parse into verse format');
console.log('3. Add to deuterocanonical.json');
console.log('4. Run: node integrate-all-scripture.js\n');
