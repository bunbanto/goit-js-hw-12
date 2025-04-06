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

    if (totalHits === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        color: '#B51B1B',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);

    if (totalHits > page * 15) {
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
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again.' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  hideLoadMoreButton();
  showLoader();
  page += 1;

  try {
    const { hits, totalHits } = await getImagesByQuery(searchQuery, page);
    createGallery(hits);

    const alreadyLoaded = page * 15;

    if (alreadyLoaded < totalHits) {
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
    iziToast.error({
      message: 'Something went wrong. Please try again.',
    });
  } finally {
    hideLoader();
  }
});
