import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the store file to verify the default theme
const storePath = path.join(__dirname, 'src', 'store', 'ui.store.ts');
const storeContent = fs.readFileSync(storePath, 'utf8');

console.log('--- UI Store Check ---');
if (storeContent.includes("return 'bright';")) {
    console.log('✅ UI Store correctly defaults to bright theme');
} else {
    console.log('❌ UI Store default theme is not bright');
}

// Read the context file to verify the default
const contextPath = path.join(__dirname, 'src', 'context', 'ThemeContext.tsx');
const contextContent = fs.readFileSync(contextPath, 'utf8');

console.log('\n--- Theme Context Check ---');
if (contextContent.includes("return saved && THEMES.includes(saved) ? saved : 'bright';")) {
    console.log('✅ Theme Context correctly defaults to bright theme');
} else {
    console.log('❌ Theme Context default is not bright');
}

// Read the global CSS
const cssPath = path.join(__dirname, 'src', 'styles', 'global.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

console.log('\n--- Global CSS Check ---');
if (cssContent.includes('[data-theme="bright"]')) {
    console.log('✅ Global CSS includes [data-theme="bright"] block');
} else {
    console.log('❌ Global CSS missing bright theme block');
}
