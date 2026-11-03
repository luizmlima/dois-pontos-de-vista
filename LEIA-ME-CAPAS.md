# Atualização — capas reais para os livros demonstrativos

Os seis livros demonstrativos agora possuem o campo `capa` em `src/content/livros/*.md`.
A imagem aparece automaticamente na Home, Estante, Leituras a Dois, páginas de livro e perfis.
A Home também foi corrigida para transmitir o campo `capa` ao carrossel.

As imagens vêm do serviço de capas da Open Library e são **carregadas pela internet**; não são fotos locais incluídas no ZIP. Se o serviço estiver indisponível ou não tiver uma capa, a capa ilustrativa original continua como alternativa. As edições demonstrativas podem ser diferentes dos exemplares físicos de vocês; o ideal é substituir pelo arquivo da edição realmente lida na publicação definitiva.

Fontes de capa:
- `crime-e-castigo`: https://openlibrary.org/books/OL51724713M
- `orgulho-e-preconceito`: https://openlibrary.org/books/OL59157000M
- `biblioteca-da-meia-noite`: https://openlibrary.org/books/OL40213472M
- `1984`: https://openlibrary.org/books/OL7576829M
- `o-hobbit`: https://openlibrary.org/books/OL29823759M
- `e-assim-que-acaba`: https://openlibrary.org/books/OL35891593M

## Como cadastrar uma capa nova

No arquivo `src/content/livros/meu-livro.md`:

```yaml
capa: "/imagens/livros/meu-livro.jpg"
```

Coloque `meu-livro.jpg` na pasta `public/imagens/livros/`, ou use uma URL HTTPS de fonte autorizada. O futuro Pages CMS deverá fornecer o campo de upload. Evite usar URL de busca e confirme a edição da capa.

## Instalação

Faça backup da pasta existente e copie **o conteúdo de `site/`** deste ZIP para a raiz do seu projeto. Mantenha `node_modules`. Rode `npm run build`, depois `npm run dev`.
