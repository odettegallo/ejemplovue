export async function sendPurchaseNotification(purchaseDetails) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('--- Correo de Notificación de Compra ---')
      console.log('Asunto: Nuevo pedido en la tienda')
      console.log('Destinatario: responsable@empresa.com')
      console.log('Detalle del pedido:', purchaseDetails)
      console.log('--------------------------------------')
      resolve({ success: true, message: 'Notificación de correo enviada' })
    }, 1500) // Simula un retraso de 1.5 segundos
  })
}