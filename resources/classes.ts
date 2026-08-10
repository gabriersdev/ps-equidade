import fs from 'fs';
import path from 'path';

export interface ClassContent {
  title: string;
  url: string;
  type?: string;
  size?: string;
}

export interface Aula {
  id: string;
  title: string;
  date: string;
  description: string;
  contents: ClassContent[];
}

function getFileInfo(url: string): { type: string; size: string } {
  try {
    if (!url.startsWith('/')) return { type: 'LINK', size: '-' };
    
    const ext = path.extname(url).replace('.', '').toUpperCase();
    const filePath = path.join(process.cwd(), 'public', url);
    
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeInBytes = stats.size;
      
      let size = '';
      if (sizeInBytes >= 1024 * 1024) {
        size = (sizeInBytes / (1024 * 1024)).toFixed(1) + ' MB';
      } else if (sizeInBytes >= 1024) {
        size = (sizeInBytes / 1024).toFixed(1) + ' KB';
      } else {
        size = sizeInBytes + ' B';
      }
      
      return { type: ext, size };
    }
  } catch (e) {
    console.error("Error getting file info for", url, e);
  }
  return { type: 'FILE', size: 'N/A' };
}

const rawClasses: Aula[] = [
  {
    id: "scratch-aula-3",
    title: "Scratch: aula 3",
    date: "08/08/2026",
    description: "",
    contents: [
      {
        title: "Exercícios práticos realizados em sala de aula com Scratch",
        url: "/assets/classes/scratch/20260808.pdf"
      },
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260808-revisao.pdf"
      }
    ]
  }
];

export const classes: Aula[] = rawClasses.map(aula => ({
  ...aula,
  contents: aula.contents.map(content => ({
    ...content,
    ...getFileInfo(content.url)
  }))
}));
