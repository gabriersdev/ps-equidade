# Changelog

## [Unreleased]
### Adicionado
- Suporte a múltiplos avisos dinâmicos gerenciados através do arquivo de recurso estático `resources/alerts-data.ts`.
- Memorização local inteligente da leitura de avisos (no `localStorage`), garantindo que o alerta não apareça novamente para usuários que o fecharam.
- Tratamento contra problemas de piscar de tela (FOUC) gerados pelo SSR do Next.js antes da verificação de armazenamento do cliente ser concluída.

### Corrigido
- Implementado um script de patch (`scripts/patch-eslint-plugin-react.js`) acionado via `postinstall` para corrigir o erro fatal do ESLint (`contextOrFilename.getFilename is not a function`), garantindo compatibilidade do `eslint-plugin-react` com o ESLint v9/v10.

