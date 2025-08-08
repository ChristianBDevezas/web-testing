const slides = document.querySelectorAll(".opinion__slider");
const images = document.querySelectorAll(".opinion__image");

let counter = 0;

let showImageSlide = setInterval("changeImageSlide()", 3700);
function changeImageSlide() {
    images.forEach((img) => img.classList.remove("active-img"));
    slides.forEach((slide) => slide.classList.remove("active-slide"));

    images[counter].classList.add("active-img");
    slides[counter].classList.add("active-slide");

    counter ++;
    if(counter > 2) counter = 0;
}

images.forEach((image) => {
    image.addEventListener("click", () => {
        images.forEach((img) => img.classList.remove("active-img"));
        image.classList.add("active-img");

        slides.forEach((slide) => slide.classList.remove("active-slide"));
        const id = image.getAttribute("data-id");
        slides[id].classList.add("active-slide");

        clearInterval(showImageSlide);

        counter = id;
        showImageSlide = setInterval("changeImageSlide()", 3700);
    });
});