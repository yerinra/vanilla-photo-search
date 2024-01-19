export default function Keywords({ $target, initialState, onClick }) {
  this.$section = document.createElement('section');
  this.$section.className = 'keywords';
  $target.appendChild(this.$section);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    console.log('keyword', this.state);
    this.$section.innerHTML = this.state
      .map(
        (keyword) => `
    <button class='keyword'>${keyword}</button>
    `,
      )
      .join('');
  };

  this.$section.addEventListener('click', (e) => {
    const $keywordItem = e.target.closest('.keyword');
    if (!$keywordItem) return;

    const keyword = $keywordItem.innerText;

    const $input = document.querySelector('.searchInput');
    $input.value = keyword;

    onClick(keyword);
  });
}
