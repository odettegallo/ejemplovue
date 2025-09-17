<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">TechGadget Store</a>
        <button
          @click="toggleDarkMode"
          class="btn btn-sm btn-outline-secondary ms-auto"
        >
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </div>
    </nav>

    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="card p-4">
            <h2 class="text-center mb-4 text-primary">Autenticación</h2>
            <div id="alertContainer" class="mb-3">
              <div v-if="alertMessage" :class="alertClass" role="alert">
                {{ alertMessage }}
              </div>
            </div>

            <AuthForm @login-success="handleLoginSuccess" @alert="showAlert" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import AuthForm from './components/AuthForm.vue';

export default {
  components: {
    AuthForm,
  },
  setup() {
    const isDarkMode = ref(localStorage.getItem('darkMode') === 'true');
    const alertMessage = ref('');
    const alertType = ref('danger');
    let alertTimeout = null;

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('darkMode', isDarkMode.value);
      document.body.classList.toggle('dark-mode', isDarkMode.value);
    };

    const showAlert = ({ message, type }) => {
      clearTimeout(alertTimeout);
      alertMessage.value = message;
      alertType.value = type;
      alertTimeout = setTimeout(() => {
        alertMessage.value = '';
      }, 5000);
    };

    const handleLoginSuccess = () => {
      // Redirigir o realizar otra acción al iniciar sesión exitosamente
      alert('¡Inicio de sesión exitoso!');
    };

    const alertClass = computed(() => `alert alert-${alertType.value}`);

    onMounted(() => {
      document.body.classList.toggle('dark-mode', isDarkMode.value);
    });

    return {
      isDarkMode,
      alertMessage,
      alertType,
      alertClass,
      toggleDarkMode,
      showAlert,
      handleLoginSuccess,
    };
  },
};
</script>