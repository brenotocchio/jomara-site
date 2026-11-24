/* =========================================================
   Jomara | Moda • Lar • Presentes
   Scripts do site: dados das vitrines, status de horário,
   menu mobile e carrossel.
   ========================================================= */
(() => {
  'use strict';

  /* ---------- Configuração da loja ---------- */
  const LOJA = {
    whatsapp: '5518981998292',
    // 0 = domingo ... 6 = sábado  |  [abre, fecha] em horas decimais
    horario: {
      0: null,
      1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18],
      6: [9, 14]
    }
  };

  const linkWhats = (assunto) =>
    `https://wa.me/${LOJA.whatsapp}?text=` +
    encodeURIComponent(`Olá, Jomara! Vim pelo site e tenho interesse em ${assunto}.`);

  const esc = (t) => String(t).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Categorias ---------- */
  const CATEGORIAS = [
    { titulo: 'Moda feminina', texto: 'Vestidos, saias, macacões e conjuntos para todas as idades.', img: 'look-2.jpg', assunto: 'moda feminina' },
    { titulo: 'Enxoval', texto: 'Edredons, jogos de cama, mesa e banho para deixar a casa aconchegante.', img: 'enxoval.jpg', assunto: 'enxoval' },
    { titulo: 'Brinquedos', texto: 'Prateleiras cheias de diversão para todas as idades.', img: 'brinquedos.jpg', assunto: 'brinquedos' },
    { titulo: 'Bolsas e acessórios', texto: 'Bolsas de praia, necessaires e detalhes que completam o look.', img: 'bolsa.jpg', assunto: 'bolsas e acessórios' },
    { titulo: 'Utensílios e casa', texto: 'Copos térmicos, utilidades e itens que deixam o lar mais gostoso.', img: 'copos.jpg', assunto: 'utensílios para casa' },
    { titulo: 'Presentes', texto: 'Aniversário, Natal, Dia das Mães: a gente ajuda a escolher e embrulha com carinho.', img: 'cuidado.jpg', assunto: 'presentes' }
  ];

  /* ---------- Vitrine de novidades ---------- */
  const NOVIDADES = [
    ['look-1.jpg', 'Saia de tricô e blusa vinho', 'Moda feminina'],
    ['look-6.jpg', 'Vestido amarelo de manga bufante', 'Vestidos'],
    ['look-3.jpg', 'Macacão curto bege', 'Macacões'],
    ['brinquedos-2.jpg', 'Bichinhos 360° com luz e som', 'Brinquedos'],
    ['look-4.jpg', 'Vestido ombro a ombro floral', 'Vestidos'],
    ['enxoval.jpg', 'Edredom floral rosé', 'Enxoval'],
    ['look-5.jpg', 'Conjunto estampado de verão', 'Conjuntos'],
    ['hero-2.jpg', 'Macacão vermelho pantalona', 'Fim de ano'],
    ['look-8.jpg', 'Vestido midi amarelo', 'Vestidos'],
    ['bolsa.jpg', 'Bolsa de praia em palha', 'Acessórios'],
    ['copos.jpg', 'Copos térmicos', 'Utensílios']
  ];

  const $ = (sel) => document.querySelector(sel);

  function renderCategorias() {
    const alvo = $('#cats');
    if (!alvo) return;
    alvo.innerHTML = CATEGORIAS.map((c) => `
      <a class="cat" href="${linkWhats(c.assunto)}" target="_blank" rel="noopener">
        <img src="img/${c.img}" alt="${esc(c.titulo)} na Jomara" loading="lazy">
        <div class="t">
          <h3>${esc(c.titulo)}</h3>
          <p>${esc(c.texto)}</p>
          <span class="go">Consultar pelo WhatsApp →</span>
        </div>
      </a>`).join('');
  }

  function renderNovidades() {
    const alvo = $('#rail');
    if (!alvo) return;
    alvo.innerHTML = NOVIDADES.map(([img, nome, cat]) => `
      <figure class="look">
        <div class="ph"><img src="img/${img}" alt="${esc(nome)}" loading="lazy"></div>
        <figcaption>
          <small>${esc(cat)}</small>
          <b>${esc(nome)}</b>
          <a href="${linkWhats(nome.toLowerCase())}" target="_blank" rel="noopener">Quero esse →</a>
        </figcaption>
      </figure>`).join('');
  }

  /* ---------- Carrossel ---------- */
  function iniciarCarrossel() {
    const rail = $('#rail');
    if (!rail) return;
    const passo = (dir) => {
      const card = rail.querySelector('.look');
      if (!card) return;
      rail.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' });
    };
    $('#prev')?.addEventListener('click', () => passo(-1));
    $('#next')?.addEventListener('click', () => passo(1));
    rail.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') passo(1);
      if (e.key === 'ArrowLeft') passo(-1);
    });
  }

  /* ---------- Horário: aberto agora? (fuso de Araçatuba) ---------- */
  function agoraEmAracatuba() {
    const partes = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
    }).formatToParts(new Date());
    const v = Object.fromEntries(partes.map((p) => [p.type, p.value]));
    const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { dia: dias[v.weekday], hora: (Number(v.hour) % 24) + Number(v.minute) / 60 };
  }

  const fmt = (h) => `${Math.floor(h)}h${h % 1 ? String(Math.round((h % 1) * 60)).padStart(2, '0') : ''}`;

  function proximaAbertura(dia) {
    const nomes = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    for (let i = 1; i <= 7; i++) {
      const d = (dia + i) % 7;
      if (LOJA.horario[d]) return `${i === 1 ? 'amanhã' : nomes[d]} às ${fmt(LOJA.horario[d][0])}`;
    }
    return '';
  }

  function atualizarStatus() {
    const { dia, hora } = agoraEmAracatuba();
    const h = LOJA.horario[dia];
    let aberto = false, texto;
    if (h && hora >= h[0] && hora < h[1]) {
      aberto = true;
      texto = `Aberto agora · fecha às ${fmt(h[1])}`;
    } else if (h && hora < h[0]) {
      texto = `Fechado · abre hoje às ${fmt(h[0])}`;
    } else {
      texto = `Fechado · abre ${proximaAbertura(dia)}`;
    }
    document.querySelectorAll('[data-status]').forEach((el) => {
      el.textContent = texto;
      el.classList.toggle('on', aberto);
    });
    document.querySelectorAll('.hours li').forEach((li) => {
      li.classList.toggle('today', (li.dataset.dias || '').split(',').includes(String(dia)));
    });
  }

  /* ---------- Menu mobile ---------- */
  function iniciarMenu() {
    const tog = $('#tog'), menu = $('#menu');
    if (!tog || !menu) return;
    const fechar = () => { menu.classList.remove('open'); tog.setAttribute('aria-expanded', 'false'); };
    tog.addEventListener('click', () => {
      const aberto = menu.classList.toggle('open');
      tog.setAttribute('aria-expanded', String(aberto));
    });
    menu.addEventListener('click', (e) => { if (e.target.tagName === 'A') fechar(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
  }

  /* ---------- Cabeçalho com sombra ao rolar ---------- */
  function iniciarCabecalho() {
    const header = $('header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Início ---------- */
  renderCategorias();
  renderNovidades();
  iniciarCarrossel();
  iniciarMenu();
  iniciarCabecalho();
  atualizarStatus();
  setInterval(atualizarStatus, 60000);
  const ano = $('#yr');
  if (ano) ano.textContent = new Date().getFullYear();
})();
