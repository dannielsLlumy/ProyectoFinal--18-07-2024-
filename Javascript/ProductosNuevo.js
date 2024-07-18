document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const mensajeFinalizacion = document.getElementById('mensaje-finalizacion');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = parseFloat(button.getAttribute('data-price'));

            const cartItem = cart.find(item => item.product === product);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ product, price, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.classList.add('list-group-item');
            itemElement.innerHTML = `
                ${item.product} - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="btn btn-sm btn-danger float-end remove-from-cart">X</button>
            `;

            itemElement.querySelector('.remove-from-cart').addEventListener('click', () => {
                removeFromCart(item.product);
            });

            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotal.textContent = total.toFixed(2);
    }

    function removeFromCart(product) {
        const index = cart.findIndex(item => item.product === product);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCart();
            
        }
    }

    
    document.querySelector('.nav-link[data-bs-toggle="modal"]').addEventListener('click', () => {
        mensajeFinalizacion.textContent = '';
        cartModal.show();
    });

    document.getElementById('finalizar-compra-btn').addEventListener('click', () => {
        mensajeFinalizacion.textContent = '¡Muchas gracias por tu compra! Vuelve pronto.';

        cart.length = 0;
        updateCart();

        setTimeout(() => {
            cartModal.hide();
        }, 3000); 
    });
});
