const toggleButtons = document.querySelectorAll(".web__toggle__btn");
const toggleIcons = document.querySelectorAll(".web__toggle__icon");

toggleButtons.forEach((button, idx) => {
    button.addEventListener("click", (e) => {
        const toggler = e.currentTarget.parentElement.parentElement;

        toggler.classList.toggle("change-toggler");

        if(toggler.className == "web__toggle change-toggler") {
            setTimeout(() => {
                button.innerHTML = "Show Less";
                toggleIcons[idx].innerHTML = "-";
            }, 250);
        }
        else {
            setTimeout(() => {
                button.innerHTML = "Show More";
                toggleIcons[idx].innerHTML = "+";
            }, 250);
        }
    });
});