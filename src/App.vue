<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="#" @click.prevent="go('home')">TechGadget Store</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div id="nav" class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="go('home')">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="go('cart')">Carrito ({{ cartCount }})</a>
        </li>
      </ul>
      <div class="d-flex align-items-center gap-2 ms-auto">
        <span v-if="state.user">Hola, {{ state.user.name || state.user.email }}</span>
        <a v-if="!state.user" class="btn btn-outline-primary btn-sm" href="#" @click.prevent="go('login')">Iniciar sesión</a>
        <button v-else class="btn btn-outline-secondary btn-sm" @click="logout">Cerrar sesión</button>
      </div>
    </div>
  </div>
</nav>


  <div>
    <div
      class="modal fade"
      id="productDetailModal"
      tabindex="-1"
      aria-labelledby="productDetailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" v-if="state.selectedProduct">
          <div class="modal-header">
            <h5 class="modal-title" id="productDetailModalLabel">
              {{ state.selectedProduct.name }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div class="modal-body">
            <img
              :src="state.selectedProduct.image"
              class="img-fluid mb-3"
              :alt="state.selectedProduct.name"
            />
            <p><strong>Precio:</strong> ${{ state.selectedProduct.price.toLocaleString('es-CL') }}</p>
            <p><strong>Stock disponible:</strong> {{ state.selectedProduct.stock }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>


    <main class="container pb-5">
      <section v-if="state.view === 'home'">
        <h1 class="h4 mb-3">Productos</h1>
        <SearchBox v-model="state.search" placeholder="Buscar por nombre..." class="mb-3" />
        <ProductList />
      </section>

      <section v-else-if="state.view === 'cart'">
        <h1 class="h4 mb-3">Carrito</h1>
        <CartTable />
      </section>

      <section v-else-if="state.view === 'login'">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { state, actions } from './state'
import SearchBox from './components/SearchBox.vue'
import ProductList from './components/ProductList.vue'
import CartTable from './components/CartTable.vue'
import LoginForm from './components/LoginForm.vue'

const cartCount = computed(() => state.items.reduce((a, it) => a + it.qty, 0))
const go = actions.go
const logout = actions.logout
</script>
