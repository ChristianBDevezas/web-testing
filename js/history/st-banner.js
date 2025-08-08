const bannerSlider = document.querySelector(".banner__slider");
const bannerButton = document.querySelector(".banner__button");

bannerButton.addEventListener("click", () => {
    bannerSlider.classList.toggle("stop-slider");

    if(bannerSlider.classList.contains("stop-slider")) {
        bannerButton.innerText = "Play Animation";
    }
    else {
        bannerButton.innerText = "Stop Animation";
    }
});