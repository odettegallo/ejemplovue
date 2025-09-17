<template>
  <form @submit.prevent="handleLogin">
    <div class="mb-3">
      <label for="emailLogin" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="emailLogin"
        v-model="email"
        placeholder="tu@email.com"
        required
      />
    </div>
    <div class="mb-3">
      <label for="passwordLogin" class="form-label">Contraseña</label>
      <input
        type="password"
        class="form-control"
        id="passwordLogin"
        v-model="password"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { login, validateEmail, validatePassword } from '../api/authService';

export default {
  emits: ['login-success', 'alert'],
  setup(props, { emit }) {
    const email = ref('');
    const password = ref('');

    const handleLogin = () => {
      if (!validateEmail(email.value)) {
        emit('alert', { message: 'Por favor, ingresa un email válido.', type: 'danger' });
        return;
      }
        if (!validatePassword(password.value)) {
            emit('alert', { message: 'La contraseña debe tener al menos 6 caracteres.', type: 'danger' });
            return;
        }
      const user = login(email.value, password.value);
      if (user) {
        emit('login-success');
      } else {
        emit('alert', { message: 'Credenciales incorrectas.', type: 'danger' });
      }
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
};
</script>