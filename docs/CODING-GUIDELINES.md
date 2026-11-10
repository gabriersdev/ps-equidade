# Diretrizes de Codificação

Este documento fornece diretrizes de codificação para o projeto.

## Nomenclatura de Arquivos

- Utilize sempre que possível os nomes dos arquivos em inglês US.
- Componentes: `lower-case.tsx` (ex: `lower-case.tsx`)
- Estilos: `kebab-case.css` (ex: `my-component.css`)
- Utilitários: `lower-case.ts` (ex: `utility.ts`)

## Organização de Arquivos

- Utilize sempre que possível os nomes das rotas e pastas em inglês US.
- Componentes: `/components/`
- Estilos: `/style/`
- Utilitários: `/libs/`
- Tipos: `/types/`
- Páginas: `/app/[nome-da-pagina]/[nome-do-arquivo]`

## Armazenamento Local (localStorage / sessionStorage)

- **Padronização de chaves (keys):** Todas as chaves utilizadas para armazenar configurações, histórico de pesquisa ou qualquer outro dado persistido no projeto através do `localStorage` ou `sessionStorage` devem OBRIGATORIAMENTE possuir o prefixo `escudo-app-`.
- **Formato:** O restante da chave deve seguir o formato de palavras separadas por traço (`kebab-case`).
  - *Exemplos corretos:* `escudo-app-configs`, `escudo-app-search-history`.
  - *Exemplos incorretos:* `mobilidadeAppConfigs`, `searchHistory`, `live-configs`.
- **Gerenciamento:** Essa padronização permite o controle e a exclusão seletiva das configurações da aplicação (através do gerenciador nativo do sistema), evitando conflitos e vazamentos de dados, facilitando a manutenção de estado entre os módulos.

## Padrões de Código

- Use `eslint` para garantir a consistência do código.
- Use `prettier` para formatação de código.
- Siga as diretrizes de nomenclatura de arquivos.
- Adicione testes para novos recursos (testes de componentes usando o `cypress`) OU no caso de novas páginas criadas, criar testes de componentes de páginas (com `e2e` e usando `cypress`).

## Interface, Estilização e Movimento

- **Framework CSS:** Utilize exclusivamente **Tailwind CSS v4** com os tokens de marca definidos via `@theme inline` em `app/globals.css` (`brand-primary`, `brand-secondary`, `brand-tertiary`, `brand-quaternary`, `brand-ink`, `brand-canvas`, `brand-notice`).
- **Identidade Visual Flat e Arredondamento Fino:** Mantenha ausência total de sombras (`box-shadow`) e evite arredondamentos exagerados ou contrastes agressivos. Utilize a paleta verde/vermelho em tons amenos (`#235C36`, `#B24B45`, `#3E7E54`, `#74A884`, texto `#1F2722`, fundo `#F5F7F5`, avisos `#354E8A`), superfícies suaves nos links de ação (`ClassCardLink`), arredondamento fino concêntrico (`rounded-sm` 4px / `rounded-md` 6px) e translucidez sutil apenas em camadas flutuantes (`.apple-chrome-header`, `.apple-chrome-panel`, `.apple-chrome-tooltip`).
- **Tipografia (`next/font/google`):** Toda a interface utiliza a família **`Inter`** (`--font-inter`) configurada em `app/layout.tsx` e `@theme inline` de `app/globals.css`.
- **Ícones:** Utilize SVGs inline consistentes com o conjunto atual do projeto, evitando adicionar novas bibliotecas de ícones sem necessidade.
- **Física e Interatividade (`framer-motion` + `libs/apple-motion.ts`):**
  - Priorize feedback imediato no `pointerdown` (`active:scale-[0.97]` ou `[0.985]` com transição rápida de `100ms ease-out`) e `touch-action: manipulation` para eliminar atrasos de toque.
  - Use *springs* interrompíveis (`APPLE_SPRING_DEFAULT` / `APPLE_SPRING_SNAPPY`) para transições de UI e `APPLE_SPRING_MOMENTUM` apenas após gestos com velocidade/momento (ex.: *swipe* em avisos ou calendário).
  - Evite delays artificiais (`setTimeout`) no caminho de entrada/foco do usuário.
  - Respeite sempre `prefers-reduced-motion`, `prefers-reduced-transparency` e `prefers-contrast` (incluindo `MotionProvider` com `reducedMotion="user"`).

## Observações Gerais

- Evitar ao máximo criar classes CSS personalizadas quando classes utilitárias do Tailwind CSS atenderem ao objetivo.
- Optar sempre por quebrar grandes componentes (principalmente aqueles com mais de 100 linhas) em subcomponentes ou utilitários em `libs/`, importando-os no componente pai.
- Seguir à risca os padrões de código e arquitetura definidos para manter o código uniforme e coeso.
- Usar sempre que possível `const` para definir uma nova variável.
- Usar a palavra reservada `function` em vez de `const` para criar uma nova função nomeada.
- Optar sempre por usar os `hooks` do `React` para definir dados e otimizar o funcionamento e execução do código.
- Para situações em que for necessário iterar sobre um array de valores estáticos, criar um arquivo à parte em `resources`, seguindo o [padrão de nomenclatura definido](#nomenclatura-de-arquivos), utilizando TypeScript e tipando as estruturas de dados.
- Desenvolver pensando sempre em *clean code* e performance, evitando duplicidade de código e extraindo lógicas puras para `libs/`.
- Documentar blocos de código complexos, regras não óbvias ou dependências de DOM, evitando comentários excessivos que poluam a leitura.
- Evitar código com complexidade desnecessariamente alta, múltiplas renderizações ou loops pesados acoplados a efeitos externos.
- Utilizar sempre que possível nomes de componentes, tipos, funções e variáveis em inglês US (`camelCase` e ponto e vírgula `;`).

## Metadados e SEO

- **Centralização no Dicionário:** Todas as definições estáticas de metadados das páginas (como `title` e `description` exportados em constantes `metadata`) devem ser centralizadas e definidas no arquivo de dicionário (`resources/dictionary.ts`). Isso facilita a tradução e a manutenção de padrões em todas as páginas.
- Em vez de usar strings literais nos componentes, importe o `dictionary` e faça referência à chave correspondente da página (ex: `dictionary.subscribe.title`).
