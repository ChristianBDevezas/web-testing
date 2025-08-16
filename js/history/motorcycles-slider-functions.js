import { moveToLastPosition } from "./motorcycles-elements.js";
import { convertPixelNumberToNumber } from "./motorcycles-general.js";

export function nextButtonClick(isSliderPlaying) {
  let scrollAmount = 0;

  isSliderPlaying = false;

  let slideTimer = setInterval(() => {
    for(let thumbnail of slider.children) {
      let position = convertPixelNumberToNumber(thumbnail.style.left);
      position -= 20;
      thumbnail.style.left = `${position}px`;
    }

    let size = (window.screen.availWidth / 1000);
    if(size < 0.5) {
        scrollAmount += 1.8;
    }
    else {
        scrollAmount += 1.3;
    }

    // scrollAmount += 1;
    scrollAmount += 1.3;

    if(scrollAmount >= 10) {      
      isSliderPlaying = true;
      clearInterval(slideTimer);
    }

    updateSliderImage();
  }, 25);
}

// setInterval(updateSliderImage, 2000);
export function updateSliderImage() {
  for(let tagIndex of slider.children) {
    let counter = +slider.getAttribute('childrenCount');
    counter = isNaN(counter) ? 0 : counter;

    moveToLastPosition(slider, tagIndex, counter);
  }
}

export function previousButtonClick(isSliderPlaying) {
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
export function autoPlay(isSliderPlaying) {
  if(isSliderPlaying == false) {
    return;
  }

  for(let thumbnail of slider.children) {
    let leftValue = +(thumbnail.style.left.replace('px',''));

    leftValue = isNaN(leftValue) ? 0 : leftValue;

    let speed = (window.screen.availWidth / 1000);
    if(speed > 1.2) {
        speed = 1.2;
    }
    else if(speed < 0.5) {
        speed = 0.5;
    }

    // leftValue -= 1;
    // leftValue -= (1 * (window.screen.availWidth / 1000));
    leftValue -= (1 * (speed));

    thumbnail.style.left = `${leftValue}px`;
  }

  updateSliderImage();
}