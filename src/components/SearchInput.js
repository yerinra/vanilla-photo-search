import DarkModeBtn from './DarkModeBtn.js';
import RandomBtn from './RandomBtn.js';

export default function SearchInput({ $target, onSearch, onRandom }) {
  this.$container = document.createElement('div');
  this.$container.className = 'searchInputContainer';
  $target.appendChild(this.$container);

  this.darkModeBtn = new DarkModeBtn({ $target: this.$container });
  this.$input = document.createElement('input');
  this.$input.className = 'searchInput';
  this.$input.placeholder = 'Search...';
  this.randomBtn = new RandomBtn({ $target: this.$container, onRandom });
  this.$container.appendChild(this.$input);

  window.addEventListener('DOMContentLoaded', () => {
    this.$input.focus();
  });

  this.$input.addEventListener('click', (e) => {
    if (e.target.value.length > 0) this.$input.value = '';
  });

  this.$input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  });
}
