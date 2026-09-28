// ===== contactForm.js =====
// Validación básica del formulario de contacto (index y página de contacto).

import { mostrarMensaje } from "./toast.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function inicializarFormularioContacto() {
  const form = document.querySelector("form[action*='formspree'], .contacto form, #form-contacto");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const nombre = form.querySelector("[name='nombre']");
    const email = form.querySelector("[name='email'], [name='_replyto'], [name='correo']");
    const mensaje = form.querySelector("[name='mensaje']");

    if (!nombre?.value.trim()) {
      e.preventDefault();
      mostrarMensaje("Por favor completá tu nombre.");
    } else if (!email || !EMAIL_REGEX.test(email.value.trim())) {
      e.preventDefault();
      mostrarMensaje("Ingresá un correo electrónico válido.");
    } else if (!mensaje?.value.trim()) {
      e.preventDefault();
      mostrarMensaje("Escribí un mensaje antes de enviar.");
    }
  });
}
