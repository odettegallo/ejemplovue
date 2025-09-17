import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css'; // Importación de estilos
import { initializeTestUsers } from './api/authService';

createApp(App).mount('#app')
initializeTestUsers();

