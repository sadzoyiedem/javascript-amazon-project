export let cart = JSON.parse(localStorage.getItem('cart')); 
if (!cart) {
  [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1
    }
  ];
}
// Saving Cart to localStorage. 
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  // Checking if product is already found in cart using productName.
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    } // If an item is found, returns a truthy value which is passed to matchingItem variable.  
  });

  //Getting selected quantity from the dropdown list for this product. 
  const selectedItemQuantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const selectedQuantity = Number(selectedItemQuantityElement.value);

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity
    });
  }
  // Saving cart to localStorage after update. 
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach(cartItem => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart; 

  //Saving cart to localStorage after update. 
  saveToStorage();
}

// Displaying number of items in cart on the checkout page.


// Update cart quantity both in localStorage and on the page.
export  function updateCartQuantity() { 
  let newCartQuantity = 0; //reset cart quantity to 0 before recalculating

  cart.forEach((cartItem) => {
    newCartQuantity += cartItem.quantity;
  });
  
  // Update display
  const newCartQuantityElement = document.querySelector('.js-cart-quantity');
  newCartQuantityElement.innerHTML = newCartQuantity;
}