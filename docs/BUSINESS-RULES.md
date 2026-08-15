# Regras de Negócio do projeto

## Identidade Visual e UI
- **Esquema de Cores**:
  - Primária: Verde Escuro (`#00470D`)
  - Secundária: Vermelho (`#CC0202`)
  - Terciária: Verde Médio (`#00941C`)
  - Quaternária: Verde Médio Claro (`#46B55B`)
  - Texto e Títulos: Preto (`#010101`)
  - Fundo: Branco/Gelo (`#F6F6F6`)
- **Tipografia**:
  - Texto geral: `Momo Trust Sans`
  - Negrito e Títulos: `Momo Trust Display`
- **Estilo de Componentes**:
  - É expressamente proibido o uso de sombras (`box-shadow`) ou bordas excessivamente arredondadas (`border-radius`), priorizando um design mais "flat" e cantos retos.

## Estrutura de Navegação Obrigatória
A navegação deve sempre conter os itens:
- Aulas
- Calendário
- Área do aluno
- Logo que redireciona para a home (`/`)

## Regras de Autenticação de Alunos
- **Formato de Credenciais no Ambiente (.env)**:
  - A variável `CREDENTIALS` deve possuir o mapeamento dos alunos através de uma string, no formato `firstname.lastname=birthdate=id`, separados por ponto e vírgula (`;`).
- **Validação de Inputs (Nome)**:
  - A interface obriga que o aluno insira no mínimo dois nomes (primeiro nome e sobrenome). O sistema aceita graciosamente a preposição "e" no meio (ex: "Paulo e Silva").
  - O casamento do texto inserido com os dados é completamente ignorante a maiúsculas, minúsculas, múltiplos espaços e acentuações ("JOÃO   SILVA" corresponderá corretamente à chave `joao.silva` cadastrada).
- **Validação de Inputs (Data de Nascimento)**:
  - A senha atua baseada na data de nascimento do aluno. A verificação (tanto *client-side* quanto *server-side*) exige não apenas a quantia correta de 8 dígitos numéricos, mas a constatação de que eles formam um dia/mês/ano válido e realista pelo calendário gregoriano.
  - A máscara imposta pelo navegador ignora travessões ou barras e formata estritamente de maneira espacial: `00 00 0000`.
- **Associação de Identidade (ID)**:
  - Após a checagem das informações, se a credencial mapear a um aluno autêntico da lista, o seu respectivo ID de 3º valor contido no env deve obrigatoriamente ser armazenado em um token (cookie `student_id`) para garantir rastreabilidade nas futuras lógicas do portal.

## Exibição e Ordenação de Aulas
- **Ordenação Padrão**: As aulas exibidas no portal devem estar ordenadas por padrão em ordem decrescente de data (da mais recente para a mais antiga).
- **Ordenação Dinâmica**: O aluno possui a capacidade de reordenar a listagem na página utilizando parâmetros de URL que reorganizam a lista por Data (crescente/decrescente) e por Título (crescente/decrescente).
- **Sinalização de Próxima Aula**: O sistema deve destacar a "próxima aula" dinamicamente nos cartões de exibição. A lógica obriga comparar todas as datas informadas no banco de aulas e identificar aquela que cronologicamente é o evento futuro (ou atual) mais próximo do momento corrente do usuário.

## Regras de Navegação e Contexto (Breadcrumbs)
- **Tradução de Termos**: As trilhas de navegação (*breadcrumbs*) devem obrigatoriamente traduzir os segmentos literais das rotas (slugs em inglês) para o idioma local (ex: "/classes" torna-se "Aulas"), utilizando o dicionário global centralizado da aplicação.
- **Formatação de Datas em Slugs**: Quando a página for acessada via URL de slug dinâmico correspondente à data de uma aula (formato literal `AAAAMMDD`, ex: `20260704`), a interface deve interceptar e mascarar esta string na UI, exibindo-a formatada logicamente como data (`DD/MM/AAAA`) no *breadcrumb* da página (ex: `04/07/2026`), melhorando a legibilidade e garantindo clareza proativa ao aluno.
