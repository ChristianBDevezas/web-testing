import { productsDatabase } from "./motorcycles-database.js";
import { createElements } from "./motorcycles-elements.js";
import { moveToLastPosition } from "./motorcycles-elements.js";
import { convertPixelNumberToNumber, shouldItClick } from "./motorcycles-general.js";

let slider = document.getElementById("slider");
let nextBtn = document.getElementById("slide-right");
let prevBtn = document.getElementById("slide-left");

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
let thumbnails = document.querySelectorAll(".thumbnail");

// nextBtn.addEventListener("click", nextButtonClick);
shouldItClick(nextBtn, nextButtonClick);

function nextButtonClick() {
  let scrollAmount = 0;

  isSliderPlaying = false;

  let slideTimer = setInterval(() => {
    for(let thumbnail of slider.children) {
      let position = convertPixelNumberToNumber(thumbnail.style.left);
      position -= 20;
      thumbnail.style.left = `${position}px`;
    }

    scrollAmount += 1;

    if(scrollAmount >= 10) {      
      isSliderPlaying = true;
      clearInterval(slideTimer);
    }

    updateSliderImage();
  }, 25);
}

// setInterval(updateSliderImage, 2000);
function updateSliderImage() {
  for(let tagIndex of slider.children) {
    let counter = +slider.getAttribute('childrenCount');
    counter = isNaN(counter) ? 0 : counter;

    moveToLastPosition(slider, tagIndex, counter);
  }
}

shouldItClick(prevBtn, previousButtonClick);
// prevBtn.addEventListener("click", previousButtonClick);

function previousButtonClick() {
  let scrollAmount = 0;

  isSliderPlaying = false;

  let slideTimer = setInterval(() => {
    let step = 20;
    
    for(let i = 0; i < slider.children.length; i++) {
      let thumbnail = slider.children[i];

      let position = convertPixelNumberToNumber(thumbnail.style.left);

      if(i == 0 && position > 0) {
        break;
      }

      position += step;
      thumbnail.style.left = `${position}px`;
    }

    scrollAmount += 1;

    if(scrollAmount >= 10) {
      isSliderPlaying = true;
      clearInterval(slideTimer);
    }

    updateSliderImage();
  }, 25);
}

// Auto Play
function autoPlay() {
  if(isSliderPlaying == false) {
    return;
  }

  for(let thumbnail of slider.children) {
    let leftValue = +(thumbnail.style.left.replace('px',''));

    leftValue = isNaN(leftValue) ? 0 : leftValue;

    leftValue -= 1;

    thumbnail.style.left = `${leftValue}px`;
  }

  updateSliderImage();
}

let play = setInterval(autoPlay, 10);

// Pause the slide on hover
thumbnails.forEach((thumb) => {
  thumb.addEventListener("mouseover", () => {
    clearInterval(play);
  });

  thumb.addEventListener("mouseout", () => {
    play = setInterval(autoPlay, 10);
  });
});