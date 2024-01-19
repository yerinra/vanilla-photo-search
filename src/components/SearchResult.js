/* eslint-disable camelcase */
import lazy from '../lazy.js';

export default function SearchResult({ $target, initialData, onClick }) {
  this.$container = document.createElement('section');
  this.$container.className = 'result-container';
  this.$images = document.createElement('div');
  this.$images.className = 'SearchResult';
  this.$spinner = document.createElement('div');
  this.$spinner.className = 'spinner';
  this.$spinner.innerText = 'loading...';
  this.$container.appendChild(this.$images);
  $target.appendChild(this.$container);

  this.state = initialData;
  this.setState = (newData) => {
    this.state = newData;
    this.render();
    lazy();
    // console.log('search result');
  };

  this.render = () => {
    this.$images.innerHTML = this.state
      .map(
        ({ alt_description, urls, id }) => `
        <div class="item" title=${id}>
          <img data-src=${urls.regular} alt=${alt_description} id=${id} />
        </div>
      `,
      )
      .join('');
  };

  this.init = () => {
    // const LastResultData = JSON.parse(localStorage.getItem('data'));
    // if (LastResultData) this.setState(LastResultData);
    this.$images.addEventListener('click', (e) => {
      const item = e.target.closest('.item');
      if (!item) return;
      onClick(e.target.id);
    });
  };

  this.init();
}
