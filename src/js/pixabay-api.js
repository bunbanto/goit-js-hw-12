import axios from 'axios';
import { showLoader, hideLoader } from './render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '49548683-ee808159962119513bc31ef98';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(searchText) {
  // const randomPage = Math.floor(Math.random() * 50) + 1;
  showLoader();
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchText,
        image_type: 'photo',
        orientation: 'horizontal',
        // page: randomPage,
        per_page: '15',
        safesearch: true,
      },
    })
    .then(response => {
      hideLoader();
      if (response.data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          titleColor: '#FFFFFF',
          messageColor: '#FFFFFF',
          color: '#B51B1B',
          position: 'topRight',
        });
      }
      return response.data.hits;
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        message:
          'An error occurred while fetching images. Please try again later.',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        color: '#B51B1B',
        position: 'topRight',
      });

      return [];
    });
}
