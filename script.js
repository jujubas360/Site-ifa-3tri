document.addEventListener("DOMContentLoaded", () => {
    // 1. NAVEGAÇÃO POR ABAS (Menus do Site)
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);

            sections.forEach(sec => sec.classList.remove("active-section"));
            navLinks.forEach(l => l.classList.remove("active"));

            document.getElementById(targetId).classList.add("active-section");
            link.classList.add("active");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. CONTROLES DE ACESSIBILIDADE
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    // Alternar Tema (Claro / Escuro)
    document.getElementById("toggle-theme").addEventListener("click", () => {
        const currentTheme = htmlEl.getAttribute("data-theme");
        htmlEl.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
    });

    // Alto Contraste
    document.getElementById("toggle-contrast").addEventListener("click", () => {
        bodyEl.classList.toggle("high-contrast");
    });

    // Fonte Dislexia
    document.getElementById("toggle-dyslexia").addEventListener("click", () => {
        bodyEl.classList.toggle("dyslexia-font");
    });

    // Ajuste de Tamanho de Fonte
    let currentFontSize = 16;
    document.getElementById("increase-font").addEventListener("click", () => {
        if (currentFontSize < 22) {
            currentFontSize += 2;
            htmlEl.style.fontSize = currentFontSize + "px";
        }
    });

    document.getElementById("decrease-font").addEventListener("click", () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            htmlEl.style.fontSize = currentFontSize + "px";
        }
    });

    // 3. SIMULADOR DO EFEITO FOTOELÉTRICO
    const freqSlider = document.getElementById("freq-slider");
    const intensSlider = document.getElementById("intens-slider");
    const freqVal = document.getElementById("freq-val");
    const intensVal = document.getElementById("intens-val");
    const simOutput = document.getElementById("sim-output");
    const electronContainer = document.getElementById("electron-container");

    function updateSimulator() {
        const freq = parseInt(freqSlider.value);
        const intens = parseInt(intensSlider.value);

        freqVal.textContent = freq;
        intensVal.textContent = intens;

        // Frequência limiar considerada = 5
        const threshold = 5;

        electronContainer.innerHTML = "";

        if (freq >= threshold) {
            simOutput.textContent = `Status: Emissão ativa! Frequência (${freq}) ≥ Limiar (${threshold}). Elétrons emitidos.`;
            simOutput.style.color = "var(--secondary)";

            // Gerar animação de elétrons
            const count = intens * 2;
            for (let i = 0; i < count; i++) {
                const el = document.createElement("div");
                el.style.position = "absolute";
                el.style.left = "40px";
                el.style.top = `${Math.random() * 150}px`;
                el.style.width = "8px";
                el.style.height = "8px";
                el.style.backgroundColor = "#FFD166";
                el.style.borderRadius = "50%";
                el.style.animation = `shootElectron 1.5s linear infinite`;
                el.style.animationDelay = `${Math.random()}s`;
                electronContainer.appendChild(el);
            }
        } else {
            simOutput.textContent = `Status: Sem emissão. Frequência (${freq}) abaixo da frequência de corte (${threshold}). Aumente a frequência!`;
            simOutput.style.color = "#EF476F";
        }
    }

    freqSlider.addEventListener("input", updateSimulator);
    intensSlider.addEventListener("input", updateSimulator);
    updateSimulator();

    // 4. DIAGRAMA INTERATIVO DA PISCINA
    const flowButtons = document.querySelectorAll(".flow-btn");
    const flowDesc = document.getElementById("flow-description");

    const flowData = {
        "1": "Etapa 1 (Sol): Emissão de fótons solares com espectro eletromagnético completo.",
        "2": "Etapa 2 (Painel / Coletor): Conversão fotovoltaica em eletricidade (ou térmica direta em calor).",
        "3": "Etapa 3 (Conversão / Bomba): A bomba de calor amplifica a energia térmica utilizando a eletricidade gerada.",
        "4": "Etapa 4 (Piscina Aquecida): Transferência eficiente de calor mantendo a temperatura ideal da água do CEP."
    };

    flowButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            flowButtons.forEach(b => b.classList.remove("active-step"));
            btn.classList.add("active-step");
            const step = btn.getAttribute("data-step");
            flowDesc.textContent = flowData[step];
        });
    });
});

// Estilo dinâmico para animação dos elétrons via JS
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes shootElectron {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(400px); opacity: 0; }
}
#electron-container { position: relative; width: 100%; height: 100%; }
`;
document.head.appendChild(styleSheet);
