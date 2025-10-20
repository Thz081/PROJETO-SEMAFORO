document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const mensagem = document.getElementById('mensagem');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const identifier = e.target.identifier.value;
      const password = e.target.password.value;

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password }),
        });
        
        const data = await response.json();
        mensagem.textContent = data.mensagem;
        if (response.ok) {
          setTimeout(() => {
            window.location.href = '/admin.html';
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