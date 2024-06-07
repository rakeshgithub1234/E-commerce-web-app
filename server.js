//  import some packages
import express from "express";
import bcrypt from "bcrypt";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";           // this code is basically importing and initializing tha app from firebase...
import { getStorage } from "firebase/storage";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc, getDocs, query, where, deleteDoc, limit } from "firebase/firestore";           // we need to access the firestore for that import get firestore, get firestore  is a function to access or connect the firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import stripe from 'stripe';
import bodyParser from 'body-parser';



import { Storage } from '@google-cloud/storage';
const storage = new Storage();


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOfbl-eJyzxVEieGSRoTyTneGYICG3vMY",
  authDomain: "zcoms-test.firebaseapp.com",
  projectId: "zcoms-test",
  storageBucket: "zcoms-test.appspot.com",
  messagingSenderId: "842391503887",
  appId: "1:842391503887:web:7b0864d0ad620bbb7a4f7a"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();                        // we are connecting to the firestore
// const storage = getStorage(firebase);


// export { storage };

// init server
const app = express();


// middlewares  should change the public folder to static folder, we should define the folder which server should look in.. so to make it as a static folder we use APP.USE is a middle ware..
app.use(express.static("public"));
app.use(express.json())  // this will enable form sharing so that we can easily share the form data with our server otherwise if you dont add the express.json we will not able to catch the form response to our server..
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//aws
// import aws from "aws-sdk";   // importing aws sdk...
import "dotenv/config";     // dotenv helps to keep our private variables in our system itself, instead of keeping in our code...

// const aws = require('aws-sdk');
// const dotenv = require('dotenv');
// dotenv.config();

// aws setup
// const region = "ap-southeast-1";
// const BucketName = "zcoms-new";
// const accesskeyId = process.env.AWS_ACCESS_KEY;
// const secretAccesskey = process.env.AWS_SECRET_KEY;


// SETTING UP AWS
// aws.config.update({
//     region,
//     accesskeyId,
//     secretAccesskey
// })

// init s3    // we need to access the s3 bucket for that make s3 variable and use NEW constructor to make s3 class and this s3 only helps to upload the images...
// const s3 = new aws.S3();

// generate image url, This function makes an image url, actually we will make a request on s3 url link and it will give us an image url and then we upload image to that image url and then we set that url to our backend firebase database... 
// async function generateURL(){

//     let date = new Date();
//     let id = parseInt(Math.random() * 10000000000)
    
//     const imageName = `${id}${date.getTime()}.jpg`

//     const params = {
//         Bucket: BucketName, 
//         Key: imageName,
//         Expires: 300,     // 300ms
//         ContentType: "image/jpeg"
//     }

//     const uploadURL = await s3.getSignedUrl("putObject", params);
//     return uploadURL;
// }

// app.get('/s3url', (req, res) => {
//     generateURL().then(url => res.json(url));
// })



// routes
// home route
app.get('/', (req,res) => {
    res.sendFile("index.html", {root : "public"})
})

// signup route
app.get('/signup', (req,res) => {
    res.sendFile("signup.html", {root: "public"})
})

app.post('/signup', (req, res) => {            //post route for our signup page
    const { name, email, password, phoneNumber, tac } = req.body;        // catch the data from fontend to here 

    //form validation
    if(name.length < 3){
        res.json({'alert' : "name must be 3 letters long!"});    
    }else if(!email.length){
        res.json({'alert' : "email should not be empty!"});    
    }else if(password.length < 8){
        res.json({'alert' : "password should be 8 letters long!"});    
    }else if(!Number(phoneNumber) || phoneNumber.length < 10){
        res.json({'alert' : "Invalid number, please enter valid one!"});    
    }else if(!tac){
        res.json({'alert' : "you must agree to our terms and conditions!"});    
    }else{
        // store data in firebase.. we will use firebase as a main database to store the users and its details...
        
        const users = collection(db, "users");
        getDoc(doc(users, email)).then(user => {
            if(user.exists()){
                return res.json({'alert' : 'email already exist'});
            }else{
                // encrypt the password here
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        req.body.seller = false;

                        // set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })
                        })
                    })
                })
            }
        })

    }
})                


// login route
app.get('/login', (req, res) => {
    res.sendFile("login.html", {root: "public"})
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if(!email.length || !password.length){
        return res.json({'alert' : "fill all the inputs"});
    }

    const users = collection(db, "users");     // define the user which is our user collection
    getDoc(doc(users, email)).then(user => {
        if(!user.exists()){
            return res.json({'alert' : "email does not exist"});
        }else{
            bcrypt.compare(password, user.data().password, (err, result) => {   // compare function of decrypt package to compare the plain text passwords to the excrypted passwords...
                if(result){
                    let data = user.data();
                    return res.json({
                        name: data.name,
                        email: data.email,
                        seller: data.seller
                    })
                }else{
                    return res.json({'alert' : "password does not match"});
                }
            })    

        }
    })

})


// seller route
app.get('/seller', (req, res) => {
    res.sendFile("seller.html", {root : "public"})
})

app.post('/seller', (req, res) => {
    let { name, address, about, number, email } = req.body;

    if(!name.length || !address.length || !about.length || number.length < 10 || !Number(number)){
        return res.json({'alert' : 'some informations are incorrect!'});
    }else{
        // update the seller
        const sellers = collection(db, "sellers");
        setDoc(doc(sellers, email), req.body)
        .then(data => {
            const users = collection(db, "users");
            updateDoc(doc(users, email), {
                seller: true
            }).then(data => {
                res.json({'seller' : true});
            })
        })
    }

})


// seller dashboard route
app.get('/seller-dashboard', (req, res) => {
    res.sendFile("seller-dashboard.html", {root: "public"})
})

// add-product route
app.get('/add-product', (req, res) => {
    res.sendFile("add-product.html", {root: "public"})
})

app.get('/add-product/:id', (req, res) => {
    res.sendFile("add-product.html", {root: "public"})
})

app.post('/add-product', (req, res) => {
    let { name, shortDes, price, detailDes, tags, image, email, draft, id } = req.body;

    if(!draft){
        if(!name.length){
            res.json({'alert' : 'should enter product name'});
        }else if(!shortDes.length){
            res.json({'alert' : 'provide short description'});
        }else if(!price.length || !Number(price)){
            res.json({'alert' : 'enter valid price'});
        }else if(!detailDes.length){
            res.json({'alert' : 'give some detail description'});
        }else if(!tags.length){
            res.json({'alert' : 'enter some tags'});
        }
    }
    // else{
        // add product 
        let docName = id == undefined ? `${name.toLowerCase()}-${Math.floor(Math.random() * 50000)}` : id;
        
        let products = collection(db, "products");
        setDoc(doc(products, docName), req.body)
        .then(data => {
            res.json({'product' : name})
            console.log(data)
        })
        .catch(err => {
            res.json({'alert' : 'some error occured'})
            alert('error ');
        })
    // }
})

app.post('/get-products', (req, res) => {
    let { email, id, tag} = req.body;

    let products = collection(db, "products");
    let docRef;

    if(id){
        docRef = getDoc(doc(products, id));
    }else if(tag){
        docRef = getDocs(query(products, where("tags", "array-contains", tag)))
    }else{
        docRef = getDocs(query(products, where("email", "==", email)))
    }

    docRef.then(products => {
        if(products.empty){
            return res.json('no products');
        }
        let productArr = [];

        if(id){
            return res.json(products.data());
        }else{
            products.forEach(item => {
                let data = item.data();
                data.id = item.id;
                productArr.push(data);
            })
        }

        res.json(productArr);
    })
})

app.post('/delete-product', (req, res) => {
    let { id } = req.body;
    deleteDoc(doc(collection(db, "products"), id))
    .then(data => {
        res.json('success');
    }).catch(err => {
        res.json('err');
    })
})

app.get('/product-detail/:id', (req, res) => {
    res.sendFile('product-detail.html', {root : "public"})
})

app.get('/search-page/:key', (req, res) => {
    res.sendFile("search.html", { root : "public" })
})

// review routes
app.post('/add-review', (req, res) => {
    let { headline, review, rate, email, product } = req.body;
  
    // form validation
    if(!headline.length || !review.length || rate == 0 || email == null || !product){
        return res.json({'alert' : 'fill all the inputs'});
    }
    else{
            // store in firebase
        let reviews = collection(db, "reviews");
        let docName = `review-${email}-${product}`;

        setDoc(doc(reviews, docName), req.body)
        .then(data => {
            // console.log(data);
            return res.json('review')
        }).catch(err => {
            console.log(err)
            res.json({'alert': 'some error occured'})
        });
    }
    
})

app.post('/get-reviews', (req, res) => {
    let { product, email } = req.body;

    let reviews = collection(db, "reviews");

    getDocs(query(reviews, where("product", "==", product)), limit(4))
    .then(review => {
        let reviewArr = [];

        if(review.empty){
            return res.json(reviewArr);
        }

        let userEmail = false;

        review.forEach((item, i) => {
            let reviewEmail = item.data().email;
            if(reviewEmail == email){
                userEmail = true;
            }
            reviewArr.push(item.data())
        })

        if(!userEmail){
            getDoc(doc(reviews, `review-${email}-${product}`))
            .then(data => reviewArr.push(data.data()))
        }

        return res.json(reviewArr);
    })
})

// cart route
app.get('/cart', (req, res) => {
    res.sendFile("cart.html", { root : "public" })
})

// check out route
app.get('/checkout', (req, res) => {
    res.sendFile("checkout.html", {root : "public"})
})




// stripe payment
let stripeGateway = stripe(process.env.stripe_key);

let DOMAIN = process.env.DOMAIN;
// console.log(DOMAIN);

app.post('/stripe-checkout', async (req, res) => {

    console.log("the req body is " ,req.body);

    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        // success_url: `${DOMAIN}/success`,
        // success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&order=${JSON.stringify(req.body)}`,
        cancel_url: `${DOMAIN}/checkout?payment_fail=true`,
        line_items: req.body.items.map(item => {
            console.log("the item is " , item);
            return {
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: item.name,
                        description: item.shortDes,
                        images: [item.image]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.item
            }
        })
    })

    res.json(session.url)
})



app.get('/success', async (req, res) => {
    let { order, session_id } = req.query;


    try{
        const session = await stripeGateway.checkout.sessions.retrieve(session_id);
        console.log(session);

        // const customer = await stripeGateway.customers.retrieve(session.customer);
        // console.log(customer);

        // const storageRef = storage.bucket('gs://zcoms-test.appspot.com');
        // const imageRef = storageRef.file(`${order.image}`);

        // imageRef.getSignedUrl({
        //     action:'read',
        //     expires: '03-17-2025'
        // }).then(signedUrls => {
        //     const downloadUrl = signedUrls[0];
        // })

        // const orderObject = JSON.parse(order);
        // orderObject.imageDownloadUrl = downloadUrl;



        let date = new Date();
        let orders_collection = collection(db, "orders");
        let docName = `${order.email}-order-${date.getTime()}`;

        setDoc(doc(orders_collection, docName), JSON.parse(order))
        .then(data => {
            res.redirect('/checkout?payment=done')
        })
    }catch(err){
        console.log(err);
        // res.redirect("/404");
        res.redirect('/checkout?payment=done')
    } 
})



// 404 route
app.get('/404', (req,res)=>{
    res.sendFile("404.html", {root: "public"})
})

app.use((req,res) => {
    res.redirect('/404')
})

app.listen(3000, () =>{
    console.log('listening on port 3000')
})