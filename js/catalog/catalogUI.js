import { obtenerProductos } from "./catalogService.js";
import { agregarYNotificar } from "../cart/cartUI.js";

let productos = [];
let filtroActivo = "Todos";
let terminoBusqueda = "";

function normalizar(texto) {
  return texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function filtrarProductos() {
  const termino = normalizar(terminoBusqueda.trim());

  return productos.filter((p) => {
    const coincideTipo = filtroActivo === "Todos" || p.tipo === filtroActivo;
    if (!coincideTipo) return false;
    if (!termino) return true;

    const campos = [p.nombre, p.bodega, p.region, p.tipo].filter(Boolean).map(normalizar);
    return campos.some((campo) => campo.includes(termino));
  });
}

function actualizarContador(cantidad) {
  const contador = document.getElementById("resultado-contador");
  if (!contador) return;

  if (!terminoBusqueda.trim()) {
    contador.textContent = "";
    return;
  }

  contador.textContent =
    cantidad === 0
      ? `Sin resultados para "${terminoBusqueda.trim()}"`
      : `${cantidad} vino${cantidad === 1 ? "" : "s"} encontrado${cantidad === 1 ? "" : "s"} para "${terminoBusqueda.trim()}"`;
}

function renderProductos() {
  const contenedor = document.querySelector(".contenedor-tarjetas");
  if (!contenedor) return;

  const filtrados = filtrarProductos();
  actualizarContador(filtrados.length);

  if (filtrados.length === 0) {
    contenedor.innerHTML = `<p class="error-carga">No encontramos vinos que coincidan con tu búsqueda.</p>`;
    return;
  }

  contenedor.innerHTML = filtrados
    .map(
      (producto) => `
      <article class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
        <div class="card-body">
          <p class="card-meta">${producto.tipo} · ${producto.bodega}</p>
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p class="card-precio">$${producto.precio.toLocaleString("es-AR")}</p>
          <button class="btn-agregar" data-id="${producto.id}">
            Agregar al carrito 🛒
          </button>
        </div>
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

function inicializarBusqueda() {
  const input = document.getElementById("buscador-vinos");
  if (!input) return;

  let temporizador;
  input.addEventListener("input", () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      terminoBusqueda = input.value;
      renderProductos();
    }, 150);
  });
}

export async function inicializarCatalogo() {
  const contenedor = document.querySelector(".contenedor-tarjetas");
  inicializarFiltros();
  inicializarBusqueda();

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
