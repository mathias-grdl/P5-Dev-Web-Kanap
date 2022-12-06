// https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web

// https://www.youtube.com/watch?v=b0dPBK37-M8&t=790s


// Contact l'url et on récupère une promesse réponse (.then) -> response.json formate la réponse et nous fait une nouvelle promesse. Et on refait un .then pour récupérer le résultat.

fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(data => console.log(data));

