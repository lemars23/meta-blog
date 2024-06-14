<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
    <link rel="stylesheet" href="/frontend/css/reset.css">
    <link rel="stylesheet" href="/frontend/css/user_style.css">
    <link rel="icon" href="data:;base64,=">
</head>

<body>
    <div class="wrapper">
        <header class="header">
            <div class="container">
                <div class="header__inner">
                    <a href="/" class="logo">
                        <img src="/frontend/images/icons/Logo-dark.svg" alt="Logo icon" class="logo__icon">
                    </a>

                    <nav class="header__navigation navigation">
                        <ul class="header__list navigation__list"></ul>
                    </nav>

                    <div class="header__right-panel">
                        <div class="header__search">
                            <input type="text" class="header__search-input" placeholder="Search">
                            <img src="/frontend/images/icons/search.svg" alt="search icon" class="header__search-icon">
                        </div>
                        <div class="header__switch-light">
                            <img src="/frontend/images/icons/template-black-toggle.svg" alt="Switch template icon" class="header__switch-icon">
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <?php include '../backend/views/' . $content_view ?>
        <footer class="footer">
            <div class="container">
                <div class="footer__inner">
                    <div class="footer__upper">
                        <div class="footer__about">
                            <div class="footer__about-title">About</div>
                            <div class="footer__about-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</div>
                            <div class="footer__about-contact">
                                <div class="footer__about-email">
                                    <span class="footer__about_bold">Email :</span> <a href="mailto:info@jstemplate.net">info@jstemplate.net</a>
                                </div>
                                <div class="footer__about-phone">
                                    <span class="footer__about_bold">Phone :</span> <a href="tel:+780123456789">880 123 456 789</a>
                                </div>
                            </div>
                        </div>
                        <div class="footer__navigation">
                            <div class="footer__quick-link quick-link">
                                <div class="footer__navigation-title quick-link__title">Quick Link</div>
                                <ul class="footer__navigation-list quick-link__list"></ul>
                            </div>
                            <div class="footer__category category">
                                <div class="footer__category-title category__title">Category</div>
                                <ul class="footer__navigation-list category__list"></ul>
                            </div>
                        </div>
                        <div class="footer__newsletter">
                            <div class="footer__newsletter-title">Weekly Newsletter</div>
                            <div class="footer__newsletter-desc">Get blog articles and offers via email</div>
                            <form action="" class="footer__newsletter-form">
                                <div class="footer__email">
                                    <input type="text" class="footer__email-input" placeholder="Your Email">
                                    <img src="/frontend/images/icons/mail.svg" alt="mail icon" class="footer__email-icon">
                                </div>

                                <button type="submit" class="footer__newsletter-submit">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="footer__under">
                        <div class="footer__under-left">
                            <a href="/" class="footer__logo">
                                <img src="/frontend/images/icons/Logo-footer.svg" alt="logo icon" class="footer__logo-icon">
                            </a>
                            <div class="footer__under-column">
                                <a href="" class="footer__under-title">
                                    Meta<span class="footer__under-title_bold">Blog</span>
                                </a>
                                <div class="footer__under-rights">
                                    &copy; JS Template 2023. All Rights Reserved.
                                </div>
                            </div>
                        </div>
                        <ul class="footer__under-right footer__right-list">
                            <li class="footer__right-item">
                                <a href="/" class="footer__right-link">Terms of Use</a>
                            </li>
                            <li class="footer__right-item">
                                <a href="/" class="footer__right-link">Privacy Policy</a>
                            </li>
                            <li class="footer__right-item">
                                <a href="/" class="footer__right-link">Cookie Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <script src="/frontend/js/user_main.js"></script>
</body>

</html>