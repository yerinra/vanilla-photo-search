export default function DarkModeBtn($target) {
  this.$btn = document.createElement('button');
  $target.append(this.$btn);
  this.$btn.innerHTML = 'DarkMode';

  const savedTheme = localStorage.getItem('theme');

  window.addEventListener('DOMContentLoaded', () => {
    if (savedTheme) {
      document.documentElement.setAttribute(
        'data-theme',
        savedTheme === 'dark' ? 'dark' : 'light',
      );
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });

  this.$btn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    localStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark');
    document.documentElement.setAttribute(
      'data-theme',
      currentTheme === 'dark' ? 'light' : 'dark',
    );
  });
}
