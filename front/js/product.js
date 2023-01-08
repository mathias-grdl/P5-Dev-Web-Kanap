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
    productElement("title", name);
    productElement("price", price);
    productElement("description", description);
    productColors(colors);
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


//Ajouter le produit
const button_addToCart = document.getElementById("addToCart")
button_addToCart.addEventListener("click", (addToCard) );



function addToCard() {
const buttonProductColor = document.getElementById("colors").value
const buttonProductQuantity = document.getElementById("quantity").value

// console.log(buttonProductColor);
// console.log(buttonProductQuantity);

if (buttonProductColor == null || buttonProductColor == "" || buttonProductQuantity == null || buttonProductQuantity == ""){
    alert ("Vous devez choisir une couleur ainsi qu'une quantité");
}

//localStorage
const data = {
    id : product_id,
    color: buttonProductColor,
    quantity: Number(buttonProductQuantity),
    price: price, // LE PRIX N'EST PAS RECUPERE
}
localStorage.setItem(product_id, JSON.stringify(data))

}



//Gestion de la couleur ou quantité vide ?

//Faire la distinction entre les couleurs

//incrémenter ou non en fonction de la couleur et quantité du produit déjà présent dans le panier

//Choisir la bonne quantité en fonction des couleurs

//Ajouter des produits au panier 




//Calculer le prix 