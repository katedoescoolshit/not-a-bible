// Download ALL Scripture Texts - Practical Approach
// Uses available public domain sources

const fs = require('fs');
const path = require('path');

console.log('📖 Complete Scripture Library - Download Plan\n');
console.log('='.repeat(70));

const DATA_DIR = './scripture-data';
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// PHASE 1: Use what we already have
console.log('\n✅ PHASE 1: Protestant Canon (COMPLETE)');
console.log('-'.repeat(70));
console.log('Source: kjv-raw.json (already downloaded)');
console.log('Books: 66');
console.log('Status: ✅ Integrated into scripture-complete.html\n');

// PHASE 2: Add multiple translations (we have these!)
console.log('✅ PHASE 2: Additional Translations (AVAILABLE)');
console.log('-'.repeat(70));
console.log('We already have these translations in bible-master/');
console.log('Available now:');
console.log('  - English: KJV ✅, BBE');
console.log('  - Spanish: Reina Valera');
console.log('  - Portuguese: 3 versions');
console.log('  - French, German, Russian, Chinese, etc.');
console.log('Total: 19 translations ready to integrate!\n');

// PHASE 3: Apocrypha/Deuterocanonical
console.log('⏳ PHASE 3: Deuterocanonical Books');
console.log('-'.repeat(70));
console.log('Best source: Use Catholic Bible translations');
console.log('Option 1: Download from bible-api.com (if available)');
console.log('Option 2: Use sacred-texts.com');
console.log('Option 3: Manual entry from public domain sources\n');

// PHASE 4: Lost Books
console.log('⏳ PHASE 4: Lost & Disputed Books');
console.log('-'.repeat(70));
console.log('Sources:');
console.log('  1. Book of Enoch: sacred-texts.com/bib/boe/');
console.log('  2. Book of Jubilees: sacred-texts.com/bib/jub/');
console.log('  3. Book of Jasher: sacred-texts.com/chr/apo/jasher/');
console.log('  4. Others: pseudepigrapha.com\n');

// PHASE 5: Early Church
console.log('⏳ PHASE 5: Early Church Writings');
console.log('-'.repeat(70));
console.log('Source: earlychristianwritings.com');
console.log('All texts are public domain and freely available\n');

console.log('='.repeat(70));
console.log('📋 RECOMMENDED APPROACH');
console.log('='.repeat(70));
console.log('\n🚀 QUICK WIN: Add Multiple Translations (30 minutes)');
console.log('   We already have 19 translations downloaded!');
console.log('   Just need to integrate them into the reader.\n');

console.log('📝 Steps:');
console.log('1. Create multi-translation support in scripture-complete.html');
console.log('2. Add translation selector dropdown');
console.log('3. Load additional translations from bible-master/');
console.log('4. Users can switch between KJV, BBE, Spanish, etc.\n');

console.log('💡 This gives you:');
console.log('   - 66 books × 19 translations = 1,254 book versions');
console.log('   - Instant value add');
console.log('   - No scraping needed');
console.log('   - All data already downloaded\n');

console.log('🔮 FUTURE: Add Apocrypha & Lost Books');
console.log('   These require more work but can be added incrementally\n');

console.log('='.repeat(70));
console.log('DECISION TIME');
console.log('='.repeat(70));
console.log('\nOption A: Add multiple translations NOW (recommended)');
console.log('  - Use existing bible-master data');
console.log('  - 19 translations ready');
console.log('  - 30 minutes of work');
console.log('  - Huge value add\n');

console.log('Option B: Focus on Apocrypha/Lost Books');
console.log('  - Requires scraping/manual entry');
console.log('  - 1-2 weeks of work');
console.log('  - Smaller audience\n');

console.log('Option C: Do both in parallel');
console.log('  - Best of both worlds');
console.log('  - Translations first (quick win)');
console.log('  - Then add additional texts\n');

console.log('='.repeat(70));
console.log('💡 RECOMMENDATION: Start with Option A');
console.log('   Add 19 translations now, then expand to other texts');
console.log('='.repeat(70) + '\n');

// Create a plan file
const plan = {
  phase1: {
    name: "Protestant Canon",
    status: "complete",
    books: 66,
    translations: 1
  },
  phase2: {
    name: "Multiple Translations",
    status: "ready",
    translations: 19,
    effort: "30 minutes",
    value: "high"
  },
  phase3: {
    name: "Deuterocanonical",
    status: "pending",
    books: 15,
    effort: "1 week",
    value: "medium"
  },
  phase4: {
    name: "Lost Books",
    status: "pending",
    books: 20,
    effort: "1-2 weeks",
    value: "medium"
  },
  phase5: {
    name: "Early Church",
    status: "pending",
    texts: 12,
    effort: "1 week",
    value: "low"
  }
};

fs.writeFileSync(
  path.join(DATA_DIR, 'download-plan.json'),
  JSON.stringify(plan, null, 2)
);

console.log('📄 Plan saved to: scripture-data/download-plan.json\n');
