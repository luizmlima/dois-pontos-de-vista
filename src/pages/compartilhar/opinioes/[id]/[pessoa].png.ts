import type { APIRoute } from 'astro';
import { livros, opinioes } from '../../../../data/livros';
import { gerarCartaoSocial } from '../../../../lib/cartoes-sociais';
export function getStaticPaths(){return opinioes.map(opiniao=>({params:{id:opiniao.livroId,pessoa:opiniao.pessoa},props:{opiniao,livro:livros.find(l=>l.id===opiniao.livroId)!}}));}
export const GET: APIRoute = async ({props}) => {
  const {opiniao,livro}=props;
  return new Response(await gerarCartaoSocial({tipo:'opiniao',titulo:livro.titulo,autor:livro.autor,subtitulo:opiniao.titulo,nome:opiniao.pessoa==='ele'?'Luiz Anselmo':'Heloísa Marques',nota:opiniao.nota}),{headers:{'Content-Type':'image/png'}});
};
