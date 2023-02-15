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
        let productIndex = products.findIndex(product => product._id == productArray[i].id)
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
    let i = productArray.findIndex(product => product.id == id && product.color == color)
    if (i != -1) {
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
    totalQuantity = productArray.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.quantity;
    }, 0);
    totalPrice = productArray.reduce(function (previousValue, currentValue) {
        let product = products.find(i => i._id === currentValue.id);
        return previousValue + (currentValue.quantity * product.price);
    }, 0);
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
    document.getElementById('totalPrice').innerHTML = totalPrice;
}

// form 
let form = document.querySelector(".cart__order__form");

// variables
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let email = document.querySelector("#email");

// RegExp
let RegexpName = new RegExp("^[a-zA-Z\'\-]+$");
let RegexpAddress = new RegExp("[a-zA-Z0-9\s,.'-]{3,}$");
let RegexpEmail = new RegExp("[a-zA-Z0-9-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+");

// Gestion d'erreur firstName
firstName.addEventListener("blur", () => {
    firstNameControl();
});

function firstNameControl() {
    let firstNameMsg = document.querySelector("#firstNameErrorMsg");
    if (RegexpName.test(firstName.value)) {
        firstNameMsg.innerText = "Prénom valide";
        return true;
    }
    firstNameMsg.innerText = "Prénom non valide";
    return false;
}

// Gestion d'erreur LastName
lastName.addEventListener("blur", () => {
    lastNameControl();
});

function lastNameControl() {
    let lastNameMsg = document.querySelector("#lastNameErrorMsg");
    if (RegexpName.test(lastName.value)) {
        lastNameMsg.innerText = "Nom valide";
        return true;
    }
    lastNameMsg.innerText = "Nom non valide";
    return false;
}

// Gestion d'erreur Address
address.addEventListener("blur", () => {
    addressControl();
});

function addressControl() {
    let addressMsg = document.querySelector("#addressErrorMsg");
    if (RegexpAddress.test(address.value)) {
        addressMsg.innerText = "Adresse valide";
        return true;
    }
    addressMsg.innerText = "Adresse non valide";
    return false;
}

// Gestion d'erreur city
city.addEventListener("blur", () => {
    cityControl();
});

function cityControl() {
    let cityMsg = document.querySelector("#cityErrorMsg");
    if (RegexpName.test(city.value)) {
        cityMsg.innerText = "Ville valide";
        return true;
    }
    cityMsg.innerText = "Ville non valide";
    return false;
}

// Gestion d'erreur Email
email.addEventListener("blur", () => {
    emailControl();
});

function emailControl() {
    let emailMsg = document.querySelector("#emailErrorMsg");
    if (RegexpEmail.test(email.value)) {
        emailMsg.innerText = "Email valide";
        return true;
    }
    emailMsg.innerText = "Email non valide";
    return false;
}

// vérification des champs du form
function verif() {
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

        // Les données récupéré du formulaire
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        }


        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
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
                window.location.href = `confirmation.html?id=${res.orderId}`
            })
    }
});




