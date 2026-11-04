import sharp from 'sharp';

/** Escapa texto vindo do CMS antes de colocá-lo em um SVG. */
const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
function linhas(texto: string, limite=25, max=3): string[]{
  const partes=texto.trim().split(/\s+/);const linhas:string[]=[];let linha='';
  for(const palavra of partes){const candidato=linha?linha+' '+palavra:palavra;
    if(candidato.length > limite && linha){linhas.push(linha);linha=palavra;}else linha=candidato;
    if(linhas.length>=max) break;
  }
  if(linhas.length<max && linha) linhas.push(linha);
  return linhas.slice(0,max);
}
function estrela(cx:number,cy:number,r:number){
  return Array.from({length:10},(_,i)=>{const a=(Math.PI*i/5)-Math.PI/2, rr=i%2? r*0.46:r;return `${i?'L':'M'} ${(cx+Math.cos(a)*rr).toFixed(2)} ${(cy+Math.sin(a)*rr).toFixed(2)}`}).join(' ')+' Z';
}
function estrelas(nota:number|null, x=650, y=385, tamanho=29){
  if(nota===null) return `<text x="${x}" y="${y}" fill="#70665f" font-size="24">Sem nota</text>`;
  const n=Math.min(5,Math.max(0,nota));
  let a='';for(let i=0;i<5;i++){const base=x+i*62, d=estrela(base+25,y,tamanho);const val=Math.max(0,Math.min(1,n-i));
    a+=`<path d="${d}" fill="#dfd3c2"/><clipPath id="s${i}"><rect x="${base-6}" y="${y-tamanho-1}" width="${62*val}" height="${tamanho*2+3}"/></clipPath><path d="${d}" fill="#b68a56" clip-path="url(#s${i})"/>`;
  }
  return a;
}
type Args={titulo:string;autor:string; subtitulo:string;tipo:'opiniao'|'livro'|'site';nota?:number|null;nome?:string;notaEle?:number|null;notaEla?:number|null};
export async function gerarCartaoSocial({titulo,autor,subtitulo,tipo,nota=null,nome='',notaEle=null,notaEla=null}:Args):Promise<Uint8Array>{
  const cor=tipo==='opiniao'?(nome.includes('Heloísa')?'#884C55':'#53675A'):'#884C55';
  const quebras=linhas(titulo,14,3);
  const subtituloLinhas=linhas(subtitulo,49,2);
  const tituloSvg=quebras.map((s,i)=>`<text x="648" y="${226+i*65}" fill="#302c2a" font-size="${quebras.length>2?49:55}" font-family="Georgia,DejaVu Serif,serif">${esc(s)}</text>`).join('');
  const bloco=tipo==='opiniao' ? `
    <text x="648" y="${quebras.length>2?384:336}" font-size="18" fill="#87796d" font-family="DejaVu Sans,sans-serif">${esc(subtitulo.length>44?subtitulo.slice(0,43)+'…':subtitulo)}</text>
    <text x="648" y="${quebrasY(quebras)}" font-size="21" fill="#746962">${esc(nome)}</text>
    ${estrelas(nota,648,quebras.length>2?462:448,24)}
    <text x="648" y="512" font-size="28" font-family="DejaVu Sans,sans-serif" font-weight="bold" fill="${cor}">${nota===null?'Sem nota':(nota.toFixed(1).replace('.',',')+'/5')}</text>
  `:tipo==='livro' ? `
    <text x="648" y="${quebras.length>2?427:384}" font-size="20" fill="#70665f">Avaliações individuais</text>
    <text x="648" y="${quebras.length>2?464:423}" font-size="23" font-weight="bold" fill="#53675A">Luiz: ${notaEle===null?'—':notaEle.toFixed(1).replace('.',',')+'/5'}</text>
    <text x="648" y="${quebras.length>2?502:461}" font-size="23" font-weight="bold" fill="#884C55">Heloísa: ${notaEla===null?'—':notaEla.toFixed(1).replace('.',',')+'/5'}</text>
  `: `
    ${subtituloLinhas.map((s,i)=>`<text x="648" y="${385+i*35}" font-size="24" fill="#746962">${esc(s)}</text>`).join('')}
  `;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#F5F0E8"/>
    <rect x="24" y="24" width="1152" height="582" rx="12" fill="none" stroke="#d6c9b9" stroke-width="2"/>
    <rect x="64" y="80" width="508" height="452" rx="8" fill="${cor}"/>
    <path d="M137 267 Q250 215 314 264 Q390 222 503 267 L503 441 Q397 398 314 437 Q223 392 137 441 Z" fill="#F5F0E8" stroke="#d1bfa9" stroke-width="5"/>
    <path d="M314 264V435" fill="none" stroke="#cbb69f" stroke-width="5"/>
    <path d="M165 293 Q225 268 289 297 M165 319 Q230 293 289 323 M343 297 Q404 268 473 293 M343 324 Q408 297 473 319" stroke="#cbb69f" stroke-width="5" stroke-linecap="round" fill="none"/>
    <circle cx="256" cy="209" r="29" fill="${cor === '#53675A' ? '#dce5da' : '#53675A'}"/><circle cx="375" cy="209" r="29" fill="#b77d87"/>
    <text x="104" y="122" font-family="DejaVu Sans,sans-serif" font-size="17" fill="#f8e9dd" letter-spacing="4">DOIS PONTOS DE VISTA</text>
    <text x="648" y="145" font-family="DejaVu Sans,sans-serif" fill="${cor}" font-size="17" letter-spacing="3">${esc(autor).toUpperCase().slice(0,46)}</text>
    ${tituloSvg}
    ${bloco}
    <path d="M648 550H1111" stroke="#cbbbac" stroke-width="2"/>
    <circle cx="657" cy="582" r="9" fill="#53675A"/><circle cx="684" cy="582" r="9" fill="#884C55"/>
    <text x="716" y="588" fill="#655a51" font-size="20" font-family="DejaVu Sans,sans-serif">dois-pontos-de-vista.pages.dev</text>
  </svg>`;
  return await sharp(Buffer.from(svg)).png().toBuffer();
}
function quebrasY(linhas:string[]){return linhas.length>2?417:377;}
