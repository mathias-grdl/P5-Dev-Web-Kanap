const Cart = []
// numberProductObject()


// récupération des products dans le cart
function numberProductObject() {
    // console.log(numberProducts); pb avec les erreurs
    const numberProducts = localStorage.length
    for (let i = 0; i <= numberProducts; i++) {
        const products = localStorage.getItem(localStorage.key(i));
        const productObject = JSON.parse(products); //passage de string à objet
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/push
        Cart.push(productObject)
        // console.log(i, product, productObject); 
    }
}

