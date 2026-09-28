// ===== checkoutUI.js =====
// Checkout simulado: no procesa pagos reales ni los envía a ningún servidor.

import * as cartStore from "../cart/cartStore.js";

const formatoARS = (valor) => `$${valor.toLocaleString("es-AR")}`;

export function abrirCheckout() {
  const modal = document.getElementById("modal-checkout");
  const resumen = document.getElementById("checkout-resumen");
  const vistaForm = document.getElementById("vista-formulario-checkout");
  const vistaConf = document.getElementById("vista-confirmacion");
  if (!modal || !resumen) return;

  vistaForm.classList.remove("oculto");
  vistaConf.classList.add("oculto");

  const items = cartStore.obtenerItems();
  resumen.innerHTML =
    items
      .map(
        (item) =>
          `<p><span>${item.nombre} x${item.cantidad}</span><span>${formatoARS(item.precio * item.cantidad)}</span></p>`
      )
      .join("") +
    `<p class="resumen-total"><span>Total</span><span>${formatoARS(cartStore.total())}</span></p>`;

  modal.setAttribute("aria-hidden", "false");
}

export function cerrarCheckout() {
  document.getElementById("modal-checkout")?.setAttribute("aria-hidden", "true");
}

function formatearTarjeta(input) {
  const valor = input.value.replace(/\D/g, "").slice(0, 16);
  input.value = valor.replace(/(.{4})/g, "$1 ").trim();
}

export function inicializarCheckout() {
  const modal = document.getElementById("modal-checkout");
  const cerrarBtn = document.getElementById("btn-cerrar-checkout");
  const form = document.getElementById("form-checkout");
  const volverBtn = document.getElementById("btn-volver-tienda");
  const tarjetaInput = document.getElementById("co-tarjeta");

  cerrarBtn?.addEventListener("click", cerrarCheckout);

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) cerrarCheckout();
  });

  tarjetaInput?.addEventListener("input", () => formatearTarjeta(tarjetaInput));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    document.getElementById("vista-formulario-checkout")?.classList.add("oculto");
    document.getElementById("vista-confirmacion")?.classList.remove("oculto");

    cartStore.vaciar();
    form.reset();
  });

  volverBtn?.addEventListener("click", cerrarCheckout);
}
