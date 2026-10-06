import React from 'react';
import {renderText} from "@/libs/render-text";
import {events} from "./calendar-events";

export interface ClassContent {
  title: React.ReactNode | string;
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
    id: "oficina-hibrida-9",
    title: "Oficina de Cybersegurança (METIS) + Lego/Robótica",
    description: "Nesta aula, os alunos foram apresentados ao projeto METIS – Mulheres em Ciências Exatas e participaram de uma atividade dinâmica, na qual foram desafiados a identificar golpes e situações de risco presentes no cotidiano. Após a oficina, os alunos deram continuidade às atividades com a programação dos robôs LEGO. A seguir, são apresentados os roteiros das missões 1, 2 e 3, acompanhados da explicação sobre o contexto de cada situação, como identificar o golpe e a resolução de cada uma das missões, além de cartilhas sobre Segurança Digital produzidas pelo NIC.br.",
    contents: [
      {
        title: "Oficina METIS - Missão 1 - Phishing via SMS",
        url: "/assets/classes/cybersecurity/missao-1-phishing-via-SMS.pdf",
      },
      {
        title: "Oficina METIS - Missão 2 - Phishing por e-mail",
        url: "/assets/classes/cybersecurity/missao-2-phishing-por-e-mail.pdf",
      },
      {
        title: "Oficina METIS - Missão 3 - Golpe da Falsa Central + Motoqueiro do banco",
        url: "/assets/classes/cybersecurity/missao-3-golpe-da-falsa-central+motoqueiro-do-banco.pdf",
      },
      {
        title: "Guia \"Internet Segura: Divirta-se e aprenda a usar a internet de forma segura!\"",
        url: "https://internetsegura.br/pdf/guia-internet-segura.pdf",
      },
      {
        title: "Guia \"Internet Segura\" para os pais: A sua participação é muito importante!",
        url: "https://internetsegura.br/pdf/guia-internet-segura-pais.pdf",
      },
    ]
  },
  {
    id: "robotica-aula-8",
    title: "Robótica: aula 8",
    description: "Nesta aula, os alunos, organizados em grupos, desenvolveram projetos próprios utilizando os robôs LEGO e realizaram a programação necessária para colocá-los em funcionamento.",
    contents: [
      {
        title: "Manuais de montagem do LEGO EV3 - EV3 Lessons",
        url: "https://ev3lessons.com/pt/RobotDesigns.html",
      },
    ]
  },
  {
    id: "robotica-aula-extra",
    title: "Aula Extra - Lego/Robótica",
    description: "Nesta aula, os alunos usaram a criatividade e imaginação para montar os robôs LEGO.",
    contents: [
      {
        title: "Divulgação: First LEGO League Challenge - SESI",
        url: "https://www.sesi.portaldaindustria.com.br/para-voce/robotica/first-lego-league-challenge",
      },
    ]
  },
  {
    id: "robotica-aula-7",
    title: "Robótica: aula 7",
    description: "Nesta aula, os alunos experimentaram os robôs LEGO e realizaram desafios de lógica utilizando os blocos do software MINDSTORMS EV3 Classroom e executando os Projetos nos próprios robôs.",
    contents: [
      {
        title: "Projetos do Grupo #1 - Ana Julia, Eduarda, Isabelly, Julia Vilela e Emanuelle",
        url: "https://raw.githubusercontent.com/gabriersdev/ps-equidade/refs/heads/master/public/assets/classes/projects/grupo-1.zip",
      },
      {
        title: "Projetos do Grupo #2 - Arthur, Heitor, Iago e Keven",
        url: "https://raw.githubusercontent.com/gabriersdev/ps-equidade/refs/heads/master/public/assets/classes/projects/grupo-2.zip",
      },
      {
        title: "Projetos do Grupo #3 - Alicia, Ana Julia, Geovanna, Sophia e Thifany",
        url: "https://raw.githubusercontent.com/gabriersdev/ps-equidade/refs/heads/master/public/assets/classes/projects/grupo-3.zip",
      },
      {
        title: "Projetos do Grupo #4 - Bernardo, Marcos, Samuel e Vitor",
        url: "https://raw.githubusercontent.com/gabriersdev/ps-equidade/refs/heads/master/public/assets/classes/projects/grupo-4.zip",
      },
      {
        title: "GEARSBOT - Simulador de robôs",
        url: "https://gears.aposteriori.com.sg/"
      },
    ]
  },
  {
    id: "scratch-aula-5",
    title: "Scratch: aula 5",
    description: "Nesta aula, os alunos utilizam operadores e estruturas mais avançadas do Scratch e também revisam estruturas condicionais (se/senão), variáveis e operadores aritméticos. Os exercícios práticos incluem a construção de uma calculadora de média com feedback de aprovação, uma simulação simples de caixa eletrônico para gerenciar saldo e saques, e uma calculadora básica funcional que realiza as quatro operações matemáticas com base na escolha do usuário.",
    contents: [
      {
        title: "Revisão dos exercícios e conteúdos apresentados em sala de aula",
        url: "/assets/classes/scratch/20260829-revisao.pdf"
      },
      {
        title: "Exercícios práticos realizados em sala de aula com Scratch",
        url: "/assets/classes/scratch/20260829.pdf"
      },
      {
        title: "Desafio - Imagem 1",
        url: "/assets/support/IMG-20260829-E1.jpeg"
      },
      {
        title: "Desafio - Imagem 2",
        url: "/assets/support/IMG-20260829-E2.jpeg"
      }
    ]
  },
  {
    id: "scratch-aula-4",
    title: "Scratch: aula 4",
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
  .map(aula => {
    const eventDate = events.find(e => e.id === aula.id)?.date || "";
    return {
      ...aula,
      date: eventDate,
      description: renderText(aula.description),
      contents: aula.contents.map(content => ({
        ...content,
        title: formatDescription(content.title as string),
      }))
    };
  })
  .sort((a, b) => {
    const aDate = a.date.split('/').reverse().join('');
    const bDate = b.date.split('/').reverse().join('');
    return bDate.localeCompare(aDate);
  });
