function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wrapper = document.getElementById("cart-wrapper");
    let total = 0;

    if (cart.length === 0) {
        wrapper.innerHTML = "<p style='text-align:center;font-size:18px'>Giỏ hàng đang trống 😢</p>";
        document.getElementById("total-price").innerText = 0;
        return;
    }

    let html = "";

    cart.forEach((item, index) => {
        let sum = item.price * item.quantity;
        total += sum;

        html += `
        <div class="cart-item">
            <img src="${item.image}" width="120">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>${item.price.toLocaleString()} đ</p>
                <div class="qty">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
            <div class="cart-price">${sum.toLocaleString()} đ</div>
            <div class="remove" onclick="removeItem(${index})">✖</div>
        </div>
        `;
    });

    wrapper.innerHTML = html;
    document.getElementById("total-price").innerText = total.toLocaleString();
}

function changeQty(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    alert("Thanh toán thành công ❤️");
    localStorage.removeItem("cart");
    loadCart();
}

loadCart();
