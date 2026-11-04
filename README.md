<div align="center">
  <img src="public/imagens/logo-dois-pontos-de-vista.png" alt="Símbolo de Dois Pontos de Vista: dois leitores sobre um livro aberto" width="180" />

  # Dois Pontos de Vista

  **Duas perspectivas. Infinitas histórias.**

  Um espaço literário criado por **Luiz Anselmo** e **Heloísa Marques** para guardar leituras, avaliações e reflexões. As vezes sobre os mesmos livros, as vezes sobre histórias completamente diferentes.
  #### [Link para o site](https://dois-pontos-de-vista.pages.dev/)
</div>

---

## Sobre o projeto

O **Dois Pontos de Vista** nasceu da vontade de registrar o que os livros despertam em cada um de nós. Não precisamos ler juntos, concordar ou dar a mesma nota: cada opinião tem seu próprio espaço.

Quando escrevemos sobre uma mesma obra, ainda que com anos de diferença, ela passa a integrar **Leituras a Dois**, reunindo nossas duas perspectivas em uma única página de apresentação. Os textos completos permanecem em páginas individuais.

Mais do que um catálogo, queremos construir uma memória das nossas experiências como leitores ao longo do tempo.

## O que o site oferece

- **Nossa Estante:** catálogo compartilhado, com pesquisa, filtros e capas dos livros.
- **Leituras a Dois:** obras que receberam opiniões de ambos os autores, sem exigir leitura simultânea.
- **Página de cada livro:** informações da obra, sinopse e avaliações individuais.
- **Opiniões separadas:** textos próprios de Luiz e Heloísa, com datas, notas e espaço para imagens.
- **Perfis dos autores:** apresentação pessoal e histórico de leituras e avaliações.
- **Últimas leituras:** carrossel responsivo com destaque para os livros comentados recentemente.
- **Sobre Nós:** a história e a proposta do projeto.

## Tecnologias

- [Astro](https://astro.build/) — geração do site.
- **Markdown** — armazenamento de livros e opiniões.
- **TypeScript, HTML e CSS** — componentes, navegação e apresentação.
- [GitHub](https://github.com/) — versionamento e armazenamento do projeto.
- [Pages CMS](https://pagescms.org/) — configuração de um futuro painel visual de edição (arquivo `.pages.yml`).
- **Cloudflare Pages** — hospedagem planejada para a publicação pública.

> **Estado atual:** o site funciona localmente e usa conteúdo demonstrativo para testes. A configuração do Pages CMS está no repositório, mas o painel e a hospedagem pública dependem de conexão e validação. Os conteúdos de exemplo serão substituídos antes do lançamento.

## Executar localmente

**Requisito:** Node.js compatível com a versão do Astro indicada em `package.json` (atualmente `>=22.23.4`).

```bash
npm install
npm run dev
```

Depois, abra `http://localhost:4321`.

Para testar a compilação de produção:

```bash
npm run build
npm run preview
```

## Organização do conteúdo

```text
src/
├── components/          # Componentes compartilhados
├── content/
│   ├── livros/          # Um arquivo Markdown por obra
│   └── opinioes/        # Uma opinião por autor, vinculada ao livro
├── data/                # Regras e dados derivados do conteúdo
├── pages/               # Rotas e páginas do site
└── styles/              # Estilos e ajustes responsivos

public/imagens/           # Fotos, identidade visual e imagens locais
.pages.yml               # Configuração do Pages CMS
```

### Como funciona uma leitura a dois?

1. Uma obra é cadastrada uma única vez.
2. Luiz ou Heloísa publica sua opinião sobre ela.
3. Quando o outro também publica uma opinião, o site identifica ambas e classifica a obra automaticamente como **Leitura a Dois**.
4. Cada avaliação e texto mantém sua autoria e sua data, sem cálculo de nota média.

## Fluxo editorial planejado

Heloísa e Luiz escrevem livremente; os textos também podem ser preparados no Google Docs. Luiz organiza os cadastros e as publicações no painel editorial. A intenção é permitir **criar, revisar e editar** livros e opiniões sem alterar o código a cada nova leitura.

## Autores

**Luiz Anselmo** e **Heloísa Marques** 

---

<div align="center">
  <sub>Feito com cuidado, para guardar histórias e pontos de vista.</sub>
</div>
