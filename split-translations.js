// Split translations into separate files for on-demand loading
// This keeps the main file small and loads translations as needed

const fs = require('fs');
const path = require('path');

console.log('📖 Splitting Translations for On-Demand Loading\n');

const DATA_DIR = './scripture-data';
const TRANSLATIONS_DIR = path.join(DATA_DIR, 'translations');

if (!fs.existsSync(TRANSLATIONS_DIR)) {
  fs.mkdirSync(TRANSLATIONS_DIR, { recursive: true });
}

// Load the combined file
const allTranslationsFile = path.join(DATA_DIR, 'all-translations.json');
if (!fs.existsSync(allTranslationsFile)) {
  console.error('❌ all-translations.json not found. Run integrate-all-translations.js first.');
  process.exit(1);
}

console.log('📥 Loading combined translations file...');
const allData = JSON.parse(fs.readFileSync(allTranslationsFile, 'utf8'));

console.log(`✅ Loaded ${Object.keys(allData.translations).length} translations\n`);

// Split each translation into its own file
console.log('✂️  Splitting into individual files...\n');

let totalSize = 0;

Object.entries(allData.translations).forEach(([code, translation]) => {
  const filename = `${code}.json`;
  const filepath = path.join(TRANSLATIONS_DIR, filename);
  
  const data = {
    code,
    metadata: translation.metadata,
    books: translation.books
  };
  
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  
  const size = fs.statSync(filepath).size / (1024 * 1024);
  totalSize += size;
  
  console.log(`✅ ${translation.metadata.name.padEnd(30)} → ${filename.padEnd(20)} (${size.toFixed(2)} MB)`);
});

console.log('\n' + '-'.repeat(70));
console.log(`📊 Total size: ${totalSize.toFixed(2)} MB across ${Object.keys(allData.translations).length} files`);
console.log(`📁 Location: ${TRANSLATIONS_DIR}`);
console.log('-'.repeat(70));

// Create a lightweight index
const index = {
  version: '2.0.0',
  totalTranslations: Object.keys(allData.translations).length,
  translations: Object.entries(allData.translations).map(([code, t]) => ({
    code,
    name: t.metadata.name,
    language: t.metadata.language,
    abbrev: t.metadata.abbrev,
    bookCount: Object.keys(t.books).length,
    file: `translations/${code}.json`
  })),
  languages: [...new Set(Object.values(allData.translations).map(t => t.metadata.language))].sort()
};

const indexFile = path.join(DATA_DIR, 'translations-index.json');
fs.writeFileSync(indexFile, JSON.stringify(index, null, 2));

console.log(`\n✅ Created index: ${indexFile}`);
console.log(`   Size: ${(fs.statSync(indexFile).size / 1024).toFixed(2)} KB`);

console.log('\n' + '='.repeat(70));
console.log('✅ SPLIT COMPLETE');
console.log('='.repeat(70));
console.log('\nBenefits of this approach:');
console.log('  ✅ Main HTML file stays small (~5 MB with KJV only)');
console.log('  ✅ Other translations load on-demand');
console.log('  ✅ Users only download what they need');
console.log('  ✅ Fast initial load time');
console.log('  ✅ Can still work offline (download all files)');

console.log('\n📝 Next: Update scripture-complete.html to:');
console.log('  1. Load translations-index.json');
console.log('  2. Show translation selector');
console.log('  3. Load selected translation dynamically');
console.log('  4. Cache loaded translations\n');
