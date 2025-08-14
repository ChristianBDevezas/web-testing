import { convertPixelNumberToNumber } from "./motorcycles-general.js";

export function createElements(product) {
    console.log("createElements product", product);  
    const thumbnail = document.createElement("article");
    thumbnail.classList.add("motorcycles__thumbnail");
    thumbnail.setAttribute("name", product.name);

    const image = document.createElement("img");
    // image.src = `${product.imageUrl}`;
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", product.imageAlt);

    thumbnail.appendChild(image);

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const productTitle = document.createElement("h2");
    productTitle.innerText = product.name;

    const productPrice = document.createElement("p");
    // productPrice.innerText = product.price;
    productPrice.innerText = `US$ ${product.price.toLocaleString("en-US", {minimumFractionDigits: 2})}`;

    const link = document.createElement("a");
    // link.setAttribute("href", "#");
    link.innerText = "Buy Now";

    productDetails.appendChild(productTitle);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(link);

    thumbnail.appendChild(productDetails);

    return thumbnail;
}

export function moveToLastPosition(parent, thumbnail, limit) {
    let leftPosition = convertPixelNumberToNumber(thumbnail.style.left);

	if(leftPosition < -355) {
        if(parent.children.length < limit) return;
		
        thumbnail.remove();
        
        let lastThumbnail = parent.children[parent.children.length - 1];
        
        let lastLeftPosition = convertPixelNumberToNumber(lastThumbnail.style.left);
        
        let cardWidth = lastThumbnail.getBoundingClientRect().width * 1.1;
        thumbnail.style.left = `${lastLeftPosition + cardWidth}px`;
		parent.appendChild(thumbnail);
	}
}