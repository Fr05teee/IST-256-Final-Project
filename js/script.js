const cart = [];

// Load Products from JSON
document.addEventListener("DOMContentLoaded", () => {
    fetch('js/products.json')
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Error loading products:', error));
});

// Display Products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 mb-4';
        productCard.innerHTML = `
            <div class="card h-100 product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <h6>${product.price}</h6>
                    <button class="btn btn-success mt-auto" onclick="addToCart('${product.name}', '${product.price}')">Add to Loot</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Add to Cart and Toast
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCartSummary();

    const toast = new bootstrap.Toast(document.getElementById('toast'));
    toast.show();
}

// Update Cart Summary in Checkout
function updateCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    cartSummary.innerHTML = '';

    if (cart.length === 0) {
        cartSummary.innerHTML = '<li class="list-group-item text-center">No items yet.</li>';
        return;
    }

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            ${item.name}
            <span class="badge bg-success rounded-pill">${item.price}</span>
        `;
        cartSummary.appendChild(listItem);
    });
}

// Load New Games for Carousel
fetch('js/newGames.json')
    .then(response => response.json())
    .then(games => {
        const carouselInner = document.getElementById('carousel-inner');
        games.forEach((game, index) => {
            const item = document.createElement('div');
            item.className = `carousel-item${index === 0 ? ' active' : ''}`;
            item.innerHTML = `
                <img src="${game.image}" class="d-block w-100" alt="${game.title}" style="height: 450px; object-fit: cover;">
                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded">
                  <h5>${game.title}</h5>
                  <p>${game.description}</p>
                </div>
            `;
            carouselInner.appendChild(item);
        });
    })
    .catch(err => console.error('Failed to load new games:', err));

// Load Ads from ads.json
let ads = [];

fetch('js/ads.json')
    .then(response => response.json())
    .then(data => {
        ads = data;
    })
    .catch(error => console.error('Failed to load ads:', error));


// Popup Random Ad Every 10 Seconds
setInterval(() => {
    if (ads.length === 0) return; // If ads didn't load yet, skip

    const randomAd = ads[Math.floor(Math.random() * ads.length)];

    // Update modal content
    document.getElementById('adModalLabel').textContent = randomAd.title;
    document.querySelector('#adModal .modal-body p').textContent = randomAd.message;
    document.querySelector('#adModal .modal-body img').src = randomAd.image;
    document.querySelector('#adModal .modal-body img').alt = randomAd.title;
    document.querySelector('#adModal .modal-body a').href = randomAd.link;
    document.querySelector('#adModal .modal-body a').textContent = randomAd.buttonText;

    const adModal = new bootstrap.Modal(document.getElementById('adModal'));
    adModal.show();
}, 10000);


