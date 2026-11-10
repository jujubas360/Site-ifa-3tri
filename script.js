/* ===================================
   LUZ QUE MOVE - JAVASCRIPT
=================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ==================================
  // MENU PARA CELULAR
  // ==================================

  const menuToggle = document.getElementById("menuToggle");
  const menuPrincipal = document.getElementById("menuPrincipal");

  if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener("click", () => {
      const aberto = menuPrincipal.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(aberto));
      menuToggle.textContent = aberto ? "✕ Fechar" : "☰ Menu";
    });

    menuPrincipal.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuPrincipal.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰ Menu";
      });
    });
  }

  // ==================================
  // ACESSIBILIDADE: TAMANHO DA FONTE
  // ==================================

  let tamanhoFonte = 16;

  const aumentarFonte = document.getElementById("aumentarFonte");
  const diminuirFonte = document.getElementById("diminuirFonte");

  if (aumentarFonte) {
    aumentarFonte.addEventListener("click", () => {
      tamanhoFonte = Math.min(tamanhoFonte + 2, 24);
      document.documentElement.style.setProperty(
        "--fonte-base",
        tamanhoFonte + "px"
      );
    });
  }

  if (diminuirFonte) {
    diminuirFonte.addEventListener("click", () => {
      tamanhoFonte = Math.max(tamanhoFonte - 2, 12);
      document.documentElement.style.setProperty(
        "--fonte-base",
        tamanhoFonte + "px"
      );
    });
  }

  // ==================================
  // ALTO CONTRASTE
  // ==================================

  const contrasteToggle = document.getElementById("contrasteToggle");

  if (contrasteToggle) {
    contrasteToggle.addEventListener("click", () => {
      const ativo = document.body.classList.toggle("high-contrast");

      contrasteToggle.setAttribute("aria-pressed", String(ativo));
      contrasteToggle.textContent = ativo
        ? "Desativar contraste"
        : "Alto contraste";
    });
  }

  // ==================================
  // FONTE ALTERNATIVA
  // ==================================

  const fonteToggle = document.getElementById("fonteToggle");

  if (fonteToggle) {
    fonteToggle.addEventListener("click", () => {
      const ativa = document.body.classList.toggle("alternative-font");

      fonteToggle.setAttribute("aria-pressed", String(ativa));
      fonteToggle.textContent = ativa
        ? "Fonte padrão"
        : "Fonte alternativa";
    });
  }

  // ==================================
  // MODO ESCURO
  // ==================================

  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const ativo = document.body.classList.toggle("dark-mode");

      themeToggle.setAttribute("aria-pressed", String(ativo));
      themeToggle.textContent = ativo
        ? "☀️ Modo claro"
        : "🌙 Modo escuro";
    });
  }

  // ==================================
  // LABORATÓRIO 1
  // EFEITO FOTOELÉTRICO
  // ==================================

  const frequency = document.getElementById("frequency");
  const frequencyValue = document.getElementById("frequencyValue");
  const photonEnergy = document.getElementById("photonEnergy");
  const energyBar = document.getElementById("energyBar");
  const photoResult = document.getElementById("photoResult");

  // Valor didático aproximado para o material fictício.
  const workFunction = 2.0;

  function atualizarFotoeletrico() {
    if (!frequency) return;

    const fTHz = Number(frequency.value);

    // E(eV) = h(eV.s) * f(Hz)
    const energia = 4.135667696e-15 * fTHz * 1e12;

    if (frequencyValue) {
      frequencyValue.textContent = fTHz + " THz";
    }

    if (photonEnergy) {
      photonEnergy.textContent = energia.toFixed(2) + " eV";
    }

    if (energyBar) {
      const percentual = Math.min((energia / 5) * 100, 100);
      energyBar.style.width = percentual + "%";
    }

    if (photoResult) {
      if (energia >= workFunction) {
        photoResult.textContent =
          "✓ Neste modelo, a energia do fóton é suficiente para liberar elétrons.";
      } else {
        photoResult.textContent =
          "A energia do fóton ainda não é suficiente para liberar elétrons neste modelo.";
      }
    }
  }

  if (frequency) {
    frequency.addEventListener("input", atualizarFotoeletrico);
    atualizarFotoeletrico();
  }

  // ==================================
  // LABORATÓRIO 2
  // ENERGIA FOTOVOLTAICA
  // ==================================

  const panelPower = document.getElementById("panelPower");
  const panelQuantity = document.getElementById("panelQuantity");
  const sunHours = document.getElementById("sunHours");
  const systemEfficiency = document.getElementById("systemEfficiency");

  const calculateSolar = document.getElementById("calculateSolar");

  const installedPower = document.getElementById("installedPower");
  const dailyEnergy = document.getElementById("dailyEnergy");
  const monthlyEnergy = document.getElementById("monthlyEnergy");

  function calcularSolar() {
    if (
      !panelPower ||
      !panelQuantity ||
      !sunHours ||
      !systemEfficiency
    ) return;

    const potencia = Number(panelPower.value);
    const quantidade = Number(panelQuantity.value);
    const horas = Number(sunHours.value);
    const eficiencia = Number(systemEfficiency.value) / 100;

    if (
      potencia <= 0 ||
      quantidade <= 0 ||
      horas <= 0 ||
      eficiencia <= 0 ||
      eficiencia > 1
    ) {
      alert("Confira os valores informados. Eles precisam ser positivos e a eficiência deve ser de até 100%.");
      return;
    }

    const potenciaTotal = potencia * quantidade;
    const energiaDia = (potenciaTotal * horas * eficiencia) / 1000;
    const energiaMes = energiaDia * 30;

    if (installedPower) {
      installedPower.textContent =
        (potenciaTotal / 1000).toFixed(2) + " kWp";
    }

    if (dailyEnergy) {
      dailyEnergy.textContent =
        energiaDia.toFixed(2) + " kWh";
    }

    if (monthlyEnergy) {
      monthlyEnergy.textContent =
        energiaMes.toFixed(2) + " kWh";
    }
  }

  if (calculateSolar) {
    calculateSolar.addEventListener("click", calcularSolar);
  }

  // Calcula ao abrir a página.
  calcularSolar();

  // ==================================
  // LABORATÓRIO 3
  // AQUECIMENTO DA PISCINA
  // ==================================

  const poolVolume = document.getElementById("poolVolume");
  const waterTemp = document.getElementById("waterTemp");
  const targetTemp = document.getElementById("targetTemp");
  const pumpPower = document.getElementById("pumpPower");
  const cop = document.getElementById("cop");

  const calculatePool = document.getElementById("calculatePool");

  const temperatureDifference =
    document.getElementById("temperatureDifference");

  const thermalEnergy =
    document.getElementById("thermalEnergy");

  const heatingTime =
    document.getElementById("heatingTime");

  const electricalEnergy =
    document.getElementById("electricalEnergy");

  function calcularPiscina() {
    if (
      !poolVolume ||
      !waterTemp ||
      !targetTemp ||
      !pumpPower ||
      !cop
    ) return;

    const volume = Number(poolVolume.value);
    const temperaturaInicial = Number(waterTemp.value);
    const temperaturaFinal = Number(targetTemp.value);
    const potenciaBomba = Number(pumpPower.value);
    const copBomba = Number(cop.value);

    if (
      volume <= 0 ||
      potenciaBomba <= 0 ||
      copBomba < 1 ||
      temperaturaInicial < 0 ||
      temperaturaFinal < 0
    ) {
      alert("Confira os valores informados.");
      return;
    }

    if (temperaturaFinal < temperaturaInicial) {
      alert("A temperatura desejada precisa ser maior ou igual à temperatura inicial para este simulador de aquecimento.");
      return;
    }

    const deltaT = temperaturaFinal - temperaturaInicial;

    // 1 m³ de água ≈ 1000 kg
    // Calor específico da água ≈ 4,186 kJ/(kg °C)
    // Conversão para kWh: dividir por 3600.
    const energiaTermica =
      (volume * 1000 * 4.186 * deltaT) / 3600;

    const energiaEletrica = energiaTermica / copBomba;

    const tempoFuncionamento =
      energiaEletrica / potenciaBomba;

    if (temperatureDifference) {
      temperatureDifference.textContent =
        deltaT.toFixed(1) + " °C";
    }

    if (thermalEnergy) {
      thermalEnergy.textContent =
        energiaTermica.toFixed(1) + " kWh";
    }

    if (heatingTime) {
      heatingTime.textContent =
        tempoFuncionamento.toFixed(1) + " horas";
    }

    if (electricalEnergy) {
      electricalEnergy.textContent =
        energiaEletrica.toFixed(1) + " kWh";
    }
  }

  if (calculatePool) {
    calculatePool.addEventListener("click", calcularPiscina);
  }

  // Calcula ao abrir a página.
  calcularPiscina();

});
