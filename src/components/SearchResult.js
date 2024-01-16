/* eslint-disable camelcase */
export default function SearchResult({ $target, initialData, onClick }) {
  this.$searchResult = document.createElement('section');
  this.$searchResult.className = 'SearchResult';
  $target.appendChild(this.$searchResult);

  this.data = initialData;
  this.setState = (newData) => {
    if (newData.length === 0) {
      this.$searchResult.innerHTML = '<h2>검색 결과가 없습니다</h2>';
    } else {
      this.data = newData;
      this.render();
      console.log(this.data);
    }
  };

  this.render = () => {
    this.$searchResult.innerHTML = this.data
      .map(
        ({ alt_description, urls, id }) => `
            <div class="item" title=${id}>
              <img src=${urls.small} alt=${alt_description} id=${id} />
            </div>
          `,
      )
      .join('');
  };

  this.init = () => {
    const $LastResultData = JSON.parse(localStorage.getItem('data'));
    if ($LastResultData) this.setState($LastResultData);

    this.$searchResult.addEventListener('click', (e) => {
      onClick(e.target.id);
    });
  };

  this.init();
}
