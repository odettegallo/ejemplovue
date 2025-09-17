// Funciones de validación
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}

// Inicializar usuarios de prueba
export function initializeTestUsers() {
  const users = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (users.length === 0) {
    const testUsers = [
      { id: 1, name: 'Usuario', lastName: 'Tienda', email: 'usuario1@mitienda.com', password: 'password' },
      { id: 2, name: 'María', lastName: 'López', email: 'maria@ejemplo.com', password: '123456' }
    ];
    localStorage.setItem('usuarios', JSON.stringify(testUsers));
  }
}

// Lógica de inicio de sesión
export function login(email, password) {
  const users = JSON.parse(localStorage.getItem('usuarios')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  return user ? user : null;
}

// Lógica de registro
export function register(name, lastName, email, password, confirmPassword, acceptsTerms) {
  if (!validateEmail(email)) {
    return { success: false, message: 'Por favor, ingresa un email válido.' };
  }
  if (!validatePassword(password)) {
    return { success: false, message: 'La contraseña debe tener al menos 6 caracteres.' };
  }
  if (password !== confirmPassword) {
    return { success: false, message: 'Las contraseñas no coinciden.' };
  }
  if (!acceptsTerms) {
    return { success: false, message: 'Debes aceptar los términos y condiciones.' };
  }
  
  const users = JSON.parse(localStorage.getItem('usuarios')) || [];
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return { success: false, message: 'Ya existe una cuenta con este email.' };
  }
  
  const newUser = { id: Date.now(), name, lastName, email, password };
  users.push(newUser);
  localStorage.setItem('usuarios', JSON.stringify(users));
  
  return { success: true, message: '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.' };
}