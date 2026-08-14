import React from 'react';

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

export function formatDescription(text: string): React.ReactNode {
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

export const rawClasses = [
  {
    id: "scratch-aula-5",
    title: "Scratch: aula 5",
    date: "22/08/2026",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contents: [
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260822-revisao.pdf"
      },
    ]
  },
  {
    id: "scratch-aula-4",
    title: "Scratch: aula 4",
    date: "08/08/2026",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
    id: "scratch-aula-3",
    title: "Scratch: aula 3",
    date: "11/07/2026",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contents: [
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260711-revisao.pdf"
      },
    ]
  },
  {
    id: "scratch-aula-2",
    title: "Scratch: aula 2",
    date: "04/07/2026",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    contents: [
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260704-revisao.pdf"
      },
    ]
  },
];

export const basicClasses: Aula[] = rawClasses
  .map(aula => ({
    ...aula,
    description: formatDescription(aula.description),
    contents: aula.contents.map(content => ({
      ...content,
      title: formatDescription(content.title as string),
    }))
  }))
  .sort((a, b) => {
    const aDate = a.date.split('/').reverse().join('');
    const bDate = b.date.split('/').reverse().join('');
    return bDate.localeCompare(aDate);
  });
