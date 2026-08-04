const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src/components/brands/daily');

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
  
  if (content.includes('@/components/brands/daily/brands/daily/')) {
    content = content.replace(/@\/components\/brands\/daily\/brands\/daily\//g, '@/components/brands/daily/');
    changed = true;
  }
  
  // Just in case it tripled
  if (content.includes('@/components/brands/daily/brands/daily/brands/daily/')) {
    content = content.replace(/@\/components\/brands\/daily\/brands\/daily\/brands\/daily\//g, '@/components/brands/daily/');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed double imports in ${file}`);
  }
});
