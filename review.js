let All_rating_stars = [...document.querySelectorAll('.review-star')];
// console.log(All_rating_stars);
let rate = 0;

All_rating_stars.map((star, index) => {
    star.addEventListener('click', () => {
        rate = `${index + 1}.0`;
        for(let i = 0; i < 5; i++){
            if(i <= index){
                All_rating_stars[i].src = '../images/filled star.png';
            }else{
                All_rating_stars[i].src = '../images/no fill star.png';

            }
        }
    })
})


// add review form
let user = JSON.parse(sessionStorage.user || null);
let review_headline = document.querySelector('.review-headline');
let review = document.querySelector('.review-textarea');
let pageLoader = document.querySelector('.loader');

let add_review_btn = document.querySelector('.add-review-btn');

add_review_btn.addEventListener('click', () => {
    // form validation
    if(user == null){
        location.href = `/login?after_page=${productId}`
    }else{
        if(!review_headline.value.length || !review.value.length || rate == 0){
            showFormErr('fill all the inputs');
        }else if(review_headline.value.length > 50){
            showFormErr('headline should not be more than 50 letters')
        }else if(review.value.length > 150){
            showFormErr('review should not be more than 150 letters')
        }else{
            // send data to backend
            pageLoader.style.display = "block";
            sendData('/add-review', {
                headline: review_headline.value,
                review: review.value,
                rate: rate,
                email: user.email,
                product: productId
            })
        }
    }
})


// fetch reviews

const getReviews = () => {
    if(user == null){
        user = {
            email: undefined
        }
    }

    fetch('/get-reviews', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            email: user.email,
            product: productId
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.length){
            createReviewSection(data)
        }
    })

}


const createReviewSection = (data) => {
    let section = document.querySelector('.review-section');
    section.innerHTML += `
        <h2 class="section-heading">reviews</h2>
        <div class="review-section-scroll-container">
            <div class="review-container">
                ${createReviewCard(data)}

            </div>
        </div>
    `
}

const createReviewCard = data => {
    let cards = '';

    for(let i = 0; i < 4; i++){
        if(data[i]){
            cards += `
                <div class="review-card">
                    <div class="user-dp">
                        <img src="../images/review user imgs/user 1.png" alt="sorry">
                        <div class="rating-number">${data[i].rate}</div>
                    </div>
                    <h2 class="review-title">${data[i].headline}</h2>
                    <p class="review-content">${data[i].review}</p>
                </div>
            `
        }
    }

    return cards;
}

getReviews();