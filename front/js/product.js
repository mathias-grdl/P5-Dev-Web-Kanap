// Récupérer l'id du produit
// https://flaviocopes.com/urlsearchparams/
const url_parameters = new URLSearchParams(window.location.search);
const product_id = url_parameters.get("id");
// console.log(url_parameters);

let productPrice = 0; // NUL



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
    productElement("title", name);
    productElement("price", price);
    productElement("description", description);
    productColors(colors);

    productPrice = price;
    productImgUrl = imageUrl;
    productImgAlt = altTxt;

}

//Création de l'élément img
function productImg(imageUrl, altTxt) {
    let productElement = document.createElement('img')
    productElement.setAttribute("src", imageUrl);
    productElement.setAttribute("alt", altTxt);
    document.querySelector(".item__img").appendChild(productElement);
}

// fonction générique
function productElement(element, content) {
    document.getElementById(element).innerHTML = content;
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


// =======================

//Ajouter le produit
const button_addToCart = document.getElementById("addToCart")
button_addToCart.addEventListener("click", (addToCard));

function addToCard() {
    const buttonProductColor = document.getElementById("colors").value
    const buttonProductQuantity = document.getElementById("quantity").value
    VerificationOrder(buttonProductColor, buttonProductQuantity)
}

function VerificationOrder(buttonProductColor, buttonProductQuantity) {
    if (buttonProductColor == null || buttonProductColor == "" || buttonProductQuantity == null || buttonProductQuantity == "" || buttonProductQuantity == "0") {
        alert("Vous devez choisir une couleur ainsi qu'une quantité");
    }
    else {
        localStorageProducts(product_id, buttonProductColor, buttonProductQuantity)
        redirectToCard()
    }
}


function localStorageProducts(product_id, buttonProductColor, buttonProductQuantity) {
    const data = {
        id: product_id,
        imageUrl : productImgUrl, //comme le prix, pas ouf
        altTxt : productImgAlt,
        color: buttonProductColor,
        quantity: Number(buttonProductQuantity),
        price: productPrice// C'est mal fait ! Il ne faut pas oublier de multiplier avec la quantitée
    }
    localStorage.setItem(product_id, JSON.stringify(data))
}

function redirectToCard() {
    window.location.href = "cart.html"
}




//Faire la distinction entre les couleurs

//incrémenter ou non en fonction de la couleur et quantité du produit déjà présent dans le panier

//Choisir la bonne quantité en fonction des couleurs

//Ajouter au panier

//Calculer le prix 