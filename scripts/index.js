document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".main_nq8l9ft95k");
  const slides = document.querySelectorAll(".main_ns9entps7j");

  const prevBtn = document.querySelector(".main_i0tgwbqhgw");
  const nextBtn = document.querySelector(".main_gy1fwf90i7");

  if (!carousel || !slides.length) return;

  let currentIndex = 0;

  // Enable/disable navigation buttons
  function updateButtons() {
    const lastIndex = slides.length - 1;

    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }

    if (nextBtn) {
      nextBtn.disabled = currentIndex === lastIndex;
    }
  }

  // Detect which slide is currently visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Slide is mostly visible
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          currentIndex = Array.from(slides).indexOf(entry.target);
          updateButtons();
        }
      });
    },
    {
      root: carousel,
      threshold: 0.6
    }
  );

  slides.forEach((slide) => observer.observe(slide));

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (prevBtn.disabled) return;

      carousel.scrollBy({
        left: -carousel.clientWidth,
        behavior: "smooth"
      });
    });
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (nextBtn.disabled) return;

      carousel.scrollBy({
        left: carousel.clientWidth,
        behavior: "smooth"
      });
    });
  }

  // Initial button state
  updateButtons();

  // Fade in images and remove loaders
  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    const loader = slide.querySelector(".main_z80azo1wib");

    if (!img) return;

    function reveal() {
      img.style.opacity = "1";
      img.style.transition = "opacity 0.4s ease";

      if (loader) {
        loader.remove();
      }

      setTimeout(() => {
        img.removeAttribute("style");
      }, 400);
    }

    if (img.complete && img.naturalHeight !== 0) {
      reveal();
    } else {
      img.addEventListener("load", reveal, { once: true });
    }
  });
});