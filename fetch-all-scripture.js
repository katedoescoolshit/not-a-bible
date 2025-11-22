// Fetch ALL Scripture Data - Protestant, Deuterocanonical, Lost Books, Early Church
// Agent 0: Scripture Data Architect

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('📖 Scripture Data Architect - Fetching ALL Scripture Texts\n');
console.log('=' .repeat(60));

// Data sources
const SOURCES = {
  protestant: {
    name: 'King James Version (Protestant Canon)',
    url: 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json',
    protocol: https,
    bookCount: 66
  },
  // Note: Deuterocanonical, Lost Books, and Early Church texts require
  // manual download or API access as they're not in simple JSON format
  // See instructions below for each category
};

// Create data directory
const DATA_DIR = './scripture-data';
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Fetch data from URL
function fetchData(url, protocol = https) {
  return new Promise((resolve, reject) => {
    protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Format KJV data
function formatKJVData(rawData) {
  let data;
  try {
    data = JSON.parse(rawData);
  } catch (error) {
    console.error('JSON Parse Error:', error.message);
    console.log('Raw data preview:', rawData.substring(0, 200));
    throw error;
  }
  
  const formattedData = {};
  
  data.forEach(book => {
    const chapters = {};
    
    book.chapters.forEach((chapter, chapterIndex) => {
      // Handle both array of objects and array of strings
      if (Array.isArray(chapter)) {
        chapters[chapterIndex + 1] = chapter.map(verse => 
          typeof verse === 'string' ? verse : (verse.text || verse)
        );
      }
    });
    
    formattedData[book.name] = {
      category: 'protestant',
      testament: book.abbrev.length === 2 ? 'old' : 'new', // Simple heuristic
      canonical: ['protestant', 'catholic', 'orthodox'],
      chapters: book.chapters.length,
      verses: chapters
    };
  });
  
  return formattedData;
}

// Main execution
async function main() {
  try {
    // Step 1: Use existing KJV data or fetch new
    console.log('\n📥 Step 1: Protestant Canon (KJV - 66 books)...');
    console.log('-'.repeat(60));
    
    let kjvData;
    
    // Check if kjv-raw.json exists
    if (fs.existsSync('kjv-raw.json')) {
      console.log('Using existing kjv-raw.json...');
      // Read as buffer first to handle BOM
      const buffer = fs.readFileSync('kjv-raw.json');
      const kjvRaw = buffer.toString('utf8').replace(/^\uFEFF/, ''); // Remove BOM
      kjvData = formatKJVData(kjvRaw);
    } else {
      console.log('Downloading from GitHub...');
      const kjvRaw = await fetchData(SOURCES.protestant.url);
      kjvData = formatKJVData(kjvRaw);
    }
    
    fs.writeFileSync(
      path.join(DATA_DIR, 'protestant-kjv.json'),
      JSON.stringify(kjvData, null, 2)
    );
    
    console.log(`✅ Processed ${Object.keys(kjvData).length} books`);
    
    let totalVerses = 0;
    Object.values(kjvData).forEach(book => {
      Object.values(book.verses).forEach(chapter => {
        totalVerses += chapter.length;
      });
    });
    
    console.log(`   Total verses: ${totalVerses}`);
    
    const kjvSize = fs.statSync(path.join(DATA_DIR, 'protestant-kjv.json')).size;
    console.log(`   File size: ${(kjvSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Step 2: Instructions for Deuterocanonical Books
    console.log('\n📥 Step 2: Deuterocanonical Books (15 books)');
    console.log('-'.repeat(60));
    console.log('⚠️  Manual download required:');
    console.log('   Source: https://www.sacred-texts.com/bib/apo/');
    console.log('   Books needed:');
    console.log('   - Tobit, Judith, Wisdom, Sirach, Baruch');
    console.log('   - 1-2 Maccabees, Additions to Esther, etc.');
    console.log('   Format: HTML -> Parse -> JSON');
    console.log('   Target: scripture-data/deuterocanonical.json');
    
    // Step 3: Instructions for Lost Books
    console.log('\n📥 Step 3: Lost & Disputed Books (20+ books)');
    console.log('-'.repeat(60));
    console.log('⚠️  Manual download required:');
    console.log('   Sources:');
    console.log('   - 1 Enoch: https://www.sacred-texts.com/bib/boe/');
    console.log('   - Jasher: https://www.sacred-texts.com/chr/apo/jasher/');
    console.log('   - Jubilees: https://www.sacred-texts.com/bib/jub/');
    console.log('   - More: https://www.sacred-texts.com/chr/apo/');
    console.log('   Format: HTML -> Parse -> JSON');
    console.log('   Target: scripture-data/lost-books.json');
    
    // Step 4: Instructions for Early Church Writings
    console.log('\n📥 Step 4: Early Church Writings (12+ texts)');
    console.log('-'.repeat(60));
    console.log('⚠️  Manual download required:');
    console.log('   Source: http://www.earlychristianwritings.com/');
    console.log('   Texts needed:');
    console.log('   - Didache, 1-2 Clement, Barnabas, Hermas');
    console.log('   - Gospel of Thomas, Ignatius, Polycarp, etc.');
    console.log('   Format: HTML -> Parse -> JSON');
    console.log('   Target: scripture-data/early-church.json');
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Protestant Canon: ${Object.keys(kjvData).length} books (COMPLETE)`);
    console.log('⏳ Deuterocanonical: 15 books (PENDING)');
    console.log('⏳ Lost Books: 20+ books (PENDING)');
    console.log('⏳ Early Church: 12+ texts (PENDING)');
    console.log('\n📝 NEXT STEPS:');
    console.log('1. Download additional texts from sources above');
    console.log('2. Parse HTML/text into JSON format');
    console.log('3. Run: node integrate-all-scripture.js');
    console.log('4. Test with scripture-complete.html');
    
    console.log('\n💡 TIP: For automated parsing, consider:');
    console.log('   - cheerio (HTML parsing)');
    console.log('   - axios (HTTP requests)');
    console.log('   - Custom parsers for each source format');
    
    console.log('\n✅ Phase 1 Complete: Protestant Canon downloaded');
    console.log('📂 Data saved to: ./scripture-data/\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Helper function to create sample data structure
function createSampleStructure() {
  const sample = {
    "Tobit": {
      "category": "deuterocanonical",
      "testament": "old",
      "canonical": ["catholic", "orthodox"],
      "chapters": 14,
      "verses": {
        "1": [
          "The book of the words of Tobit, son of Tobiel...",
          "..."
        ]
      },
      "metadata": {
        "author": "Unknown",
        "dateWritten": "~225-175 BC",
        "context": "Story of Tobit and his son Tobias",
        "whyDisputed": "Not in Hebrew Bible"
      }
    }
  };
  
  fs.writeFileSync(
    path.join(DATA_DIR, 'sample-structure.json'),
    JSON.stringify(sample, null, 2)
  );
  
  console.log('\n📄 Sample structure created: scripture-data/sample-structure.json');
}

// Run main function
main().then(() => {
  createSampleStructure();
});
