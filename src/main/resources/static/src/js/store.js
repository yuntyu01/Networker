// store.js

// Decrease  function
function decrease(button) {
    var input = button.parentElement.querySelector('.product-count');
    var currentValue = parseInt(input.value);
    if (currentValue > 0) {
        input.value = currentValue - 1;
    }
}

// Increase  function
function increase(button) {
    var input = button.parentElement.querySelector('.product-count');
    var currentValue = parseInt(input.value);
    input.value = currentValue + 1;
}

// Add to cart function
function addToCart(button) {
   
}
