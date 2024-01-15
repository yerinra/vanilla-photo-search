import api from './api.js';
import DarkModeBtn from './components/DarkModeBtn.js';
import Image from './components/Image.js';
import Loading from './components/Loading.js';
import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';

export default function App($target) {
  this.$darkModeBtn = new DarkModeBtn({ $target });
  this.$loading = new Loading($target);
  this.data = [];
  this.searchInput = new SearchInput({
    $target,
    onSearch: async (keyword) => {
      let res = null;
      // this.loading.startLoading();
      res = await api.fetchKeyword(keyword);
      if (res != null) {
        // this.loading.finishLoading();
        this.setState(res.results);
      }
    },
    onRandom: async () => {
      let res = null;
      // this.loading.startLoading();
      res = await api.fetchRandom();
      if (res != null) {
        // this.loading.finishLoading();
        this.setState([res]);
      }
    },
  });

  this.searchResult = new SearchResult({
    $target,
    initialData: this.data,
    onClick: async (photoId) => {
      let res = null;
      // this.loading.startLoading();
      res = await api.fetchSingle(photoId);
      if (res != null) {
        // this.loading.finishLoading();
        this.imageInfo.setState({
          visible: true,
          image: res,
        });
      }
    },
  });

  this.imageInfo = new Image({
    $target,
    data: {
      visible: false,
      image: null,
    },
  });

  this.setState = (nextData) => {
    localStorage.setItem('data', JSON.stringify(nextData));

    // console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  };
}
