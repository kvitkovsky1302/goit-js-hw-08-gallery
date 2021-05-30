import galleryItems from './gallery-items.js';

const refs = {
    listGallery: document.querySelector('.js-gallery'),
    lightBoxGallery: document.querySelector('.js-lightbox'),
    lightBoxImage: document.querySelector('.lightbox__image'),
    closeButton: document.querySelector('button[data-action="close-lightbox"]'),
    lightBoxOverlay: document.querySelector('.lightbox__overlay'),
}

const createGallery = galleryItems.map(({ preview, description, original }) => {
    return `<li class="gallery__item"><a href="${original}" class="gallery__link"><img class="gallery__image" src="${preview}" alt="${description}" data-source="${original}"></a></li>`
}).join('');

refs.listGallery.insertAdjacentHTML('afterbegin', createGallery);

refs.listGallery.addEventListener('click', onOpenLightBox);
refs.closeButton.addEventListener('click', onCloseLightBox);

function onOpenLightBox(event) {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) {
        return;
    };
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
        let indexOfImage = galleryItems.findIndex(item => item.original === refs.lightBoxImage.src);
        if (indexOfImage === galleryItems.length - 1) {
            indexOfImage = -1;
        }
        refs.lightBoxImage.src = galleryItems[indexOfImage + 1].original;
        refs.lightBoxImage.alt = galleryItems[indexOfImage + 1].description;
    }
};

function onThroughLeft(event) {
    if (event.code === 'ArrowLeft') {
        let indexOfImage = galleryItems.findIndex(item => item.original === refs.lightBoxImage.src);
        if (indexOfImage === 0) {
            indexOfImage = galleryItems.length;
        }
        refs.lightBoxImage.src = galleryItems[indexOfImage - 1].original;
        refs.lightBoxImage.alt = galleryItems[indexOfImage - 1].description;
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
