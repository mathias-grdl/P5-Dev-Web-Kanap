// Récupérer l'id du produit
// https://flaviocopes.com/urlsearchparams/
const url_parameters = new URLSearchParams(window.location.search);
const product_id = url_parameters.get("id");
// console.log(url_parameters);

// Récupérer les données du produit grâce à son id
fetch(`http://localhost:3000/api/products/${product_id}`)
    .then(response => response.json())
    .then(product => {
        createProduct(product);
        // console.log(products)
    })

function createProduct(sofa) {
    const { colors, name, price, imageUrl, description, altTxt } = sofa; // const colors = sofa.colors; || const name = sofa.name; || ...

    productImg(imageUrl, altTxt);
    productTitle(name);
    productPrice(price);
    productDescription(description);
    productColors(colors);
}

//Création de l'élément img
function productImg(imageUrl, altTxt) {
    let productElement = document.createElement('img')
    productElement.setAttribute("src", imageUrl);
    productElement.setAttribute("alt", altTxt);
    document.querySelector(".item__img").appendChild(productElement);
}

// Affichage du nom du produit
function productTitle(name) {
    document.getElementById("title").innerHTML = name;
}

// Affichage du prix du produit
function productPrice(price) {
    document.getElementById("price").innerHTML = price;
}

// Affichage de la description du produit
function productDescription(description) {
    document.getElementById("description").innerHTML = description;
}

//Création de l'élément option (couleurs)
function productColors(colors) {
    colors.forEach((colors => {
        let option = document.createElement('option');
        option.setAttribute('value', colors);
        option.innerText = colors;
        document.getElementById('colors').append(option);
    }))
}
