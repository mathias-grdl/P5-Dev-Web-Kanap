// https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577591-recuperez-des-donnees-dun-service-web
// https://www.youtube.com/watch?v=b0dPBK37-M8&t=790s


// ========================================
// VERSION ULTRA COMMENTÉ
// ========================================

// Contact l'url et on récupère une promesse réponse (.then) -> response.json formate la réponse et nous fait une nouvelle promesse. Et on refait un .then pour récupérer le résultat.
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(products => {

        // products_section = la section où mettre les produits
            const products_section = document.getElementById("items");

          // boucle pour chaque indice (0,1...) que j'ai nommé 'Product' dans products (la data)
        for (let product of products) {
            // Création des éléments html avec insertion des données de l'api en dynamique

            //     Le HTML à recréer :
            //    <a href="./product.html?id=42">
            //       <article>
            //         <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
            //         <h3 class="productName">Kanap name1</h3>
            //         <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            //       </article>
            //     </a>

            // [START HTML]
            //======= a ======= 
            // la méthode document.createElement() crée un élément HTML du type spécifié par tagName
            let productLink = document.createElement('a');
            // Ajoute un nouvel attribut ou change la valeur d'un attribut existant pour l'élément spécifié. Element.setAttribute(name, value);
            productLink.setAttribute("href", `./product.html?id=${product._id}`);
            // Si l'enfant donné est une référence à un nœud existant dans le document, appendChild() le déplace de sa position actuelle vers une nouvelle position.
            // ProductLink est l'enfant de products_section
            products_section.appendChild(productLink);
            //======= =========

            //======= article =======
            let productArticle = document.createElement('article');
            // productArticle est l'enfant de ProductLink
            productLink.appendChild(productArticle);
            //======= =========

            //======= img =======
            let productImg = document.createElement('img');
            productImg.setAttribute("src", product.imageUrl);
            productImg.setAttribute("alt", product.altTxt);
            // ProductImg est l'enfant de productArticle
            productArticle.appendChild(productImg);
            //======= =========

            //======= h3 =======
            let productH3 = document.createElement('h3');
            productH3.setAttribute("class", "productName");
            productH3.innerText = product.name;
            // Node.innerText est une propriété représentant le contenu textuel « visuellement rendu »
            // productH3 est l'enfant de productArticle
            productArticle.appendChild(productH3);
            //======= =========

            //======= p =======
            let productDescription = document.createElement('p');
            productDescription.setAttribute("class", "productDescription");
            productDescription.innerText = product.description;
            // productDescription est l'enfant de productArticle
            productArticle.appendChild(productDescription);
            //======= =========

            // [END HTML]
        }
    })

