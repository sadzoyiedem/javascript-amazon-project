//Products information is being save in an array as a list in a different file "./data/products.js".

//Generating the various HTml to place on the page. 
let productsHTML = '';

products.forEach((products) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${products.priceCents / 100}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${products.id}">
            Add to Cart
          </button>
        </div>
  `
});

// Placing the generated Html in JS on the webpage. 
const productsGridElement = document.getElementById('products-grid');
productsGridElement.innerHTML = productsHTML;

// Add product to cart on clicking the add-to-cart button.
document.querySelectorAll('.add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      // Checking if product is already found in cart using productName.
      let matchingitem;

      cart.forEach((item) => {
        if (item.productId === productId) {
          matchingitem = item;
        } 
      });

      if (matchingitem) {
        matchingitem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1
        });
      }
      
      // cart.push({
      //   productName: productName,
      //   quantity: 1
      // });
      console.log(cart);
    });
  });

