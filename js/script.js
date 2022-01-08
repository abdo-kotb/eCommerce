const lazyImgs = document.querySelectorAll('[data-behavior="lazy"]');

const revealImgs = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting || !entry) return;
    const { target } = entry;

    target.src = target.src.replace('-lazy', '');
    target.addEventListener('load', function () {
      target.classList.remove('lazy-img');
    });
    observer.unobserve(target);
  });
};

const observeLazy = new IntersectionObserver(revealImgs, {
  rootMargin: '100px',
});

lazyImgs.forEach(img => observeLazy.observe(img));

const marketImgs = document.querySelectorAll('.market__img');

marketImgs.forEach(img =>
  img.addEventListener('click', function () {
    const marketCard = img.closest('.market__card');
    marketCard.classList.toggle('bookmarked');
  })
);

// render bookmark and cart icons
const renderIcons = function () {
  const products = document.querySelectorAll('.product-card');

  const html = `
    <div class="bookmark-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
    <div class="cart-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
  `;

  products.forEach(product => product.insertAdjacentHTML('beforeend', html));
};

let bookmarkIcons;
let cartIcons;

const addProduct = function (className) {
  const product = this.closest('.product-card');

  product.classList.toggle(className);
};

document.addEventListener('DOMContentLoaded', function () {
  renderIcons();
  bookmarkIcons = document.querySelectorAll('.bookmark-icon');
  cartIcons = document.querySelectorAll('.cart-icon');
  bookmarkIcons.forEach(icon =>
    icon.addEventListener('click', addProduct.bind(icon, 'bookmarked'))
  );
  cartIcons.forEach(icon =>
    icon.addEventListener('click', addProduct.bind(icon, 'carted'))
  );
});
