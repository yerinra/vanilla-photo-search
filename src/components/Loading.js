export default function Loading($target) {
  this.$loading = document.createElement('div');
  this.$loading.className = 'loading';
  this.$loading.innerHTML = '<div>Loading...</div>';
  $target.appendChild(this.$loading);

  this.startLoading = () => {
    this.$loading.style.display = 'block';
  };
  this.endLoading = () => {
    this.$loading.style.display = 'none';
  };
}
