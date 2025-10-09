function buscarLeituras() {
  fetch('/api/status-atual')
    .then(res => res.json())
    .then(leituras => {
      const container = document.getElementById('leituras-container');
      container.innerHTML = ''; 

      if (leituras.length === 0) {
        container.innerHTML = '<p>Nenhum dado recebido ainda.</p>';
        return;
      }
      
      leituras.forEach(leitura => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'leitura-item'; 

        const decibeisFormatado = parseFloat(leitura.decibeis).toFixed(2);

        itemDiv.innerHTML = `
          <img src="${leitura.logo_url}" alt="${leitura.nome_sala}" class="leitura-logo">
          <span class="leitura-sala">${leitura.nome_sala}:</span>
          <span class="leitura-db">${decibeisFormatado} dB</span>
        `;
        container.appendChild(itemDiv);
      });
    })
    .catch(err => {
        const container = document.getElementById('leituras-container');
        container.innerHTML = '<p>Erro ao carregar dados do servidor...</p>';
        console.error("Erro ao buscar leituras:", err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  buscarLeituras();
  setInterval(buscarLeituras, 5000);
});