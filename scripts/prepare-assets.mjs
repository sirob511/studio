import sharp from 'sharp';
import { readdir,unlink } from 'node:fs/promises';
for(const file of await readdir('public/images')) {
 if(!file.endsWith('.png'))continue;
 const base=file.slice(0,-4), input='public/images/'+file;
 await sharp(input).webp({quality:86,effort:5}).toFile('public/images/'+base+'.webp');
 if(!base.endsWith('mobile'))await sharp(input).resize({width:720}).webp({quality:82,effort:5}).toFile('public/images/'+base+'-720.webp');
 await unlink(input);
}
