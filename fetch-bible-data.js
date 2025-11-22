// Fetch KJV Bible data from scrollmapper/bible_databases
// This script downloads the KJV JSON and formats it for our reader

const https = require('https');
const fs = require('fs');

console.log('📖 Fetching KJV Bible data...\n');

// URL to the KJV JSON file - using a different format
const KJV_URL = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json';

function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
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

async function main() {
    try {
        console.log('Downloading KJV data from GitHub...');
        const rawData = await fetchData(KJV_URL);
        const data = JSON.parse(rawData);
        
        console.log(`✅ Downloaded Bible data\n`);
        
        // Format data for our reader
        console.log('Formatting data...');
        const formattedData = {};
        
        // This format has books as an array
        data.forEach(book => {
            const bookName = book.name;
            const chapters = {};
            
            book.chapters.forEach((chapter, chapterIndex) => {
                chapters[chapterIndex + 1] = chapter.map(verse => verse.text);
            });
            
            formattedData[bookName] = {
                chapters: book.chapters.length,
                verses: chapters
            };
        });
        
        // Save to file
        const outputFile = 'bible-data.json';
        fs.writeFileSync(outputFile, JSON.stringify(formattedData, null, 2));
        
        console.log(`✅ Formatted data saved to ${outputFile}`);
        console.log(`\n📊 Statistics:`);
        console.log(`   Books: ${Object.keys(formattedData).length}`);
        
        let totalChapters = 0;
        let totalVerses = 0;
        Object.values(formattedData).forEach(book => {
            totalChapters += book.chapters;
            Object.values(book.verses).forEach(chapter => {
                totalVerses += chapter.length;
            });
        });
        
        console.log(`   Chapters: ${totalChapters}`);
        console.log(`   Verses: ${totalVerses}`);
        
        const fileSize = fs.statSync(outputFile).size;
        console.log(`   File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
        
        console.log('\n✅ Done! Now run: node build-bible-reader.js');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
