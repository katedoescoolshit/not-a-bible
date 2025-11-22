// Master script to fetch ALL scripture texts
// Coordinates all fetching operations

const { execSync } = require('child_process');
const fs = require('fs');

console.log('📖 COMPLETE SCRIPTURE LIBRARY - Master Fetch Script\n');
console.log('='.repeat(70));
console.log('\nThis script will guide you through downloading ALL scripture texts:');
console.log('- Protestant Canon (66 books) ✅ COMPLETE');
console.log('- Deuterocanonical (15 books) ⏳ PENDING');
console.log('- Lost & Disputed Books (20+ books) ⏳ PENDING');
console.log('- Early Church Writings (12+ texts) ⏳ PENDING\n');
console.log('='.repeat(70));

// Step 1: Protestant Canon
console.log('\n📥 STEP 1: Protestant Canon (KJV)');
console.log('-'.repeat(70));
try {
  execSync('node fetch-all-scripture.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Error fetching Protestant Canon:', error.message);
}

// Step 2: Deuterocanonical
console.log('\n📥 STEP 2: Deuterocanonical Books (Apocrypha)');
console.log('-'.repeat(70));
try {
  execSync('node fetch-apocrypha.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Error setting up Apocrypha:', error.message);
}

// Step 3: Lost Books
console.log('\n📥 STEP 3: Lost & Disputed Books');
console.log('-'.repeat(70));
try {
  execSync('node fetch-lost-books.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Error setting up Lost Books:', error.message);
}

// Step 4: Early Church
console.log('\n📥 STEP 4: Early Church Writings');
console.log('-'.repeat(70));
try {
  execSync('node fetch-early-church.js', { stdio: 'inherit' });
} catch (error) {
  console.error('Error setting up Early Church:', error.message);
}

// Summary
console.log('\n' + '='.repeat(70));
console.log('📊 SUMMARY');
console.log('='.repeat(70));

const dataDir = './scripture-data';
const files = {
  protestant: 'protestant-kjv.json',
  deuterocanonical: 'deuterocanonical.json',
  lost: 'lost-books.json',
  earlyChurch: 'early-church.json'
};

let totalBooks = 0;
let completedCategories = 0;

for (const [category, filename] of Object.entries(files)) {
  const filepath = `${dataDir}/${filename}`;
  if (fs.existsSync(filepath)) {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    const bookCount = Object.keys(data).length;
    totalBooks += bookCount;
    
    // Check if any book has verses
    const hasVerses = Object.values(data).some(book => 
      book.verses && Object.keys(book.verses).length > 0
    );
    
    if (hasVerses) {
      console.log(`✅ ${category}: ${bookCount} books (COMPLETE)`);
      completedCategories++;
    } else {
      console.log(`⏳ ${category}: ${bookCount} books (STRUCTURE READY)`);
    }
  } else {
    console.log(`❌ ${category}: Not found`);
  }
}

console.log('\n' + '-'.repeat(70));
console.log(`Total books structured: ${totalBooks}`);
console.log(`Categories complete: ${completedCategories}/4`);
console.log('-'.repeat(70));

console.log('\n📋 NEXT STEPS TO COMPLETE THE LIBRARY:\n');

console.log('1. AUTOMATED APPROACH (Recommended):');
console.log('   - Install dependencies: npm install axios cheerio');
console.log('   - Run automated scrapers (coming soon)');
console.log('   - Texts will be downloaded and parsed automatically\n');

console.log('2. MANUAL APPROACH:');
console.log('   a) Deuterocanonical Books:');
console.log('      - Visit: https://www.sacred-texts.com/bib/apo/');
console.log('      - Download each book');
console.log('      - Parse into JSON format');
console.log('      - Add to scripture-data/deuterocanonical.json\n');
console.log('   b) Lost Books:');
console.log('      - Visit sources listed in fetch-lost-books.js');
console.log('      - Download and parse');
console.log('      - Add to scripture-data/lost-books.json\n');
console.log('   c) Early Church:');
console.log('      - Visit: http://www.earlychristianwritings.com/');
console.log('      - Download and parse');
console.log('      - Add to scripture-data/early-church.json\n');

console.log('3. INTEGRATE:');
console.log('   - Once texts are added, run: node integrate-all-scripture.js');
console.log('   - This will create scripture-complete.html with ALL texts\n');

console.log('4. TEST:');
console.log('   - Open scripture-complete.html');
console.log('   - Verify all categories have books');
console.log('   - Test navigation and reading\n');

console.log('='.repeat(70));
console.log('💡 TIP: Start with Protestant Canon (already complete)');
console.log('   You can launch with 66 books now and add more later!');
console.log('='.repeat(70) + '\n');
