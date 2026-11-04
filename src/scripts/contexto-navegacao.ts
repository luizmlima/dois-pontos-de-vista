// Contexto de origem restrito a rotas internas conhecidas (sem redirecionamento externo).
const origem = new URLSearchParams(window.location.search).get('origem');
const destinos: Record<string, {href:string, label:string}> = {
  'leituras-a-dois': {href:'/leituras-a-dois',label:'← Voltar às Leituras a Dois'},
  'estante': {href:'/estante',label:'← Voltar à Nossa Estante'},
  'proximas-leituras': {href:'/proximas-leituras',label:'← Voltar às Próximas Leituras'},
  'inicio': {href:'/',label:'← Voltar ao Início'},
};
const destino = origem && destinos[origem] ? destinos[origem] : destinos.estante;
for (const a of document.querySelectorAll<HTMLAnchorElement>('[data-voltar-origem]')) {
  a.href = destino.href;
  a.textContent = destino.label;
}
if (origem && destinos[origem]) {
  for (const a of document.querySelectorAll<HTMLAnchorElement>('[data-preservar-origem]')) {
    const u = new URL(a.href, window.location.origin);
    if (u.origin === window.location.origin) {
      u.searchParams.set('origem', origem);
      a.href = u.pathname + u.search + u.hash;
    }
  }
}
