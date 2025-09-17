<template>
  <form @submit.prevent="handleRegister">
    <div class="mb-3">
      <label for="nameRegister" class="form-label">Nombre</label>
      <input
        type="text"
        class="form-control"
        id="nameRegister"
        v-model="name"
        required
      />
    </div>
    <div class="mb-3">
      <label for="lastNameRegister" class="form-label">Apellido</label>
      <input
        type="text"
        class="form-control"
        id="lastNameRegister"
        v-model="lastName"
        required
      />
    </div>
    <div class="mb-3">
      <label for="emailRegister" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="emailRegister"
        v-model="email"
        placeholder="tu@email.com"
        required
      />
    </div>
    <div class="mb-3">
      <label for="passwordRegister" class="form-label">Contraseña</label>
      <input
        type="password"
        class="form-control"
        id="passwordRegister"
        v-model="password"
        required
      />
    </div>
    <div class="mb-3">
      <label for="confirmPasswordRegister" class="form-label"
        >Confirmar Contraseña</label
      >
      <input
        type="password"
        class="form-control"
        id="confirmPasswordRegister"
        v-model="confirmPassword"
        required
      />
    </div>
    <div class="mb-3 form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="termsRegister"
        v-model="acceptsTerms"
        required
      />
      <label class="form-check-label" for="termsRegister"
        >Aceptar términos y condiciones</label
      >
    </div>
    <button type="submit" class="btn btn-primary w-100">Registrarse</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { register } from '../api/authService';

export default {
  emits: ['alert', 'register-success'],
  setup(props, { emit }) {
    const name = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const acceptsTerms = ref(false);

    const handleRegister = () => {
      const result = register(
        name.value,
        lastName.value,
        email.value,
        password.value,
        confirmPassword.value,
        acceptsTerms.value
      );
      if (result.success) {
        emit('register-success');
        // Limpiar formulario al registrarse exitosamente
        name.value = '';
        lastName.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
        acceptsTerms.value = false;
      } else {
        emit('alert', { message: result.message, type: 'danger' });
      }
    };

    return {
      name,
      lastName,
      email,
      password,
      confirmPassword,
      acceptsTerms,
      handleRegister,
    };
  },
};
</script>