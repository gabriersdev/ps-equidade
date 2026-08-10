import React from 'react';
import fs from 'fs';
import path from 'path';

export interface ClassContent {
  title: React.ReactNode;
  url: string;
  type?: string;
  size?: string;
}

export interface Aula {
  id: string;
  title: string;
  date: string;
  description: React.ReactNode;
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
      if (sizeInBytes >= 1024 * 1024) size = (sizeInBytes / (1024 * 1024)).toFixed(1) + ' MB';
      else if (sizeInBytes >= 1024) size = (sizeInBytes / 1024).toFixed(1) + ' KB';
      else size = sizeInBytes + ' B';
      
      return { type: ext, size };
    }
  } catch (e) {
    console.error("Error getting file info for", url, e);
  }
  return { type: 'FILE', size: 'N/A' };
}

function formatDescription(text: string): React.ReactNode {
  if (!text) return text;
  const regex = /(revisão dos exercícios|exercícios práticos)/gi;
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <b key={i}>{part}</b> : part
      )}
    </>
  );
}

const rawClasses = [
  {
    id: "scratch-aula-4",
    title: "Scratch: aula 4",
    date: "22/08/2026",
    description: "",
    contents: [
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260822-revisao.pdf"
      },
    ]
  },
  {
    id: "scratch-aula-3",
    title: "Scratch: aula 3",
    date: "08/08/2026",
    description: "",
    contents: [
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260808-revisao.pdf"
      },
      {
        title: "Exercícios práticos realizados em sala de aula com Scratch",
        url: "/assets/classes/scratch/20260808.pdf"
      },
    ]
  },
  {
    id: "scratch-aula-2",
    title: "Scratch: aula 2",
    date: "11/07/2026",
    description: "",
    contents: [
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260711-revisao.pdf"
      },
    ]
  },
  {
    id: "scratch-aula-1",
    title: "Scratch: aula 1",
    date: "04/07/2026",
    description: "",
    contents: [
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260704-revisao.pdf"
      },
    ]
  },
];

export const classes: Aula[] = rawClasses
  .map(aula => ({
    ...aula,
    description: formatDescription(aula.description),
    contents: aula.contents.map(content => ({
      ...content,
      title: formatDescription(content.title as string),
      ...getFileInfo(content.url)
    }))
  }))
  .sort((a, b) => {
    const aDate = a.date.split('/').reverse().join('');
    const bDate = b.date.split('/').reverse().join('');
    return bDate.localeCompare(aDate);
  });
