import api from './api.js';
import {
  setLocalStorage,
  getLocalStorage,
  setKeywordHistory,
  getKeywordHistory,
} from './localStorage.js';

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
    loadMore: false,
  };

  this.searchInput = new SearchInput({
    $target,
    onSearch: async (keyword) => {
      this.setState({ ...this.state, loading: true });

      try {
        const res = await api.fetchKeyword(keyword);
        if (res.results == null || res.results.length === 0) {
          this.setState({
            ...this.state,
            error: true,
            data: [],
            loading: false,
          });
        } else {
          let nextKeyword = [
            ...this.state.keywords.filter((word) => word !== keyword),
            keyword,
          ];

          if (nextKeyword.length > 5) {
            nextKeyword = nextKeyword.slice(-5);
          }
          this.setState({
            ...this.state,
            image: null,
            error: false,
            loading: false,
            data: res.results,
            keywords: nextKeyword,
          });
          setKeywordHistory(nextKeyword);
          setLocalStorage(res.results);
        }
      } catch (err) {
        this.setState({
          ...this.state,
          loading: false,
        });
        throw new Error(err.message);
      }
    },
    onRandom: async () => {
      this.setState({ ...this.state, loading: true });
      const res = await api.fetchRandom();
      if (res != null) {
        this.setState({
          ...this.state,
          loading: false,
          data: [res],
        });
        setLocalStorage([res]);
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

        error: false,
        keywords: nextKeyword,
      });
      setLocalStorage(data.results);
      setKeywordHistory(nextKeyword);
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
    this.imageInfo.setState({
      image: this.state.image,
      visible: this.state.visible,
    });
    this.loading.setState(this.state.loading);
    this.error.setState(this.state.error);
    this.keywords.setState(this.state.keywords);
  };

  this.init = () => {
    const storage = getLocalStorage();
    const keywordList = getKeywordHistory();

    // 데이터가 비어있거나, 없거나, 잘못 저장된 경우
    if (storage) {
      this.setState({
        ...this.state,
        data: storage,
      });
    } else {
      this.setState({
        ...this.state,
        data: [],
      });
    }

    if (keywordList) {
      this.setState({
        ...this.state,
        data: storage,
        keywords: keywordList,
      });
    }
    // console.log(storage);
  };

  this.init();
}
