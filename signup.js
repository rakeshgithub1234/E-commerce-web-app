//user cant access signup page when user already signed up and there in session storage...
window.onload = () => {
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(user.email){
            location.replace('/');
        }
    }
}


// signup form 
let signupBtn = document.querySelector('.signup-btn');
let pageLoader = document.querySelector('.loader');

signupBtn.addEventListener('click', () => {

    // initialize all values in variables..
    let fullname = document.querySelector('#name') || null;
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let phoneNumber = document.querySelector('#phone-number') || null;
    let tac = document.querySelector('#tc') || null;

    
    if(fullname != null){  // we are in signup page

            //validate the feilds 
        if(fullname.value.length < 3){
            showFormErr("name must be 3 letters long!");
        }else if(!email.value.length){
            showFormErr("email should not be empty!");
        }else if(password.value.length < 8){
            showFormErr("password should be 8 letters long!");
        }else if(!Number(phoneNumber.value) || phoneNumber.value.length < 10){
            showFormErr("Invalid number, please enter valid one");
        }else if(!tac.checked){
            showFormErr("you must agree to our terms and conditions!");
        }else{

            // submit form
            pageLoader.style.display = "block";
            sendData('/signup', {
                name: fullname.value,
                email: email.value,
                password: password.value,
                phoneNumber: phoneNumber.value,
                tac: tac.checked
            })
        }
    }else{    // we are in login page
        if(!email.value.length || !password.value.length){
            showFormErr("fill all the inputs");
        }else{

            // submit form
            pageLoader.style.display = "block";
            sendData('/login', {
                email: email.value,
                password: password.value,
            })
        }
    }
    
})

