import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
      <a href="${image.largeImageURL}">
      <img class="img" src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="wrapper">
     <p class="text">Likes<span class="span">${image.likes}</span></p>
        <p class="text">Views<span class="span">${image.views}</span></p>
        <p class="text">Comments<span class="span">${image.comments}</span></p>
        <p class="text">Downloads<span class="span">${image.downloads}</span></p>
        </div>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}
