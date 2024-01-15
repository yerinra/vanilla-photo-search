const API_ENDPOINT = 'https://api.unsplash.com';
const API_KEY = 'ONXnrMPkIrJRUkkMj9oQ9mZl8Bw9c8PVwATaSotHFI4';
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

async function request(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('failed to load');
  return res.json();
}

const api = {
  fetchRandom: async () =>
    request(`${API_ENDPOINT}/photos/random?client_id=${API_KEY}`),
  fetchAll: async () => request(`${API_ENDPOINT}/photos?client_id=${API_KEY}`),
  fetchKeyword: async (keyword) =>
    request(
      `${API_ENDPOINT}/search/photos?client_id=${API_KEY}&query=${keyword}`,
    ),

  fetchSingle: async (photoId) =>
    request(`${API_ENDPOINT}/photos/${photoId}?client_id=${API_KEY}`),
};
export default api;
