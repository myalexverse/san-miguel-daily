const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, process.argv[2] || 'src/components/brands/daily');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(targetDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  if (content.includes('@/components/')) {
    content = content.replace(/@\/components\//g, '@/components/brands/daily/');
    changed = true;
  }
  
  if (content.includes('@/lib/')) {
    content = content.replace(/@\/lib\//g, '@/components/brands/daily/lib/');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated imports in ${file}`);
  }
});
