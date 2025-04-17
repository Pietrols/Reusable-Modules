const container = document.querySelector(".container");

// Create carousel wrapper
const carousel = document.createElement("div");
carousel.classList.add("carousel");

// Left arrow
const leftArrow = document.createElement("button");
leftArrow.classList.add("arrow", "left");
leftArrow.innerHTML = "&#8656;";
carousel.appendChild(leftArrow);

// Slides wrapper
const slides = document.createElement("div");
slides.classList.add("slides");

// Your image array
const imageSources = [
  "/Image Carousel/images/nir-himi-LzAzsrV_-mc-unsplash.jpg",
  "/Image Carousel/images/peter-thomas-hcBVdd2leJs-unsplash.jpg ",
  "/Image Carousel/images/peter-thomas-T-33kxpsAlY-unsplash.jpg",
  "/Image Carousel/images/nir-himi-LzAzsrV_-mc-unsplash.jpg",
  "/Image Carousel/images/mathieu-bigard-U1o2u8UrHLc-unsplash.jpg",
  "/Image Carousel/images/marina-zvada-wkHsJN_AWXc-unsplash.jpg",
  "/Image Carousel/images/karsten-winegeart-24h4vWNHjJE-unsplash.jpg",
  "/Image Carousel/images/joseph-corl-ArYTNkubaBg-unsplash.jpg",
  "/Image Carousel/images/doncoombez-rIhvJDqBO0w-unsplash.jpg ",
  "/Image Carousel/images/diego-ph-VbAX4dhmhP8-unsplash.jpg",
  "/Image Carousel/images/claudio-schwarz-d-vYj8A-JQ8-unsplash.jpg",
  "/Image Carousel/images/cat-guffin-4dfNWybkf10-unsplash.jpg",
  "/Image Carousel/images/bryan-brittos-OY3hlyStY7o-unsplash.jpg",
  "/Image Carousel/images/bryan-brittos-kNNJAN2jpTI-unsplash.jpg",
  "/Image Carousel/images/aleksandr-popov-KWA302HCx1o-unsplash.jpg",
];

// Create slide elements
imageSources.forEach((src) => {
  const slide = document.createElement("div");
  slide.classList.add("slide");

  const img = document.createElement("img");
  img.src = src;
  img.alt = "";

  slide.appendChild(img);
  slides.appendChild(slide);
});

carousel.appendChild(slides);

// Right arrow
const rightArrow = document.createElement("button");
rightArrow.classList.add("arrow", "right");
rightArrow.innerHTML = "&#8658;";
carousel.appendChild(rightArrow);

// Dots
const dots = document.createElement("div");
dots.classList.add("dots");

imageSources.forEach(() => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dots.appendChild(dot);
});

carousel.appendChild(dots);

// Append carousel to container
container.appendChild(carousel);

let currentIndex = 0;
const totalSlides = imageSources.length;
const slideWidth = 800;

const dotElements = dots.querySelectorAll(".dot");

const updatedCarousel = () => {
  const slideWidth = slides.children[0].offsetWidth;
  slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  dotElements.forEach((dot) => dot.classList.remove("active"));
  dotElements[currentIndex].classList.add("active");
};

const buttons = document.querySelectorAll(".arrow");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const isNext = button.classList.contains("right");
    const offset = isNext ? 1 : -1;

    currentIndex = (currentIndex + offset + totalSlides) % totalSlides;
    updatedCarousel();
    resetAutoplay();
  });
});

dotElements.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updatedCarousel();
    resetAutoplay();
  });
});

let startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updatedCarousel();
  }, 5000);
};

const resetAutoplay = () => {
  clearInterval(autoplayInterval);
  startAutoplay();
};
startAutoplay();

carousel.addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval);
});

carousel.addEventListener("mouseleave", () => {
  startAutoplay();
});

let startX = 0;
let endX = 0;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // Minimum px swipe to count

  if (startX - endX > swipeThreshold) {
    // Swiped left → next slide
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  } else if (endX - startX > swipeThreshold) {
    // Swiped right → previous slide
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updatedCarousel();
  }
}
