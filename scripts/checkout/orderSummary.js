import { cart, removeFromCart, updateCartQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products,getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary() {
  // Initial call to set the cart count when the page loads
  updateCartQuantity();

  // Setting up HTML for each product in the cart.
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    // console.log(matchingProduct);

    // Getting the delivery option selected for this cart item.
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    // deliveryOptions.forEach((option) => {
    //   if (option.id === deliveryOptionId) {
    //     deliveryOption = option;
    //   }
    // });
    // console.log(deliveryOption);

    // Getting deliveryDate using dayjs library.
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    console.log(dateString);

    // Generating the HTML for products in the cart. 
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

  // Generating delivery options HTML.[Function here!]
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

      //Updating HTML
      deliveryOptionsHTML +=
        `
          <div class="delivery-option js-delivery-option" 
          data-product-id = "${matchingProduct.id}"
          data-delivery-option-id = "${deliveryOption.id}">
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

  //Rendering the page with genreate HTML. 
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
        
        renderPaymentSummary();

        // Recalculate and update cart count after an item is removed.
        updateCartQuantity();
      });
    });

  // Handling update link clicks.
  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        // console.log(productId);
      });
    });

  // Handling delivery option changes.
  document.querySelectorAll('.js-delivery-option')
    .forEach((optionElement) => {
      optionElement.addEventListener('click', () => {
        const { productId, deliveryOptionId } = optionElement.dataset;//Shorthand Property. 
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}

