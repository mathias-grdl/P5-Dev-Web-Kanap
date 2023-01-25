const url_parameters = new URLSearchParams(window.location.search);
const productId = url_parameters.get("id");

//Création de l'élément message (erreur/succès)
function productMessage() {
    let productElement = document.createElement('p')
    productElement.setAttribute("id" , "message");
    document.querySelector(".item__content").appendChild(productElement);
}

fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        productMessage();
        displayProduct(product);
        // console.log(product);
    })

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
    // https://www.youtube.com/watch?v=h34Dbdl9twc&ab_channel=DevTheory
    // https://www.youtube.com/watch?v=KHIknKfaf2Q&ab_channel=LeDesignerduWeb-%C3%89coleduWeb
    let productArray = JSON.parse(localStorage.getItem("product"));
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;
    //opérateur ternaire
    productArray = productArray === null ? [] : productArray;
    pushCart(productArray, product._id, color, quantity);
}


const pushCart = (productArray, id, color, quantity) => {
    let styleColor = "red";
    let message = "";
    quantity = parseInt(quantity);

    // On vérifie que tout les champs soient remplient
    if ((color === null || color === "") && (quantity === null || quantity === "" || quantity === 0)) {
        message = 'Vous devez choisir une couleur et une quantité';
    } else if (color === null || color === "") {
        message = 'Vous devez choisir une couleur';
    } else if (quantity === null || quantity === "" || quantity === 0) {
        message = 'Vous devez choisir une quantité';
    } else if (quantity > 100) {
        message = 'Vous ne pouvez pas mettre plus de 100 produits';

        // produit existe déjà
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/some
        // https://www.youtube.com/watch?v=4sgugU_QV54&ab_channel=FloDev-Tutorielsd%C3%A9veloppementweb
    } else if (productArray.some(products => products.id === id && products.color === color)) {

        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        // crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant.
        productArray = productArray.map(products => {
            // la condition pour la quantity ne va pas 
            if (products.id === id && products.color === color && products.quantity + quantity <= 100) {
                // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Addition_assignment
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
        productArray.push(addDataToArray);
    }

    //Affichage message
    let messageElement = document.querySelector("#message");
    messageElement.innerHTML = message;
    messageElement.style.color = styleColor;

    // https://developer.mozilla.org/fr/docs/Web/API/Storage/setItem
    // https://www.youtube.com/watch?v=AUOzvFzdIk4&ab_channel=dcode
    // les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà.
    // convertit une valeur JavaScript en chaîne JSON, en remplaçant éventuellement les valeurs
    localStorage.setItem("product", JSON.stringify(productArray));
}




