export const cart = [];

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
}