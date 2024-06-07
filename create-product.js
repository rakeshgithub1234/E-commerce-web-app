const creatProduct = (data) => {
    let added_product_container = document.querySelector('.added-product-container');

    added_product_container.innerHTML += `
        <div class="A-card">
                    <div class="btns">
                        <button class="edit-product-btn both-btns" onclick="location.href = '/add-product/${data.id}'"><i class="fa-solid fa-pen"></i></button>
                        <button class="view-product-btn both-btns" onclick="location.href = '/product-detail/${data.id}'"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                        <button class="product-del-btn both-btns" onclick="deleteItem('${data.id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <div class="product-image">
                        <img src="${data.image}" alt="sorry" class="product-thumb">
                    </div>
                    <div class="product-info">
                        <h2 class="product-category">${data.tags[0]}</h2>
                        <span class="price">&#8377;${data.price}</span>
                    </div>
                </div>
    
    `

}

const deleteItem = (id) => {
    fetch('/delete-product', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({id: id})
    }).then(res => res.json())
    .then(data => {
        // process data
        if(data == 'success'){
            location.reload();
        }else{
            showAlert('some error occured');
        }
    })
}