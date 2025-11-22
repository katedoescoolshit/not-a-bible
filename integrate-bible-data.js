// Integrate full KJV Bible data into bible.html
const fs = require('fs');

console.log('📖 Integrating KJV Bible data into bible.html...\n');

// Check if kjv-raw.json exists
if (!fs.existsSync('kjv-raw.json')) {
    console.error('❌ Error: kjv-raw.json not found!');
    console.log('\nPlease download the KJV data first:');
    console.log('See GET_BIBLE_DATA.md for instructions\n');
    process.exit(1);
}

try {
    // Read the raw KJV data
    console.log('Reading kjv-raw.json...');
    const rawData = fs.readFileSync('kjv-raw.json', 'utf8');
    const bibleArray = JSON.parse(rawData);
    
    console.log(`✅ Loaded ${bibleArray.length} books\n`);
    
    // Format data for our reader
    console.log('Formatting data...');
    const formattedData = {};
    let totalVerses = 0;
    
    bibleArray.forEach(book => {
        const chapters = {};
        
        book.chapters.forEach((chapter, chapterIndex) => {
            const verses = chapter.map(v => v.text);
            chapters[chapterIndex + 1] = verses;
            totalVerses += verses.length;
        });
        
        formattedData[book.name] = {
            chapters: book.chapters.length,
            verses: chapters
        };
    });
    
    console.log(`✅ Formatted ${Object.keys(formattedData).length} books`);
    console.log(`   Total verses: ${totalVerses}\n`);
    
    // Read the current bible.html
    console.log('Reading bible.html template...');
    let htmlContent = fs.readFileSync('bible.html', 'utf8');
    
    // Find the BIBLE_DATA section and replace it
    const dataStart = htmlContent.indexOf('const BIBLE_DATA = {');
    const dataEnd = htmlContent.indexOf('};', dataStart) + 2;
    
    if (dataStart === -1 || dataEnd === -1) {
        throw new Error('Could not find BIBLE_DATA section in bible.html');
    }
    
    // Create the new data section
    const newDataSection = `const BIBLE_DATA = ${JSON.stringify(formattedData, null, 12)};`;
    
    // Replace the old data with new data
    const newHtmlContent = htmlContent.substring(0, dataStart) + 
                          newDataSection + 
                          htmlContent.substring(dataEnd);
    
    // Write to new file
    console.log('Writing bible-complete.html...');
    fs.writeFileSync('bible-complete.html', newHtmlContent);
    
    // Get file size
    const stats = fs.statSync('bible-complete.html');
    const sizeMB = stats.size / (1024 * 1024);
    
    console.log(`\n✅ Success!`);
    console.log(`\n📊 Statistics:`);
    console.log(`   Books: ${Object.keys(formattedData).length}`);
    console.log(`   Verses: ${totalVerses}`);
    console.log(`   File size: ${sizeMB.toFixed(2)} MB`);
    
    if (sizeMB > 15) {
        console.log(`\n⚠️  Warning: File size exceeds 15 MB target`);
    } else {
        console.log(`\n✅ File size is within 15 MB target`);
    }
    
    console.log(`\n📝 Next steps:`);
    console.log(`   1. Open bible-complete.html in your browser`);
    console.log(`   2. Turn off WiFi`);
    console.log(`   3. Test navigation and search`);
    console.log(`   4. Check DevTools for any errors`);
    console.log(`   5. If all works, rename to bible.html for distribution\n`);
    
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
