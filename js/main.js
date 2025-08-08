// Change TOP Header background and Show/Hide Link to Top
const linkTop = document.querySelector('.link-top');
const headerTop = document.querySelector(".header__top");

window.addEventListener("scroll", () => {
    const heightScroll = window.scrollY;
    
    if(heightScroll >= 150) headerTop.classList.add("change-background");    
    else headerTop.classList.remove("change-background");
    
    if(heightScroll >= 500) linkTop.classList.add("show-link");
    else linkTop.classList.remove("show-link");
});

// Toggle Menu
const menuBtn = document.querySelector(".header__btn");
const mainMenu = document.querySelector(".main-menu");
const menuLinks = document.querySelectorAll(".main-menu li a");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("rotate-line");
    mainMenu.classList.toggle("main-menu-change");
    menuLinks.forEach(item => item.classList.toggle("main-menu-change"));
});

// Smooth Scrolling - Scroll Navigation and Top-link
const topHeader = document.querySelector(".header__top");
const containerHeight = topHeader.getBoundingClientRect().height;
const links = document.querySelectorAll("#navbar a, a.link-top");

for(let item of links) {
    item.addEventListener("click", (e) => {
        e.preventDefault();

        let id = item.getAttribute("href");
        let section = document.querySelector(`section${id}`);
        
        window.scroll({
			top: window.scrollY + section.getBoundingClientRect().top - (containerHeight - 1),
			left: 0,
			behavior:"smooth"
		});
    });    
}

// Spy Links
let sections = document.querySelectorAll('section');
let navbarLinks = document.querySelectorAll('#navbar a');

navbarLinks[0].classList.add("change-link");

window.addEventListener("scroll", () => {
    // console.log(window.pageYOffset);
    sections.forEach((section, i) => {
        if(window.pageYOffset >= section.offsetTop - (containerHeight + 2)) {
            navbarLinks.forEach((navLink) => {
                navLink.classList.remove("change-link");
            });

            navbarLinks[i].classList.add("change-link");
        }
    });
});

// Link to Top position
const widthPage = 1800;
const windowWidth = window.innerWidth;
let diffSize = window.innerWidth - widthPage;

if(windowWidth >= widthPage) linkTop.style.right = (diffSize - (diffSize * .45)) + 'px';

// Date
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// console.log(monthArray[month]);

const showDate = document.getElementById("date");
showDate.textContent = year;