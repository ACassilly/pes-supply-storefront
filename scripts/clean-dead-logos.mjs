import { readFileSync, writeFileSync } from 'fs';

const file = '/vercel/share/v0-project/lib/data.ts';
let content = readFileSync(file, 'utf-8');

// Remove all _dead_logo properties: , _dead_logo: "..." 
const before = content.length;
content = content.replace(/,\s*_dead_logo:\s*"[^"]*"/g, '');
const after = content.length;

writeFileSync(file, content, 'utf-8');
console.log(`Removed _dead_logo properties. File size: ${before} -> ${after} (saved ${before - after} chars)`);
