let existingCart = JSON.parse(localStorage.getItem("product"));
if (localStorage.length === 0 || existingCart.length === 0) {
    document.querySelector('h1').innerHTML = "Votre panier est vide";
} else {

    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(product => {
            general(product);
        })
}

function general(product) {
    // https://developer.mozilla.org/fr/docs/Web/API/DOMParser
    const parser = new DOMParser();

    const cart__items = document.getElementById('cart__items');
    //Boucle For, pour chaque élément de l'API présent dans le localStorage, on doit créer un nouveau bloc  
    for (i = 0; i < product.length; i++) {
        existingCart.forEach(oneProductInCart => {
            if (oneProductInCart.id === product[i]._id) {
                let cartProducts =
                    `<article class="cart__item" data-id="${product[i]._id}" data-color="${oneProductInCart.color}">
                    <div class="cart__item__img">
                        <img src="${product[i].imageUrl}" alt="${product[i].altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${product[i].name}</h2>
                            <p>${oneProductInCart.color}</p>
                            <p id="${oneProductInCart.id}${oneProductInCart.color}price">${product[i].price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : ${oneProductInCart.quantity}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id="${oneProductInCart.id}${oneProductInCart.color}" onchange="updateQuantity('${oneProductInCart.id}','${oneProductInCart.color}')" value="${oneProductInCart.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem" onclick="deleteProduct('${oneProductInCart.id}','${oneProductInCart.color}','${oneProductInCart.quantity}')">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`;

                //Transformation de l'élément allProducts(string) en document HTML
                const showAllProducts = parser.parseFromString(cartProducts, "text/html");
                //On affiche les différents éléments
                cart__items.appendChild(showAllProducts.body.firstChild);

            }
        });
    };
}










