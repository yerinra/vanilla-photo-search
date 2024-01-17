export default function DarkModeBtn({ $target }) {
  this.$btn = document.createElement('button');
  $target.appendChild(this.$btn);

  const savedTheme = localStorage.getItem('theme');

  window.addEventListener('DOMContentLoaded', () => {
    if (savedTheme) {
      document.documentElement.setAttribute(
        'data-theme',
        savedTheme === 'dark' ? 'dark' : 'light',
      );
      this.$btn.innerText = savedTheme === 'dark' ? 'light' : 'dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.$btn.innerText = 'dark';
    }
  });

  this.$btn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    localStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark');
    document.documentElement.setAttribute(
      'data-theme',
      currentTheme === 'dark' ? 'light' : 'dark',
    );
    this.$btn.innerText = currentTheme === 'dark' ? 'dark' : 'light';
  });
}
