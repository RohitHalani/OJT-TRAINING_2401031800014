const cartItems = [
      { id: 1, name: "Vintage Jacket", price: 89.99, qty: 1 },
      { id: 2, name: "Canvas Sneakers", price: 59.49, qty: 2 },
      { id: 3, name: "Leather Backpack", price: 120.00, qty: 1 },
    ];

    const cartContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const totalEl = document.getElementById("total");

    function renderCart() {
      cartContainer.innerHTML = "";

      if (cartItems.length === 0) {
        cartContainer.innerHTML = `
          <div class="empty-cart">
            <div class="fs-1 mb-3">🛍️</div>
            <p>Your cart is empty</p>
          </div>
        `;
        updateTotals();
        return;
      }

      cartItems.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "row align-items-center border-bottom py-3 mb-2";

        itemEl.innerHTML = `
          <div class="col-3 text-center">
            <div class="bg-light rounded-3 d-flex align-items-center justify-content-center" style="height:80px;">
              <span class="text-secondary fs-4">👜</span>
            </div>
          </div>

          <div class="col-6">
            <h6 class="mb-1 fw-semibold">${item.name}</h6>
            <p class="text-muted mb-2">$${item.price.toFixed(2)}</p>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, -1)">−</button>
              <span>${item.qty}</span>
              <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
          </div>

          <div class="col-3 text-end">
            <p class="fw-semibold mb-2">$${(item.price * item.qty).toFixed(2)}</p>
            <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${item.id})">
              Remove
            </button>
          </div>
        `;
        cartContainer.appendChild(itemEl);
      });

      updateTotals();
    }

    function updateTotals() {
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      const tax = subtotal * 0.08;
      const total = subtotal + tax;
      subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
      taxEl.textContent = `$${tax.toFixed(2)}`;
      totalEl.textContent = `$${total.toFixed(2)}`;
    }

    function changeQty(id, delta) {
      const item = cartItems.find(i => i.id === id);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) removeItem(id);
      renderCart();
    }

    function removeItem(id) {
      const index = cartItems.findIndex(i => i.id === id);
      if (index !== -1) cartItems.splice(index, 1);
      renderCart();
    }

    renderCart();