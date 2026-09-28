// ===== carousel.js =====
// Carrusel de categorías destacadas. Sin dependencias externas.

const INTERVALO_MS = 4500;

export function inicializarCarrusel() {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (!track || slides.length === 0) return;

  let indiceActual = 0;
  let intervalo;

  function irA(indice) {
    indiceActual = ((indice % slides.length) + slides.length) % slides.length;
    track.style.transform = `translateX(-${indiceActual * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === indiceActual));
  }

  function iniciarAutoplay() {
    intervalo = setInterval(() => irA(indiceActual + 1), INTERVALO_MS);
  }

  function reiniciarAutoplay() {
    clearInterval(intervalo);
    iniciarAutoplay();
  }

  prevBtn?.addEventListener("click", () => { irA(indiceActual - 1); reiniciarAutoplay(); });
  nextBtn?.addEventListener("click", () => { irA(indiceActual + 1); reiniciarAutoplay(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { irA(i); reiniciarAutoplay(); }));

  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      irA(diff > 0 ? indiceActual + 1 : indiceActual - 1);
      reiniciarAutoplay();
    }
  });

  iniciarAutoplay();
}
