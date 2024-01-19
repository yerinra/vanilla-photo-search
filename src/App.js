import api from './api.js';

import Header from './components/Header.js';
import ImageInfo from './components/ImageInfo.js';
import Loading from './components/Loading.js';
import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';
import ErrorMessage from './components/ErrorMessage.js';
import Keywords from './components/Keywords.js';

export default function App($target) {
  this.$header = new Header($target);

  this.state = {
    loading: false,
    error: false,
    visible: false,
    image: null,
    data: [],
    keywords: [],
  };

  this.searchInput = new SearchInput({
    $target,
    onSearch: async (keyword) => {
      this.setState({ ...this.state, loading: true });
      const res = await api.fetchKeyword(keyword);
      console.log(res.results);

      if (res.results == null || res.results.length === 0) {
        this.setState({ ...this.state, error: true, loading: false });
      } else {
        let nextKeyword = [
          ...this.state.keywords.filter((word) => word !== keyword),
          keyword,
        ];

        if (nextKeyword.length > 5) {
          nextKeyword = nextKeyword.slice(0, 5);
        }
        this.setState({
          ...this.state,
          image: null,
          loading: false,
          data: res.results,
          keywords: nextKeyword,
        });
      }
    },
    onRandom: async () => {
      this.setState({ ...this.state, loading: true });
      const res = await api.fetchRandom();
      if (res != null) {
        this.setState({
          ...this.state,
          image: null,
          loading: false,
          data: [res],
        });
      }
    },
  });

  this.loading = new Loading({ $target, initialState: this.state.loading });
  this.error = new ErrorMessage({ $target, initialState: this.state.error });

  this.keywords = new Keywords({
    $target,
    initialState: this.state.keywords,
    onClick: async (keyword) => {
      this.setState({ ...this.state, loading: true });
      const data = await api.fetchKeyword(keyword);

      const nextKeyword = [
        ...this.state.keywords.filter((word) => word !== keyword),
        keyword,
      ];

      this.setState({
        ...this.state,
        data: data.results,
        loading: false,
        keywords: nextKeyword,
      });
    },
  });

  this.searchResult = new SearchResult({
    $target,
    initialData: this.data,
    onClick: async (photoId) => {
      this.setState({ ...this.state, loading: true });
      const res = await api.fetchSingle(photoId);
      if (res != null) {
        this.setState({
          ...this.state,
          loading: false,
          visible: true,
          image: res,
        });
      }
    },
  });

  this.imageInfo = new ImageInfo({
    $target,
    data: {
      visible: false,
      image: null,
    },
    onExit: () => {
      this.setState({ ...this.state, visible: false, image: null });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.searchResult.setState(this.state.data);
    localStorage.setItem('data', JSON.stringify(nextState.data));
    this.imageInfo.setState({
      image: this.state.image,
      visible: this.state.visible,
    });
    this.loading.setState(this.state.loading);
    this.error.setState(this.state.error);
    this.keywords.setState(this.state.keywords);
  };
}
