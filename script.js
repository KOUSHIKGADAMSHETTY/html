let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total-price");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
            ${item.name} - $${item.price} x 
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            = $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${index})">Remove from Cart</button>
        `;
        cartItemsContainer.appendChild(li);
    });

    cartCount.textContent = cart.length;
    totalPriceElement.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, name, price) {
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCartUI();
}

function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("hidden");
}

updateCartUI();
