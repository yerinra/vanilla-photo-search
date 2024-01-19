export default function Loading({ $target, initialState }) {
  this.$loading = document.createElement('div');
  this.$loading.className = 'loading';

  $target.appendChild(this.$loading);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$loading.innerHTML = '<div>Loading...</div>';
    this.$loading.style.display = this.state ? 'block' : 'none';
  };
}
