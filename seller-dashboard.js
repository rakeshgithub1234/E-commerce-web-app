let user = JSON.parse(sessionStorage.user || null);
if(user == null){
    location.replace('/login');
}else if(!user.seller){
    location.replace('/seller');
}

let greetings = document.querySelector('.greetings');
greetings.innerHTML = greetings.innerHTML + user.name;



let pageLoader = document.querySelector('.loader');
let no_product_img = document.querySelector('.no-products-img');

pageLoader.style.display = "block";

const setupProducts = () => {
    fetch('/get-products', {
        method:'post',
        headers: new Headers({'Content-Type' : 'application/json'}),
        body: JSON.stringify({email: user.email})
    })
    .then(res => res.json())
    .then(data => {
        pageLoader.style.display = "none";
        if(data == 'no products'){
            no_product_img.style.display = "block";
        }else{
            data.forEach(product => creatProduct(product));
        }
    })
}

setupProducts();
