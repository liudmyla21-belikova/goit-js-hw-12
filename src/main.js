import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more-btn');
let query = '';
let page = 1;
const per_page = 15;

function getTotalPages(totalHits, per_page) {
  return Math.ceil(totalHits / per_page);
}
form.addEventListener('submit', handleSubmit);

hideLoader();
hideLoadMoreButton();

async function handleSubmit(event) {
  event.preventDefault();
  clearGallery();
  showLoader();
  hideLoadMoreButton();

  query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
    });
    hideLoader();
    return;
  }

  try {
    const data = await getImagesByQuery(query, page);
    const { hits, totalHits } = data;
    const per_page = 15;

    createGallery(hits);

    if (page >= Math.ceil(totalHits / per_page)) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

loadMoreBtn.addEventListener('click', async () => {
  page++;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const itemHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: itemHeight * 2,
        behavior: 'smooth',
      });
    }

    if (page >= getTotalPages(data.totalHits, per_page)) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
