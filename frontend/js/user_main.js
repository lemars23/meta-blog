const headerNavigationList = document.querySelector('.navigation__list');
const quickLinkList = document.querySelector('.quick-link__list');
const categoryList = document.querySelector('.category__list');
const latestPostList = document.querySelector('.latest-post__list');

getFetch('/backend/api/header_link/getAllHeaderLinks.php', getAllHeaderLinks);
getFetch('/backend/api/quick_link/getAllQuickLinks.php', getFooterAllQuickLinks);
getFetch('/backend/api/category/getAllCategories.php', getFooterAllCategories);

console.log(window.location.pathname);


if(latestPostList) {
    fetchLatestPost();
}

setArticle();

async function setArticle() {
    const getArticle = await getArticleByUri(window.location.pathname);
    const getAuthor = await getAdminById(getArticle.created_by);
    const getCategory = await getCategoryById(getArticle.category_id);

    

    if(getArticle && getAuthor && getCategory) {
        const background = document.querySelector('.home-header__background');
        const category = document.querySelector('.home-header__category-link');
        const title = document.querySelector('.home-header__title');
        const authorName = document.querySelector('.home-header__author-name');
        const authorImage = document.querySelector('.home-header__author-image');
        const date = document.querySelector('.home-header__date');

        const getDate = new Date(`${getArticle.created_at.split(" ")[0]}`);
        const setDate = getDate.toLocaleString('default', { month: 'long' }) + " " + getDate.getDate() + ", " + getDate.getFullYear();

        background.style.backgroundImage = "url('/frontend/images/home-header/" + getArticle.image + "')";
        category.innerText = getCategory.name;
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
            <a href='${item.url}' target='${item.target}' class='footer__item-link category__item-link'>${item.name.slice(0,1).toUpperCase() + item.name.slice(1)}</a>
        `;
        categoryList.append(listItem);
    });
}

async function getLatestPost() {
    try {
        const response = await fetch('/backend/api/post/getLastestPost.php');

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


async function fetchLatestPost() {
    try {
        const posts = await getLatestPost();
        for(const item of posts) {
            const admin = await getAdminById(item.created_by);
            const category = await getCategoryById(item.category_id);

            const date = new Date(`${item.created_at.split(" ")[0]}`);
            const getDate = date.toLocaleString('default', { month: 'long' }) + " " + date.getDate() + ", " + date.getFullYear();
            
            const listItem = document.createElement('li');
            listItem.classList.add('latest-post__item');
            listItem.innerHTML = `
                <img src="${item.image ? item.image : '/frontend/images/no-picture/no-picture-360x240.png'}" alt="no-picture post icon" class="latest-post__item-image">

                <div class="latest-post__item-category latest-post__category">
                    <a href="/category/index/${item.category_id}" class="latest-post__item-link latest-post__category-link">${category.name}</a>
                </div>

                <div class="latest-post__item-name latest-post__name">
                    <a href="/singlepost/index/${item.id}" class="latest-post__item-name latest-post__name-link">${item.title}</a>
                </div>
                
                <div class="latest-post__item-data">
                    <div class="latest-post__item-author latest-post__author">
                        <img src="${admin && admin.image ? admin.image : '/frontend/images/no-picture/no-picture-36x36.png'}" alt="no-picture author" class="latest-post__author-icon">
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
