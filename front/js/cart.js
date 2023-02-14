let productArray = JSON.parse(localStorage.getItem("product"));
let ProductsCart;

if (localStorage.length === 0 || productArray.length === 0) {
    document.querySelector('#cart__items').innerHTML = "Votre panier est vide";
} else {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(products => {
            ProductsCart = products;
            affichage(products);
        })
}
console.log("calcul total");

// Affichage des produits
function affichage(products) {
    for (let i = 0; i < productArray.length; i++) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        // renvoie l'index du premier élément du tableau qui satisfait une condition donnée par une fonction. 
        // Si la fonction renvoie faux pour tous les éléments du tableau, le résultat vaut -1.
        let productIndex = products.findIndex(product => product._id == productArray[i].id)
        // console.log(productIndex);
        displayProduct(products, productIndex, i);
        total(products);
    }
}

// construction html des produits
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
    productQuantity.addEventListener("change", function () {
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
    //appel function affichage prix quantité
    total(ProductsCart);
};

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

// RegExp
// https://blog.netwrix.fr/2019/10/31/expressions-regulieres-pour-debutants-comment-se-lancer-dans-la-decouverte-de-donnees-sensibles/
let RegexpName = new RegExp("^[a-zA-Z\'\-]+$");
let RegexpAddress = new RegExp("[a-zA-Z0-9\s,.'-]{3,}$");
let RegexpEmail = new RegExp("[a-zA-Z0-9-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+");

// Gestion d'erreur firstName
firstName.addEventListener("blur", () => {
    firstNameControl();
});

function firstNameControl() {
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    // https://www.web-development-kb-eu.site/fr/regex/expression-reguliere-pour-le-firstName-et-le-lastName/968019401/
    // console.log(firstName.value);
    // console.log(RegexpFirstName.test(firstName.value));
    if (RegexpName.test(firstName.value)) {
        firstNameErreur.innerText = "Prénom valide";
        console.log("prénom true");
        return true;
    }
    firstNameErreur.innerText = "Prénom non valide";
    console.log("prénom false");
    return false;
}


// Gestion d'erreur LastName
lastName.addEventListener("blur", () => {
    lastNameControl();
});

function lastNameControl() {
    if (RegexpName.test(lastName.value)) {
        lastNameErreur.innerText = "Nom valide";
        console.log("Nom true");
        return true;
    }
    lastNameErreur.innerText = "Nom non valide";
    console.log("Nom false");
    return false;
}

// Gestion d'erreur Address
address.addEventListener("blur", () => {
    addressControl();
});

function addressControl() {
    if (RegexpAddress.test(address.value)) {
        addressErreur.innerText = "Adresse valide";
        console.log("Adresse true");
        return true;
    }
    addressErreur.innerText = "Adresse non valide";
    console.log("Nom Adresse false");
    return false;
}

// Gestion d'erreur city
city.addEventListener("blur", () => {
    cityControl();
});

function cityControl() {
    if (RegexpName.test(city.value)) {
        cityErreur.innerText = "Ville valide";
        console.log("Ville true");
        return true;
    }
    cityErreur.innerText = "Ville non valide";
    console.log("Ville false");
    return false;
}

// Gestion d'erreur Email
email.addEventListener("blur", () => {
    emailControl();
});

function emailControl() {
    if (RegexpEmail.test(email.value)) {
        emailErreur.innerText = "Email valide";
        console.log("Email true");
        return true;
    }
    emailErreur.innerText = "Email non valide";
    console.log("Email false");
    return false;
}

// vérification des champs du form
function verif() {
    console.log("===================================");
    console.log(firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl());
    console.log("function verif ok")
    // retourne bien true ou false
    return (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl());
}

// valider le formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //envoie les données à l'API
    if (verif()) {
        //produit
        let products = []
        productArray.forEach(product => {
            products.push(product.id);
        });
        console.log("products");
        console.log(products);
        // ok

        // Les données récupéré du formulaire
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        }
        console.log("contact");
        console.log(contact);
        // ok


        // https://www.youtube.com/watch?v=fQZTCzAR9GQ&ab_channel=e-genieclimatique
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ contact, products })
        })
            .then(response => response.json())
            .then(res => {
                console.log(res);
                // redirige vers la page de confirmation (+ orderId dans l'URL)
                window.location.href=`confirmation.html?id=${res.orderId}`
            })
    }
});




