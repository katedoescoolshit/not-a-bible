// Integrate ALL Scripture Data into scripture-complete.html
// Agent 0: Scripture Data Architect

const fs = require('fs');
const path = require('path');

console.log('📖 Scripture Data Architect - Integrating ALL Scripture Texts\n');
console.log('='.repeat(60));

const DATA_DIR = './scripture-data';

// Load metadata
let metadata = {};
try {
  metadata = JSON.parse(fs.readFileSync('scripture-metadata.json', 'utf8'));
} catch (error) {
  console.error('❌ Error loading scripture-metadata.json');
  process.exit(1);
}

// Load data structure
let dataStructure = {};
try {
  dataStructure = JSON.parse(fs.readFileSync('scripture-data-structure.json', 'utf8'));
} catch (error) {
  console.error('❌ Error loading scripture-data-structure.json');
  process.exit(1);
}

// Check for data files
const dataFiles = {
  protestant: path.join(DATA_DIR, 'protestant-kjv.json'),
  deuterocanonical: path.join(DATA_DIR, 'deuterocanonical.json'),
  lost: path.join(DATA_DIR, 'lost-books.json'),
  earlyChurch: path.join(DATA_DIR, 'early-church.json')
};

console.log('📂 Checking for data files...\n');

const availableData = {};
let totalBooks = 0;
let totalVerses = 0;

// Load available data
for (const [category, filePath] of Object.entries(dataFiles)) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ Found: ${category}`);
    try {
      availableData[category] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const bookCount = Object.keys(availableData[category]).length;
      totalBooks += bookCount;
      
      // Count verses
      Object.values(availableData[category]).forEach(book => {
        if (book.verses) {
          Object.values(book.verses).forEach(chapter => {
            totalVerses += chapter.length;
          });
        }
      });
      
      console.log(`   Books: ${bookCount}`);
    } catch (error) {
      console.error(`   ⚠️  Error loading ${category}: ${error.message}`);
    }
  } else {
    console.log(`⏳ Missing: ${category}`);
    console.log(`   Expected: ${filePath}`);
  }
}

console.log('\n' + '-'.repeat(60));
console.log(`📊 Total books available: ${totalBooks}`);
console.log(`📊 Total verses: ${totalVerses}`);
console.log('-'.repeat(60));

// Merge all data
console.log('\n🔄 Merging scripture data...');

const SCRIPTURE_DATA = {
  metadata: {
    version: "2.0.0",
    totalBooks: totalBooks,
    totalVerses: totalVerses,
    categories: Object.keys(availableData),
    lastUpdated: new Date().toISOString().split('T')[0],
    generatedBy: "Scripture Data Architect (Agent 0)"
  },
  
  books: {},
  categories: dataStructure.categories,
  filters: dataStructure.filters
};

// Merge books from all categories
for (const [category, books] of Object.entries(availableData)) {
  for (const [bookName, bookData] of Object.entries(books)) {
    // Add metadata if available
    if (metadata[category] && metadata[category][bookName]) {
      bookData.metadata = metadata[category][bookName];
    }
    
    SCRIPTURE_DATA.books[bookName] = bookData;
  }
}

console.log(`✅ Merged ${Object.keys(SCRIPTURE_DATA.books).length} books`);

// Calculate file size
const dataJSON = JSON.stringify(SCRIPTURE_DATA, null, 2);
const dataSizeMB = Buffer.byteLength(dataJSON, 'utf8') / (1024 * 1024);

console.log(`📏 Data size: ${dataSizeMB.toFixed(2)} MB`);

if (dataSizeMB > 15) {
  console.log('⚠️  Warning: Data exceeds 15 MB target');
  console.log('   Consider compression or optimization');
} else {
  console.log('✅ Data size within 15 MB target');
}

// Check if bible.html exists as template
let templateFile = 'bible.html';
if (!fs.existsSync(templateFile)) {
  console.log('\n⚠️  bible.html not found, creating new template...');
  templateFile = null;
}

if (templateFile) {
  console.log('\n📝 Integrating into HTML...');
  
  try {
    let htmlContent = fs.readFileSync(templateFile, 'utf8');
    
    // Find and replace BIBLE_DATA with SCRIPTURE_DATA
    const dataStart = htmlContent.indexOf('const BIBLE_DATA = {');
    
    if (dataStart === -1) {
      console.log('⚠️  Could not find BIBLE_DATA in template');
      console.log('   Creating standalone data file instead');
      
      fs.writeFileSync('scripture-data-complete.json', dataJSON);
      console.log('✅ Saved to: scripture-data-complete.json');
    } else {
      const dataEnd = htmlContent.indexOf('};', dataStart) + 2;
      
      // Create new data section
      const newDataSection = `const SCRIPTURE_DATA = ${dataJSON};
      
      // Backwards compatibility
      const BIBLE_DATA = {};
      Object.entries(SCRIPTURE_DATA.books).forEach(([name, book]) => {
        if (book.category === 'protestant') {
          BIBLE_DATA[name] = {
            chapters: book.chapters,
            verses: book.verses
          };
        }
      });`;
      
      // Replace old data
      const newHtmlContent = htmlContent.substring(0, dataStart) + 
                            newDataSection + 
                            htmlContent.substring(dataEnd);
      
      // Write to new file
      fs.writeFileSync('scripture-complete.html', newHtmlContent);
      
      const htmlSize = fs.statSync('scripture-complete.html').size / (1024 * 1024);
      console.log(`✅ Created: scripture-complete.html (${htmlSize.toFixed(2)} MB)`);
    }
  } catch (error) {
    console.error('❌ Error integrating HTML:', error.message);
  }
}

// Always save standalone JSON
fs.writeFileSync('scripture-data-complete.json', dataJSON);
console.log('✅ Saved: scripture-data-complete.json');

// Generate statistics report
console.log('\n' + '='.repeat(60));
console.log('📊 FINAL STATISTICS');
console.log('='.repeat(60));

for (const [category, books] of Object.entries(availableData)) {
  const bookCount = Object.keys(books).length;
  let chapterCount = 0;
  let verseCount = 0;
  
  Object.values(books).forEach(book => {
    chapterCount += book.chapters || 0;
    if (book.verses) {
      Object.values(book.verses).forEach(chapter => {
        verseCount += chapter.length;
      });
    }
  });
  
  console.log(`\n${category.toUpperCase()}:`);
  console.log(`  Books: ${bookCount}`);
  console.log(`  Chapters: ${chapterCount}`);
  console.log(`  Verses: ${verseCount}`);
}

console.log('\n' + '='.repeat(60));
console.log('TOTALS:');
console.log(`  Books: ${totalBooks}`);
console.log(`  Verses: ${totalVerses}`);
console.log(`  Data Size: ${dataSizeMB.toFixed(2)} MB`);
console.log('='.repeat(60));

// Next steps
console.log('\n📝 NEXT STEPS:');
console.log('1. Open scripture-complete.html in browser');
console.log('2. Test navigation between all book categories');
console.log('3. Test search across all texts');
console.log('4. Verify offline functionality');
console.log('5. Check for any errors in DevTools');

if (totalBooks < 100) {
  console.log('\n⚠️  NOTE: Not all scripture texts have been downloaded yet');
  console.log('   Run: node fetch-all-scripture.js for instructions');
}

console.log('\n✅ Integration complete!\n');
