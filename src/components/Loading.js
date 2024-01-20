// export default function Loading({ $target, initialState }) {
//   this.$loading = document.createElement('section');
//   this.$loading.className = 'loading';

//   $target.appendChild(this.$loading);

//   this.state = initialState;
//   this.setState = (nextState) => {
//     this.state = nextState;
//     this.render();
//     console.log('loading');
//   };

//   this.render = () => {
//     this.$loading.innerHTML = '<div>Loading...</div>';
//     this.$loading.style.display = this.state ? 'block' : 'none';
//   };
// }

export default function Loading({ $target }) {
  this.$loading = document.createElement('section');
  this.$loading.className = 'loading';
  this.$loading.innerHTML = '<div>Loading...</div>';
  $target.appendChild(this.$loading);

  this.loadingStart = () => {
    this.$loading.style.display = 'block';
  };

  this.loadingEnd = () => {
    this.$loading.style.display = 'none';
  };
}
