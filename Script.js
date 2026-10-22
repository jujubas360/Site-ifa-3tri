(function () {
  "use strict";

  /* ---------- 1. ACESSIBILIDADE / PREFERÊNCIAS ---------- */
  const html = document.documentElement;
  const store = {
    get: (k, d) => { try { return localStorage.getItem('sae_' + k) ?? d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem('sae_' + k, v); } catch {} }
  };

  function applyPrefs() {
    html.dataset.theme = store.get('theme', 'light');
    html.dataset.contrast = store.get('contrast', 'normal');
    html.dataset.font = store.get('font', 'base');
    html.dataset.fontsize = store.get('fontsize', 'normal');
    syncA11yButtons();
  }

  const themeBtn = document.getElementById('btn-theme');
  const contrastBtn = document.getElementById('btn-contrast');
  const dyslexiaBtn = document.getElementById('btn-dyslexia');
  const fontUp = document.getElementById('btn-font-up');
  const fontDown = document.getElementById('btn-font-down');
  const sizes = ['small', 'normal', 'large', 'xlarge'];

  function syncA11yButtons() {
    themeBtn.setAttribute('aria-pressed', html.dataset.theme === 'dark');
    themeBtn.querySelector('.btn-label').textContent = html.dataset.theme === 'dark' ? 'Claro' : 'Escuro';
    contrastBtn.setAttribute('aria-pressed', html.dataset.contrast === 'high');
    dyslexiaBtn.setAttribute('aria-pressed', html.dataset.font === 'dyslexia');
  }

  themeBtn.addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    store.set('theme', html.dataset.theme);
    syncA11yButtons();
  });
  contrastBtn.addEventListener('click', () => {
    html.dataset.contrast = html.dataset.contrast === 'high' ? 'normal' : 'high';
    store.set('contrast', html.dataset.contrast);
    syncA11yButtons();
  });
  dyslexiaBtn.addEventListener('click', () => {
    html.dataset.font = html.dataset.font === 'dyslexia' ? 'base' : 'dyslexia';
    store.set('font', html.dataset.font);
    syncA11yButtons();
  });
  fontUp.addEventListener('click', () => {
    let i = sizes.indexOf(html.dataset.fontsize);
    if (i < sizes.length - 1) html.dataset.fontsize = sizes[++i];
    store.set('fontsize', html.dataset.fontsize);
  });
  fontDown.addEventListener('click', () => {
    let i = sizes.indexOf(html.dataset.fontsize);
    if (i > 0) html.dataset.fontsize = sizes[--i];
    store.set('fontsize', html.dataset.fontsize);
  });

  applyPrefs();

  /* ---------- 2. MENU MOBILE ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.textContent = open ? '✕ Fechar' : '☰ Menu';
  });
  mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰ Menu';
    }
  }));

  /* ---------- 3. SIMULADOR — COMPRIMENTO DE ONDA ---------- */
  const wlInput = document.getElementById('wl');
  const wlOut = document.getElementById('wl-out');
  const wlFreq = document.getElementById('wl-freq');
  const wlEnergy = document.getElementById('wl-energy');
  const wlColor = document.getElementById('wl-color');
  const wlNote = document.getElementById('wl-note');
  const wlLive = document.getElementById('wl-live');

  function wlToRGB(nm) {
    let R, G, B;
    if (nm >= 380 && nm < 440) { R = -(nm - 440) / (440 - 380); G = 0; B = 1; }
    else if (nm >= 440 && nm < 490) { R = 0; G = (nm - 440) / (490 - 440); B = 1; }
    else if (nm >= 490 && nm < 510) { R = 0; G = 1; B = -(nm - 510) / (510 - 490); }
    else if (nm >= 510 && nm < 580) { R = (nm - 510) / (580 - 510); G = 1; B = 0; }
    else if (nm >= 580 && nm < 645) { R = 1; G = -(nm - 645) / (645 - 580); B = 0; }
    else if (nm >= 645 && nm <= 780) { R = 1; G = 0; B = 0; }
    else { R = G = B = 0; }
    let f;
    if (nm >= 380 && nm < 420) f = 0.3 + 0.7 * (nm - 380) / (420 - 380);
    else if (nm >= 420 && nm < 700) f = 1;
    else if (nm >= 700 && nm <= 780) f = 0.3 + 0.7 * (780 - nm) / (780 - 700);
    else f = 0.3;
    const g = 0.8;
    const to = v => Math.round(255 * Math.pow(v * f, g));
    return `rgb(${to(R)},${to(G)},${to(B)})`;
  }

  function updateWavelength() {
    const nm = +wlInput.value;
    wlOut.textContent = nm;
    const freqTHz = 299792.458 / nm;
    const energy = 1239.84193 / nm;
    wlFreq.textContent = freqTHz.toFixed(0) + ' THz';
    wlEnergy.textContent = energy.toFixed(2) + ' eV';
    wlColor.style.background = wlToRGB(nm);
    let note = '';
    if (nm < 380) note = 'Ultravioleta — invisível, alta energia.';
    else if (nm < 450) note = 'Violeta — visível, alta energia.';
    else if (nm < 495) note = 'Azul — visível.';
    else if (nm < 570) note = 'Verde — visível, pico da visão humana.';
    else if (nm < 590) note = 'Amarelo — visível.';
    else if (nm < 620) note = 'Laranja — visível.';
    else if (nm < 750) note = 'Vermelho — visível, menor energia.';
    else note = 'Infravermelho — invisível, baixa energia.';
    wlNote.textContent = note;
    wlLive.textContent = `Comprimento de onda ${nm} nanômetros. Frequência ${freqTHz.toFixed(0)} terahertz. Energia ${energy.toFixed(2)} elétron-volts. ${note}`;
  }
  wlInput.addEventListener('input', updateWavelength);
  updateWavelength();

  /* ---------- 4. SIMULADOR — EFEITO FOTOELÉTRICO ---------- */
  const canvas = document.getElementById('sim-fotoeletrico');
  const ctx = canvas.getContext('2d');
  const freqInput = document.getElementById('freq');
  const intensInput = document.getElementById('intens');
  const freqOut = document.getElementById('freq-out');
  const intensOut = document.getElementById('intens-out');
  const energiaOut = document.getElementById('energia-out');
  const cineticaOut = document.getElementById('cinetica-out');
  const statusOut = document.getElementById('status-emissao');

  const H_EV = 0.4136;
  const WORK = 2.27;
  const F_CORTE = WORK / H_EV;

  let cw = 0, ch = 0;
  let photons = [], electrons = [], spawnAcc = 0, lastT = 0;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    cw = rect.width; ch = rect.height;
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function corFoton(f) {
    if (f < 4.3) return '#FF4040';
    if (f < 5.0) return '#FF3030';
    if (f < 5.7) return '#FFA500';
    if (f < 6.5) return '#3CC46E';
    if (f < 7.5) return '#4090FF';
    return '#B060FF';
  }

  function spawnPhoton() {
    const f = parseFloat(freqInput.value);
    photons.push({
      x: -25,
      y: 50 + Math.random() * (ch - 100),
      vx: 180 + Math.random() * 70,
      color: corFoton(f)
    });
  }

  function draw() {
    ctx.clearRect(0, 0, cw, ch);

    const plateX = cw * 0.72;
    const plateW = Math.max(20, cw * 0.09);
    const grad = ctx.createLinearGradient(plateX, 0, plateX + plateW, 0);
    grad.addColorStop(0, '#9a9a9a');
    grad.addColorStop(1, '#5a5a5a');
    ctx.fillStyle = grad;
    ctx.fillRect(plateX, ch * 0.12, plateW, ch * 0.76);
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 2;
    ctx.strokeRect(plateX, ch * 0.12, plateW, ch * 0.76);
    ctx.fillStyle = '#777';
    ctx.font = '700 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('METAL', plateX + plateW / 2, ch * 0.09);
    ctx.textAlign = 'start';

    for (const p of photons) {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = 0; i < 24; i++) {
        const px = p.x - i * 1.6;
        const py = p.y + Math.sin(i * 0.7 + performance.now() * 0.006) * 5;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const e of electrons) {
      const alpha = Math.max(0, Math.min(1, e.life / 1.2));
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = 'rgba(64,144,255,0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(e.x, e.y);
      ctx.lineTo(e.x - e.vx * 0.05, e.y - e.vy * 0.05);
      ctx.stroke();
      ctx.fillStyle = '#4090FF';
      ctx.beginPath();
      ctx.arc(e.x, e.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1A4A99';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  function update(dt) {
    const f = parseFloat(freqInput.value);
    const intensity = parseInt(intensInput.value) / 100;
    spawnAcc += dt * intensity * 12;
    while (spawnAcc >= 1) { spawnPhoton(); spawnAcc -= 1; }

    for (let i = photons.length - 1; i >= 0; i--) {
      const p = photons[i];
      p.x += p.vx * dt;
      if (p.x >= cw * 0.72) {
        if (f >= F_CORTE) {
          electrons.push({
            x: cw * 0.72,
            y: p.y,
            vx: -200 - Math.random() * 150,
            vy: (Math.random() - 0.5) * 120,
            life: 1.2
          });
        }
        photons.splice(i, 1);
      }
    }
    for (let i = electrons.length - 1; i >= 0; i--) {
      const e = electrons[i];
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      e.life -= dt;
      if (e.life <= 0 || e.x < -20 || e.y < -20 || e.y > ch + 20) {
        electrons.splice(i, 1);
      }
    }
  }

  function loop(t) {
    const dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
    lastT = t;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  function updatePhotoReadouts() {
    const f = parseFloat(freqInput.value);
    const intensity = parseInt(intensInput.value);
    const energia = f * H_EV;
    const cinetica = Math.max(0, energia - WORK);
    freqOut.textContent = f.toFixed(1) + ' × 10¹⁴ Hz';
    intensOut.textContent = intensity + '%';
    energiaOut.textContent = energia.toFixed(2) + ' eV';
    cineticaOut.textContent = cinetica.toFixed(2) + ' eV';
    if (f >= F_CORTE) {
      statusOut.className = 'status ok';
      statusOut.textContent = '✔ Há emissão de elétrons (f ≥ f₀)';
    } else {
      statusOut.className = 'status no';
      statusOut.textContent = '✕ Sem emissão de elétrons (f < f₀) — a intensidade não resolve';
    }
  }

  freqInput.addEventListener('input', updatePhotoReadouts);
  intensInput.addEventListener('input', updatePhotoReadouts);
  updatePhotoReadouts();

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  lastT = performance.now();
  requestAnimationFrame(loop);

  /* ---------- 5. SIMULADOR PV ---------- */
  const pvInt = document.getElementById('pv-intensity');
  const pvIntOut = document.getElementById('pv-int-out');
  const pvCorrente = document.getElementById('pv-corrente');
  const pvTensao = document.getElementById('pv-tensao');
  const pvPotencia = document.getElementById('pv-potencia');
  const pvBar = document.getElementById('pv-bar');
  const pvBarVal = document.getElementById('pv-bar-val');
  const pvLive = document.getElementById('pv-live');
  const Pmax = 550;

  function updatePV() {
    const irr = parseInt(pvInt.value);
    pvIntOut.textContent = irr;
    const potencia = Pmax * (irr / 1000);
    const tensao = irr > 20 ? 40 + (irr / 1000) * 5 : 0;
    const corrente = tensao > 0 ? potencia / tensao : 0;
    pvTensao.textContent = tensao.toFixed(1) + ' V';
    pvCorrente.textContent = corrente.toFixed(2) + ' A';
    pvPotencia.textContent = potencia.toFixed(0) + ' W';
    pvBar.style.width = (potencia / Pmax * 100) + '%';
    pvBarVal.textContent = potencia.toFixed(0) + ' W';
    pvLive.textContent = `Irradiância ${irr} watts por metro quadrado. Potência ${potencia.toFixed(0)} watts.`;
  }
  pvInt.addEventListener('input', updatePV);
  updatePV();

  /* ---------- 6. SIMULADOR PISCINA ---------- */
  const poolVol = document.getElementById('pool-vol');
  const poolVolOut = document.getElementById('pool-vol-out');
  const poolDt = document.getElementById('pool-dt');
  const poolDtOut = document.getElementById('pool-dt-out');
  const poolQ = document.getElementById('pool-q');
  const barTerm = document.getElementById('bar-term');
  const barPv = document.getElementById('bar-pv');
  const valTerm = document.getElementById('val-term');
  const valPv = document.getElementById('val-pv');
  const poolLive = document.getElementById('pool-live');

  function updatePool() {
    const V = parseFloat(poolVol.value);
    const dT = parseFloat(poolDt.value);
    poolVolOut.textContent = V.toLocaleString('pt-BR');
    poolDtOut.textContent = dT.toFixed(1);
    const Q = (V * 4186 * dT) / 3.6e6;
    poolQ.textContent = Q.toFixed(0) + ' kWh';
    const irrad = 50;
    const areaTerm = Q / (irrad * 0.6);
    const areaPV = Q / (irrad * 0.20 * 4);
    valTerm.textContent = areaTerm.toFixed(1) + ' m²';
    valPv.textContent = areaPV.toFixed(1) + ' m²';
    const maxArea = Math.max(areaTerm, areaPV);
    barTerm.style.width = (areaTerm / maxArea * 100) + '%';
    barPv.style.width = (areaPV / maxArea * 100) + '%';
    poolLive.textContent = `Volume ${V.toLocaleString('pt-BR')} litros, aquecimento de ${dT.toFixed(1)} graus. Energia ${Q.toFixed(0)} quilowatts-hora. Solar térmico ${areaTerm.toFixed(1)} metros quadrados. Fotovoltaico ${areaPV.toFixed(1)} metros quadrados.`;
  }
  poolVol.addEventListener('input', updatePool);
  poolDt.addEventListener('input', updatePool);
  updatePool();

  /* ---------- 7. SMOOTH SCROLL / FOCUS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          el.setAttribute('tabindex', '-1');
          setTimeout(() => el.focus({ preventScroll: true }), 400);
          history.pushState(null, '', id);
        }
      }
    });
  });

})();
