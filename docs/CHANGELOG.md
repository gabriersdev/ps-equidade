# Changelog

## [Unreleased]
### Adicionado
- Utilitário `libs/apple-motion.ts` com presets de *spring* interrompíveis (`APPLE_SPRING_DEFAULT`, `APPLE_SPRING_SNAPPY`, `APPLE_SPRING_MOMENTUM`), transição reduzida (`APPLE_REDUCED_TRANSITION`) e funções `projectMomentum` e `rubberband`.
- Componente `MotionProvider` (`components/motion-provider.tsx`) com `MotionConfig reducedMotion="user"` e suporte global a `prefers-reduced-motion`, `prefers-reduced-transparency` e `prefers-contrast` em `app/globals.css`.
- Suíte de testes E2E e auditoria visual/responsiva com Cypress (`cypress.config.ts` e `cypress/e2e/ui-audit.cy.ts`) cobrindo rotas principais, avisos, navegação do calendário e múltiplos viewports.
- Suporte a gesto horizontal (*swipe-to-dismiss* com projeção de momento e resistência nas bordas) em `components/alert-info-item.tsx` e troca de mês por deslize horizontal em `components/calendar-table.tsx`.
- Componentes modulares `components/header-desktop-nav.tsx`, `components/header-mobile-menu.tsx`, `components/calendar-list-row.tsx`, `components/calendar-table-grid.tsx`, `components/calendar-event-chip.tsx` (tooltips translúcidos acessíveis), `components/calendar-view-toggle.tsx`, `components/student-page/student-login-field.tsx`, `libs/calendar-export.ts`, `libs/calendar-utils.ts` e `libs/student-auth-validation.ts`.

### Alterado
- Adoção integral da família tipográfica **Momo Trust Sans** (corpo, controles, tabelas, botões e tooltips) e **Momo Trust Display** (títulos) auto-hospedadas via `next/font/google` em `app/layout.tsx`, removendo referências legadas a `Inter` e `Inter Tight` de `app/globals.css`, `style/styles.css`, `components/calendar-table.tsx` e `components/calendar-event-chip.tsx`.
- Aplicação consistente de arredondamento fino sem exagero (`rounded-sm` 4px / `rounded-md` 6px, mantendo `box-shadow: none`) em todos os componentes da interface (cartões, avisos, inputs, botões, controles segmentados, tabelas, chips e tooltips).
- Refatoração completa de todos os componentes e páginas de **Bootstrap 5 / React Bootstrap** para **Tailwind CSS v4** (`@theme inline` em `app/globals.css`), mantendo a identidade visual flat, paleta da marca e tipografia ótica.
- Substituição de animações de duração fixa em `AnimatedComponent` por *springs* interrompíveis e resposta imediata no `pointerdown` em botões e links interativos.
- Atualização do `Header` para barra fixa translúcida com menu mobile ancorado no gatilho e indicador ativo animado; atualização do seletor de visualização de `app/calendar/page.tsx` para *segmented control* animado.
- Remoção de atrasos artificiais no foco de `StudentPageLogin` e na geração de `.ics` em `CalendarButtons`, além da remoção de `legacyBehavior` em `app/not-found.tsx`.
- Atualização de `docs/ARCHITECTURE.md`, `docs/BUSINESS-RULES.md` e `docs/CODING-GUIDELINES.md` para refletir o uso de Tailwind CSS v4 e Framer Motion.

### Corrigido
- Corrigida transição bloqueante na troca `Lista`/`Tabela` em `app/calendar/page.tsx` e no seletor `CalendarViewToggle` (eliminando texto branco sobre fundo branco durante o deslize do indicador).
- Alinhamento inteligente de tooltips em `CalendarEventChip` e `CalendarTableGrid` nas colunas de extremidade (domingo/sábado) para evitar corte horizontal em telas estreitas ou na borda da tabela.
- Ajuste responsivo em `CalendarList`, `CalendarListRow` e `CalendarTable` para evitar transbordamento ou corte da coluna `Conteúdo` em mobile (`375px`) e tablet (`768px`) e quebra em duas linhas do título mensal no mobile.
- Removido truncamento de linha única (`line-clamp-1`) em `ClassCardLink` para evitar ocultação do nome completo dos arquivos e ferramentas em telas estreitas (`375px` e `640px`).
- Padronização de `:focus-visible` e remoção de contorno laranja padrão em `app/globals.css` e `CalendarViewToggle`.

### Removido
- Dependências `bootstrap` e `react-bootstrap` do `package.json`.
- Arquivos `components/bootstrap-client.tsx`, `style/bootstrap-overrides.css`, `style/bootstrap.css` e `style/bootstrap.min.css`.

---

- Suporte a múltiplos avisos dinâmicos gerenciados através do arquivo de recurso estático `resources/alerts-data.ts`.
- Memorização local inteligente da leitura de avisos (no `localStorage`), garantindo que o alerta não apareça novamente para usuários que o fecharam.
- Tratamento contra problemas de piscar de tela (FOUC) gerados pelo SSR do Next.js antes da verificação de armazenamento do cliente ser concluída.

### Corrigido
- Implementado um script de patch (`scripts/patch-eslint-plugin-react.js`) acionado via `postinstall` para corrigir o erro fatal do ESLint (`contextOrFilename.getFilename is not a function`), garantindo compatibilidade do `eslint-plugin-react` com o ESLint v9/v10.
