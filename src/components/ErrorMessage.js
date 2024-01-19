export default function ErrorMessage({ $target, initialState }) {
  this.$error = document.createElement('section');
  this.$error.className = 'error';

  $target.appendChild(this.$error);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$error.innerHTML = '<div>No Results.</div>';
    this.$error.style.display = this.state ? 'block' : 'none';
  };
}
