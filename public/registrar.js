document.addEventListener('DOMContentLoaded', () => {
  const registrarForm = document.getElementById('registrar-form');
  const mensagem = document.getElementById('mensagem');

  if (registrarForm) {
    registrarForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = e.target.email.value;
      const username = e.target.username.value;
      const password = e.target.password.value;

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password }),
        });
        const data = await response.json();
        mensagem.textContent = data.mensagem;
        if (response.ok) {
          setTimeout(() => {
            alert('Registro realizado com sucesso! Agora você pode fazer o login.');
            window.location.href = '/login.html';
          }, 1000);
        }
      } catch (error) {
        mensagem.textContent = 'Erro de conexão com o servidor.';
      }
    });
  }
  
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

});