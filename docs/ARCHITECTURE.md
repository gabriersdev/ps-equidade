# Arquitetura do projeto

O projeto utiliza Next.js com App Router.

## Estrutura de Componentes
Seguindo o design limpo:
- `header.tsx`: Navegação principal.
- `footer.tsx`: Rodapé.
- `sidebar.tsx`: Coluna lateral da home com tópicos e posts em destaque.
- `featured-post.tsx`: Post grande da página inicial.
- `post-card.tsx`: Lista de posts menores.
- `newsletter.tsx`: Bloco de conversão de emails.
- `share-button.tsx`: Botão de compartilhamento que utiliza Web Share API ou a área de transferência.

## Estilização
Utilizamos TailwindCSS. A formatação visual dos conteúdos MDX não utiliza plugins externos como o `@tailwindcss/typography`. Em vez disso, a renderização do MDX é envelopada pela classe `markdown-content` em `app/[slug]/page.tsx`. Todas as definições de tipografia, espaçamento de parágrafos, cores de cabeçalhos, listas, imagens e blocos de código correspondentes a essa classe encontram-se estritamente definidas de forma manual no arquivo global `style/styles.css`, para manter um controle apurado do *design system*.

## Centralização de Recursos (Single Source of Truth)
- `resources/resources.ts`: Arquivo que atua como a única fonte da verdade para as configurações globais estáticas do sistema (nome do site, URLs, fuso horário, metadados de contato e configurações de formatação).
- `resources/dictionary.ts`: Arquivo centralizado que armazena todos os pequenos textos (strings) da interface de usuário (UI). Desacopla as *hardcoded strings* dos componentes React, garantindo que o sistema possua infraestrutura nativa e imediata para internacionalização e localização (i18n).
- **Conteúdos Base em Markdown**: Textos extensos (como os da página *About*, *Privacy* e o guia no rodapé dos posts) foram isolados em arquivos `.md` puros (`about.md`, `privacy.md`, `guide.md`) dentro da pasta `resources`. Diferente dos posts regulares, esses arquivos não possuem metadados (Frontmatter) e são lidos sincronicamente no servidor via módulo nativo `fs` (ex: `fs.readFileSync`), sendo então injetados dinamicamente no componente `MDXRemote`.
- **Objetivo Arquitetural**: A existência desta pasta e seus respectivos arquivos evita o uso de valores "chumbados" no código. Qualquer alteração de idioma, formatações base, metadados ou páginas estáticas reflete instantaneamente em toda a aplicação sem a necessidade de modificar múltiplos arquivos da interface visual.

## Geração Automática de Feeds (RSS)
- `app/rss.xml/route.ts`: Rota de API (Route Handler) nativa do Next.js responsável por interceptar requisições ao arquivo `rss.xml`.
- **Dinamicidade**: Lê os conteúdos MDX através de `getPosts()` e os metadados globais em `resources.ts`, gerando o arquivo XML do RSS Feed na versão 2.0 dinamicamente, mantendo o feed sempre atualizado com as novas publicações e dados do autor sem a necessidade de compilação estática manual prévia.
- **Tratamento de Datas**: O parser de datas (`moment`) recebe um formato de entrada explícito (`DD MMM YYYY`) correspondente aos metadados dos posts para evitar alertas de *fallback* e inconsistências de conversão na engine de build do Next.js.

## Geração Automática de Sitemap (SEO)
- `app/sitemap.ts`: Rota especial do ecossistema Next.js (`MetadataRoute.Sitemap`) que intercepta requisições para `sitemap.xml`.
- **Funcionamento**: A função de renderização coleta programaticamente todas as postagens publicadas através do método `getPosts()` e combina suas URLs (junto a rotas estáticas como a homepage e `/blog`) retornando um objeto iterável estruturado. O Next.js então formata esse retorno nativamente para o padrão XML de SEO utilizado pelos indexadores globais.
- **Tratamento de Datas**: Assim como na geração de RSS, a extração do `lastModified` especifica explicitamente o formato `DD MMM YYYY` ao transformar a string do arquivo MDX, prevenindo o comportamento padrão instável do construtor de `Date` que gera avisos de *deprecation*.

## Integração de UI (Portal do Aluno)
- **Framework CSS**: Para as áreas focadas em portal (Aulas, Calendário, Área do Aluno), a aplicação utiliza primariamente o **Bootstrap 5** (classes utilitárias e estruturais nativas, sem jQuery).
- **Injeção de JS**: Para que o comportamento dinâmico do Bootstrap (como a navbar colapsável e modais) funcione perfeitamente com o SSR do Next.js sem causar problemas de hidratação, o bundle JS do Bootstrap é carregado através de um *Client Component* dedicado (`bootstrap-client.tsx`) inserido diretamente no `layout.tsx`.
- **Tema Híbrido**: As cores são gerenciadas através de variáveis globais CSS customizadas no arquivo `globals.css` (`--primary-color`, `--secondary-color`, etc), atuando sobre os componentes estilizados e permitindo uma fácil customização do tema base para o portal.

## Mecanismo de Autenticação e Login
- **Componente Cliente**: O `student-page-login.tsx` funciona como um *Client Component* que lida com estados locais para as credenciais. Executa rotinas pesadas de validações usando regex, além de aplicar uma máscara em tempo real (`00 00 0000`) para datas.
- **Route Handler API**: As validações finais do fluxo de login ocorrem *server-side* através do *endpoint* em `app/api/login/route.ts`. Essa rota atua extraindo a variável de ambiente `.env` (`CREDENTIALS`) contendo a lista autorizada e realizando as normalizações de string (remoção de acentos, conversão de espaços).
- **Gerenciamento de Sessão (Cookies)**: Uma vez validado, o SSR do Next.js injeta *Cookies* (`auth` e `student_id`) assinados como `httpOnly` diretamente na resposta HTTP. Essa estratégia arquitetônica viabiliza escalabilidade, não sobrecarrega os pacotes com bibliotecas terceiras como NextAuth, e permite leitura fluida da identidade do aluno em páginas estáticas hidratadas no cliente ou geradas dinamicamente no servidor.

- **Navegação e Estado (Server Components)**: A aplicação prioriza manter componentes como *Server Components* sempre que possível. Estados de visualização, como a ordenação da lista de aulas, são gerenciados utilizando os `searchParams` da URL (ex: `?sort=date-asc`) em vez de estados locais (`useState`).
- **Compatibilidade com UI Clients**: Para integrar componentes iterativos do React Bootstrap (que são *Client Components*, como menus `Dropdown`) com rotas do Next.js sem violar a regra de passagem de funções, itens de ação de navegação utilizam o componente `<Link>` nativamente do Next.js envelopado com a classe CSS adequada (`className="dropdown-item"`), evitando injetar o componente como prop (`as={Link}`).
- **Cabeçalhos Dinâmicos**: O componente `PageHeading` atua como um agregador de formatação para os títulos das páginas, permitindo personalização extensível através do repasse de atributos HTML (como `className` e `style`) diretamente para a tag `<h1>`. Ele processa ativamente a URL (`pathname`) da rota atual no lado do cliente para gerar dinamicamente a trilha de navegação (*breadcrumb*), consumindo as traduções em `dictionary.ts`.

## Patches de Manutenção
- **Compatibilidade do ESLint**: Para contornar a descontinuação da função `.getFilename()` introduzida no ESLint v9 e garantir o funcionamento correto das rotinas de linting, o projeto emprega uma estratégia de patch automatizado. Um script de Node.js isolado (`scripts/patch-eslint-plugin-react.js`) é engatilhado nativamente pelo npm através do hook `postinstall`. Este script altera silenciosamente o código-fonte da dependência `eslint-plugin-react` no diretório `node_modules` para utilizar as novas APIs do ESLint (`context.filename` e `context.physicalFilename`), prevenindo crashes e garantindo integração estável do ambiente de desenvolvimento, independentemente de atualizações cegas ou reinstalações de pacote.
