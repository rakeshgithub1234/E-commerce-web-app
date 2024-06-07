window.onload = () => {
    if(!sessionStorage.user){
        location.replace('/login')
    }

    if(location.search.includes('payment=done')){
        let items = [];
        localStorage.setItem('cart', JSON.stringify(items));
        showFormErr('order placed successfully');
    }

    // if(location.search.includes('payment=done')){
        
    //     let user = JSON.parse(sessionStorage.user).email;

    //     const emailTemplate = `
    //         <p>Dear ${userEmail},</p>
    //         <p>Thank you for purchasing, Your order has been successfully processed.</p>
    //     `
        


    // }


    if(location.search.includes('payment_fail=true')){
        showFormErr('some error occured. please try again');
    }
}

// select place order btn 
const placeOrderBtn = document.querySelector('.place-order-btn');

placeOrderBtn.addEventListener('click', () => {
    let address = getAddress();

    // console.log(address);

    // send data to backend
    if(address.address.length){
        fetch('/stripe-checkout', {
            method: 'post', 
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                items: JSON.parse(localStorage.getItem('cart')),
                address: address,
                email: JSON.parse(sessionStorage.user).email
            })
        })
        .then(res => res.json())
        .then(url => {
            // console.log(url)
            location.href = url;
        })
        .catch(err => console.log(err))
    }
})

const getAddress = () => {
    // form validation
    let address = document.querySelector('#address').value;
    let street = document.querySelector('#street').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let pincode = document.querySelector('#pincode').value;
    let landmark = document.querySelector('#landmark').value;

    let cartLength = JSON.parse(localStorage.cart);

    if(!address.length || !street.length || !city.length || !state.length || !pincode.length || !landmark.length){
        return showFormErr('fill all the inputs');
    }
    else if(!cartLength.length){
        showFormErr('please add some product in cart')
    }
    else{
        return { address, street, city, state, pincode, landmark }
    }

}