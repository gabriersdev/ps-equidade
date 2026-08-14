import fs from 'fs';
import path from 'path';
import {basicClasses, Aula, ClassContent} from './classes-data';

export type {Aula, ClassContent};

function getFileInfo(url: string): { type: string; size: string } {
  try {
    if (!url.startsWith('/')) return {type: 'LINK', size: '-'};
    
    const ext = path.extname(url).replace('.', '').toUpperCase();
    const filePath = path.join(process.cwd(), 'public', url);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeInBytes = stats.size;
      
      let size = '';
      if (sizeInBytes >= 1024 * 1024) size = (sizeInBytes / (1024 * 1024)).toFixed(1) + ' MB';
      else if (sizeInBytes >= 1024) size = (sizeInBytes / 1024).toFixed(1) + ' KB';
      else size = sizeInBytes + ' B';
      
      return {type: ext, size};
    }
  } catch (e) {
    console.error("Error getting file info for", url, e);
  }
  return {type: 'FILE', size: 'N/A'};
}

export const classes: Aula[] = basicClasses.map(aula => ({
  ...aula,
  contents: aula.contents.map(content => ({
    ...content,
    ...getFileInfo(content.url)
  }))
}));
