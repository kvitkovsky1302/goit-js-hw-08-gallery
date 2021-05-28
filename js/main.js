import galleryItems from './gallery-items.js';

const refs = {
    listGallery: document.querySelector('.js-gallery'),
    lightBoxGallery: document.querySelector('.js-lightbox'),
    lightBoxImage: document.querySelector('.lightbox__image'),
    closeButton: document.querySelector('button[data-action="close-lightbox"]'),
    imageGallery: document.querySelectorAll('.gallery__image'),
}

const createGallery = galleryItems.map(({ preview, description, original }) => {
    return `<li><a><img src="${preview}" alt="${description}" data-source="${original}"></a></li>`
}).join('');

refs.listGallery.insertAdjacentHTML('afterbegin', createGallery);
refs.listGallery.querySelectorAll('li').forEach(item => item.classList.add('gallery__item'));
refs.listGallery.querySelectorAll('li a').forEach(item => item.classList.add('gallery__link'));
refs.listGallery.querySelectorAll('li a img').forEach(item => item.classList.add('gallery__image'));

refs.listGallery.addEventListener('click', onClickImageGallery);
refs.closeButton.addEventListener('click', onCloseLightBox);

function onClickImageGallery(event) {
    refs.lightBoxGallery.classList.add('is-open');
    refs.lightBoxImage.src = event.target.dataset.source;
    refs.lightBoxImage.alt = event.target.alt;
};

function onCloseLightBox() {
    refs.lightBoxGallery.classList.remove('is-open');
    refs.lightBoxImage.src = '';
} 
