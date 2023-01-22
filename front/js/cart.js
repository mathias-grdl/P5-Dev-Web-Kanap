let existingCart = JSON.parse(localStorage.getItem("product"));

if (localStorage.length === 0 || existingCart.length === 0) {
    document.querySelector('h1').innerHTML = "Votre panier est vide";
} else {

    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(data => {



        })
}

