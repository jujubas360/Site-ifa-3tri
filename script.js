document.addEventListener('DOMContentLoaded', () => {
    // 1. Controle do Menu Responsivo (Mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('open');
        });
    }

    // 2. Ferramentas de Acessibilidade
    const htmlRoot = document.documentElement;
    
    // Alto Contraste
    const btnHighContrast = document.getElementById('btn-high-contrast');
    btnHighContrast.addEventListener('click', () => {
        const current = htmlRoot.getAttribute('data-high-contrast');
        htmlRoot.setAttribute('data-high-contrast', current === 'true' ? 'false' : 'true');
    });

    // Fonte para Dislexia
    const btnDyslexia = document.getElementById('btn-dyslexia');
    btnDyslexia.addEventListener('click', () => {
        const current = htmlRoot.getAttribute('data-dyslexia');
        htmlRoot.setAttribute('data-dyslexia', current === 'true' ? 'false' : 'true');
    });

    // Modo Escuro / Claro
    const btnTheme = document.getElementById('btn-theme');
    btnTheme.addEventListener('click', () => {
        const currentTheme = htmlRoot.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlRoot.setAttribute('data-theme', newTheme);
        btnTheme.textContent = newTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
    });

    // Ajuste de Tamanho de Fonte
    let fontSizeMultiplier = 1;
    const btnFontInc = document.getElementById('btn-font-increase');
    const btnFontDec = document.getElementById('btn-font-decrease');

    btnFontInc.addEventListener('click', () => {
        if (fontSizeMultiplier < 1.3) {
            fontSizeMultiplier += 0.1;
            htmlRoot.style.fontSize = `${fontSizeMultiplier * 100}%`;
        }
    });

    btnFontDec.addEventListener('click', () => {
        if (fontSizeMultiplier > 0.9) {
            fontSizeMultiplier -= 0.1;
            htmlRoot.style.fontSize = `${fontSizeMultiplier * 100}%`;
        }
    });

    // 3. Simulador Interativo do Efeito Fotoelétrico
    const lightFreqInput = document.getElementById('light-freq');
    const freqValSpan = document.getElementById('freq-val');
    const electronContainer = document.getElementById('electron-container');
    const simStatus = document.getElementById('sim-status');

    // Frequência de corte simulada = 5.0 Hz
    const thresholdFreq = 5.0;

    lightFreqInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        freqValSpan.textContent = `${val.toFixed(1)} Hz`;

        if (val >= thresholdFreq) {
            simStatus.textContent = "Frequência suficiente! Elétrons liberados (Corrente Gerada).";
            simStatus.style.color = "var(--primary-sun)";
            
            // Gerar animação de elétrons dinamicamente
            electronContainer.innerHTML = '<div class="electron"></div><div class="electron" style="animation-delay: 0.5s;"></div>';
        } else {
            simStatus.textContent = "Frequência abaixo do corte. Nenhum elétron é emitido.";
            simStatus.style.color = "inherit";
            electronContainer.innerHTML = '';
        }
    });
});
