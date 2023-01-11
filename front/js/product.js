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
    let productArray = JSON.parse(localStorage.getItem("product"));
    let color = document.getElementById("colors").value
    let quantity = document.getElementById("quantity").value
    if (productArray === null) {
        // si le product n'existe pas
        productArray = [];
        pushCart(productArray, product._id, color, quantity);
    }
    else {
        // s'il existe déjà
        pushCart(productArray, product._id, color, quantity);
    }
}


const pushCart = (productArray, id, color, quantity) => {
    
// On vérifie que tout les champs soient remplient
    if ((color == null || color == "") && (quantity == null || quantity == "" || quantity == "0")) {
        alert("Vous devez choisir une couleur et une quantité");
    }
    else if (color == null || color == "") {
        alert("Vous devez choisir une couleur");
    }
    else if (quantity == null || quantity == "" || quantity == "0") {
        alert("Vous devez choisir une quantité");
    }
// produit existe déjà
    else if (productArray.some(products => products.id === id && products.color === color)) {
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        productArray = productArray.map(product => {
            if (product.id === id && product.color === color) {
                product.quantity += +quantity;
            }
            return product;
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
    localStorage.setItem("product", JSON.stringify(productArray));
}

//FAIRE LE MESSAGE DERREUR PAR RAPPORT AU 100MAX 
//NE PAS FAIRE APPARAÎTRE LES ERREURS EN ALERTE