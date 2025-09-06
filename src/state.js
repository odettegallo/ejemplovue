import { reactive } from 'vue'
import * as Auth from './api/auth'
import { fetchProducts } from './api/products'

export const state = reactive({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  items: JSON.parse(localStorage.getItem('cart') || '[]'), // [{id,name,price,image,qty}]
  products: [],
  loadingProducts: false,
  productsError: null,
  search: '',
  view: 'home', // 'home' | 'cart' | 'login'
  authError: null,
  authLoading: false,
  selectedProduct: null, // Propiedad para el producto seleccionado
})

export const actions = {
  checkout() {
  // Aquí se podría simular un proceso de pago
  alert('¡Compra realizada con éxito! ¡Gracias por tu pedido!')
  actions.clearCart() // Vaciar el carrito después de la "compra"
  actions.go('home') // Redirigir al usuario a la página de inicio
},
  go(view) {
    state.view = view
  },
  async loadProducts() {
    if (state.products.length) return
    try {
      state.loadingProducts = true
      state.productsError = null
      state.products = await fetchProducts()
    } catch (e) {
      state.productsError = e.message || 'Error cargando productos'
    } finally {
      state.loadingProducts = false
    }
  },
  addToCart(product, qty = 1) {
    // Busca si el producto ya está en el carrito
    const found = state.items.find(it => it.id === product.id)
    
    // Si el producto ya existe en el carrito
    if (found) {
      // Si la cantidad a agregar no sobrepasa el stock disponible
      if (found.qty + qty <= product.stock) {
        found.qty += qty
      } else {
        alert('No hay suficiente stock disponible para este producto.')
      }
    } else {
      // Si la cantidad a agregar no sobrepasa el stock disponible
      if (qty <= product.stock) {
        state.items.push({ ...product, qty })
      } else {
        alert('No hay suficiente stock disponible para este producto.')
      }
    }
    
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  removeFromCart(id) {
    state.items = state.items.filter(it => it.id !== id)
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  updateQty(id, qty) {
    const it = state.items.find(i => i.id === id)
    if (it) {
      if (qty <= it.stock) {
        it.qty = qty
        if (it.qty <= 0) actions.removeFromCart(id)
        else localStorage.setItem('cart', JSON.stringify(state.items))
      } else {
        it.qty = it.stock;
        alert(`No puedes agregar más de ${it.stock} unidades de este producto.`)
      }
    }
  },
  clearCart() {
    state.items = []
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  async login({ email, password, name }) {
    try {
      state.authLoading = true
      state.authError = null
      const user = await Auth.login({ email, password })
      if (name) user.name = name
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
      state.view = 'home'
    } catch (e) {
      state.authError = e.message || 'Error al iniciar sesión'
      throw e
    } finally {
      state.authLoading = false
    }
  },
  async logout() {
    await Auth.logout()
    state.user = null
    localStorage.removeItem('user')
    state.view = 'home'
  },
  showProductDetail(product) {
    state.selectedProduct = product
    const modalElement = document.getElementById('productDetailModal')
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement)
      modal.show()
    }
  }
}