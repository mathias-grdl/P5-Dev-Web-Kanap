let productArray = JSON.parse(localStorage.getItem("product"));

if (localStorage.length === 0 || productArray.length === 0) {
    document.querySelector('#cart__items').innerHTML = "Votre panier est vide";
} else {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(products => {
            affichage(products);
            total(products);
        })
}
console.log("calcul total");

function affichage(products) {
    for (let i = 0; i < productArray.length; i++) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        // renvoie l'index du premier élément du tableau qui satisfait une condition donnée par une fonction. 
        // Si la fonction renvoie faux pour tous les éléments du tableau, le résultat vaut -1.
        let productIndex = products.findIndex(product => product._id == productArray[i].id)
        // console.log(productIndex);
        displayProduct(products, productIndex, i);
    }
}

// affichage des produits
function displayProduct(product, productIndex, i) {

    //élément "article" et insertion dans la section
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id", productArray[i].id);
    productArticle.setAttribute("data-color", productArray[i].color);

    //élément "div" pour l'image
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    //élément Image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = product[productIndex].imageUrl;
    productImg.alt = product[productIndex].altTxt;

    //élément "div" 
    let productContent = document.createElement("div");
    productArticle.appendChild(productContent);
    productContent.className = "cart__item__content";

    //élément "div"
    let productContentTitlePrice = document.createElement("div");
    productContent.appendChild(productContentTitlePrice);
    productContentTitlePrice.className = "cart__item__content__titlePrice";

    //élément titre h2
    let productTitle = document.createElement("h2");
    productContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = product[productIndex].name;

    //élément couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = productArray[i].color;

    //élément prix
    let productPrice = document.createElement("p");
    productContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = product[productIndex].price + " €";

    //élément "div"
    let productContentSettings = document.createElement("div");
    productContent.appendChild(productContentSettings);
    productContentSettings.className = "cart__item__content__settings";

    //élément "div"
    let productIContentSettingsQuantity = document.createElement("div");
    productContentSettings.appendChild(productIContentSettingsQuantity);
    productIContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    //élément "Qté : "
    let productQty = document.createElement("p");
    productIContentSettingsQuantity.appendChild(productQty);
    productQty.innerHTML = "Qté : ";

    //élément quantité
    let productQuantity = document.createElement("input");
    productIContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.setAttribute("type", "number");
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("name", "itemQuantity");
    productQuantity.setAttribute("min", 1);
    productQuantity.setAttribute("max", 100);
    productQuantity.value = productArray[i].quantity;
    productQuantity.setAttribute("id", productArray[i].id + productArray[i].color)
    productQuantity.addEventListener("blur", function () {
        updateQuantityProduct(productArray[i].id, productArray[i].color)
    })

    //élément "div" delete
    let productContentSettingsDelete = document.createElement("div");
    productContentSettings.appendChild(productContentSettingsDelete);
    productContentSettingsDelete.className = "cart__item__content__settings__delete";

    //élément "p" supprimer
    let productSupprimer = document.createElement("p");
    productContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
    productSupprimer.addEventListener('click', function () {
        deleteProduct(productArray[i].id, productArray[i].color)
    })
}

// supprimer un produit
function deleteProduct(id, color) {
    // Trouver l'index de l'article du panier dans productArray pour le supprimer.
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    let i = productArray.findIndex(product => product.id == id && product.color == color)
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Inequality
    if (i != -1) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        // let tabElementsSupprimes = array.splice(début, nbASupprimer[, élem1[, élem2[, ...]]])
        productArray.splice(i, 1);
        localStorage.setItem("product", JSON.stringify(productArray));
        location.reload();
    }
};

// changer la quantité d'un produit
function updateQuantityProduct(id, color) {
    let getInput = document.getElementById(id + color);
    let inputValue = getInput.value;
    for (i = 0; i < productArray.length; i++) {
        if ((id === productArray[i].id) && (color === productArray[i].color)) {
            if (inputValue > 100 || inputValue == 0) {
                alert("Saisir une quantité entre 1 et 100")
            } else {
                productArray[i].quantity = parseInt(inputValue);
            }
            localStorage.setItem("product", JSON.stringify(productArray));
        }
    }
    console.log("calcul total");
    //appel function affichage prix quantité
    // total(products)
};


// function total(){
//         let totalQuantity = 0
//         for (let i = 0; i < productArray.length; i++) {
//             totalQuantity += productArray[i].quantity;
//         }
//         document.getElementById("totalQuantity").innerText = totalQuantity;
//     }


// affichage prix + quantité
function total(products) {
    // La méthode reduce() applique une fonction qui est un « accumulateur » et qui traite chaque valeur d'une liste (de la gauche vers la droite) afin de la réduire à une seule valeur.
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    totalQuantity = productArray.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.quantity;
    }, 0);

    totalPrice = productArray.reduce(function (previousValue, currentValue) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        let product = products.find(i => i._id === currentValue.id);
        return previousValue + (currentValue.quantity * product.price);
    }, 0);
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
    document.getElementById('totalPrice').innerHTML = totalPrice;
}




// ========================================================================================

// form 
let form = document.querySelector(".cart__order__form");

// variables
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");

let firstNameErreur = document.querySelector("#firstNameErrorMsg");
let lastNameErreur = document.querySelector("#lastNameErrorMsg");
let addressErreur = document.querySelector("#addressErrorMsg");
let cityErreur = document.querySelector("#cityErrorMsg");
let emailErreur = document.querySelector("#emailErrorMsg");

// valider le formulaire
form.addEventListener("submit", (e)=> {
    
    e.preventDefault();
    // Les données récupéré du formulaire
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }
    
    // fonctions qui vérifient les données du formulaire grâce aux Regex
    function firstNameControl(){
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
        // https://www.web-development-kb-eu.site/fr/regex/expression-reguliere-pour-le-firstName-et-le-lastName/968019401/
        return /^[a-z ,.'-]+$/i.test(firstName.value);
    }

    function lastNameControl(){
        return /^[a-z ,.'-]+$/i.test(lastName.value);
    }

    function addressControl(){
        return /^[a-zA-Z0-9\s,.'-]{3,}$/.test(address.value);
    }

    function cityControl(){
        return /^[a-z ,.'-]+$/i.test(city.value);
    }

    function emailControl(){
        return /^[\w\-\+]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$/.test(email.value);
    }

    firstNameErreur.innerText = firstNameControl() ? "" : "Prénom non valide";
    lastNameErreur.innerText = lastNameControl() ? "" : "Nom non valide";
    addressErreur.innerText = addressControl() ? "" : "Adresse non valide";
    cityErreur.innerText = cityControl() ? "" : "Ville non valide";
    emailErreur.innerText = emailControl() ? "" : "Email non valide";

    // vérification des champs du form
    function verif(){
        if(firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()){
        localStorage.setItem("form", JSON.stringify(contact));
        return true;
        }
    }
     
   //data
    let allData = {
        contact
    }

    //envoie les données à l'API
    if (verif() === true) {
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(allData)
    
        })  
    }
})
