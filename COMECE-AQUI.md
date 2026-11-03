# Dois Pontos de Vista — próxima etapa: painel de publicação

## Instalação local

1. Faça backup da pasta `~/Documents/dois-pontos-de-vista`.
2. Extraia este ZIP. Copie **o conteúdo** desta pasta para a pasta do projeto; não crie uma pasta dentro de outra. Preserve `node_modules` local.
3. Execute `npm run build`. Se terminar sem erro, execute `npm run dev`.
4. Confira a Home e o carrossel: desktop = 3 livros / página, tablet = 2, celular = 1; setas, bolinhas e deslize por toque.

## O que está pronto

- Configuração de cadastro e edição para Pages CMS em `.pages.yml` na raiz do repositório.
- Coleção **Livros**: título, autor, gênero, ano, sinopse, capa, publicar.
- Coleção **Opiniões**: livro existente, Luiz/Heloísa, título, nota, datas, resumo, texto rico e publicar.
- Upload de imagens para `public/imagens/livros`.
- Carrossel com **um cartão por obra**, sinopse e duas notas individuais quando existirem. A ordenação usa a data da opinião publicada mais recentemente.
- Contagem por páginas: 1 de 2 no desktop com 6 obras, 1 de 3 no tablet e 1 de 6 no celular.
- **Atenção:** a configuração do Pages CMS está pronta nos arquivos, mas o painel só poderá ser aberto depois de conectar o projeto a um repositório GitHub e autorizar o Pages CMS.

## Próximo passo na sua conta GitHub

1. Crie um repositório no GitHub, de preferência **privado enquanto houver exemplos ou conteúdo não revisado**.
2. Publique o conteúdo do projeto nesse repositório (`git add .`, `git commit` e `git push`, depois de configurar o remoto). Nunca suba `node_modules` ou credenciais. Verifique `.gitignore`.
3. Acesse https://app.pagescms.org, entre com GitHub, autorize o acesso ao repositório e abra-o.
4. O Pages CMS detectará `.pages.yml` e deverá oferecer as coleções `Livros` e `Opiniões e avaliações`.
5. Teste primeiro **editar um livro demonstrativo** e uma opinião, evitando apagar ou renomear o arquivo.
6. Para cadastrar: crie um livro; depois crie uma opinião, selecione o livro e marque `publicado` somente quando desejar exibi-la.
7. O site público só será atualizado automaticamente depois de conectar GitHub a um serviço de deploy como Cloudflare Pages.

## Segurança e conteúdo

- `publicado: false` **oculta no site, mas não mantém secreto o conteúdo do arquivo no GitHub**. Use repositório privado para rascunhos sensíveis.
- Os exemplos atuais são fictícios; remova ou substitua antes do lançamento.
- Não crie duas opiniões da mesma pessoa para o mesmo livro. O modelo atual prevê uma opinião por autor por livro, que pode ser editada posteriormente.
- Preserve os identificadores dos arquivos (`crime-e-castigo.md`, por exemplo) depois de publicar, para não quebrar URLs e relações.
- Imagens externas de capas dependem de conectividade; imagens enviadas ao CMS ficam no próprio repositório.
- Não há servidor de CMS dentro do Astro: a edição acontece no Pages CMS, com permissão GitHub.

## Fontes técnicas

- https://pagescms.org/docs/quick-start/
- https://pagescms.org/docs/configuration/
- https://pagescms.org/docs/configuration/fields/reference/
- https://pagescms.org/docs/configuration/fields/rich-text/
