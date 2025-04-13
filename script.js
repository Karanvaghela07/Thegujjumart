// Product Data (Different Categories)
const products = [
    { name: "Lays Chips", image: "assets/images/lays_1.jpeg", category: "Snacks & Chips" },
    { name: "Doritos", image: "assets/images/doritos.jpeg", category: "Snacks & Chips" },
    { name: "Munch", price: 40, image: "assets/images/munch_chocolate.jpeg", category: "Chocolates" },
    { name: "Dairy Milk Bubbly", price: 100, image: "assets/images/darymilk_bubbly.jpeg", category: "Chocolates" },
    { name: "Coca Cola", price: 30, image: "assets/images/coca.jpeg", category: "Drinks" },
    { name: "Pepsi", price: 30, image: "assets/images/pepsi.jpeg", category: "Drinks" },
    { name: "Arizona Drink", price: 80, image: "assets/images/arizona_drink.jpeg", category: "Drinks" },
    { name: "Mazza", price: 35, image: "assets/images/mazza.jpeg", category: "Drinks" },
    { name: "Red Bull", price: 150, image: "assets/images/redbull_1.jpeg", category: "Drinks" },
    { name: "Starbucks Drink", price: 250, image: "assets/images/starbucks_drink.jpeg", category: "Drinks" },
    { name: "Pringles Chips", price: 120, image: "assets/images/pringles_2.jpeg", category: "Snacks & Chips" },
    { name: "Takis Chips", price: 90, image: "assets/images/takis_chips.jpeg", category: "Snacks & Chips" },
    { name: "Bhavnagari Gathiya", price: 60, image: "assets/images/bhavnagari_ghatiya.jpeg", category: "Gujarati" },
    { name: "Dry Kachori", price: 70, image: "assets/images/dry_kachori.jpeg", category: "Gujarati" },
    { name: "Farali Chevdo", price: 55, image: "assets/images/farali_chevdo.jpeg", category: "Gujarati" },
    { name: "Jeera Khakhra", price: 45, image: "assets/images/jeera_khakhra.jpeg", category: "Gujarati" },
    { name: "Methi Khakhra", price: 45, image: "assets/images/methi_khakhra.jpeg", category: "Gujarati" },
    { name: "Nylon Fafda", price: 60, image: "assets/images/nylon_fafda.jpg", category: "Gujarati" },
    { name: "Ratlam Sev", price: 55, image: "assets/images/ratlami_sev.jpeg", category: "Snacks & Chips" },
    { name: "Sev Mamra", price: 40, image: "assets/images/sev_mamra.jpeg", category: "Gujarati" },
    { name: "Dal Masala", price: 40, image: "assets/images/dal_masala.jpeg", category: "Gujarati" },
    { name: "Kadhi Masala", price: 50, image: "assets/images/kadhi_masala.jpeg", category: "Gujarati" },
    { name: "Red Bull", price:150, image: "assets/images/redbull_2.jpeg", category: "Drinks" },
    { name: "Red Bull", price:150, image: "assets/images/redbull_3.jpeg", category: "Drinks" },
    { name: "Indori Mix", price: 50, image: "assets/images/indori_mix.jpg", category: "Gujarati" },
    { name: "Gathiya", price: 50, image: "assets/images/julelal_gathiya.jpg", category: "Gujarati" },
    { name: "Madhuvan Mix", price: 50, image: "assets/images/madhuvan_mix.jpg", category: "Gujarati" },
    { name: "Madrasi Mix", price: 50, image: "assets/images/madrasi_mix.jpg", category: "Gujarati" },
    { name: "Nylon Sev", price: 50, image: "assets/images/nylon_sev.jpg", category: "Gujarati" },
    { name: "Papad Chivda", price: 50, image: "assets/images/papad_chivda.jpg", category: "Gujarati" },



];

// Cart Data
let cart = [];

// Function to Display Products
function displayProducts(filter = "all") {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear previous content

    let filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
        `;

        productList.appendChild(productCard);
    });
}

// Function to Add Products to Cart
function addToCart(name, price, image) {
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    updateCartUI();
}

// Function to Update Cart UI
function updateCartUI() {
    document.getElementById("cart-count").innerText = cart.length;
    const cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = ""; // Clear previous cart list

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <p>${item.name} (x${item.quantity})</p>
                <p>₹${item.price * item.quantity}</p>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
        cartItemsList.appendChild(cartItem);
    });
}

// Function to Remove Items from Cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

// Search Function
function searchProducts() {
    let searchQuery = document.getElementById("searchBox").value.toLowerCase();

    let filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery)
    );

    displayFilteredProducts(filteredProducts);
}

// Function to Display Filtered Products
function displayFilteredProducts(filteredProducts) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear previous content

    filteredProducts.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price}', '${product.image}')">Add to Cart</button>
        `;

        productList.appendChild(productCard);
    });
}

// Filter Function
function filterCategory(category) {
    displayProducts(category);

    // Auto-scroll to product section when a category is selected
    document.getElementById("product-list").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Initialize Product Display
displayProducts();

// Auto-scroll for Cart Slider
document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".cart-slider");
    let scrollAmount = 0;
    const scrollStep = 250; // Adjusted for bigger boxes
    const intervalTime = 1500; // 1.5 seconds
  
    function autoScroll() {
        if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
            scrollAmount = 0; // Reset to start
        } else {
            scrollAmount += scrollStep;
        }
        slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  
    setInterval(autoScroll, intervalTime);
});
const text = "Cravings collide with flavor in every bite";
    let index = 0;
    const speed = 50; // Typing speed in milliseconds

    function typeText() {
        if (index < text.length) {
            let currentChar = text.charAt(index);

            // Insert a <br> after "with"
            if (index === 21) {  // 21 is the position after "with"
                document.getElementById("animated-text").innerHTML += "<br>";
            }

            document.getElementById("animated-text").innerHTML += currentChar;
            index++;
            setTimeout(typeText, speed);
        }
    }

    window.onload = function () {
        typeText();
    };
