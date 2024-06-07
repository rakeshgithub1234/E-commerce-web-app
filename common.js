// send data function is for send the data to server, once the data is generated from the form by using sendData function then that data will be passed here then again from here the data will be sended to server...
const sendData = (path, data) => {        //path will be the route and data is what data it actually sends...
    fetch(path, {                         // fetch is used to send the data to the server...
        method: 'post',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(data)
    })        
    .then(res => res.json())            // .then used to catch the response from the server...
    .then(data => processData(data));                    
}

const processData = (data) => {        // here we processing the data that received from the server...
    pageLoader.style.display = "none";
    if(data.alert){
        showFormErr(data.alert);
    }else if(data.email){
        sessionStorage.user = JSON.stringify(data);
        if(location.search.includes('after')){
            let pageId = location.search.split('=')[1];
            location.replace(`/products/${pageId}`);
        }else{
            location.replace('/');
        }
    }else if(data.seller){
        let user = JSON.parse(sessionStorage.user);
        user.seller = true;
        sessionStorage.user = JSON.stringify(user);
        location.replace('/seller-dashboard');
    }else if(data.product){
        location.replace('/seller-dashboard');
    }else if(data == 'review'){
        // alert('got the review');
        location.reload();
    }
}


// creating error element to show the form error..
const showFormErr = (err) => {
    let errorElement = document.querySelector('.signup-error-msg');
    errorElement.innerHTML = err;
    errorElement.classList.add('show');

    setTimeout(() => {
        errorElement.classList.remove('show');
    },2000)
}