export default function SearchInput({ $target, onSearch, onRandom }) {
  this.$container = document.createElement('div');
  this.$container.className = 'searchInputContainer';
  $target.appendChild(this.$container);

  this.$input = document.createElement('input');
  this.$input.className = 'searchInput';
  this.$input.placeholder = '키워드를 검색해서 사진을 찾아보세요.';

  this.$randomBtn = document.createElement('button');
  this.$randomBtn.innerText = 'Random photos';
  this.$randomBtn.className = 'randomBtn';
  this.$container.appendChild(this.$randomBtn);

  this.$keywords = document.createElement('div');
  this.$keywords.className = 'keywords';
  $target.appendChild(this.$keywords);

  this.$container.appendChild(this.$input);

  this.keywords = [];

  this.$randomBtn.addEventListener('click', () => {
    onRandom();
  });

  this.$input.addEventListener('DOMContentLoaded', () => {
    this.$input.focus();
  });

  this.$input.addEventListener('click', (e) => {
    if (e.target.value.length > 0) this.$input.value = '';
  });

  this.$input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
      this.keywords.push(e.target.value);
      if (this.keywords.length > 5) {
        this.keywords.shift();
      }
      console.log(this.keywords);
      this.render();
    }
  });

  this.render = () => {
    this.$keywords.innerHTML = this.keywords.map(
      (keyword) => `<span class='keyword'>${keyword}</span>`,
    );

    this.$keywords.addEventListener('click', (e) => {
      const $k = e.target.closest('.keyword');
      if (!$k) return;
      onSearch($k.innerText);
      this.$input.value = $k.innerHTML;
    });
  };
}
