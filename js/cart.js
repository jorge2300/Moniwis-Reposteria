// Carrito de compras
document.addEventListener("DOMContentLoaded", function() {
    const cartToggle = document.getElementById("cart-toggle");
    const cartSidebar = document.getElementById("cart-sidebar");
    const closeCart = document.getElementById("close-cart");
    const cartOverlay = document.createElement("div");
    cartOverlay.className = "cart-overlay";
    document.body.appendChild(cartOverlay);
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Abrir/cerrar carrito
    cartToggle.addEventListener("click", function() {
        cartSidebar.classList.add("open");
        cartOverlay.classList.add("active");
    });
    
    closeCart.addEventListener("click", function() {
        cartSidebar.classList.remove("open");
        cartOverlay.classList.remove("active");
    });
    
    cartOverlay.addEventListener("click", function() {
        cartSidebar.classList.remove("open");
        cartOverlay.classList.remove("active");
    });
    
    // Actualizar carrito
    function updateCart() {
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        const cartCount = document.querySelector(".cart-count");
        
        cartItems.innerHTML = "";
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price;
            
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-remove" onclick="removeFromCart(${index})">Eliminar</div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    
    // Función global para agregar al carrito
    window.addToCart = function(name, price, image) {
        cart.push({ name, price, image });
        updateCart();
        
        // Mostrar notificación
        const notification = document.createElement("div");
        notification.className = "cart-notification";
        notification.textContent = "¡Producto agregado al carrito!";
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    };
    
    // Función global para eliminar del carrito
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCart();
    };
    














    // Botón de finalizar compra
document.getElementById("checkout-btn").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    
    // Mostrar formulario de pedido
    document.getElementById("checkout-modal").classList.add("active");
});

// Cerrar formulario de pedido
document.getElementById("close-checkout").addEventListener("click", function() {
    document.getElementById("checkout-modal").classList.remove("active");
});


// Enviar formulario de pedido
document.getElementById("order-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const customerName = document.getElementById("customer-name").value;
    const deliveryDate = document.getElementById("delivery-date").value;
    const deliveryAddress = document.getElementById("delivery-address").value;
    const customerPhone = document.getElementById("customer-phone").value;
    const specialNotes = document.getElementById("special-notes").value;
    
    // Formatear fecha
    const formattedDate = deliveryDate ? new Date(deliveryDate).toLocaleDateString('es-MX') : "No especificada";
    
    // Crear mensaje para WhatsApp
    let message = `¡Hola! Quiero hacer un pedido:\n\n`;
    message += `A nombre de: ${customerName}\n\n`;
    
    let total = 0;
    cart.forEach(item => {
        message += `• ${item.name}: $${item.price.toFixed(2)}\n`;
        total += item.price;
    });
    
    message += `\nTotal: $${total.toFixed(2)} + Envío\n\n`;
    message += `Mi dirección es: ${deliveryAddress}\n`;
    message += `Fecha requerida: ${formattedDate}\n`;
    message += `Teléfono de contacto: ${customerPhone}\n`;
 
    
    
    if (specialNotes) {
        message += `\nNotas adicionales: ${specialNotes}\n`;
    }
    
    message += `\nPor favor, confírmenme la disponibilidad. ¡Gracias!`;
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5218341421734?text=${encodedMessage}`, "_blank");
    
    // Cerrar formulario y carrito
    document.getElementById("checkout-modal").classList.remove("active");
    document.getElementById("cart-sidebar").classList.remove("open");
    document.querySelector(".cart-overlay").classList.remove("active");
    
    // Vaciar carrito después de enviar
    cart = [];
    updateCart();
    
    // Resetear formulario
    document.getElementById("order-form").reset();
});

    
    // Actualizar carrito al cargar la página
    updateCart();
});

