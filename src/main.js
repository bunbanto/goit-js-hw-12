import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, clearGallery } from './js/render-functions.js';
import { showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');

hideLoader();
form.addEventListener('submit', event => {
  event.preventDefault();

  const searchText = event.target.elements['search-text'].value.trim();
  if (!searchText) {
    iziToast.error({
      message: 'Please enter a search term!',
      titleColor: '#FFFFFF',
      messageColor: '#FFFFFF',
      color: '#B51B1B',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  clearGallery();

  fetchImages(searchText)
    .then(images => renderGallery(images))
    .catch(error => iziToast.error({ message: error }))
    .finally(() => hideLoader());
});
