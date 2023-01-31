let productArray = JSON.parse(localStorage.getItem("product"));

if (localStorage.length === 0 || productArray.length === 0) {
    document.querySelector('#cart__items').innerHTML = "Votre panier est vide";
} else {

    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(product => {
            general(product);

        })
}

function general (products) {
    for (let i=0; i < productArray.length; i++) {
        let productIndex = products.findIndex(product => product._id == productArray[i].id)
        displayProduct(products, productIndex, i);
    }
}


  function displayProduct(product, productIndex, i){
    // for (let i=0; i < productArray.length; i++) {

        // Création "article" et insertion dans la section
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productArray[i].id);
        productArticle.setAttribute("data-color", productArray[i].color);
        
        //élément "div" pour l'image
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        //Image
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
        
        //titre h2
        let productTitle = document.createElement("h2");
        productContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = product[productIndex].name;

        //couleur
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = productArray[i].color;
        
        //prix
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
        
        // Insertion de "Qté : "
        let productQty = document.createElement("p");
        productIContentSettingsQuantity.appendChild(productQty);
        productQty.innerHTML = "Qté : ";
        
        // Insertion de la quantité
        let productQuantity = document.createElement("input");
        productIContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.setAttribute("type", "number");
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("name", "itemQuantity");
        productQuantity.setAttribute("min", 1);
        productQuantity.setAttribute("max", 100);
        productQuantity.value = productArray[i].quantity;
        productQuantity.setAttribute("id", productArray[i].id + productArray[i].color)
        productQuantity.onchange = function () {
            updateQuantityProduct(productArray[i].id, productArray[i].color)
        }

        // Insertion de l'élément "div" delete
        let productContentSettingsDelete = document.createElement("div");
        productContentSettings.appendChild(productContentSettingsDelete);
        productContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
        productSupprimer.addEventListener('click', function() {
            deleteProduct(productArray[i].id, productArray[i].color)
        })
  }


function deleteProduct(id, color) {
    // Trouver l'index de l'article du panier dans productArray pour le supprimer.
    let i = productArray.findIndex(product => product.id == id && product.color == color)
    if (i != -1) {
        let quantity = productArray[i].quantity
        productArray.splice(i, 1);
        localStorage.setItem("product", JSON.stringify(productArray));
        // if (quantity == 1) {
        //     alert("Votre article a été supprimé du panier !")
        // } else {
        //     alert("Vos articles ont été supprimés au panier !")
        // };
        location.reload();
    }
};


function updateQuantityProduct(id, color) {
    let getInput = document.getElementById(id + color);
    let inputValue = getInput.value;
    for (i = 0; i < productArray.length; i++) {
        if ((id === productArray[i].id) && (color === productArray[i].color)) {
            if (inputValue > 100 || inputValue == 0) {
                alert("Merci de saisir une quantité entre 1 et 100")
                location.reload();
            } else {
                productArray[i].quantity = parseInt(inputValue);
            }
            localStorage.setItem("product", JSON.stringify(productArray));
            location.reload();
        }
    }
};
