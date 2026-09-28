// ===== catalogUI.js =====
// Renderiza la grilla de vinos y los filtros por tipo.

import { obtenerProductos } from "./catalogService.js";
import { agregarYNotificar } from "../cart/cartUI.js";

let productos = [];
let filtroActivo = "Todos";

function renderProductos() {
  const contenedor = document.querySelector(".contenedor-tarjetas");
  if (!contenedor) return;

  const filtrados = filtroActivo === "Todos" ? productos : productos.filter((p) => p.tipo === filtroActivo);

  if (filtrados.length === 0) {
    contenedor.innerHTML = `<p class="error-carga">No hay vinos para este filtro.</p>`;
    return;
  }

  contenedor.innerHTML = filtrados
    .map(
      (producto) => `
      <article class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
        <p class="card-meta">${producto.tipo} · ${producto.bodega}</p>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>$${producto.precio.toLocaleString("es-AR")}</strong></p>
        <button class="btn-agregar" data-id="${producto.id}">
          Agregar al carrito 🛒
        </button>
      </article>`
    )
    .join("");

  contenedor.querySelectorAll(".btn-agregar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const producto = productos.find((p) => p.id === Number(btn.dataset.id));
      if (producto) agregarYNotificar(producto);
    });
  });
}

function inicializarFiltros() {
  const botones = document.querySelectorAll(".filtro-btn");
  botones.forEach((btn) => {
    btn.addEventListener("click", () => {
      botones.forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");
      filtroActivo = btn.dataset.tipo;
      renderProductos();
    });
  });
}

export async function inicializarCatalogo() {
  const contenedor = document.querySelector(".contenedor-tarjetas");
  inicializarFiltros();

  try {
    productos = await obtenerProductos();
    renderProductos();
  } catch (error) {
    console.error(error);
    if (contenedor) {
      contenedor.innerHTML = `<p class="error-carga">No pudimos cargar los vinos. Intentá nuevamente más tarde.</p>`;
    }
  }
}
