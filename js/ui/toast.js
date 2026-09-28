// ===== toast.js =====
// Mensajes flotantes de confirmación/error. Reutilizable en toda la app.

let ocultarTimeout;

export function mostrarMensaje(texto) {
  let toast = document.getElementById("toast-mensaje");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-mensaje";
    document.body.appendChild(toast);
  }

  toast.textContent = texto;
  toast.classList.add("visible");

  clearTimeout(ocultarTimeout);
  ocultarTimeout = setTimeout(() => toast.classList.remove("visible"), 2500);
}
