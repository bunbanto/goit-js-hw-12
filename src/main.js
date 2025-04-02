import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollGallery,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.btnMore');

let searchQuery = '';
let page = 1;

hideLoader();
loadMoreBtn.textContent = '';
hideLoadMoreButton();

form.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = event.target.elements['search-text'].value.trim();
  if (!searchQuery) {
    iziToast.error({
      message: 'Please enter a search term!',
      titleColor: '#FFFFFF',
      messageColor: '#FFFFFF',
      color: '#B51B1B',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  showLoader();
  hideLoadMoreButton();
  clearGallery();

  try {
    const { hits, totalHits } = await getImagesByQuery(searchQuery, page);
    createGallery(hits);

    if (hits.length > 0 && totalHits > 15) {
      loadMoreBtn.textContent = 'Load more';
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      showLoader();
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again.' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  loadMoreBtn.textContent = '';
  hideLoadMoreButton();
  showLoader();
  page += 1;

  try {
    const { hits, totalHits } = await getImagesByQuery(searchQuery, page);
    createGallery(hits);
    showLoader();

    if (page * 15 < totalHits) {
      loadMoreBtn.textContent = 'Load more';
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        color: '#1B6CB5',
        position: 'topRight',
      });
    }

    scrollGallery();
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again.' });
  } finally {
    hideLoader();
  }
});
