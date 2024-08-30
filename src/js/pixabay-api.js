import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '23838686-34a57fb5ee7e13f7202c685b1';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BASE_URL}?${searchParams}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fafafb',
        messageLineHeight: '1.5px',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    }

    return data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while fetching images. Please try again later.',
      messageColor: '#fafafb',
      messageLineHeight: '1.5px',
      messageSize: '16px',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    throw error;
  }
}
