export default function Header($target) {
  this.$header = document.createElement('h1');
  this.$header.className = 'header';
  this.$header.innerHTML = 'Photo Search';
  $target.appendChild(this.$header);
}
