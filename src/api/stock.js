import { state } from '../state.js'

export async function checkStockAndDecrement(items) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 1. Verificar si hay suficiente stock para todos los productos
      for (const item of items) {
        const productInDb = state.products.find(p => p.id === item.id)
        if (!productInDb || productInDb.stock < item.qty) {
          reject(new Error(`No hay suficiente stock para el producto: ${item.name}. Stock disponible: ${productInDb.stock}`))
          return
        }
      }

      // 2. Si hay stock, se simula la actualización (decremento)
      for (const item of items) {
        const productInDb = state.products.find(p => p.id === item.id)
        productInDb.stock -= item.qty
      }

      resolve({ success: true, message: 'Stock actualizado con éxito' })
    }, 1000) // Simula un retraso de 1 segundo
  })
}