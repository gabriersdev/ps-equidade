# Changelog

## [Unreleased]
### Corrigido
- Implementado um script de patch (`scripts/patch-eslint-plugin-react.js`) acionado via `postinstall` para corrigir o erro fatal do ESLint (`contextOrFilename.getFilename is not a function`), garantindo compatibilidade do `eslint-plugin-react` com o ESLint v9/v10.

