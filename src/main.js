import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', handleSubmit);

hideLoader();

function handleSubmit(event) {
  event.preventDefault();
  clearGallery();
  showLoader();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
    });
    hideLoader();
    return;
  }

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          message: 'Sorry, there are no images matching your search query.',
        });
        return;
      }
      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
}
