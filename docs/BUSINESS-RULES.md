# Regras de Negócio do projeto

## Identidade Visual e UI
- **Esquema de Cores**:
  - Primária: Verde Sálvia Profundo (`#235C36`)
  - Secundária: Vermelho Terracota Amenizado (`#B24B45`)
  - Terciária: Verde Musgo Suave (`#3E7E54`)
  - Quaternária: Verde Sálvia Claro (`#74A884`)
  - Texto e Títulos: Grafite Escuro (`#1F2722`)
  - Fundo: Gelo Suave (`#F5F7F5`)
  - Avisos: Azul Ardósia (`#354E8A`)
- **Tipografia**:
  - Fonte global em todo o projeto: **`Inter`** via `next/font/google` (`--font-inter`), aplicada ao corpo, títulos, menus, tabelas, formulários, botões, badges e tooltips (espaçamento neutro `0` e entrelinha confortável `1.6` no corpo; *tracking* levemente negativo e entrelinha justa nos títulos).
- **Estilo de Componentes**:
  - É expressamente proibido o uso de sombras (`box-shadow`) ou arredondamentos exagerados (*pill*/bolha), priorizando um design *flat* e limpo com arredondamento fino e concêntrico (`rounded-lg` 8px em contêineres, cartões, avisos e tabelas; `rounded-md` 6px em botões, badges, inputs, links de ação, chips e tooltips; `rounded-sm` 4px apenas em miniaturas internas de ícones).
  - Camadas flutuantes (cabeçalho fixo, menu mobile e tooltips) utilizam translucidez sutil (`backdrop-filter`) e bordas finas para indicar hierarquia sem recorrer a sombras.
  - A interface deve responder imediatamente ao toque/clique (`pointerdown`), usar transições físicas interrompíveis (*springs*) e respeitar as preferências do sistema (`prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`).

## Estrutura de Navegação Obrigatória
A navegação pública deve sempre conter os itens:
- Aulas
- Calendário
- Recursos
- Logo que redireciona para a home (`/`)

> **Área do aluno (Oculta):** Todos os elementos, links de navegação, página (`/student-page`) e endpoint (`POST /api/login`) relacionados à **Área do aluno** permanecem desativados/ocultos enquanto `appConfigs.features.studentAreaEnabled` for `false` em `resources/resources.ts`.

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

## Regras de Avisos (Alerts)
- **Centralização de Avisos**: Todos os avisos da plataforma devem ser definidos e consumidos a partir do arquivo de recursos estáticos `resources/alerts-data.ts`, contendo o ID único, título, conteúdo e a data limite de exibição.
- **Validade do Aviso**: Avisos com a data de validade (`datetimeMaxShow`) expirada em relação ao momento do acesso (`moment()`) são invalidados e não devem ser exibidos em nenhuma circunstância.
- **Memorização de Ocultamento**: O usuário possui a capacidade de dispensar um aviso (por botão de fechar ou gesto horizontal *swipe*). Essa ação armazena o ID daquele aviso no `localStorage` do dispositivo e inibe a exibição deste em acessos futuros. O salvamento respeita obrigatoriamente a regra de nomenclatura de chaves no projeto.
