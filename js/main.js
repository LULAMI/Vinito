// ===== main.js =====
// Punto de entrada. Cada módulo resuelve su propio dominio (carrito, catálogo,
// checkout, UI genérica); acá solo se inicializan en orden al cargar la página.

import { inicializarModalEdad } from "./ui/ageGate.js";
import { inicializarCarrusel } from "./ui/carousel.js";
import { inicializarFormularioContacto } from "./ui/contactForm.js";
import { inicializarCartUI } from "./cart/cartUI.js";
import { inicializarCatalogo } from "./catalog/catalogUI.js";
import { inicializarCheckout } from "./checkout/checkoutUI.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarModalEdad();
  inicializarCartUI();
  inicializarCatalogo();
  inicializarCheckout();
  inicializarCarrusel();
  inicializarFormularioContacto();
});
