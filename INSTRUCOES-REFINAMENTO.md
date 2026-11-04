# Dois Pontos de Vista — refinamento de legibilidade e mobile

Esta atualização modifica apenas a apresentação e o favicon. **Não altera conteúdos Markdown, o CMS, o carrossel ou sua lógica.**

## Aplicar

1. No seu computador, entre no projeto e execute `git status`. Se tiver alterações não salvas, faça backup/commit antes.
2. Se o `git status` estiver limpo, execute `git pull --ff-only` para sincronizar com os conteúdos editados no Pages CMS. Se não estiver limpo, registre ou guarde suas alterações antes de puxar.
3. Extraia o ZIP e copie as pastas `src` e `public` sobre as existentes, preservando a estrutura de diretórios. Substitua os arquivos quando solicitado. O pacote contém somente os arquivos modificados; não apague suas demais pastas.
4. Execute `npm run build` e `npm run dev`. Confira no celular a página Leituras a Dois, a Estante, a Home e as opiniões.
5. Se tudo estiver correto, execute `git add src public && git commit -m "style: refinar legibilidade e navegacao mobile" && git push`. O Cloudflare Pages publicará a alteração automaticamente.

## O que mudou
- No celular, **Leituras a Dois** apresenta os livros antes dos cartões explicativos. No desktop, a ordem permanece igual.
- Introduções da Estante e de Leituras a Dois com menos altura no celular.
- Pequenos ajustes no tamanho e entrelinhas de textos, filtros, sinopses, cards e encerramentos.
- Carrossel com a mesma aparência e gestos: três cartões no desktop e um no celular, com swipe e bullets. Pequeno ajuste técnico para as larguras de 611–700 px e controles ocultos quando só existe uma página de livros.
- Se não houver livros publicados, a Home e listagens exibem mensagens de espera e não mostram carrossel vazio.
- Favicon redesenhado **sem alterar sua arte**: mesma ilustração, fundo transparente, maior presença em tamanho pequeno.

## Atenção
- Não exclua `src/content/`: seus livros e opiniões (incluindo futuras publicações) **não** estão neste pacote.
- Uma foto ou capa enviada pelo Pages CMS também é preservada: o ZIP não contém `public/imagens/`.
- Se o favicon parecer antigo, recarregue a página sem cache/abra aba privativa.
