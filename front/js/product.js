const url_parameters = new URLSearchParams(window.location.search);
const productId = url_parameters.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        displayProduct(product);
    })

const displayProduct = (product) => {
    const { colors, name, price, imageUrl, description, altTxt } = product; // const colors = sofa.colors; || const name = sofa.name; || ...

    document.title = name;
    productImg(imageUrl, altTxt);
    productElement("title", name);
    productElement("price", price);
    productElement("description", description);
    productColors(colors);
    addToCard(product);
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
function addToCard(product) {
    let button = document.getElementById("addToCart")
    button.addEventListener("click", () => {
        addCart(product)
    })
}

// __________ PARTIE 2 __________ 


const addCart = (product) => {
    // https://www.youtube.com/watch?v=h34Dbdl9twc&ab_channel=DevTheory
    // https://www.youtube.com/watch?v=KHIknKfaf2Q&ab_channel=LeDesignerduWeb-%C3%89coleduWeb
    let productArray = JSON.parse(localStorage.getItem("product"));
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;
    if (productArray === null) {
        // si le product n'existe pas
        productArray = [];
        // https://www.youtube.com/watch?v=wgFHZps8NQ4&ab_channel=JavascriptAcademy
        pushCart(productArray, product._id, color, quantity);
    }
    else {
        // s'il existe déjà
        pushCart(productArray, product._id, color, quantity);
    }
}


const pushCart = (productArray, id, color, quantity) => {
    let error = document.createElement('p');
// On vérifie que tout les champs soient remplient
    if ((color == null || color == "") && (quantity == null || quantity == "" || quantity == "0")) {
        error.innerHTML = 'Vous devez choisir une couleur et une quantité';
        document.querySelector(".item__content").appendChild(error);
    }
    else if (color == null || color == "") {
        error.innerHTML = 'Vous devez choisir une couleur';
        document.querySelector(".item__content").appendChild(error);
    }
    else if (quantity == null || quantity == "" || quantity == "0") {
        error.innerHTML = 'Vous devez choisir une quantité';
        document.querySelector(".item__content").appendChild(error);
    }
// produit existe déjà
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/some
// https://www.youtube.com/watch?v=4sgugU_QV54&ab_channel=FloDev-Tutorielsd%C3%A9veloppementweb
    else if (productArray.some(products => products.id === id && products.color === color )) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        productArray = productArray.map(products => {
            // la condition pour la quantity ne va pas 
            if (products.id === id && products.color === color && products.quantity < 100 ) {
                // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Addition_assignment
                products.quantity += +quantity;
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
        productArray.push(addDataToArray);
    }
        // https://developer.mozilla.org/fr/docs/Web/API/Storage/setItem
        // https://www.youtube.com/watch?v=AUOzvFzdIk4&ab_channel=dcode
    localStorage.setItem("product", JSON.stringify(productArray));
}

//FAIRE LE MESSAGE DERREUR PAR RAPPORT AU 100MAX 