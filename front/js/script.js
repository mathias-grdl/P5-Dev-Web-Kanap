// Envoie une requête à l'URL "http://localhost:3000/api/products" pour récupérer des données.
fetch("http://localhost:3000/api/products")
    // Traite la réponse de la requête en tant que JSON et renvoie une promesse.
    .then(response => response.json())
    // Traite les données JSON résolues en tant que "products" et appelle ensuite la fonction "createProducts" avec les données récupérées.
    .then(products => {
        createProducts(products);
    })
    // Gère toute erreur survenue lors de la récupération des données.
    .catch(() => {
        console.log("error");
    });

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
