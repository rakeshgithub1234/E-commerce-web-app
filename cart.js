const createSmallCards = (data) => {
    return `
        <div class="cart-row">
            <div class="cart-product-img-container">
                <img src="${data.image}" alt="" class="cart-product-thumb">
                <i class="fa-solid fa-xmark cart-cancel-btn"></i>
            </div>
            <div class="card-product-details">
                <h2 class="cart-product-name">${data.name}</h2>
                <p class="cart-product-short-des">${data.shortDes}</p>
            </div>
            <div class="cart-product-quantity-box">
                <button class="decrease-btn">-</button>
                <p class="cart-quantity-num">${data.item}</p>                
                <button class="increase-btn">+</button>
            </div>
            <span class="card-product-price" data-price="${data.price}">&#8377; ${data.price * data.item}</span>
        </div>
    `
}
 
let totalBill = 0;

const setCartProducts = () => {
    const cartContainer = document.querySelector('.cart-product-side');

    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart == null || !cart.length){
        cartContainer.innerHTML += `<img src="images/empty cart.jpg" alt="" class="cart-empty-img">`;
    }else{
        for(let i = 0; i < cart.length; i++){
            cartContainer.innerHTML += createSmallCards(cart[i]);
            totalBill += Number(cart[i].price * cart[i].item);

            updateBill();
        }
    }
    setupCardEvents();
    
}


const updateBill = () => {
    // updateNavCartCounter();
    let billPrice = document.querySelector('.total-amount');
    billPrice.innerHTML = `&#8377; ${totalBill}`;
}

const setupCardEvents = () => {
    // setup counter event
    const counterMinus = document.querySelectorAll('.cart-product-quantity-box .decrease-btn');
    const counterPlus = document.querySelectorAll('.cart-product-quantity-box .increase-btn');
    const counts = document.querySelectorAll('.cart-product-quantity-box .cart-quantity-num');
    const price = document.querySelectorAll('.card-product-price');
    const deleteBtn = document.querySelectorAll('.cart-product-img-container .cart-cancel-btn');

    let product = JSON.parse(localStorage.getItem('cart'));

    counts.forEach((item, i) => {
        let cost = Number(price[i].getAttribute("data-price"));

        counterMinus[i].addEventListener('click', () => {
            if(item.innerHTML > 1){
                item.innerHTML--;
                totalBill -= cost;
                updateBill();
                price[i].innerHTML = `&#8377; ${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem('cart', JSON.stringify(product));
            }
        })
        counterPlus[i].addEventListener('click', () => {
            if(item.innerHTML < 9){
                item.innerHTML++;
                totalBill += cost;
                updateBill();
                price[i].innerHTML = `&#8377; ${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem('cart', JSON.stringify(product));
            }
        })

    })

    deleteBtn.forEach((item, i) => {
        item.addEventListener('click', () => {
            product = product.filter((data, index) => index != i);
            localStorage.setItem('cart', JSON.stringify(product))
            location.reload();
        })
    })
}


setCartProducts();