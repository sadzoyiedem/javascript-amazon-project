import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
// import { updateCartQuantity } from "./amazon.js";


// Displaying number of items in cart on the checkout page.
function updateCartCount() {
  let cartCount = 0; // reset cart count to 0 before recalculating
  cart.forEach((cartItem) => {
    cartCount += cartItem.quantity;
  }); 
  const cartCountElement = document.getElementById('checkout-cart-count');
  cartCountElement.innerHTML = `Checkout (${cartCount} items)`;
} 

// Initial call to set the cart count when the page loads
updateCartCount();

// Generating HTML for each product in the cart.
let cartSummaryHTML = '';
/*
  Looping through cart array in cart.js to find products in products.js
*/
cart.forEach((cartItem) => {
  // Set a variable to store the productId of the various cart-objects in the cart array. 
  const productId = cartItem.productId; 
  /* 
    Mapping the productId we have in the cart array to the product.id in the products array to get all the information inside the product object.
  */ 
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId){
      matchingProduct = product // matchingProduct is now an array. 
    }
  });

  console.log(matchingProduct); 
  cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.getElementById('order-summary')
  .innerHTML = cartSummaryHTML;

// Handling delete link clicks.
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const cartItemContainerElement = document.querySelector(`.js-cart-container-${productId}`);
      cartItemContainerElement.remove();
      
      // Recalculate and update cart count after an item is removed.
      updateCartCount();
      // updateCartQuantity();
    });
  });