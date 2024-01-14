const API_ENDPOINT = 'https://api.unsplash.com';
const API_KEY = 'ONXnrMPkIrJRUkkMj9oQ9mZl8Bw9c8PVwATaSotHFI4';
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

export const request = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('error!!!');
    }
    return await res.json();
  } catch (error) {
    console.err(error);
  }
};

const api = {
  fetchRandom: () =>
    request(`${API_ENDPOINT}/photos/random?client_id=${API_KEY}`),
  fetchAll: () => request(`${API_ENDPOINT}/photos?client_id=${API_KEY}`),
  fetchSingle: (photoId) =>
    request(`${API_ENDPOINT}/photos/${photoId}?client_id=${API_KEY}`),
};
export default api;
