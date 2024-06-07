const bigImage = document.querySelector('.big-image');
const smallImage = document.querySelectorAll('.small-img');

smallImage[0].onclick = function(){
    bigImage.src = smallImage[0].src;
}
smallImage[1].onclick = function(){
    bigImage.src = smallImage[1].src;
}
smallImage[2].onclick = function(){
    bigImage.src = smallImage[2].src;
}
smallImage[3].onclick = function(){
    bigImage.src = smallImage[3].src;
}


// let currentImage = 0;
// bigImage = smallImage[currentImage];

// smallImage.forEach((item, i) =>{
//     item.addEventListener('click', () => {
//         smallImage[currentImage].classList.remove('first-img');

//         item.classList.add('first-img');
//         bigImage.style.backgroundImage = `url('${item.src}')`;
//         currentImage = i;
//     })
// })

// let All_rating_stars = [...document.querySelectorAll('.review-star')];
// console.log(All_rating_stars);
// All_rating_stars.map((star, index) => {
//     star.addEventListener('click', () => {
//         for(let i = 0; i < 5; i++){
//             if(i <= index){
//                 All_rating_stars[i].src = '../images/filled star.png';
//             }else{
//                 All_rating_stars[i].src = '../images/no fill star.png';

//             }
//         }
//     })
// })


// product-detail page setting 

let productName = document.querySelector('.product-name');
let shortDes = document.querySelector('.short-des');
let price = document.querySelector('.product-price');
let detailDes = document.querySelector('.des-area');
let productImage = document.querySelector('.big-image');
let title = document.querySelector('title');

let cartBtn = document.querySelector('.cart-btn');

// let user = JSON.parse(sessionStorage.user || null);

const setData = (data) => {
    productName.innerHTML = title.innerHTML = data.name;
    productImage.src = data.image;
    shortDes.innerHTML = data.shortDes;
    price.innerHTML = `&#8377; ${data.price}`;
    detailDes.innerHTML = data.detailDes;

    cartBtn.addEventListener('click', () => {
        if(user == null){
            location.href="/login";
        }
        cartBtn.innerHTML = add_product_to_cart(data);
    })

}

const fetchProductData = () => {
    fetch('/get-products', {
                method: 'post',
                headers: new Headers({'Content-Type' : 'application/json'}),
                body: JSON.stringify({id: productId})
            }).then(res => res.json())
            .then(data => {
                setData(data)
                getProducts(data.tags[0]).then(res => createProductCards(res, 'similar products', '.best-selling-products'))
            })
            .catch(err =>{
                console.log(err)
                alert('no product found');
                location.replace('/404');
            })
}

let productId = null;
if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}