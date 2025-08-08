const showInfo = document.querySelectorAll(".lamborghini__item__btn");

showInfo.forEach((button, index) => {
    button.addEventListener("click", (e) => {
        const carItem = e.target.parentElement;        
        carItem.classList.toggle("change-height");
        
        if(carItem.className == "lamborghini__item change-height") {
            setTimeout(() => showInfo[index].innerHTML = "Close Info", 250);            
        }
        else {
            setTimeout(() => showInfo[index].innerHTML = "Show Info", 250);            
        }
    });
});