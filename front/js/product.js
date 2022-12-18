// Récupérer l'id du produit
const url_current = window.location.search;
const url_parameters = new URLSearchParams(url_current);
const product_id = url_parameters.get("id");

// console.log(url_parameters);

// Récupérer les données du produit grâce à son id
fetch(`http://localhost:3000/api/products/${product_id}`)
    .then(response => response.json())
    .then(product => {
        createProducts(product);
        // console.log(products)
        
    })

function createProducts(sofa){
    const { altTxt, colors, description, imageUrl, name, price, _id } = sofa;
    productImg(imageUrl, altTxt);
}

function productImg(imageUrl, altTxt) {
    let productElement = document.createElement('img')
    productElement.setAttribute("src", imageUrl);
    productElement.setAttribute("alt", altTxt);

    document.querySelector(".item__img").appendChild(productElement);
}
