export default function DarkModeBtn({ $target }) {
  this.$btn = document.createElement('button');
  $target.appendChild(this.$btn);

  this.$btn.innerHTML = 'Theme Change';

  const savedTheme = localStorage.getItem('theme');

  window.addEventListener('DOMContentLoaded', () => {
    if (savedTheme) {
      document.documentElement.setAttribute(
        'data-theme',
        savedTheme === 'dark' ? 'dark' : 'light',
      );
      this.$btn.innerHTML = savedTheme === 'dark' ? 'light' : 'dark';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      this.$btn.innerHTML = 'dark';
    }
  });

  this.$btn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    localStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark');
    document.documentElement.setAttribute(
      'data-theme',
      currentTheme === 'dark' ? 'light' : 'dark',
    );
    this.$btn.innerHTML = currentTheme === 'dark' ? 'dark' : 'light';
  });
}
