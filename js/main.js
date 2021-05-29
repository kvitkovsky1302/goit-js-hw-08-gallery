import galleryItems from './gallery-items.js';

const refs = {
    listGallery: document.querySelector('.js-gallery'),
    lightBoxGallery: document.querySelector('.js-lightbox'),
    lightBoxImage: document.querySelector('.lightbox__image'),
    closeButton: document.querySelector('button[data-action="close-lightbox"]'),
    lightBoxOverlay: document.querySelector('.lightbox__overlay'),
}

const createGallery = galleryItems.map(({ preview, description, original }) => {
    return `<li><a href="${original}"><img src="${preview}" alt="${description}" data-source="${original}"></a></li>`
}).join('');

refs.listGallery.insertAdjacentHTML('afterbegin', createGallery);
refs.listGallery.querySelectorAll('li').forEach(item => item.classList.add('gallery__item'));
refs.listGallery.querySelectorAll('li a').forEach(item => item.classList.add('gallery__link'));
refs.listGallery.querySelectorAll('li a img').forEach(item => item.classList.add('gallery__image'));

refs.listGallery.addEventListener('click', onOpenLightBox);
refs.closeButton.addEventListener('click', onCloseLightBox);

const listOfImagesSrc = galleryItems.map(({ original }) => original);
const listOfImagesDescription = galleryItems.map(({ description }) => description);


function onOpenLightBox(event) {
    event.preventDefault();
    refs.lightBoxGallery.classList.add('is-open');
    refs.lightBoxImage.src = event.target.dataset.source;
    refs.lightBoxImage.alt = event.target.alt;
    window.addEventListener('keydown', onPressEsc);
    window.addEventListener('keydown', onThroughRight);
    window.addEventListener('keydown', onThroughLeft);
    refs.lightBoxOverlay.addEventListener('click', onCloseLightBox);
};

function onPressEsc(event) {
    if (event.code === 'Escape') {
        onCloseLightBox();
    }
};

function onThroughRight(event) {
    if (event.code === 'ArrowRight') {
        let indexOfImage = listOfImagesSrc.indexOf(refs.lightBoxImage.src);
        if (indexOfImage === listOfImagesSrc.length - 1) {
            indexOfImage = -1;
        }
        refs.lightBoxImage.src = listOfImagesSrc[indexOfImage + 1];
        refs.lightBoxImage.alt = listOfImagesDescription[indexOfImage + 1];
    }
};

function onThroughLeft(event) {
    if (event.code === 'ArrowLeft') {
        let indexOfImage = listOfImagesSrc.indexOf(refs.lightBoxImage.src);
        if (indexOfImage === 0) {
            indexOfImage = listOfImagesSrc.length;
        }
        refs.lightBoxImage.src = listOfImagesSrc[indexOfImage - 1];
        refs.lightBoxImage.alt = listOfImagesDescription[indexOfImage - 1];
    }
};

function onCloseLightBox() {
    refs.lightBoxGallery.classList.remove('is-open');
    refs.lightBoxImage.src = '';
    refs.lightBoxImage.alt = '';
    window.removeEventListener('keydown', onPressEsc);
    window.removeEventListener('keydown', onThroughRight);
    window.removeEventListener('keydown', onThroughLeft);
    refs.lightBoxOverlay.removeEventListener('click', onCloseLightBox);
};
