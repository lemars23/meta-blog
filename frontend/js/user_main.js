const headerNavigationList = document.querySelector('.navigation__list');
const quickLinkList = document.querySelector('.quick-link__list');
const categoryList = document.querySelector('.category__list');
const latestPostList = document.querySelector('.latest-post__list');
const articleName = document.querySelector('.home-header') ? '.home-header' : document.querySelector('.blog-listing') ? '.blog-listing' : null;
const mostViewsPosts = document.querySelector('.most-views-posts');

getFetch('/backend/api/header_link/getAllHeaderLinks.php', getAllHeaderLinks);
getFetch('/backend/api/quick_link/getAllQuickLinks.php', getFooterAllQuickLinks);
getFetch('/backend/api/category/getAllCategories.php', getFooterAllCategories);


if(latestPostList) {
    fetchLatestPost();
}

if(articleName) {
    setArticle();
}

setMostViewPosts();

function getAllHeaderLinks(data) {
    data.sort((a, b) => a.position - b.position).map(item => {;
        const listItem = document.createElement('li');
        listItem.classList.add('header__item', 'navigation__item');
        listItem.innerHTML = `
            <a href='${item.url}' target='${item.target}' class='header__item-link navigation__item-link'>${item.title.slice(0,1).toUpperCase() + item.title.slice(1)}</a>
        `;
        headerNavigationList.append(listItem);
    });
}

function getFooterAllQuickLinks(data) {
    data.sort((a, b) => a.position - b.position).map(item => {;
        const listItem = document.createElement('li');
        listItem.classList.add('footer__list-item', 'quick-link__item');
        listItem.innerHTML = `
            <a href='${item.url}' target='${item.target}' class='footer__item-link quick-link__item-link'>${item.title.slice(0,1).toUpperCase() + item.title.slice(1)}</a>
        `;
        quickLinkList.append(listItem);
    });
}

function getFooterAllCategories(data) {
    data.sort((a, b) => a.position - b.position).map(item => {;
        const listItem = document.createElement('li');
        listItem.classList.add('footer__list-item', 'category__item');
        listItem.innerHTML = `
            <a href='/category/index/${item.id}' target='${item.target}' class='footer__item-link category__item-link'>${item.title.slice(0,1).toUpperCase() + item.title.slice(1)}</a>
        `;
        categoryList.append(listItem);
    });
}

async function setArticle() {
    const getArticle = await getArticleByUri(window.location.pathname);
    const getAuthor = await getAdminById(getArticle.created_by);
    const getCategory = await getCategoryById(getArticle.category_id);

    if(getArticle && getAuthor && getCategory) {
        const background = document.querySelector(articleName + '__background');
        const category = document.querySelector(articleName + '__category-link');
        const title = document.querySelector(articleName + '__title');
        const authorName = document.querySelector(articleName + '__author-name');
        const authorImage = document.querySelector(articleName + '__author-image');
        const date = document.querySelector(articleName + '__date');

        const getDate = new Date(`${getArticle.created_at.split(" ")[0]}`);
        const setDate = getDate.toLocaleString('default', { month: 'long' }) + " " + getDate.getDate() + ", " + getDate.getFullYear();

        background.style.backgroundImage = "url('/frontend/images/articles/" + getArticle.image + ".webp')";
        category.innerText = getCategory.title;
        category.href = '/category/index/' + getCategory.id;
        title.innerText = getArticle.title;
        authorName.innerText = getAuthor.username;
        authorName.href = '/author/index/' + getAuthor.id;
        authorImage.src = getAuthor.image ? getAuthor.image : '/frontend/images/no-picture/no-picture-36x36.png';
        date.innerText = setDate;
    }
}

async function getArticleByUri(data) {
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({uri: data})
    }

    const response = await fetch('/backend/api/article/articleByUri.php', headers);

    if(!response.ok) {
        throw new Error('Failed to GET article by URI');
    }

    return response.json();
}

async function getLatestPost(count) {
    try {
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({count: count})
        };

        const response = await fetch('/backend/api/post/getLatestPost.php', headers);

        if(!response.ok) {
            throw new Error('Failed to GET latest post');
        }

        return await response.json();

    } catch (error) {
        console.warn('Error: ' + error);
    }
}

async function getAdminById(id) {
    try {
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        };
        const response = await fetch('/backend/api/admin/getAdminById.php', headers);

        if(!response.ok) {
            throw new Error('Failed to GET admin');
        }

        return await response.json();
    } catch (error) {
        console.warn('Error: ' + error);
    }
}

async function getCategoryById(id) {
    try {
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        };
        const response = await fetch('/backend/api/category/getCategoryById.php', headers);

        if(!response.ok) {
            throw new Error('Failed to GET category by id');
        }

        return await response.json();
    } catch (error) {
        console.warn('Error: ' + error);
    }
}

async function getMostViewsPosts(count) {
    try {
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({count: count})
        };
        const response = await fetch('/backend/api/post/getMostViewsPosts.php', headers);
        if(!response.ok) {
            throw new Error('Failed to GET most views posts');
        }
        return await response.json();
    } catch (error) {
        console.log('Error: ' + error);
    }

}

async function setMostViewPosts() {
    const getPosts = await getMostViewsPosts(3);
    
    const firstPostCategory = await getCategoryById(getPosts[0].category_id);
    const secondPostCategory = await getCategoryById(getPosts[1].category_id);
    const thirdPostCategory = await getCategoryById(getPosts[2].category_id);

    const firstPostAuthor = await getAdminById(getPosts[0].created_by);
    const secondPostAuthor = await getAdminById(getPosts[1].created_by);
    const thirdPostAuthor = await getAdminById(getPosts[2].created_by);

    const arrayMostViewPosts = [
        {
            post: getPosts[0],
            view: document.querySelector('.most-views-posts__left-side > .most-views-posts__post'),
            category: firstPostCategory,
            author: firstPostAuthor,
        },
        {
            post: getPosts[1],
            view: document.querySelector('.most-views-posts__right-side > .most-views-posts__post:first-child'),
            category: secondPostCategory,
            author: secondPostAuthor,
        },
        {
            post: getPosts[2],
            view: document.querySelector('.most-views-posts__right-side > .most-views-posts__post:last-child'),
            category: thirdPostCategory,
            author: thirdPostAuthor,
        },
    ];

    arrayMostViewPosts.map(item => {
        const datePost = new Date(item.post.created_at.split(" ")[0]);
        const getDatePost = datePost.toLocaleString('default', {month: "long"}) + ' ' + datePost.getDate() + ', ' + datePost.getFullYear();
        item.view.children[0].children[0].href = '/category/index/' + item.post.category_id;
        item.view.children[0].children[0].innerText = item.category.title;
        item.view.children[1].href = '/singlepost/index/' + item.post.id;
        item.view.children[1].innerText = item.post.title;
        item.view.children[2].children[0].children[0].src = item.author.image ? '/frontend/images/authors/' + item.author.image + '.webp' : '/frontend/images/no-picture/no-picture-36x36.png';
        item.view.children[2].children[0].children[1].href = '/author/index/' + item.author.id;
        item.view.children[2].children[0].children[1].innerText = item.author.username;
        item.view.children[2].children[1].innerHTML = getDatePost;
        item.view.style.backgroundImage = `url('/frontend/images/posts/${item.post.image}.webp')`;
    });
}

async function fetchLatestPost() {
    try {
        const posts = await getLatestPost(6);
        for(const item of posts) {
            const admin = await getAdminById(item.created_by);
            const category = await getCategoryById(item.category_id);

            const date = new Date(`${item.created_at.split(" ")[0]}`);
            const getDate = date.toLocaleString('default', { month: 'long' }) + " " + date.getDate() + ", " + date.getFullYear();
            
            const listItem = document.createElement('li');
            listItem.classList.add('latest-post__item');
            listItem.innerHTML = `
                <img src="${item.image ? '/frontend/images/posts/' + item.image + '.webp' : '/frontend/images/no-picture/no-picture-360x240.png'}" alt="no-picture post icon" class="latest-post__item-image">

                <div class="latest-post__item-category latest-post__category">
                    <a href="/category/index/${item.category_id}" class="latest-post__item-link latest-post__category-link">${category.title}</a>
                </div>

                <div class="latest-post__item-name latest-post__name">
                    <a href="/singlepost/index/${item.id}" class="latest-post__item-name latest-post__name-link">${item.title}</a>
                </div>
                
                <div class="latest-post__item-data">
                    <div class="latest-post__item-author latest-post__author">
                        <img src="${admin && admin.image ? '/frontend/images/authors/' + admin.image + '.webp' : '/frontend/images/no-picture/no-picture-36x36.png'}" alt="no-picture author" class="latest-post__author-icon">
                        <a href="/author/index/${item.created_by}" class="latest-post__author-name">${admin ? admin.username : 'Unknown'}</a>
                    </div>
                    <div class="latest-post__item-date">${getDate}</div>
                </div>
            `;
            latestPostList.append(listItem);
        }
    } catch (error) {
        console.warn('Error: ' + error);
    }
}

function getFetch(api, callback) {
    fetch(api).then(response => response.json()).then(data => callback(data)).catch(err => console.log(err));
}


