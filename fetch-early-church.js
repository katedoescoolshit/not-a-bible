// Fetch Early Church Writings
// Sources: earlychristianwritings.com and CCEL

const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('📖 Fetching Early Church Writings\n');

const DATA_DIR = './scripture-data';
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Early Church writings structure
const EARLY_CHURCH = {
  "Didache": {
    category: "early-church",
    testament: "new",
    canonical: [],
    chapters: 16,
    verses: {},
    source: "http://www.earlychristianwritings.com/didache.html"
  },
  "1 Clement": {
    category: "early-church",
    testament: "new",
    canonical: [],
    chapters: 65,
    verses: {},
    source: "http://www.earlychristianwritings.com/1clement.html"
  },
  "2 Clement": {
    category: "early-church",
    testament: "new",
    canonical: [],
    chapters: 20,
    verses: {},
    source: "http://www.earlychristianwritings.com/2clement.html"
  },
  "Epistle of Barnabas": {
    category: "early-church",
    testament: "new",
    canonical: [],
    chapters: 21,
    verses: {},
    source: "http://www.earlychristianwritings.com/barnabas.html"
  },
  "Shepherd of Hermas": {
    category: "early-church",
    testament: "new",
    canonical: [],
    chapters: 114,
    verses: {},
    source: "http://www.earlychristianwritings.com/shepherd.html"
  },
  "Gospel of Thomas": {
    category: "early-church",
    testament: "new",
    canonical: [],
    chapters: 1,
    verses: {},
    source: "http://www.earlychristianwritings.com/thomas.html"
  },
  "Polycarp to Philippians": {
    category: "early-church",
    testament: "new",
    canonical: [],
    chapters: 14,
    verses: {},
    source: "http://www.earlychristianwritings.com/polycarp.html"
  }
};

console.log('⚠️  Early Church texts require manual sourcing');
console.log('   Recommended sources:');
console.log('   1. http://www.earlychristianwritings.com/');
console.log('   2. https://www.ccel.org/');
console.log('   3. https://www.newadvent.org/fathers/\n');

console.log('📝 Creating placeholder structure...');

// Save placeholder structure
fs.writeFileSync(
  path.join(DATA_DIR, 'early-church.json'),
  JSON.stringify(EARLY_CHURCH, null, 2)
);

console.log('✅ Placeholder created: scripture-data/early-church.json');
console.log('   Texts: 7');
console.log('   Status: Structure ready, texts need to be added\n');

console.log('📋 Next steps:');
console.log('1. Download texts from sources above');
console.log('2. Parse into verse/section format');
console.log('3. Add to early-church.json');
console.log('4. Run: node integrate-all-scripture.js\n');
