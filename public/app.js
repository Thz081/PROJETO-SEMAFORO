function buscarUltimoDado() {
  fetch('/api/ultimo-dado')
    .then(response => response.json())
    .then(data => {
      const statusDiv = document.getElementById('status');
      const texto = `Sala ID: ${data.sala_id} | Decibéis: ${data.decibeis}`;
      statusDiv.textContent = texto;
    })
    .catch(error => {
      console.log('Ainda aguardando o primeiro dado...');
    });
}

buscarUltimoDado();

setInterval(buscarUltimoDado, 3000);