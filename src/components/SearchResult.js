/* eslint-disable camelcase */
export default function SearchResult({ $target, initialData, onClick }) {
  this.$searchResult = document.createElement('section');
  this.$searchResult.className = 'SearchResult';
  $target.appendChild(this.$searchResult);

  this.state = initialData;
  this.setState = (newData) => {
    this.state = newData;
    this.render();
  };

  this.render = () => {
    this.$searchResult.innerHTML = this.state
      .map(
        ({ alt_description, urls, id }) => `
            <div class="item" title=${id}>
              <img src=${urls.regular} alt=${alt_description} id=${id} />
            </div>
          `,
      )
      .join('');
  };

  this.init = () => {
    const LastResultData = JSON.parse(localStorage.getItem('data'));
    if (LastResultData) this.setState(LastResultData);
    this.$searchResult.addEventListener('click', (e) => {
      const $target = e.target.closest('.item');
      if (!$target) return;
      onClick(e.target.id);
    });
  };

  this.init();
}
