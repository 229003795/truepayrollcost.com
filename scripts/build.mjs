import {mkdir,readdir,readFile,writeFile,copyFile,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
const origin='https://truepayrollcost.com',urls=[];
await mkdir('dist',{recursive:true});
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,e.name),rel=path.relative('src',file).split(path.sep).join('/');if(e.isDirectory()){await walk(file);continue;}await mkdir(path.dirname(path.join('dist',rel)),{recursive:true});await copyFile(file,path.join('dist',rel));if(!rel.endsWith('.html')||rel==='404.html')continue;const content=await readFile(file,'utf8');let modified;try{modified=execFileSync('git',['log','-1','--format=%cs','--',file],{encoding:'utf8'}).trim();}catch{}modified=modified||content.match(/name="dateModified" content="(\d{4}-\d{2}-\d{2})"/)?.[1]||(await stat(file)).mtime.toISOString().slice(0,10);const route=rel==='index.html'?'/':rel.endsWith('/index.html')?'/'+rel.slice(0,-10):'/'+rel.slice(0,-5);urls.push({loc:origin+route,lastmod:modified});}}
await walk('src');urls.sort((a,b)=>a.loc.localeCompare(b.loc));await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>'  <url><loc>'+u.loc+'</loc><lastmod>'+u.lastmod+'</lastmod></url>').join('\n')+'\n</urlset>\n');
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
await writeFile('dist/_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log('Built '+urls.length+' published page(s), robots.txt, and sitemap.xml.');
