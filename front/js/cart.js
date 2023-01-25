let productArray = JSON.parse(localStorage.getItem("product"));
if (localStorage.length === 0 || productArray.length === 0) {
    document.querySelector('#cart__items').innerHTML = "Votre panier est vide";
} else {

    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(product => {
            // console.table(product);

        })
}
