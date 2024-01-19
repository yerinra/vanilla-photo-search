export const setLocalStorage = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
};

export const getLocalStorage = () => JSON.parse(localStorage.getItem('data'));

export const setKeywordHistory = (data) => {
  localStorage.setItem('keywordHistory', JSON.stringify(data));
};

export const getKeywordHistory = () =>
  JSON.parse(localStorage.getItem('keywordHistory'));
