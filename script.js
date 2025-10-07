// Veg menu with images
const vegItems = [
  { name: "Veg Pulao", price: 89, img: "veg pulao.jpg" },
  { name: "Curd Rice", price: 59, img: "curd rice.jpg" },
  { name: "Paneer Rice", price: 119, img: "paneer rice.webp" },
  { name: "Paneer Biryani", price: 139, img: "paneer biryani.jpg" },
  { name: "Mushroom Biryani", price: 159, img: "mushroom biryani.jpg" },
  { name: "Pulihora", price: 79, img: "pulihora.jpg" },
  { name: "Full Meals", price: 99, img: "full meals.jpg" },
  { name: "Gobi fried Rice" , price: 139, img: "Gobi fried RIce.jpg"  },
];

// Non-Veg menu with imageshttps://i.imgur.com
const nonVegItems = [
  { name: "Chicken Biryani", price: 199, img: "Chicken Biryani.jpg" },
  { name: "Mutton Biryani", price: 349, img: "mutton biryani.jpg" },
  { name: "Chicken 65", price: 189, img: "chicken 65.jpg" },
  { name: "Chicken Curry", price: 125, img: "chicken curry.jpg" },
  { name: "Chicken Pulao", price: 169, img: "chicken pulao.jpg" },
  { name: "Mutton Curry (spicy)", price: 449, img: "Mutton curry (spicy).jpg" },
  { name: "Mutton Curry (Non-Spicy)", price: 189, img: "Mutton curry (non spicy).jpg" },
  { name: "Fish curry(spicy)", price: 139, img: "Fish curry (spicy).jpg"  },
];

let cart = [];
let orders = [];

// Buttons on Welcome Page
document.getElementById("continueBtn").addEventListener("click", showMenu);
document.getElementById("cartBtn").addEventListener("click", showCart);
document.getElementById("ordersBtn").addEventListener("click", showOrders);

function showLogin() {
  hideAllPages();
  document.getElementById("loginPage").style.display = "block";
}

function loginUser() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "" || pass === "") {
    alert("Please enter username and password!");
  } else {
    alert("Login Successful! Welcome " + user);
    backToWelcome();
  }
}

function showMenu() {
  hideAllPages();
  document.getElementById("menuPage").style.display = "block";
  loadMenuItems();
}

function showCart() {
  hideAllPages();
  document.getElementById("cartPage").style.display = "block";
  displayCart();
}

function showOrders() {
  hideAllPages();
  document.getElementById("ordersPage").style.display = "block";
  displayOrders();
}

function hideAllPages() {
  document.getElementById("welcomePage").style.display = "none";
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("menuPage").style.display = "none";
  document.getElementById("cartPage").style.display = "none";
  document.getElementById("ordersPage").style.display = "none";
}

function backToWelcome() {
  hideAllPages();
  document.getElementById("welcomePage").style.display = "block";
}

function loadMenuItems() {
  const vegContainer = document.getElementById("vegItems");
  const nonVegContainer = document.getElementById("nonVegItems");

  vegContainer.innerHTML = "";
  nonVegContainer.innerHTML = "";

  vegItems.forEach(item => {
    vegContainer.innerHTML += `
      <div class="menu-item">
        <img src="${item.img}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
      </div>`;
  });

  nonVegItems.forEach(item => {
    nonVegContainer.innerHTML += `
      <div class="menu-item">
        <img src="${item.img}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
      </div>`;
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  alert(`${name} added to cart`);
}

function goToCart() {
  hideAllPages();
  document.getElementById("cartPage").style.display = "block";
  displayCart();
}

function backToMenu() {
  hideAllPages();
  document.getElementById("menuPage").style.display = "block";
}

function displayCart() {
  const cartDiv = document.getElementById("cartItems");
  const totalDiv = document.getElementById("totalPrice");
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartDiv.innerHTML += `
      <div>
        ${item.name} - ₹${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>`;
  });

  totalDiv.innerText = `Total: ₹${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}

function placeOrder() {
  const address = document.getElementById("address").value.trim();
  if (address === "") {
    alert("Please enter delivery address");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  orders.push({ items: [...cart], address: address, date: new Date().toLocaleString() });
  alert("✅ Order placed successfully!\nYour food will be delivered to:\n" + address);
  cart = [];
  document.getElementById("address").value = "";
  backToWelcome();
}

function displayOrders() {
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";

  if (orders.length === 0) {
    orderList.innerHTML = "<p>No orders placed yet.</p>";
    return;
  }

  orders.forEach(order => {
    let itemsList = order.items.map(i => i.name + " (₹" + i.price + ")").join(", ");
    orderList.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px; border-radius:10px;">
        <p><b>Items:</b> ${itemsList}</p>
        <p><b>Address:</b> ${order.address}</p>
        <p><b>Date:</b> ${order.date}</p>
      </div>
    `;
  });
}
