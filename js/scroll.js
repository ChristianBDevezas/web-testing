// Smooth Scrolling - Scroll Navigation and Top-link
const topHeader = document.querySelector(".header__top");
const containerHeight = topHeader.getBoundingClientRect().height;
const links = document.querySelectorAll("#navbar a, a.link-top");

for(let item of links) {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e);

        let id = item.getAttribute("href");
        console.log(id);

        let section = document.querySelector(`section${id}`);

        let start = window.scrollY;
        let targetSection = section.getBoundingClientRect().top;
        // let destinatioPosition = start + targetSection - (containerHeight - 1);
        let destinatioPosition = start + targetSection;
        const duration = 9;
        let steps = destinatioPosition / duration;
        let count = 0;

        let scrollInterval = setInterval(() => {
            count++;

            if(count > duration) {
                window.scroll({
                    top: destinatioPosition,
                    behavior: "instant"
                });

                clearInterval(scrollInterval);
            }
            else {
                window.scroll({
                    top: window.scrollY + steps,
                    behavior: "instant"
                });
            }
        }, 100);

        // window.scroll({
		// 	top: window.scrollY + section.getBoundingClientRect().top - (containerHeight - 1),
		// 	left: 0,
		// 	behavior:"smooth"
		// });
    });
    
}