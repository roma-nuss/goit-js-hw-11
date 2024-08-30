import { fetchImages } from './js/pixabay-api.js';
import { renderGalleryItems } from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-query');
const gallery = document.querySelector('#gallery');
const loader = document.querySelector('.loader');

let lightbox;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (query === '') {
    iziToast.warning({
      message: 'Please enter a valid search query.',
      messageColor: '#fafafb',
      messageLineHeight: '1.5px',
      messageSize: '16px',
      backgroundColor: '#ffcc00',
      position: 'topRight',
    });
    return;
  }

  loader.style.display = 'block';

  try {
    const data = await fetchImages(query);
    renderGalleryItems(data, gallery, lightbox);
  } catch (error) {
    console.error(error);
  } finally {
    loader.style.display = 'none';
  }
});
