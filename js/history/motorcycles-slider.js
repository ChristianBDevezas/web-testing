import { productsDatabase } from "./motorcycles-database.js";
import { createElements } from "./motorcycles-elements.js";
import { shouldItClick } from "./motorcycles-general.js";
import { autoPlay, nextButtonClick, previousButtonClick } from "./motorcycles-slider-functions.js";

function generateSlider() {
  let slider = document.getElementById("slider");
  let nextBtn = document.getElementById("slide-right");
  let prevBtn = document.getElementById("slide-left");

  slider.innerHTML = "";

  if(typeof window.autoPlayId === "number") {
    clearInterval(window.autoPlayId);
  }

  let isSliderPlaying = true;

  let cardHorizontalPosition = 0;
  let childrenCount = 0;

  for(let productItem of productsDatabase) {
    let cardElement = createElements(productItem);
    
    cardElement.style.left = `${cardHorizontalPosition}px`

    slider.appendChild(cardElement);
    // cardHorizontalPosition += 210;
    cardHorizontalPosition += cardElement.getBoundingClientRect().width * 1.1;
    childrenCount++;
  }

  slider.setAttribute("childrenCount", childrenCount);

  //thumbnails generated after for of loop
  let thumbnails = document.querySelectorAll(".motorcycles__thumbnail");

  // nextBtn.addEventListener("click", nextButtonClick);
  shouldItClick(nextBtn, () => nextButtonClick(isSliderPlaying));

  // prevBtn.addEventListener("click", previousButtonClick);
  shouldItClick(prevBtn, () => previousButtonClick(isSliderPlaying));

  let play = setInterval(() => autoPlay(isSliderPlaying), 10);
  window.autoPlayId = play;

  // Pause the slide on hover
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("mouseover", () => {
      clearInterval(play);
    });

    thumb.addEventListener("mouseout", () => {
      play = setInterval(() => autoPlay(isSliderPlaying), 10);
    });
  });
}

generateSlider();

window.addEventListener("resize", () => {
  generateSlider();
});