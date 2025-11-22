// Test script to verify offline Bible meets quality standards
const fs = require('fs');

console.log('🧪 Testing Offline Bible Quality Standards\n');

let passed = 0;
let failed = 0;

function test(name, condition, errorMsg) {
    if (condition) {
        console.log(`✅ PASS: ${name}`);
        passed++;
    } else {
        console.log(`❌ FAIL: ${name}`);
        if (errorMsg) console.log(`   ${errorMsg}`);
        failed++;
    }
}

// Test 1: File exists
const fileExists = fs.existsSync('bible.html');
test('bible.html exists', fileExists);

if (!fileExists) {
    console.log('\n❌ Cannot continue tests without bible.html');
    process.exit(1);
}

// Read the file
const html = fs.readFileSync('bible.html', 'utf8');

// Test 2: No absolute paths
const absolutePaths = html.match(/(href|src)=["'](\/[^\/]|http)/g);
test('No absolute paths', !absolutePaths, absolutePaths ? `Found: ${absolutePaths.join(', ')}` : '');

// Test 3: No external resources
const externalResources = html.match(/(href|src)=["']https?:\/\//g);
test('No external resources', !externalResources, externalResources ? `Found: ${externalResources.join(', ')}` : '');

// Test 4: File size check
const stats = fs.statSync('bible.html');
const sizeMB = stats.size / (1024 * 1024);
console.log(`\n📊 File size: ${sizeMB.toFixed(2)} MB`);
test('File size < 15 MB', sizeMB < 15, `Size: ${sizeMB.toFixed(2)} MB`);

// Test 5: Required HTML elements
test('Has <html> tag', html.includes('<html'));
test('Has <head> tag', html.includes('<head'));
test('Has <body> tag', html.includes('<body'));
test('Has <style> tag', html.includes('<style'));
test('Has <script> tag', html.includes('<script'));

// Test 6: Required functionality
test('Has BIBLE_DATA', html.includes('BIBLE_DATA'));
test('Has search functionality', html.includes('handleSearch'));
test('Has theme toggle', html.includes('toggleTheme'));
test('Has bookmark functionality', html.includes('saveBookmark'));

// Test 7: No common issues
test('No TODO comments', !html.includes('TODO'));
test('No console.log statements', !html.match(/console\.log\(/g));
test('No alert() for errors', !html.match(/alert\(['"]Error/gi));

// Test 8: Accessibility
test('Has viewport meta tag', html.includes('viewport'));
test('Has charset meta tag', html.includes('charset'));
test('Has title tag', html.includes('<title>'));

// Test 9: CSS embedded
test('CSS is embedded', html.includes('<style>') && html.includes('</style>'));

// Test 10: JavaScript embedded
test('JavaScript is embedded', html.includes('<script>') && html.includes('</script>'));

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests passed: ${passed}`);
console.log(`Tests failed: ${failed}`);
console.log('='.repeat(50));

if (failed === 0) {
    console.log('\n🎉 All tests passed! Bible reader meets quality standards.');
    console.log('\n📝 Next steps:');
    console.log('   1. Open bible.html in a browser');
    console.log('   2. Turn off WiFi');
    console.log('   3. Test navigation and features');
    console.log('   4. Check DevTools for errors');
    console.log('   5. Download full Bible data (see GET_BIBLE_DATA.md)');
} else {
    console.log('\n⚠️  Some tests failed. Please fix issues before distribution.');
    process.exit(1);
}
