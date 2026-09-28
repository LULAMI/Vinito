# 🍷 Vínico

Vinoteca online — clonado y adaptado a partir de "Miau Couture" (Talento Tech Comisión 26123)

## 📁 Estructura del proyecto

```
vinico/
├── index.html              ← Página principal
├── css/
│   └── styles.css          ← Estilos globales (paleta bordó/dorado/crema)
├── imagen/
│   ├── heroN.svg            ← Banners del carrusel por categoría
│   └── vinoN.svg             ← Ilustraciones de producto
├── data/
│   └── productos.json       ← Catálogo de 14 vinos (tinto, blanco, rosado, espumante)
├── paginas/
│   └── contacto.html        ← Formulario de contacto
└── js/                      ← ES Modules (import/export nativo, sin build step)
    ├── main.js               ← Punto de entrada: inicializa todos los módulos
    ├── cart/
    │   ├── cartStore.js        ← Estado del carrito + localStorage (sin DOM)
    │   └── cartUI.js           ← Render del panel de carrito y sus eventos
    ├── catalog/
    │   ├── catalogService.js   ← Acceso a los datos (fetch del JSON)
    │   └── catalogUI.js        ← Grilla de productos + filtros por tipo
    ├── checkout/
    │   └── checkoutUI.js       ← Modal de checkout simulado
    └── ui/
        ├── ageGate.js          ← Verificación de edad (+18)
        ├── carousel.js         ← Carrusel de categorías
        ├── contactForm.js      ← Validación del formulario de contacto
        └── toast.js            ← Mensajes flotantes reutilizables
```

## Arquitectura del JS

Separado por dominio y por capa, comunicado con `import`/`export` nativos (sin bundler):

- **Store vs. UI**: `cartStore.js` guarda el estado y la persistencia; no toca el DOM. `cartUI.js` se suscribe a sus cambios (evento `carrito:actualizado`) y renderiza. Esto permite testear la lógica del carrito sin necesitar un navegador.
- **Service vs. UI**: `catalogService.js` obtiene los datos; `catalogUI.js` decide cómo mostrarlos. Si el catálogo pasara a venir de una API real, solo cambia el service.
- **Módulos de UI reutilizables**: `toast.js`, `ageGate.js` y `carousel.js` no dependen de nada más — se podrían llevar a otro proyecto tal cual.
- **`main.js`** es el único lugar que conoce y ordena a todos los módulos.

Requiere servirse por HTTP(S) (no `file://`) porque los módulos ES usan CORS — funciona directo en GitHub Pages, Netlify, Vercel o cualquier servidor estático.

## Funcionalidades

- Catálogo con filtro por tipo de vino (Tinto, Blanco, Rosado, Espumante)
- Carrito de compras con persistencia en localStorage
- Checkout simulado (sin pagos reales) con pantalla de confirmación
- Modal de verificación de edad (+18) al ingresar
- Aviso legal de venta de alcohol en el footer

## ✍️ Autora

Ludmila Mariana Bravo Ruiz Diaz
