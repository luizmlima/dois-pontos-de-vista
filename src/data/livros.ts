/** Modelo público derivado dos arquivos Markdown; sem cadastro duplicado. */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Pessoa = 'ele' | 'ela';
export type Livro = {
  id: string; titulo: string; autor: string; genero: string; ano: string;
  cor: string; iniciais: string; capa?: string; leitores: Pessoa[];
  notaEle: number | null; notaEla: number | null; demonstrativo: boolean;
};
export type Opiniao = {
  livroId: string; pessoa: Pessoa; titulo: string; data: string;
  dataPublicacao: string; resumo: string; nota: number | null;
  demonstrativo: boolean; entry: CollectionEntry<'opinioes'>;
};

const livrosFonte = await getCollection('livros', ({data}) => data.publicado);
const opinioesFonte = await getCollection('opinioes', ({data}) => data.publicado);
const livroIds = new Set(livrosFonte.map(l => l.id));
const chaves = new Set<string>();
for (const o of opinioesFonte) {
  if (!livroIds.has(o.data.livro)) throw new Error(`Opinião ${o.id} aponta para livro inexistente ou não publicado: ${o.data.livro}`);
  const chave = `${o.data.livro}/${o.data.pessoa}`;
  if (chaves.has(chave)) throw new Error(`Duas opiniões publicadas para o mesmo livro e pessoa: ${chave}`);
  chaves.add(chave);
}
export const opinioes: Opiniao[] = opinioesFonte.map(o => ({
  livroId: o.data.livro, pessoa: o.data.pessoa, titulo: o.data.titulo,
  data: new Date(o.data.dataLeitura+'T12:00:00').toLocaleDateString('pt-BR', {day:'2-digit', month:'short', year:'numeric'}),
  dataPublicacao: o.data.dataPublicacao, resumo: o.data.resumo,
  nota: o.data.nota ?? null, demonstrativo: o.data.demonstrativo, entry: o
}));
export const livros: Livro[] = livrosFonte
  .filter(l => opinioes.some(o => o.livroId === l.id)) // Estante pública requer ao menos uma opinião.
  .map(l => {
    const lista = opinioes.filter(o => o.livroId === l.id);
    return { id: l.id, titulo: l.data.titulo, autor: l.data.autor,
      genero: l.data.genero, ano: String(l.data.ano), cor: l.data.cor,
      iniciais: l.data.iniciais ?? l.data.titulo.slice(0,2), capa: l.data.capa,
      leitores: lista.map(o => o.pessoa),
      notaEle: lista.find(o => o.pessoa === 'ele')?.nota ?? null,
      notaEla: lista.find(o => o.pessoa === 'ela')?.nota ?? null,
      demonstrativo: l.data.demonstrativo || lista.some(o=>o.demonstrativo)
    };
  });
export const sinopses: Record<string,string> = Object.fromEntries(livrosFonte.map(l => [l.id, l.data.sinopse]));
/** Cada livro aparece uma única vez, ordenado pela opinião mais recentemente publicada. */
export const ultimasLeituras = (() => {
  const maisRecente = new Map<string, Opiniao>();
  const publicacoesOrdenadas = [...opinioes].sort((a, b) =>
    b.dataPublicacao.localeCompare(a.dataPublicacao)
  );

  for (const opiniao of publicacoesOrdenadas) {
    if (!maisRecente.has(opiniao.livroId)) {
      maisRecente.set(opiniao.livroId, opiniao);
    }
  }

  return [...maisRecente.values()].map((opiniao) => {
    const livro = livros.find((item) => item.id === opiniao.livroId)!;
    const sinopse = sinopses[livro.id] ?? '';
    const resumoSinopse = sinopse.length > 160
      ? `${sinopse.slice(0, 157).trimEnd().replace(/\s+\S*$/, '')}…`
      : sinopse;
    return {
      id: livro.id,
      titulo: livro.titulo,
      autor: livro.autor,
      editorial: resumoSinopse,
      pessoa: opiniao.pessoa === 'ele' ? 'Ele' : 'Ela',
      tipo: livro.leitores.length === 2 ? 'dupla' : 'individual',
      notaEle: livro.notaEle,
      notaEla: livro.notaEla,
      capa: livro.capa,
      cor: livro.cor,
      data: new Date(`${opiniao.dataPublicacao}T12:00:00`).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'short', year: 'numeric'
      }),
      demonstrativo: livro.demonstrativo
    };
  });
})();
