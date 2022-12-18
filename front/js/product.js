// Récupération de l'url / id actuelle
const url_current = window.location.search;
const url_parameters = new URLSearchParams(url_current);
const product_id = url_parameters.get("id");

// console.log(url_parameters);

fetch(`http://localhost:3000/api/products/${product_id}`)
    .then(response => response.json())
    .then(product => {
        createProducts(product);
        // console.log(products)
    })
