// Fetch Lost & Disputed Books
// Sources: Sacred-texts.com and other public domain sources

const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('📖 Fetching Lost & Disputed Books\n');

const DATA_DIR = './scripture-data';
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Lost books structure
const LOST_BOOKS = {
  "1 Enoch": {
    category: "lost",
    testament: "old",
    canonical: ["ethiopian-orthodox"],
    chapters: 108,
    verses: {},
    source: "https://www.sacred-texts.com/bib/boe/"
  },
  "Jubilees": {
    category: "lost",
    testament: "old",
    canonical: ["ethiopian-orthodox"],
    chapters: 50,
    verses: {},
    source: "https://www.sacred-texts.com/bib/jub/"
  },
  "Jasher": {
    category: "lost",
    testament: "old",
    canonical: [],
    chapters: 91,
    verses: {},
    source: "https://www.sacred-texts.com/chr/apo/jasher/"
  },
  "2 Enoch": {
    category: "lost",
    testament: "old",
    canonical: [],
    chapters: 68,
    verses: {},
    source: "Various sources"
  },
  "3 Maccabees": {
    category: "lost",
    testament: "old",
    canonical: ["orthodox"],
    chapters: 7,
    verses: {},
    source: "Orthodox canon"
  },
  "4 Maccabees": {
    category: "lost",
    testament: "old",
    canonical: ["orthodox-appendix"],
    chapters: 18,
    verses: {},
    source: "Orthodox appendix"
  },
  "Psalms of Solomon": {
    category: "lost",
    testament: "old",
    canonical: [],
    chapters: 18,
    verses: {},
    source: "Pseudepigrapha"
  }
};

console.log('⚠️  Lost books require manual sourcing');
console.log('   Recommended sources:');
console.log('   1. https://www.sacred-texts.com/bib/boe/ (1 Enoch)');
console.log('   2. https://www.sacred-texts.com/bib/jub/ (Jubilees)');
console.log('   3. https://www.sacred-texts.com/chr/apo/jasher/ (Jasher)');
console.log('   4. https://www.pseudepigrapha.com/\n');

console.log('📝 Creating placeholder structure...');

// Save placeholder structure
fs.writeFileSync(
  path.join(DATA_DIR, 'lost-books.json'),
  JSON.stringify(LOST_BOOKS, null, 2)
);

console.log('✅ Placeholder created: scripture-data/lost-books.json');
console.log('   Books: 7');
console.log('   Status: Structure ready, texts need to be added\n');

console.log('📋 Next steps:');
console.log('1. Download texts from sources above');
console.log('2. Parse into verse format');
console.log('3. Add to lost-books.json');
console.log('4. Run: node integrate-all-scripture.js\n');
