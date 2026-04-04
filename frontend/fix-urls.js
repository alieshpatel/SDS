const fs = require('fs');
const path = require('path');

const dirs = [
    path.join(__dirname, 'src/pages/admin'),
    path.join(__dirname, 'src/pages/owner'),
    path.join(__dirname, 'src/pages')
];

let files = [];
dirs.forEach(d => {
    if (fs.existsSync(d)) {
        const list = fs.readdirSync(d);
        list.forEach(f => {
            if (f.endsWith('.jsx')) files.push(path.join(d, f));
        });
    }
});

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Check depth
    const relativePath = path.relative(path.join(__dirname, 'src'), file);
    const depth = relativePath.split(path.sep).length - 1;
    let importPath = '';
    for(let i=0; i<depth; i++) importPath += '../';
    importPath += 'api/axios';

    content = content.replace(/import axios from 'axios';/g, `import api from '${importPath}';`);
    content = content.replace(/axios\.get/g, "api.get");
    content = content.replace(/axios\.post/g, "api.post");
    content = content.replace(/axios\.put/g, "api.put");
    content = content.replace(/axios\.delete/g, "api.delete");
    content = content.replace(/http:\/\/localhost:5000/g, "");
    content = content.replace(/127\.0\.0\.1:5000/g, "");

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
