import React from 'react';
import {renderText} from "@/libs/render-text";

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
        // @ts-ignore
        i % 2 === 1 ? <b key={i}>{part}</b> : part
      )}
    </>
  );
}

export const rawClasses = [
  {
    id: "scratch-aula-5",
    title: "Scratch: aula 5",
    date: "29/08/2026",
    description: "Nesta aula, os alunos revisam estruturas condicionais (se/senão), variáveis e operadores aritméticos. Os exercícios práticos incluem a construção de uma calculadora de média com feedback de aprovação, uma simulação simples de caixa eletrônico para gerenciar saldo e saques, e uma calculadora básica funcional que realiza as quatro operações matemáticas com base na escolha do usuário.",
    contents: [
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260829-revisao.pdf"
      },
      {
        title: "Exercícios práticos realizados em sala de aula com Scratch",
        url: "/assets/classes/scratch/20260829.pdf"
      },
    ]
  },
  {
    id: "scratch-aula-4",
    title: "Scratch: aula 4",
    date: "08/08/2026",
    description: "Nesta aula (A3 e Revisão A3), os alunos aprofundam o uso de lógica condicional, interação com o usuário e variáveis. Eles desenvolvem programas iterativos como verificadores de números pares e ímpares, jogos de adivinhação com números secretos, simuladores de semáforo com múltiplas condições (se/senão) e sistemas de verificação de senhas. Também exploram a mudança dinâmica de fantasias.",
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
    description: "Nesta aula, o foco é na animação de personagens, movimento e diálogos. Os alunos aprendem a usar blocos de movimento para fazer os atores andarem e girarem, blocos de aparência para trocar fantasias, exibir mensagens e esconder/mostrar personagens, além de blocos de som. Eles utilizam laços de repetição para animações simples e criam diálogos sincronizados entre dois personagens.",
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
    description: "Nesta aula, os alunos criam um projeto abrangente combinando conceitos fundamentais. Eles programam um personagem para aparecer, saudar o usuário, mover-se, girar, executar uma animação de troca de fantasias usando repetições e desaparecer. Um segundo personagem reage a cliques tocando sons e falando, culminando na criação de um pequeno diálogo interativo entre ambos os personagens.",
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
    description: renderText(aula.description),
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
