// Récupération de l'id du produit dans l'URL
const url_parameters = new URLSearchParams(window.location.search);
const productId = url_parameters.get("id");

//Création de l'élément message (erreur/succès)
function productMessage() {
    let productElement = document.createElement('p')
    productElement.setAttribute("id", "message");
    document.querySelector(".item__content").appendChild(productElement);
}

function refreshError() {
setTimeout(() => {
    location.reload();
  }, 1500);
}

// Appel à l'API pour récupérer les données d'un produit avec l'ID récupéré dans l'URL
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        productMessage();
        displayProduct(product);
    })
    .catch(() => {
        console.log("error");
    });

// Affichage des produits
const displayProduct = (product) => {
    const { colors, name, price, imageUrl, description, altTxt } = product; // const colors = product.colors; || const name = product.name; || ...

    document.title = name;
    productImg(imageUrl, altTxt);
    productElement("title", name);
    productElement("price", price);
    productElement("description", description);
    productColors(colors);
    addCartButtonListener(product);
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

//clique sur le bouton ajouter
function addCartButtonListener(product) {
    let button = document.getElementById("addToCart");
    button.addEventListener("click", () => {
        addCart(product);
    })
}

const addCart = (product) => {
    // récupèrer la valeur de l'élément dans le stockage local sous la clé "product" et la chaîne de caractères en objet JavaScript.
    let productArray = JSON.parse(localStorage.getItem("product"));
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;
    //opérateur ternaire : Si le panier est vide, initialisation d'un tableau vide pour productArray
    productArray = productArray === null ? [] : productArray;
    pushCart(productArray, product._id, color, quantity);
}


const pushCart = (productArray, id, color, quantity) => {
    let styleColor = "red";
    let message = "";
    // Convertit la quantité en entier
    quantity = parseInt(quantity);

    // On vérifie que tout les champs soient remplient
    if ((color === null || color === "") && (quantity === null || quantity === "" || quantity === 0)) {
        message = 'Vous devez choisir une couleur et une quantité';
        refreshError();
    } else if (color === null || color === "") {
        message = 'Vous devez choisir une couleur';
        refreshError();
    } else if (quantity === null || quantity === "" || quantity === 0) {
        message = 'Vous devez choisir une quantité';
        refreshError();
    } else if (quantity > 100) {
        message = 'Vous ne pouvez pas mettre plus de 100 produits';
        refreshError();
    } else if (quantity < 0) {
        message = 'Vous ne pouvez pas mettre moins de 1 produit';
        refreshError();
        // produit existe déjà
    } else if (productArray.some(products => products.id === id && products.color === color)) {

        productArray = productArray.map(products => {
            if (products.id === id && products.color === color && products.quantity + quantity <= 100) {
                products.quantity += quantity;
                message = 'Ajouté aux produits déjà existants';
                styleColor = "green";
            } else {
                message = 'Vous ne pouvez pas mettre plus de 100 produits';
            }
            return products;
        });

        // s'il n'existe pas
    } else {
        const addDataToArray = {
            id: id,
            color: color,
            quantity: +quantity,
        };
        message = 'Ajout nouveau produit';
        styleColor = "green";
        // push : ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau
        productArray.push(addDataToArray);
    }

    //Affichage message
    let messageElement = document.querySelector("#message");
    messageElement.innerHTML = message;
    messageElement.style.color = styleColor;

    // Stockage des produits dans le localStorage en convertisant une valeur JavaScript en chaîne JSON
    localStorage.setItem("product", JSON.stringify(productArray));
}