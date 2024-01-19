export default function Loading({ $target, initialState }) {
  this.$loading = document.createElement('section');
  this.$loading.className = 'loading';

  $target.appendChild(this.$loading);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    // console.log('loading');
  };

  this.render = () => {
    this.$loading.innerHTML = '<div>Loading...</div>';
    this.$loading.style.display = this.state ? 'block' : 'none';
  };
}
