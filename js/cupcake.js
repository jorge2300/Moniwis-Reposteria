   // Función para abrir el modal con los detalles del pastel
   function openModal(title, imageSrc, ingredients, sizes) {
    const modal = document.getElementById('pastelModal');
    document.getElementById('modalPastelTitle').textContent = title;
    document.getElementById('modalPastelImage').src = imageSrc;
    document.getElementById('modalPastelImage').alt = title;
    const menuToggle = document.getElementById("menu-toggle");
    const sideMenu = document.getElementById("side-menu");
    const closeMenu = document.getElementById("close-menu");
    


    menuToggle.addEventListener("click", () => {
        sideMenu.classList.add("open");
      });
    
      closeMenu.addEventListener("click", () => {
        sideMenu.classList.remove("open");
      });


    // Mostrar ingredientes
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = '';
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Mostrar tamaños y precios
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = '';
    sizes.forEach(size => {
        const div = document.createElement('div');
        div.className = 'size-option';
        div.innerHTML = `
            <span class="size">${size.size}</span>
            <span class="persons">${size.persons}</span>
            <span class="price">${size.price}</span>
        `;
        sizeOptions.appendChild(div);
    });
    
    // Calcular rango de precios
    const minPrice = sizes[0].price;
    const maxPrice = sizes[sizes.length - 1].price;
    document.getElementById('modalPriceRange').textContent = `${minPrice} – ${maxPrice}`;
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('pastelModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById('pastelModal');
    if (event.target == modal) {
        closeModal();
    }
}