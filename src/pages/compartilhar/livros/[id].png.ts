import type { APIRoute } from 'astro';
import { livros } from '../../../data/livros';
import { gerarCartaoSocial } from '../../../lib/cartoes-sociais';
export function getStaticPaths(){return livros.map(livro=>({params:{id:livro.id},props:{livro}}));}
export const GET: APIRoute = async ({props}) => {
  const {livro}=props;
  return new Response(await gerarCartaoSocial({tipo:'livro',titulo:livro.titulo,autor:livro.autor,subtitulo:'Duas perspectivas, uma obra',notaEle:livro.notaEle,notaEla:livro.notaEla}),{headers:{'Content-Type':'image/png'}});
};
