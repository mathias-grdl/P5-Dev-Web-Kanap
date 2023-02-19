// Récupération de l'orderId dans l'URL
const url_parameters = new URLSearchParams(window.location.search);
document.querySelector("#orderId").innerText = url_parameters.get("id");
