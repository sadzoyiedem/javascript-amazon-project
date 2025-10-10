import { cart, removeFromCart, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";
/*
console.log(localStorage.getItem('cart')); 
const today = dayjs();
const deliveryDate = today.add(7, 'day');
console.log(deliveryDate.format('dddd, MMMM D'));
*/
// Initial call to set the cart count when the page loads
updateCartQuantity();
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
    if (product.id === productId) {
      matchingProduct = product // matchingProduct is now an array. 
    }
  });
  // console.log(matchingProduct);

  const deliveryOptionId = cartItem.deliveryOptionId;
  // Getting the delivery option selected for this cart item.
  let deliveryOption;
  // Looping through deliveryOptions array to find the option that matches the deliveryOptionId for this cart item.   
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  console.log(deliveryOption);  
  // Getting deliveryDate using dayjs library.
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    console.log(dateString);

  cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
            <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
              Update
            </span>
            <input type= "number" class = "update-quantity-input">
            <span class = "link-primary"> Save </span> 
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionHtml(matchingProduct, cartItem)}    
        </div>
      </div>
    </div>
  `;
});

// Generating delivery options HTML.
function deliveryOptionHtml(matchingProduct, cartItem) {
  let deliveryOptionsHTML = '';

  deliveryOptions.forEach((deliveryOption) => {
    // Getting deliveryDate using dayjs library.
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    // Getting the Pricing for each delivery option.
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    //Checking if the delivery option is the one selected for this cart item.
    const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

    deliveryOptionsHTML +=
      `
        <div class="delivery-option">
          <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input" 
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
  });
  return deliveryOptionsHTML;
}

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
      updateCartQuantity();
    });
  });

// Handling update link clicks.
document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      console.log(productId);
    });
  });
