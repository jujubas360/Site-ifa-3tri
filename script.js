// --- ACESSIBILIDADE E CONTROLES ---
const htmlRoot = document.documentElement;
const btnTheme = document.getElementById('btn-theme');
const btnHighContrast = document.getElementById('btn-high-contrast');
const btnDyslexia = document.getElementById('btn-dyslexia');
const fontSizeSlider = document.getElementById('font-size-slider');

// Modo Escuro / Claro
btnTheme.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    if (currentTheme === 'light') {
        htmlRoot.setAttribute('data-theme', 'dark');
        btnTheme.textContent = '☀️ Modo Claro';
    } else {
        htmlRoot.setAttribute('data-theme', 'light');
        btnTheme.textContent = '🌙 Modo Escuro';
    }
});

// Alto Contraste
btnHighContrast.addEventListener('click', () => {
    htmlRoot.classList.toggle('high-contrast');
    const isPressed = htmlRoot.classList.contains('high-contrast');
    btnHighContrast.setAttribute('aria-pressed', isPressed);
});

// Fonte para Dislexia
btnDyslexia.addEventListener('click', () => {
    htmlRoot.classList.toggle('dyslexia-font');
    const isPressed = htmlRoot.classList.contains('dyslexia-font');
    btnDyslexia.setAttribute('aria-pressed', isPressed);
});

// Ajuste de Tamanho de Fonte
fontSizeSlider.addEventListener('input', (e) => {
    document.body.style.fontSize = e.target.value + 'px';
});

// --- SIMULADOR DE EFEITO FOTOELÉTRICO ---
const freqSlider = document.getElementById('freq-slider');
const intensitySlider = document.getElementById('intensity-slider');
const freqVal = document.getElementById('freq-val');
const intensityVal = document.getElementById('intensity-val');
const metalSelect = document.getElementById('metal-select');
const simStatusMsg = document.getElementById('sim-status-msg');

function updatePhotoelectricSimulation() {
    const f = parseFloat(freqSlider.value);
    const intensity = parseInt(intensitySlider.value);
    const phi = parseFloat(metalSelect.value);

    freqVal.textContent = f.toFixed(1);
    intensityVal.textContent = intensity;

    // Constante proporcional simplificada para o ensino médio (h*f vs phi)
    // Se f for menor que o limiar (exigido por phi), não há emissão.
    // Limiar simulado: phi 2.0 -> f min 4.0; phi 4.5 -> f min 6.0; phi 5.1 -> f min 7.0
    const thresholdFreq = phi * 1.25;

    if (f >= thresholdFreq) {
        simStatusMsg.textContent = `✅ Frequência suficiente! Elétrons emitidos com energia cinética devido ao brilho de ${intensity}%.`;
        simStatusMsg.style.color = '#2ecc71';
    } else {
        simStatusMsg.textContent = `❌ Frequência abaixo do limiar (${thresholdFreq.toFixed(1)}). Aumente a frequência (nem o brilho máximo adianta!).`;
        simStatusMsg.style.color = '#e74c3c';
    }
}

freqSlider.addEventListener('input', updatePhotoelectricSimulation);
intensitySlider.addEventListener('input', updatePhotoelectricSimulation);
metalSelect.addEventListener('change', updatePhotoelectricSimulation);

// --- DIAGRAMA INTERATIVO DA PISCINA ---
function showEnergyInfo(node) {
    const infoBox = document.getElementById('diagram-info-box');
    const data = {
        sun: "☀️ <strong>Sol:</strong> Fonte primária inesgotável. Emite radiação eletromagnética baseada em fusão nuclear.",
        pv: "⚡ <strong>Painel PV:</strong> Converte luz solar em corrente contínua (CC) através do efeito fotovoltaico de semicondutores.",
        pump: "⚙️ <strong>Bomba de Calor:</strong> Utiliza o ciclo termodinâmico de refrigeração reversa para transferir calor do ambiente para a água com alta eficiência (COP > 1).",
        pool: "🏊 <strong>Piscina Aquecida:</strong> Mantém temperatura ideal (~27°C) com menor consumo de energia fóssil e máxima sustentabilidade no CEP."
    };
    infoBox.innerHTML = data[node] || "Selecione um nó.";
}

// --- QUIZ DE SUSTENTABILIDADE ---
function checkQuiz(isTrue) {
    const feedback = document.getElementById('quiz-feedback');
    if (isTrue) {
        feedback.textContent = "🎉 Correto! Painéis fotovoltaicos não consomem água para gerar eletricidade no dia a dia, diferentemente de termelétricas.";
        feedback.style.color = "#27ae60";
    } else {
        feedback.textContent = "❌ Incorreto. Os painéis solares operam sem o consumo de água ou emissão direta de poluentes.";
        feedback.style.color = "#c0392b";
    }
}
