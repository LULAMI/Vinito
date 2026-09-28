// ===== cartStore.js =====
// Estado del carrito + persistencia. No toca el DOM: emite eventos para que
// las capas de UI se enteren de los cambios (patrón observer simple).

const CART_KEY = "vinico_carrito";
const EVENTO_CAMBIO = "carrito:actualizado";

let carrito = cargar();

function cargar() {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function guardar() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
  } catch {
    // localStorage no disponible (modo privado, storage bloqueado, etc.)
  }
}

function emitirCambio() {
  window.dispatchEvent(new CustomEvent(EVENTO_CAMBIO, { detail: obtenerItems() }));
}

export function obtenerItems() {
  return [...carrito];
}

export function agregar(producto) {
  const item = carrito.find((p) => p.id === producto.id);
  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardar();
  emitirCambio();
}

export function cambiarCantidad(id, delta) {
  const item = carrito.find((p) => p.id === id);
  if (!item) return;

  item.cantidad += delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter((p) => p.id !== id);
  }
  guardar();
  emitirCambio();
}

export function eliminar(id) {
  carrito = carrito.filter((p) => p.id !== id);
  guardar();
  emitirCambio();
}

export function vaciar() {
  carrito = [];
  guardar();
  emitirCambio();
}

export function total() {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

export function cantidadTotal() {
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

export function estaVacio() {
  return carrito.length === 0;
}

export function onCambio(callback) {
  window.addEventListener(EVENTO_CAMBIO, (e) => callback(e.detail));
}
