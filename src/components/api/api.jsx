import axios from 'axios';

const api = async (query, page) => {
  const searchParams = new URLSearchParams({
    q: query,
    page,
    key: '39383410-163fa90d28e607aa13527d20b',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const { data } = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  if (data.totalHits === 0) {
    throw new Error('Nothing Found');
  }
  return data;
};
