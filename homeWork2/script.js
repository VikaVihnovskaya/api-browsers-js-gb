const nextBtn = document.querySelector(".button-next");
const prevBtn = document.querySelector(".button-prev");

const slides = document.querySelectorAll(".slider__item");

const pointBox = document.querySelector(".pagination-box");

nextBtn.addEventListener("click", () => {
  for (const slide of slides) {
    if (slide.classList.contains("slide__active")) {
      slide.classList.remove("slide__active");
      if (slide.nextElementSibling) {
        slide.nextElementSibling.classList.add("slide__active");
      } else {
        slides[0].classList.add("slide__active");
      }
      return;
    }
  }
});

prevBtn.addEventListener("click", () => {
  for (const slide of slides) {
    if (slide.classList.contains("slide__active")) {
      slide.classList.remove("slide__active");
      if (slide.previousElementSibling) {
        slide.previousElementSibling.classList.add("slide__active");
      } else {
        slides[slides.length - 1].classList.add("slide__active");
      }
      return;
    }
  }
});

pointBox.addEventListener("click", (e) => {
  if (e.target.classList.contains("pagination")) {
    for (const slide of slides) {
      if (slide.classList.contains("slide__active")) {
        slide.classList.remove("slide__active");
      }
    }
    for (const slide of slides) {
      if (slide.dataset.slide === e.target.dataset.pagination) {
        slide.classList.add("slide__active");
      }
    }
  }
});