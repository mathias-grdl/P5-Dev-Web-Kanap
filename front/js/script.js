// https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=790s

fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(products => {
        createProducts(products);
    })

//Création des produits
function createProducts(products) {
    const products_section = document.getElementById("items");

    for (let product of products) {
        let productLink = products_section.appendChild(CreateElementProductLink(product));
        let productArticle = productLink.appendChild(createElementArticle());

        productArticle.appendChild(createElementImg(product));
        productArticle.appendChild(createElementH3(product));
        productArticle.appendChild(createElementP(product));
    }
}

//Création de l'élément lien du produit
function CreateElementProductLink(product) {
    let productElement = document.createElement('a');
    productElement.setAttribute("href", `./product.html?id=${product._id}`);

    return productElement;
}

//Création de l'élément article
function createElementArticle() {
    let productElement = document.createElement('article')

    return productElement;
}

//Création de l'élément h3
function createElementH3(product) {
    let productElement = document.createElement('h3');
    productElement.setAttribute("class", "productName");
    productElement.innerText = product.name;

    return productElement;
}

//Création de l'élément img
function createElementImg(product) {
    let productElement = document.createElement('img');
    productElement.setAttribute("src", product.imageUrl);
    productElement.setAttribute("alt", product.altTxt);

    return productElement;
}

//Création de l'élément p
function createElementP(product) {
    let productElement = document.createElement('p');
    productElement.setAttribute("class", "productDescription");
    productElement.innerText = product.description;

    return productElement;
}
