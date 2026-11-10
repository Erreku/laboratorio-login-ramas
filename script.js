// Primera versión didáctica, NO es un sistema de autenticación real.
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const formMessage = document.getElementById('formMessage');

// Esta contraseña está escrita en JavaScript solo para la práctica universitaria.
togglePassword.addEventListener('click', () => {
  const visible = passwordInput.type === 'text';
  passwordInput.type = visible ? 'password' : 'text';
  togglePassword.textContent = visible ? 'Mostrar' : 'Ocultar';
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (email === 'demo@correo.com' && password === 'demo12345') {
    formMessage.textContent = 'Inicio de sesión de demostración correcto.';
  } else {
    formMessage.textContent = 'Credenciales incorrectas.';
  }
});
