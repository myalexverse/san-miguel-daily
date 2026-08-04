const fs = require('fs');
const path = require('path');

const files = [
  'src/app/[domain]/seccion/[slug]/page.tsx',
  'src/app/[domain]/boletin/page.tsx',
  'src/app/[domain]/buscar/page.tsx',
  'src/app/[domain]/cuenta/page.tsx'
];

files.forEach(file => {
  const absolutePath = path.resolve(__dirname, file);
  if (!fs.existsSync(absolutePath)) return;
  
  let content = fs.readFileSync(absolutePath, 'utf8');
  let changed = false;

  if (!content.includes('import { UiProvider }')) {
    content = content.replace('import { SiteHeader }', 'import { UiProvider } from "@/components/brands/daily/UiProvider";\nimport { SiteHeader }');
    changed = true;
  }

  if (content.includes('<>')) {
    content = content.replace('<>', '<UiProvider>');
    changed = true;
  }
  
  if (content.includes('</>')) {
    content = content.replace('</>', '</UiProvider>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`Wrapped ${file} in UiProvider`);
  }
});
