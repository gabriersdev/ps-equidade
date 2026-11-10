# Arquitetura do projeto

O projeto utiliza Next.js com App Router.

## Estrutura de Componentes
Seguindo o design limpo, os componentes estão divididos por suas responsabilidades:
- **`header.tsx`, `header-desktop-nav.tsx`, `header-mobile-menu.tsx` e `footer.tsx`**: Componentes globais que estruturam o layout principal (cabeçalho translúcido fixo, barra desktop com indicador animado, menu mobile com animação *spring* ancorada e rodapé).
- **`motion-provider.tsx`**: Wrapper cliente (`MotionConfig reducedMotion="user"`) que propaga o respeito a `prefers-reduced-motion` para todas as animações Framer Motion.
- **`page-heading.tsx`**: Agregador de formatação para os títulos das páginas com tipografia ótica, processando a URL e gerando a trilha de navegação (*breadcrumb*).
- **Componentes de Calendário** (`calendar-buttons.tsx`, `calendar-list.tsx`, `calendar-list-row.tsx`, `calendar-table.tsx`, `calendar-table-grid.tsx`, `calendar-event-chip.tsx`, `calendar-view-toggle.tsx`): Conjunto de componentes apoiados por `libs/calendar-utils.ts` e `libs/calendar-export.ts` para exibir interativamente os dados da agenda, alternar visualizações com *segmented control*, navegar meses por botão ou deslize horizontal (*swipe*) e exibir tooltips translúcidos acessíveis.
- **Componentes baseados em Card** (`class-card`, `resource-card`, `base-card`): Componentes reutilizáveis para exibir informações encapsuladas (como aulas e links úteis) no formato flat de cantos retos.
- **`alert-info.tsx` e `alert-info-item.tsx`**: Componentes para renderização de mensagens de notificação e avisos dispensáveis por botão ou gesto horizontal (*swipe-to-dismiss* com projeção de momento).
- **`animated-component`**: Componente envelopador para transições físicas de entrada e saída baseadas em *springs* interrompíveis.
- **`student-page`**: Agrupa componentes exclusivos do painel e controle de autenticação do portal do aluno (`student-page-login.tsx` + `student-login-field.tsx`, apoiados por `libs/student-auth-validation.ts`).

## Estilização e Movimento
- **Framework CSS e Tipografia**: Utilizamos **Tailwind CSS v4** (`@import "tailwindcss";` via `@tailwindcss/postcss`), com tokens de marca e fontes auto-hospedadas (`Momo_Trust_Sans` e `Momo_Trust_Display` carregadas via `next/font/google` em `app/layout.tsx`) definidos em `@theme inline` no arquivo `app/globals.css`, além de utilitários complementares em `style/styles.css`.
- **Arredondamento Fino e Materiais**: Os componentes utilizam arredondamento sutil sem sombras (`rounded-sm` 4px / `rounded-md` 6px), enquanto camadas flutuantes (cabeçalho, menu mobile e tooltips) usam translucidez sutil (`backdrop-filter`) por meio das classes `.apple-chrome-header`, `.apple-chrome-panel` e `.apple-chrome-tooltip`, degradando automaticamente para superfícies opacas e de alto contraste via `@media (prefers-reduced-transparency: reduce)` e `@media (prefers-contrast: more)`.
- **Física de Movimento (`libs/apple-motion.ts`)**: Centraliza as curvas de mola (`APPLE_SPRING_DEFAULT`, `APPLE_SPRING_SNAPPY`, `APPLE_SPRING_MOMENTUM`), transição reduzida (`APPLE_REDUCED_TRANSITION`) e funções de projeção de momento (`projectMomentum`) e resistência elástica (`rubberband`).
- **Conteúdo MDX**: Caso utilizado, a renderização de MDX é envelopada pela classe `markdown-content` sem plugins externos como `@tailwindcss/typography`, mantendo definições manuais em `style/styles.css`.

## Centralização de Recursos (Single Source of Truth)
- `resources/resources.ts`: Arquivo que atua como a única fonte da verdade para as configurações globais estáticas do sistema (nome do site, URLs, fuso horário, metadados de contato e configurações de formatação).
- `resources/dictionary.ts`: Arquivo centralizado que armazena todos os pequenos textos (strings) da interface de usuário (UI). Desacopla as *hardcoded strings* dos componentes React, garantindo infraestrutura para internacionalização e localização (i18n).
- **Conteúdos Base em Markdown**: Textos extensos podem ser isolados em arquivos `.md` dentro da pasta `resources` e lidos no servidor via módulo nativo `fs` (`fs.readFileSync`) para renderização dinâmica.
- **Objetivo Arquitetural**: Evitar valores literais espalhados no código; alterações de idioma, formatações base, metadados ou textos estáticos refletem em toda a aplicação a partir de uma única fonte.

## Mecanismo de Autenticação e Login
- **Componente Cliente e Validação**: O `student-page-login.tsx` utiliza funções de máscara (`00 00 0000`) e validação pura extraídas em `libs/student-auth-validation.ts`, exibindo feedback de erro acessível em tempo real.
- **Route Handler API**: As validações finais do fluxo de login ocorrem *server-side* através do *endpoint* em `app/api/login/route.ts`. Essa rota extrai a variável de ambiente `.env` (`CREDENTIALS`) contendo a lista autorizada e realiza as normalizações de string (remoção de acentos, conversão de espaços).
- **Gerenciamento de Sessão (Cookies)**: Uma vez validado, o SSR do Next.js injeta *Cookies* (`auth` e `student_id`) configurados como `httpOnly` diretamente na resposta HTTP.
- **Navegação e Estado (Server Components)**: A aplicação prioriza manter componentes como *Server Components* sempre que possível. Estados de visualização, como a ordenação da lista de aulas, são gerenciados utilizando os `searchParams` da URL (ex: `?sort=date-asc`) em vez de estados locais (`useState`).

## Patches de Manutenção e Testes
- **Testes E2E e Auditoria Visual (`cypress.config.ts` + `cypress/e2e/ui-audit.cy.ts`)**: Suíte Cypress para validação automatizada de fluxos principais, interações de menu, avisos dispensáveis, alternância de visualização do calendário, tooltips e verificação de quebra/transbordamento horizontal em múltiplos viewports (`375×812`, `640×900`, `768×1024`, `1024×768` e `1440×900`).
- **Compatibilidade do ESLint**: Para contornar a descontinuação da função `.getFilename()` introduzida no ESLint v9 e garantir o funcionamento correto das rotinas de linting, o projeto emprega um script de Node.js (`scripts/patch-eslint-plugin-react.cjs`) acionado via hook `postinstall` no `package.json`.
