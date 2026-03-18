# Valora — Financial Security & Wealth Management

Sistema de gestão patrimonial inteligente.

## Estrutura do projeto

```
valora-app/
├── index.html       ← Aplicação principal (SPA completo)
├── manifest.json    ← PWA manifest (instalar como app)
├── sw.js            ← Service Worker (offline + cache)
├── icon-192.svg     ← Ícone do app (192x192)
├── icon-512.svg     ← Ícone do app (512x512)
├── _redirects       ← Configuração Netlify (SPA routing)
├── _headers         ← Headers de segurança e cache
└── README.md        ← Este arquivo
```

## Deploy no Netlify

1. Faça push desta pasta para um repositório GitHub
2. No Netlify: New site → Import from Git → selecione o repo
3. Publish directory: `.` (raiz)
4. Deploy!

## Tecnologias

- HTML5 / CSS3 / JavaScript puro
- Chart.js (gráficos)
- PWA (instalável no iOS, Android e Desktop)
- Service Worker (funciona offline)
