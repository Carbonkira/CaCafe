const image = document.querySelector('.image-container img');
const sound = document.getElementById('rotate-sound');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const direction = currentScrollY - lastScrollY;

  image.style.transform = `rotate(${direction > 0 ? '10deg' : '-10deg'})`;

  lastScrollY = currentScrollY;
});

const button = document.querySelector('.text-container button');
button.addEventListener('click', (event) => {
  event.preventDefault();
  window.open('featured.html', '_blank');
});

const viewAllButton = document.querySelector('.view-all-button');
viewAllButton.addEventListener('click', (event) => {
  event.preventDefault();
  window.open('products.html', '_blank');
});

image.addEventListener('click', () => {
  sound.play();
});