// https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=790s

// Contact l'url et on récupère une promesse réponse (.then) -> response.json formate la réponse et nous fait une nouvelle promesse. Et on refait un .then pour récupérer le résultat.
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(products => {
        createProducts(products);
    })

function createProducts(products) {

    // products_section = la section où mettre les produits
    const products_section = document.getElementById("items");

    // boucle pour chaque indice (0,1...) que j'ai nommé 'Product' dans products (la data)
    for (let product of products) {
        let productLink = document.createElement('a');
        productLink.setAttribute("href", `./product.html?id=${product._id}`);
        // let productLink = CreateElementProductLink();
        products_section.appendChild(productLink);

       let productArticle = productLink.appendChild(createElementArticle());

        productArticle.appendChild(createElementImg(product));
        productArticle.appendChild(createElementH3(product));
        productArticle.appendChild(createElementP(product));
    }
}

//Création de l'élément article
function createElementArticle() {
    let productArticle = document.createElement('article')

    return productArticle;
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
