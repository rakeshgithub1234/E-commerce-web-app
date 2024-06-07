// user can not access seller page if user is not loged in
window.onload = () => {
    let user = JSON.parse(sessionStorage.user || null);
    if(user == null){
        location.replace('/login');
    }else if(user.seller){
        location.replace('/seller-dashboard');
    }
}

let pageLoader = document.querySelector('.loader');
let sellerBtn = document.querySelector('.sellerBtn');

sellerBtn.addEventListener('click', () => {

    let businessName = document.querySelector('#business-name').value;
    let businessAddress = document.querySelector('#business-address').value;
    let aboutBusiness = document.querySelector('#about-business').value;
    let mobileNumber = document.querySelector('#mobile-number').value;

    if(!businessName.length || !businessAddress.length || !aboutBusiness.length || mobileNumber.length < 10 || !Number(mobileNumber)){
        showFormErr('some informations are incorrect!');
    }else{
        //send data
        pageLoader.style.display = "block";
        
        sendData('/seller', {
            name: businessName,
            address: businessAddress,
            about: aboutBusiness,
            number: mobileNumber,
            email: JSON.parse(sessionStorage.user).email
        })
    }

})