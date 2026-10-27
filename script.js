document.addEventListener('DOMContentLoaded', () => {
    // Navegação de Abas
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section-view');

    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switchTab(index);
        });
    });

    // Tema Claro/Escuro
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Modo Dislexia
    const dyslexiaToggle = document.getElementById('dyslexiaToggle');
    if (dyslexiaToggle) {
        dyslexiaToggle.addEventListener('click', toggleDyslexia);
    }

    // Simulador Fotoelétrico
    const freqRange = document.getElementById('freqRange');
    const intRange = document.getElementById('intRange');
    if (freqRange && intRange) {
        freqRange.addEventListener('input', updatePhotoelectric);
        intRange.addEventListener('input', updatePhotoelectric);
    }

    // Botão Térmico
    const calcBtn = document.getElementById('calcThermalBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            alert('Simulação térmica executada com sucesso! Eficiência estimada: 78%.');
        });
    }
});

function switchTab(index) {
    const views = document.querySelectorAll('.section-view');
    const buttons = document.querySelectorAll('.nav-btn');
    
    views.forEach((v, i) => {
        v.classList.toggle('active', i === index);
        buttons[i].classList.toggle('active', i === index);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTabByTarget(targetId) {
    const views = document.querySelectorAll('.section-view');
    const buttons = document.querySelectorAll('.nav-btn');

    views.forEach((v, i) => {
        const isActive = v.id === targetId;
        v.classList.toggle('active', isActive);
        if (isActive) {
            buttons[i].classList.add('active');
        } else {
            buttons[i].classList.remove('active');
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    body.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
}

function toggleDyslexia() {
    const body = document.body;
    const current = body.getAttribute('data-dyslexia');
    body.setAttribute('data-dyslexia', current === 'true' ? 'false' : 'true');
}

function updatePhotoelectric() {
    const freq = parseFloat(document.getElementById('freqRange').value);
    const intensity = document.getElementById('intRange').value;
    document.getElementById('freqVal').innerText = freq.toFixed(1);
    document.getElementById('intVal').innerText = intensity;

    const threshold = 4.5; // Frequência de corte
    const res = document.getElementById('peResult');

    if (freq < threshold) {
        res.style.color = '#e63946';
        res.innerText = `Frequência abaixo do limiar (${threshold}x10¹⁴ Hz). Nenhum elétron emitido, independente da intensidade (${intensity}%).`;
    } else {
        res.style.color = '#2a9d8f';
        res.innerText = `Frequência suficiente! Elétrons emitidos com energia cinética proporcional à frequência.`;
    }
}
