<template>
  <div>
    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="login-tab"
          data-bs-toggle="tab"
          data-bs-target="#login-tab-pane"
          type="button"
          role="tab"
          aria-controls="login-tab-pane"
          aria-selected="true"
        >
          Iniciar Sesión
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="register-tab"
          data-bs-toggle="tab"
          data-bs-target="#register-tab-pane"
          type="button"
          role="tab"
          aria-controls="register-tab-pane"
          aria-selected="false"
        >
          Registrarse
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="login-tab-pane"
        role="tabpanel"
        aria-labelledby="login-tab"
        tabindex="0"
      >
        <LoginTab @login-success="handleLoginSuccess" @alert="showAlert" />
      </div>
      <div
        class="tab-pane fade"
        id="register-tab-pane"
        role="tabpanel"
        aria-labelledby="register-tab"
        tabindex="0"
      >
        <RegisterTab @alert="showAlert" @register-success="handleRegisterSuccess" />
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import LoginTab from './LoginTab.vue';
import RegisterTab from './RegisterTab.vue';

export default {
  components: {
    LoginTab,
    RegisterTab,
  },
  emits: ['login-success', 'alert'],
  setup(props, { emit }) {
    const handleLoginSuccess = () => {
      emit('login-success');
    };
    
    const showAlert = ({ message, type }) => {
      emit('alert', { message, type });
    };

    const handleRegisterSuccess = async () => {
      showAlert({ message: '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.', type: 'success' });
      await nextTick();
      const loginTab = document.getElementById('login-tab');
      if (loginTab) {
        new bootstrap.Tab(loginTab).show();
      }
    };

    return {
      handleLoginSuccess,
      showAlert,
      handleRegisterSuccess,
    };
  },
};
</script>