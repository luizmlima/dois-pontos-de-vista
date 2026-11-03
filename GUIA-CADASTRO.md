# Dois Pontos de Vista — etapa 1: conteúdo Markdown

Esta entrega usa conteúdo Markdown real no Astro, **ainda sem painel CMS**.

## Ordem correta

1. Cadastre a obra em `src/content/livros/<slug>.md`.
2. Crie a opinião em `src/content/opinioes/<slug>-ele.md` ou `<slug>-ela.md`.
3. Na opinião, use `livro: "<slug>"`. Os nomes precisam coincidir.
4. Marque `publicado: true` tanto no livro quanto na opinião.
5. Reinicie/salve o Astro; o site recompila. O livro aparecerá na estante depois da primeira opinião e passa para Leituras a Dois quando houver opiniões das duas pessoas.

## Edição

Edite os arquivos `.md`; títulos, datas, sinopse, nota e texto serão atualizados na reconstrução. Nunca altere o nome do arquivo/slug depois de publicar sem planejar redirecionamentos. Para retirar uma opinião da área pública, defina `publicado: false` nela.

## Exemplo de nova opinião

```md
---
livro: "crime-e-castigo"
pessoa: "ela"
titulo: "Minha leitura de Crime e Castigo"
nota: 4.5
dataLeitura: "2026-11-01"
dataPublicacao: "2026-11-03"
resumo: "Uma apresentação curta da minha opinião."
publicado: true
demonstrativo: false
---

Escreva aqui sua opinião.

## Um subtítulo

Texto em **negrito** ou *itálico*.

![Descrição da imagem](/imagens/minha-foto.jpg)
```

> Atenção: já há opiniões de exemplo para os dois autores em alguns livros. **Edite** o arquivo correspondente em vez de criar outro com o mesmo `livro` + `pessoa`.

## Integração e limites

- Os seis livros e respectivas opiniões fornecidos neste pacote são **exemplos fictícios** para testar o site. Substitua-os antes de divulgar o endereço.
- Os perfis ainda têm biografias provisórias; as notas e contagens vêm das coleções Markdown.
- Para imagens em textos use arquivos em `public/imagens` e caminhos `/imagens/nome-do-arquivo.jpg`.
- Exportar do Google Docs para Markdown não cria automaticamente os metadados do frontmatter. O responsável pela publicação precisa completar esses campos.
- O painel Pages CMS, a autenticação e o deploy não estão configurados nesta primeira etapa.

## Teste recomendado

1. Execute `npm run build` e `npm run dev`.
2. Edite a nota e o título de uma opinião demonstrativa; confirme que a página e o perfil são atualizados.
3. Altere a opinião de um dos dois para `publicado: false`: o livro deve voltar a ser leitura individual (ou desaparecer se era sua única opinião).
4. Restaure o valor original ou substitua por conteúdo verdadeiro.
