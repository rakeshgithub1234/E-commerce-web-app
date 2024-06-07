

let user = JSON.parse(sessionStorage.user || null);

window.onload = () => {
    if(user == null){
        location.replace('/login');
    }
}

let editable_contents = [...document.querySelectorAll('*[contenteditable="true"]')];

editable_contents.map((element) => {        // targeting each editable contents using loop
    let placeholder = element.getAttribute('data-placeholder');
    element.innerHTML = placeholder;

    element.addEventListener('focus', () => {
        if(element.innerHTML === placeholder){
            element.innerHTML = '';
        }
    })

    element.addEventListener('focusout', () => {
        if(!element.innerHTML.length){
            element.innerHTML = placeholder;
        }
    })
})




// image upload
let uploadImage = document.querySelector('#upload-image');
const image_preview = document.querySelector('.add-product-img');

image_preview.src = "images/no-img.jpg";


uploadImage.addEventListener('change', function(event){
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function(event){


        image_preview.src = event.target.result;

        console.log(image_preview.src);

        // imagefile = urltoFile(image_preview.src)
        // console.log(imagefile)
    }


});




// let urltoFile = (url) => {
//     let arr = url.split(",")
//     // console.log(arr);

//     let mime = arr[0].match(/:(.*?);/)[1]
//     let data = arr[1]

//     let datastring = atob(data)
//     let n = datastring.length
//     let dataArr = new Uint8Array(n)

//     while(n--){
//         dataArr[n] = datastring.charCodeAt(n)
//     }

//     let file = new File([dataArr], 'file.jpg', {type: mime})

//     return file;

//     // console.log("mime is :", mime)
//     // console.log("data is :", datastring)
// }





//validate seller products and fields
let add_product_btn = document.querySelector('.add-product-btn');
let pageLoader = document.querySelector('.loader');
let product_name = document.querySelector('.product-name');
let short_des = document.querySelector('#short-des');
let product_price = document.querySelector('.product-price');
let detail_des_area = document.querySelector('.detail-des-area');
let tags = document.querySelector('.tag');

add_product_btn.addEventListener('click', () => {

    // validation
    if(product_name.innerHTML == product_name.getAttribute('data-placeholder')){
        showFormErr('should enter product name');
    }else if(short_des.innerHTML == short_des.getAttribute('data-placeholder')){
        showFormErr('provide short description');
    }else if(product_price.innerHTML == product_price.getAttribute('data-placeholder') || !Number(product_price.innerHTML)){
        showFormErr('enter valid price');
    }else if(detail_des_area.innerHTML == detail_des_area.getAttribute('data-placeholder')){
        showFormErr('give some detail description');
    }else if(tags.innerHTML == tags.getAttribute('data-placeholder')){
        showFormErr('enter some tags');
    }else{
        // submit form
        pageLoader.style.display = "block";
        let data = productData();
        if(productId){
            data.id = productId;
        }
        sendData('/add-product', data); 

    }
})


const productData = () => {
    let tagsArr = tags.innerText.split(",");
    tagsArr.forEach((item, i) => tagsArr[i].trim().toLowerCase());

    return{
        name: product_name.innerText,
        shortDes: short_des.innerText,
        price: product_price.innerText,
        detailDes: detail_des_area.innerText,
        tags: tagsArr,
        image: image_preview.src,
        email: JSON.parse(sessionStorage.user).email,
        draft: false
    }
}









// draft button 
let draft_btn = document.querySelector('.save-draft-btn');
draft_btn.addEventListener('click', () => {
    if(!product_name.innerHTML.length || (product_name.innerHTML == product_name.getAttribute('data-placeholder'))){
        showFormErr('atleast enter the product name');
    }else{
        let data = productData();
        pageLoader.style.display = "block";
        data.draft = true;
        if(productId){
            data.id = productId;
        }
        sendData('/add-product', data); 

    }
})


//edit page

const fetchProductData = () => {
    add_product_btn.innerHTML = 'save product';
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type' : 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data => {
        // console.log(data)
        setFormData(data)
    })
    .catch(err => console.log(err))
}


let productId = null;
if(location.pathname !== '/add-product' && location.pathname !== '/add-product.html'){
    productId = decodeURI(location.pathname.split('/').pop());
    console.log("the is " ,productId);
    fetchProductData();
}


const setFormData = (data) => {
    product_name.innerHTML = data.name;
    short_des.innerHTML = data.shortDes; 
    product_price.innerHTML = data.price;
    detail_des_area.innerHTML = data.detailDes;
    tags.innerHTML = data.tags;

    let productImg = document.querySelector('.add-product-img');
    productImg.src = image_preview.src = data.image;
}
