// ===== catalogService.js =====
// Acceso a los datos del catálogo. Si mañana esto pasa a ser una API real,
// solo se cambia esta función: el resto de la app no sabe de dónde vienen los datos.

const API_URL = "./data/productos.json";

export async function obtenerProductos() {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) throw new Error("No se pudo obtener el catálogo");
  return respuesta.json();
}
