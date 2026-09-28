// ===== ageGate.js =====
// Verificación de edad (+18) requerida por la venta de bebidas alcohólicas.
// Se guarda en sessionStorage: se vuelve a pedir en cada nueva sesión del navegador.

const EDAD_KEY = "vinico_edad_confirmada";

export function inicializarModalEdad() {
  const modal = document.getElementById("modal-edad");
  const btnSi = document.getElementById("btn-edad-si");
  if (!modal) return;

  const yaConfirmada = sessionStorage.getItem(EDAD_KEY) === "true";
  if (yaConfirmada) {
    modal.classList.add("oculto");
    return;
  }

  btnSi?.addEventListener("click", () => {
    try {
      sessionStorage.setItem(EDAD_KEY, "true");
    } catch {
      // sessionStorage no disponible; igual dejamos pasar en esta carga
    }
    modal.classList.add("oculto");
  });
}
