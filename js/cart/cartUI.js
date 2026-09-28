// ===== cartUI.js =====
// Renderiza el panel del carrito y maneja sus interacciones.
// Se suscribe a cartStore en vez de conocer su almacenamiento interno.

import * as cartStore from "./cartStore.js";
import { mostrarMensaje } from "../ui/toast.js";
import { abrirCheckout } from "../checkout/checkoutUI.js";

const formatoARS = (valor) => `$${valor.toLocaleString("es-AR")}`;

function render() {
  const lista = document.getElementById("lista-carrito");
  const totalEl = document.getElementById("carrito-total");
  const contador = document.getElementById("carrito-contador");
  if (!lista || !totalEl) return;

  const items = cartStore.obtenerItems();

  if (contador) contador.textContent = cartStore.cantidadTotal();

  if (items.length === 0) {
    lista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío 🍷</p>`;
  } else {
    lista.innerHTML = items
      .map(
        (item) => `
        <div class="item-carrito" data-id="${item.id}">
          <img src="${item.imagen}" alt="${item.nombre}" />
          <div class="item-info">
            <h4>${item.nombre}</h4>
            <p>${formatoARS(item.precio)} c/u</p>
            <div class="item-cantidad">
              <button class="btn-restar" aria-label="Quitar una unidad">−</button>
              <span>${item.cantidad}</span>
              <button class="btn-sumar" aria-label="Agregar una unidad">+</button>
            </div>
          </div>
          <div class="item-subtotal">
            <p>${formatoARS(item.precio * item.cantidad)}</p>
            <button class="btn-eliminar" aria-label="Eliminar">🗑️</button>
          </div>
        </div>`
      )
      .join("");
  }

  totalEl.textContent = formatoARS(cartStore.total());

  lista.querySelectorAll(".item-carrito").forEach((el) => {
    const id = Number(el.dataset.id);
    el.querySelector(".btn-sumar")?.addEventListener("click", () => cartStore.cambiarCantidad(id, 1));
    el.querySelector(".btn-restar")?.addEventListener("click", () => cartStore.cambiarCantidad(id, -1));
    el.querySelector(".btn-eliminar")?.addEventListener("click", () => cartStore.eliminar(id));
  });
}

export function agregarYNotificar(producto) {
  cartStore.agregar(producto);
  mostrarMensaje(`${producto.nombre} se agregó al carrito 🍷`);
}

export function inicializarCartUI() {
  const abrirBtn = document.getElementById("btn-abrir-carrito");
  const cerrarBtn = document.getElementById("btn-cerrar-carrito");
  const panel = document.getElementById("panel-carrito");
  const vaciarBtn = document.getElementById("btn-vaciar-carrito");
  const finalizarBtn = document.getElementById("btn-finalizar-compra");

  abrirBtn?.addEventListener("click", () => panel?.classList.add("abierto"));
  cerrarBtn?.addEventListener("click", () => panel?.classList.remove("abierto"));
  vaciarBtn?.addEventListener("click", () => cartStore.vaciar());

  document.addEventListener("click", (e) => {
    if (
      panel?.classList.contains("abierto") &&
      !panel.contains(e.target) &&
      e.target !== abrirBtn
    ) {
      panel.classList.remove("abierto");
    }
  });

  finalizarBtn?.addEventListener("click", () => {
    if (cartStore.estaVacio()) {
      mostrarMensaje("Tu carrito está vacío 🍷");
      return;
    }
    panel?.classList.remove("abierto");
    abrirCheckout();
  });

  cartStore.onCambio(render);
  render();
}
