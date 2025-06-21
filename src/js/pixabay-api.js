import axios from 'axios';

const API_KEY = '50801128-9bde19728bc3e6666ae5ca17b';

export async function getImagesByQuery(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });

  const response = await axios.get(`https://pixabay.com/api/?${params}`);
  const data = response.data;

  if (data.hits.length === 0) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
  return data;
}
