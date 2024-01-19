export default function RandomBtn({ $target, onRandom }) {
  this.$randomBtn = document.createElement('button');
  this.$randomBtn.innerText = 'Random photo';
  this.$randomBtn.className = 'randomBtn';
  $target.appendChild(this.$randomBtn);

  this.$randomBtn.addEventListener('click', () => {
    onRandom();
  });
}
