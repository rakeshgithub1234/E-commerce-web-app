// make toggle user icon 

let userIcon = document.querySelector('.user-icon');
let user_popup_box = document.querySelector('.user-popup-box');
let pageLoader = document.querySelector('.loader');

userIcon.addEventListener('click', () => user_popup_box.classList.toggle('active'));


let userNameText = document.querySelector('.user-name');
let userActionBtn = document.querySelector('.user-state');
let user = JSON.parse(sessionStorage.user || null);

if(user != null) {
    userNameText.innerHTML = `log in as, ${user.name}`;
    userActionBtn.innerHTML = `log out`;
    userActionBtn.addEventListener('click', () => logout());
}else{
    userNameText.innerHTML = `login to your account`;
    userActionBtn.innerHTML = `login`;
    userActionBtn.addEventListener('click', () => location.href = "/login");
}

const logout = () =>{
    sessionStorage.clear();
    localStorage.removeItem('cart');
    location.reload();
    pageLoader.style.display = "block";
}

// search box

let searchBtn = document.querySelector('.overall-search-btn');
let searchInput = document.querySelector('.overall-search-input');

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = `/search-page/${searchInput.value}`;
    }
})


// nav bar cart count 

const updateNavCartCounter = () => {
    let cartCounter = document.querySelector('.cart-count-num');

    let cartItem = JSON.parse(localStorage.getItem('cart'));

    if(cartItem == null){
        cartCounter.innerHTML = '00';
    }else{
        if(cartItem.length > 9){
            cartCounter.innerHTML = '9+';
        }else if(cartItem.length <= 9){
            cartCounter.innerHTML = `0${cartItem.length}`
        }
    }
}

updateNavCartCounter();