// Search_Bar_Container = document.querySelector('.header1 .search-bar-container');

// document.querySelector('#search-icon').onclick = () =>{
//     Search_Bar_Container.classList.toggle('active');
// }

let search = document.querySelector("#search-icon");
search.onclick = function(){
    document.querySelector(".header1 .search-bar-container").classList.toogle('active');
}



const header_2 = document.querySelector('.header2');

window.addEventListener('scroll', () => {
    if(scrollY >= 80){
        header_2.classList.add('fixed-header');
    }else{
        header_2.classList.remove('fixed-header');
    }
})




// let nav_links_explorer = document.querySelector('.nav-links-explorer');

// nav_links_explorer.onclick = function() {
//     document.querySelector('.header-container .header2').classList.toggle('active');
// }

function link_explorer() {
    document.getElementById('header2').style.display = "flex";
}



// js for product slider 

const product_cards = [...document.querySelectorAll(".product-slider-container")];
const pre_btn = [...document.querySelectorAll(".pre-btn")];
const next_btn = [...document.querySelectorAll(".next-btn")];

product_cards.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    next_btn[i].addEventListener('click', () => {
        item.scrollleft += containerWidth;
    })

    pre_btn[i].addEventListener('click', () => {
        item.scrollleft -= containerWidth;
    })
})



// const wishlistBtn = document.getElementsByClassName('.wishlist-btn');
// let heartIcon = document.getElementsByClassName('.heart-icon');    
// let clicked = false;

// wishlistBtn.addEventListener("click", () => {
//     if (!clicked){
//         clicked = true;
//         heartIcon.innerHTML = `<i class="fa-solid fa-heart"></i>`;
//     }else{
//         clicked = false;
//         heartIcon.innerHTML = `<i class="fa-regular fa-heart"></i>`;
//     }
// });



const wishlistBtn = document.querySelectorAll('.wishlist-btn');
const heartIcon = document.querySelectorAll('.heart-icon');    
let clicked = false;
for (let i=0; i<wishlistBtn.length; i++){
    wishlistBtn[i].addEventListener("click", () => {
        if (!clicked){
            clicked = true;
            for (let i=0; i<heartIcon.length; i++){
                heartIcon[i].innerHTML = `<i class="fa-solid fa-heart"></i>`;
            }
        }else{
            clicked = false;
            for (let i=0; i<heartIcon.length; i++){
                heartIcon[i].innerHTML = `<i class="fa-regular fa-heart"></i>`;
            }
        }
    });
}






// alert("hello rakesh");