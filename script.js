// Mejora de Carla: validaciones, accesibilidad y recordatorio exclusivo del correo.
// AVISO: esta "autenticación" es solo didáctica. Las credenciales están expuestas
// en el código del navegador; nunca debe usarse para proteger una cuenta real.
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const rememberEmail = document.getElementById('rememberEmail');
const forgotPassword = document.getElementById('forgotPassword');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const formMessage = document.getElementById('formMessage');
const STORAGE_KEY = 'laboratorioLogin.rememberEmail';

function showFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  input.closest('.input-container').classList.toggle('invalid', Boolean(message));
}
function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = 'form-message' + (type ? ' ' + type : '');
  formMessage.setAttribute('role', type === 'error' ? 'alert' : 'status');
}
function validateEmail() {
  const email = emailInput.value.trim();
  let error = '';
  if (!email) error = 'Ingresa tu correo electrónico.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) error = 'Escribe un correo válido, por ejemplo, nombre@correo.com.';
  showFieldError(emailInput, emailError, error);
  return !error;
}
function validatePassword() {
  const password = passwordInput.value;
  let error = '';
  if (!password) error = 'Ingresa tu contraseña.';
  else if (password.length < 8) error = 'La contraseña debe tener al menos 8 caracteres.';
  showFieldError(passwordInput, passwordError, error);
  return !error;
}

// Se guarda únicamente el correo electrónico; nunca se guarda la contraseña.
try {
  const savedEmail = localStorage.getItem(STORAGE_KEY);
  if (savedEmail) { emailInput.value = savedEmail; rememberEmail.checked = true; }
} catch (error) {
  // La interfaz sigue funcionando si el navegador bloquea el almacenamiento.
}

togglePassword.addEventListener('click', () => {
  const showing = passwordInput.type === 'text';
  passwordInput.type = showing ? 'password' : 'text';
  togglePassword.textContent = showing ? 'Mostrar' : 'Ocultar';
  togglePassword.setAttribute('aria-label', showing ? 'Mostrar contraseña' : 'Ocultar contraseña');
  togglePassword.setAttribute('aria-pressed', String(!showing));
});

emailInput.addEventListener('input', () => {
  if (emailError.textContent) validateEmail();
  if (formMessage.classList.contains('error')) showMessage('', '');
});
passwordInput.addEventListener('input', () => {
  if (passwordError.textContent) validatePassword();
  if (formMessage.classList.contains('error')) showMessage('', '');
});

rememberEmail.addEventListener('change', () => {
  if (!rememberEmail.checked) {
    try { localStorage.removeItem(STORAGE_KEY); } catch (error) { /* Almacenamiento bloqueado. */ }
  }
});
forgotPassword.addEventListener('click', (event) => {
  event.preventDefault();
  showMessage('Esta es una práctica: no existe recuperación de contraseñas real.', 'info');
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // No recargar ni enviar datos a un servidor.
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  if (!emailValid || !passwordValid) {
    showMessage('Revisa los campos señalados e inténtalo nuevamente.', 'error');
    if (!emailValid) emailInput.focus();
    else passwordInput.focus();
    return;
  }
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  try {
    if (rememberEmail.checked) localStorage.setItem(STORAGE_KEY, email);
    else localStorage.removeItem(STORAGE_KEY);
  } catch (error) { /* No impide usar la demostración. */ }

  // Compatibilidad con las dos credenciales de ejemplo del PDF: páginas 4 y 31.
  const validCredentials = (email === 'demo@correo.com' && password === 'demo12345')
    || (email === 'demo@ejemplo.com' && password === 'Demo1234!');
  if (validCredentials) {
    showMessage('¡Bienvenido! Inicio de sesión de demostración correcto.', 'success');
  } else {
    showMessage('Credenciales incorrectas. Revisa tu correo y contraseña.', 'error');
    passwordInput.focus();
  }
});
