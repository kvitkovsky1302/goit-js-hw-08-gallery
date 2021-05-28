import galleryItems from './gallery-items.js';

const refs = {
    listGallery: document.querySelector('.js-gallery'),
}

const createGallery = galleryItems.map(({ preview, description, original }) => {
    return `<li><a><img src="${preview}" alt="${description}" data-source="${original}"></a></li>`
}).join('');

refs.listGallery.insertAdjacentHTML('afterbegin', createGallery);
refs.listGallery.querySelectorAll('li').forEach(item => item.classList.add('gallery__item'));
refs.listGallery.querySelectorAll('li a').forEach(item => item.classList.add('gallery__link'));
refs.listGallery.querySelectorAll('li a img').forEach(item => item.classList.add('gallery__image'));


