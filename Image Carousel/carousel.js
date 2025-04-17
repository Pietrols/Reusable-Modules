const container = document.querySelector(".container");

const imageSources = [
  "/Image Carousel/images/nir-himi-LzAzsrV_-mc-unsplash.jpg",
  "/Image Carousel/images/peter-thomas-hcBVdd2leJs-unsplash.jpg",
  "/Image Carousel/images/peter-thomas-T-33kxpsAlY-unsplash.jpg",
  "/Image Carousel/images/nir-himi-LzAzsrV_-mc-unsplash.jpg",
  "/Image Carousel/images/mathieu-bigard-U1o2u8UrHLc-unsplash.jpg",
  "/Image Carousel/images/marina-zvada-wkHsJN_AWXc-unsplash.jpg",
  "/Image Carousel/images/karsten-winegeart-24h4vWNHjJE-unsplash.jpg",
  "/Image Carousel/images/joseph-corl-ArYTNkubaBg-unsplash.jpg",
  "/Image Carousel/images/doncoombez-rIhvJDqBO0w-unsplash.jpg",
  "/Image Carousel/images/diego-ph-VbAX4dhmhP8-unsplash.jpg",
  "/Image Carousel/images/claudio-schwarz-d-vYj8A-JQ8-unsplash.jpg",
  "/Image Carousel/images/cat-guffin-4dfNWybkf10-unsplash.jpg",
  "/Image Carousel/images/bryan-brittos-OY3hlyStY7o-unsplash.jpg",
  "/Image Carousel/images/bryan-brittos-kNNJAN2jpTI-unsplash.jpg",
  "/Image Carousel/images/aleksandr-popov-KWA302HCx1o-unsplash.jpg",
];

let currentIndex = 0;
let autoplayInterval;

// Create the entire carousel
function createCarousel(images) {
  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  const leftArrow = createArrow("left", "&#8656;");
  const rightArrow = createArrow("right", "&#8658;");
  const slidesWrapper = createSlides(images);
  const dotsWrapper = createDots(images.length);

  carousel.append(leftArrow, slidesWrapper, rightArrow, dotsWrapper);
  container.appendChild(carousel);

  setupEvents({
    carousel,
    leftArrow,
    rightArrow,
    dotsWrapper,
    slidesWrapper,
    imagesLength: images.length,
  });

  return carousel;
}

// Create navigation arrows
function createArrow(direction, symbol) {
  const btn = document.createElement("button");
  btn.classList.add("arrow", direction);
  btn.innerHTML = symbol;
  return btn;
}

// Create the slides container
function createSlides(images) {
  const slides = document.createElement("div");
  slides.classList.add("slides");

  images.forEach((src) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");

    const img = document.createElement("img");
    img.src = src;
    img.alt = "";

    slide.appendChild(img);
    slides.appendChild(slide);
  });

  return slides;
}

// Create dots container
function createDots(count) {
  const dots = document.createElement("div");
  dots.classList.add("dots");

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dots.appendChild(dot);
  }

  return dots;
}

// Update UI for current slide
function updateCarousel(slides, dots) {
  const slideWidth = slides.children[0].offsetWidth;
  slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

// Setup all interactivity
function setupEvents({
  carousel,
  leftArrow,
  rightArrow,
  dotsWrapper,
  slidesWrapper,
  imagesLength,
}) {
  const dots = dotsWrapper.querySelectorAll(".dot");

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + imagesLength) % imagesLength;
    updateCarousel(slidesWrapper, dots);
    resetAutoplay(slidesWrapper, dots, imagesLength);
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % imagesLength;
    updateCarousel(slidesWrapper, dots);
    resetAutoplay(slidesWrapper, dots, imagesLength);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel(slidesWrapper, dots);
      resetAutoplay(slidesWrapper, dots, imagesLength);
    });
  });

  carousel.addEventListener("mouseenter", () =>
    clearInterval(autoplayInterval)
  );
  carousel.addEventListener("mouseleave", () =>
    startAutoplay(slidesWrapper, dots, imagesLength)
  );

  let startX = 0;
  let endX = 0;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    const swipeThreshold = 50;

    if (startX - endX > swipeThreshold) {
      currentIndex = (currentIndex + 1) % imagesLength;
    } else if (endX - startX > swipeThreshold) {
      currentIndex = (currentIndex - 1 + imagesLength) % imagesLength;
    }

    updateCarousel(slidesWrapper, dots);
    resetAutoplay(slidesWrapper, dots, imagesLength);
  });

  updateCarousel(slidesWrapper, dots); // initial render
  startAutoplay(slidesWrapper, dots, imagesLength);
}

function startAutoplay(slides, dots, total) {
  autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel(slides, dots);
  }, 5000);
}

function resetAutoplay(slides, dots, total) {
  clearInterval(autoplayInterval);
  startAutoplay(slides, dots, total);
}

// Initialize everything
createCarousel(imageSources);
