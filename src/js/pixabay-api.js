import axios from 'axios';

const API_KEY = '50801128-9bde19728bc3e6666ae5ca17b';

export function getImagesByQuery(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return axios.get(`https://pixabay.com/api/?${params}`).then(({ data }) => {
    if (data.hits.length === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    return data;
  });
}
