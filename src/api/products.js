const MOCK_PRODUCTS =  [
  { "id": "95843", "name": "Audífonos Bluetooth", "price": 19990, "stock": 15, "image": "../src/img/productos/audifonos-inalambricos-1.jpg" },
  { "id": "42518", "name": "Audífonos Bluetooth Compactos", "price": 24990, "stock": 10, "image": "../src/img/productos/audifonos-compactos.jpg" },
  { "id": "95482", "name": "Mouse RGB", "price": 22990, "stock": 20, "image": "../src/img/productos/mouse-rgb.jpg" },
  { "id": "13248", "name": "Teclado Mecánico RGB", "price": 25990, "stock": 8, "image": "../src/img/productos/teclado-rgb-1.jpg" },
  { "id": "68421", "name": "Cargador Inalámbrico", "price": 14990, "stock": 25, "image": "../src/img/productos/cargador-inalambrico.jpg" },
  { "id": "94871", "name": "Drone Compacto", "price": 119990, "stock": 5, "image": "../src/img/productos/drone-compacto.jpg" },
  { "id": "32457", "name": "Audífonos Inalámbricos Pro", "price": 79990, "stock": 12, "image": "../src/img/productos/audifonos-inalambricos-2.jpg" },
  { "id": "64847", "name": "Monitor LED Full HD", "price": 149990, "stock": 7, "image": "../src/img/productos/monitor-full-led-hd.jpg" },
  { "id": "14935", "name": "Mouse Inalámbrico", "price": 19990, "stock": 30, "image": "../src/img/productos/mouse-rgb-inalambrico.jpg" },
  { "id": "14847", "name": "Tablet 10 pulgadas", "price": 87990, "stock": 18, "image": "../src/img/productos/tablet.jpg" },
  { "id": "96148", "name": "Auriculares Gaming", "price": 59990, "stock": 14, "image": "../src/img/productos/auriculares-gaming.jpg" },
  { "id": "36485", "name": "Cámara Web HD", "price": 29990, "stock": 22, "image": "../src/img/productos/camara-web-hd.jpg" }
]
export function fetchProducts() {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 500))
}

