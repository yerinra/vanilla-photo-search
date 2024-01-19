export default function lazy() {
  const lazyImages = [...document.querySelectorAll('img')];

  const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove('lazy');
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  lazyImages.forEach((lazyImage) => {
    lazyImageObserver.observe(lazyImage);
  });
}
