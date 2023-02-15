const url_parameters = new URLSearchParams(window.location.search);
// get permet de lier une propriété d'un objet à une fonction

document.querySelector("#orderId").innerText = url_parameters.get("id");;
