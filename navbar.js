let header_container = document.querySelector('.header-container');
header_container.innerHTML += `

            <div class="header1">
            <a href="#" class="logo"><img src="../images/zcoms logo 1.png" alt=""></a>

            <div class="search-bar-container">
                <input type="search" placeholder="search here..." id="search-box" class="overall-search-input">
                <label for="search-box"><button class="overall-search-btn"><i class="fa-solid fa-magnifying-glass"></i></button></label>
            </div>

            <div class="header1-icons">
                <div class="search-icon" id="search-icon"><a><i class="fa-solid fa-magnifying-glass"></i></a></div>

                <div class="user-icon-container">
                    <i class="fa-solid fa-user user-icon"></i>
                    <div class="user-popup-box">
                        <p class="user-name">login to your account</p>
                        <a class="user-state">login</a>
                    </div>
                </div>

                <a class="cart-icon" onclick="location.href='/cart'"><i class="fa-solid fa-cart-shopping"></i><span class="cart-count-num">00</span></a>
                <a class="nav-links-explorer" onclick="link_explorer()"><i class="fa-solid fa-bars"></i></a>
            </div>
            </div>

            <div class="header2" id="header2">
            <nav class="navbar">
                <a href="" class="nav-links-cancel-btn"><i class="fa-solid fa-xmark"></i></a>
                <a href="/">Home</a>
                <a href="category.html">Product</a>
                <a href="">About</a>
                <a href="">Contact</a>
                <a href="/seller">become a seller</a>
                <a href="./sharmi_files/scrap.html">sell scrap</a>
            </nav>
            </div>
`;

