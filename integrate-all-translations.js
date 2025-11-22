// Integrate ALL 19 Bible Translations
// Creates a multi-translation scripture reader

const fs = require('fs');
const path = require('path');

console.log('📖 Integrating ALL 19 Bible Translations\n');
console.log('='.repeat(70));

const DATA_DIR = './scripture-data';
const BIBLE_MASTER_DIR = './bible-master/bible-master/json';

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Translation metadata
const TRANSLATIONS = {
  'en_kjv': { name: 'King James Version', language: 'English', abbrev: 'KJV' },
  'en_bbe': { name: 'Bible in Basic English', language: 'English', abbrev: 'BBE' },
  'es_rvr': { name: 'Reina Valera', language: 'Spanish', abbrev: 'RVR' },
  'pt_aa': { name: 'Almeida Revisada', language: 'Portuguese', abbrev: 'AA' },
  'pt_acf': { name: 'Almeida Corrigida Fiel', language: 'Portuguese', abbrev: 'ACF' },
  'pt_nvi': { name: 'Nova Versão Internacional', language: 'Portuguese', abbrev: 'NVI' },
  'fr_apee': { name: "Bible de l'Épée", language: 'French', abbrev: 'APEE' },
  'de_schlachter': { name: 'Schlachter', language: 'German', abbrev: 'SCH' },
  'ru_synodal': { name: 'Синодальный перевод', language: 'Russian', abbrev: 'SYNOD' },
  'zh_cuv': { name: 'Chinese Union Version', language: 'Chinese', abbrev: 'CUV' },
  'zh_ncv': { name: 'New Chinese Version', language: 'Chinese', abbrev: 'NCV' },
  'ko_ko': { name: 'Korean Version', language: 'Korean', abbrev: 'KO' },
  'vi_vietnamese': { name: 'Tiếng Việt', language: 'Vietnamese', abbrev: 'VI' },
  'ro_cornilescu': { name: 'Cornilescu', language: 'Romanian', abbrev: 'CORN' },
  'el_greek': { name: 'Modern Greek', language: 'Greek', abbrev: 'GRK' },
  'fi_finnish': { name: 'Finnish Bible', language: 'Finnish', abbrev: 'FI' },
  'fi_pr': { name: 'Pyhä Raamattu', language: 'Finnish', abbrev: 'PR' },
  'eo_esperanto': { name: 'Esperanto', language: 'Esperanto', abbrev: 'EO' },
  'ar_svd': { name: 'Arabic Bible', language: 'Arabic', abbrev: 'SVD' }
};

console.log('📥 Loading translations...\n');

const allTranslations = {};
let successCount = 0;
let totalVerses = 0;

// Load each translation
for (const [code, meta] of Object.entries(TRANSLATIONS)) {
  const filepath = path.join(BIBLE_MASTER_DIR, `${code}.json`);
  
  if (fs.existsSync(filepath)) {
    try {
      console.log(`Loading ${meta.name} (${meta.language})...`);
      
      // Read and handle BOM
      const buffer = fs.readFileSync(filepath);
      const content = buffer.toString('utf8').replace(/^\uFEFF/, '');
      const data = JSON.parse(content);
      
      // Format the data
      const formatted = {};
      data.forEach(book => {
        const chapters = {};
        book.chapters.forEach((chapter, chapterIndex) => {
          chapters[chapterIndex + 1] = chapter.map(verse => 
            typeof verse === 'string' ? verse : (verse.text || verse)
          );
        });
        
        formatted[book.name] = {
          abbrev: book.abbrev,
          chapters: book.chapters.length,
          verses: chapters
        };
      });
      
      allTranslations[code] = {
        metadata: meta,
        books: formatted
      };
      
      // Count verses
      Object.values(formatted).forEach(book => {
        Object.values(book.verses).forEach(chapter => {
          totalVerses += chapter.length;
        });
      });
      
      successCount++;
      console.log(`  ✅ ${Object.keys(formatted).length} books loaded`);
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  } else {
    console.log(`  ⚠️  File not found: ${filepath}`);
  }
}

console.log('\n' + '-'.repeat(70));
console.log(`✅ Successfully loaded ${successCount}/${Object.keys(TRANSLATIONS).length} translations`);
console.log(`📊 Total verses across all translations: ${totalVerses.toLocaleString()}`);
console.log('-'.repeat(70));

// Save combined data
console.log('\n💾 Saving combined translation data...');

const outputData = {
  metadata: {
    version: '2.0.0',
    totalTranslations: successCount,
    totalVerses: totalVerses,
    lastUpdated: new Date().toISOString().split('T')[0]
  },
  translations: allTranslations
};

const outputFile = path.join(DATA_DIR, 'all-translations.json');
fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2));

const fileSize = fs.statSync(outputFile).size / (1024 * 1024);
console.log(`✅ Saved to: ${outputFile}`);
console.log(`📏 File size: ${fileSize.toFixed(2)} MB`);

if (fileSize > 50) {
  console.log('⚠️  Warning: File size exceeds 50 MB');
  console.log('   Consider splitting by translation or compressing');
} else {
  console.log('✅ File size is reasonable');
}

// Create translation index
console.log('\n📋 Creating translation index...');

const index = {
  translations: Object.entries(TRANSLATIONS).map(([code, meta]) => ({
    code,
    ...meta,
    available: code in allTranslations,
    bookCount: allTranslations[code] ? Object.keys(allTranslations[code].books).length : 0
  })),
  languages: [...new Set(Object.values(TRANSLATIONS).map(t => t.language))].sort(),
  totalTranslations: successCount
};

fs.writeFileSync(
  path.join(DATA_DIR, 'translation-index.json'),
  JSON.stringify(index, null, 2)
);

console.log('✅ Translation index created');

// Summary by language
console.log('\n' + '='.repeat(70));
console.log('📊 TRANSLATIONS BY LANGUAGE');
console.log('='.repeat(70));

const byLanguage = {};
Object.values(TRANSLATIONS).forEach(t => {
  if (!byLanguage[t.language]) byLanguage[t.language] = [];
  byLanguage[t.language].push(t.name);
});

Object.entries(byLanguage).sort().forEach(([lang, trans]) => {
  console.log(`\n${lang}:`);
  trans.forEach(t => console.log(`  - ${t}`));
});

console.log('\n' + '='.repeat(70));
console.log('📝 NEXT STEPS');
console.log('='.repeat(70));
console.log('\n1. Update scripture-complete.html to support multiple translations');
console.log('2. Add translation selector dropdown');
console.log('3. Load translations dynamically or embed all');
console.log('4. Test switching between translations');
console.log('5. Deploy and share!\n');

console.log('💡 TIP: You now have 66 books × 19 translations = 1,254 book versions!');
console.log('   This is a MASSIVE library of scripture.\n');

console.log('✅ Integration complete!\n');
