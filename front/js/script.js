// https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web
fetch("http://localhost:3000/api/products")
    .then ((res) => res.json())
