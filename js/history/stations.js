const stationItemButton = document.querySelectorAll(".station-item__header__btn");
const stationButtonBack = document.querySelectorAll(".btn-back");

stationItemButton.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        const rotateStation = e.target.parentElement.parentElement.parentElement;
        rotateStation.classList.add("change-item");

        stationButtonBack[index].addEventListener("click", () => {
            rotateStation.classList.remove("change-item");
        });
    });
});