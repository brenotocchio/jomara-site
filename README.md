# Site Jomara | Moda • Lar • Presentes

Site institucional da Jomara, em Araçatuba-SP.

## Estrutura

```
index.html        Página (conteúdo e textos)
css/style.css     Todo o visual (cores, fontes, layout, celular)
js/main.js        Categorias, vitrine, horário "aberto agora", menu
img/              Logo, fotos de produtos e da loja
```

## Como editar o mais comum

| Quero mudar…                        | Onde                                              |
|-------------------------------------|---------------------------------------------------|
| Número do WhatsApp                  | `js/main.js` → `LOJA.whatsapp` e links em `index.html` (busque `5518981998292`) |
| Horário de funcionamento            | `js/main.js` → `LOJA.horario`, a lista `.hours` e o rodapé em `index.html`, e o bloco `openingHoursSpecification` no topo do `index.html` |
| Categorias de produtos              | `js/main.js` → `CATEGORIAS`                       |
| Produtos da vitrine "Chegou na loja" | `js/main.js` → `NOVIDADES` (foto em `img/`, nome, categoria) |
| Cores                               | `css/style.css` → seção 1, variáveis `--plum` e `--coral` |
| Endereço                            | `index.html` (cartão "Venha tomar um café", rodapé e bloco de dados para o Google) |

Para trocar uma foto, coloque o arquivo novo em `img/` (de preferência até 800 px de largura) e use o nome dele no lugar do antigo.

## Publicar

É um site estático: basta enviar a pasta inteira para qualquer hospedagem
(Hostinger, Netlify, Vercel, GitHub Pages, Locaweb etc.). A página inicial é o `index.html`.
