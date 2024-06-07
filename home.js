// get product functions

// let productId = null;
const getProducts = (tag) => {
    return fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({tag: tag})
    })
    .then(res => res.json())
    .then(data => {
        return data
    })
}

const createProductCards = (data, title, ele) => {
        let container = document.querySelector(ele);
        container.innerHTML += `
            <h2 class="section-heading">${title}</h2>
            <div class="product-cards">
                ${createCards(data)}
            </div>
        
        `;
}

const createCards = data => {
    let cards = '';

    data.forEach(item => {
        // if(item.id != productId){
            cards += `
            <div class="A-card">
                    <div class="product-image">
                        <span class="offer-tag">50% off</span>
                        <button class="cart-btn">Add to Cart</button>
                        <img src="${item.image}" onclick="location.href = '/product-detail/${item.id}'" alt="sorry" class="product-thumb">
                    </div>
                    <div class="product-info">
                        <h2 class="product-category">${item.name}</h2>
                        <span class="price">&#8377;${item.price}</span> <span class="actual-price">$45</span>
                        <button class="wishlist-btn"><span class="heart-icon"><i class="fa-regular fa-heart"></i></span></button>
                    </div>
                </div>
            `
        // }
    })
    return cards;
}


// cart function

const add_product_to_cart = product => {
    // updateNavCartCounter();
    let cart = JSON.parse(localStorage.getItem('cart'));

    if(cart == null){
        cart = []
    }

    product = {
        item: 1,
        name: product.name,
        price: product.price,
        shortDes: product.shortDes,
        image: product.image
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    return 'added';
}