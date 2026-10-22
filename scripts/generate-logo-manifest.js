// Writes the list of files in public/logos to a JSON manifest so the API
// routes don't need filesystem access at runtime (not available on Workers).
const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, '..', 'public', 'logos');
const outFile = path.join(__dirname, '..', 'src', 'logo-manifest.json');

const files = fs.readdirSync(logosDir).filter(file => !file.startsWith('.')).sort();

fs.writeFileSync(outFile, JSON.stringify(files, null, 2) + '\n');
console.log(`Wrote ${files.length} logos to ${path.relative(process.cwd(), outFile)}`);
