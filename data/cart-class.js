import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";

class Cart {
  cartItems;
  #localStorageKey;

  // Setup code for various instances
  constructor(key) {
    // Setting the localStorage Key which is initially undefined. 
    this.#localStorageKey = key;
     
    // Loading Generated objects from localStorage. 
    this.#loadFromLocalStorage();
  }

  #loadFromLocalStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    // Checking if product is already found in cart using productName.
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      } // If an item is found, returns a truthy value which is passed to matchingItem variable.  
    });

    //Getting selected quantity from the dropdown list for this product. 
    const selectedItemQuantityElement = document.querySelector(`.js-quantity-selector-${productId}`);

    let selectedQuantity = Number(selectedItemQuantityElement.value);

    if (selectedItemQuantityElement === null) {
      selectedQuantity = 1
    }

    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: selectedQuantity,
        deliveryOptionId: '1'
      });
    }
    // Saving cart to localStorage after update. 
    this.saveToStorage();
  }
  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach(cartItem => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    //Saving cart to localStorage after update. 
    this.saveToStorage();
  }

  // Update cart quantity both in localStorage and on the page.
  updateCartQuantity() {
    let newCartQuantity = 0; //reset cart quantity to 0 before recalculating

    this.cartItems.forEach((cartItem) => {
      newCartQuantity += cartItem.quantity;
    });

    // Update display
    const newCartQuantityElement = document.querySelectorAll('.js-cart-quantity');
    newCartQuantityElement.forEach((item) => {
      item.innerHTML = newCartQuantity;
    });

    this.saveToStorage();
  }

  // Handling delivery options update.
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    // Saving cart to localStorage after update. 
    this.saveToStorage();
  }

  handlingSaveClick(savelink) {
    const productContainer = savelink.closest('.cart-item-container');
    const productId = productContainer.querySelector('.js-update-link').dataset.productId;
    const inputQuantityElement = productContainer.querySelector('.update-quantity-input')
    const currentQuantity = productContainer.querySelector('.quantity-label')
    const updateLink = productContainer.querySelector('.js-update-link');

    const newQuantity = Number(inputQuantityElement.value);

    // Update Display
    currentQuantity.textContent = newQuantity;

    //Save data to Cart.
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });

    // Saving to localStorage
    this.saveToStorage();
    // Recalculate and update tools
    updateCartQuantity();
    renderPaymentSummary();

    // Toggle back to view mode
    inputQuantityElement.classList.remove('is-editing-quantity');
    savelink.classList.remove('is-editing-quantity');
    currentQuantity.classList.remove('update-onclick');
    updateLink.classList.remove('update-onclick');
  }
}

// Generating the objects (Instance of the Class - Cart ). 
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);






