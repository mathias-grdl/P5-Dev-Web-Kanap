const url_parameters = new URLSearchParams(window.location.search);
// get permet de lier une propriété d'un objet à une fonction
const orderId = url_parameters.get('orderId');

document.querySelector("#orderId").innerText = orderId;