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
const cartedProducts = [];
const allProducts = document.querySelectorAll('.product-card');

const getImgOfProductCard = function (product) {
  const startIndex = product.innerHTML.indexOf('img/');
  const endIndex = product.innerHTML.indexOf('.jpg');
  const productImg = product.innerHTML.slice(startIndex, endIndex + 4);
  return productImg;
};

const persistProductCarted = function (products) {
  localStorage.setItem('cartedProducts', JSON.stringify(products));
};

const retrieveProductCarted = function () {
  localStorage.getItem('cartedProducts') &&
    cartedProducts.push(...JSON.parse(localStorage.getItem('cartedProducts')));
};

// localStorage.clear();

const addProduct = function (className) {
  const product = this.closest('.product-card');

  const productImg = getImgOfProductCard(product);

  product.classList.toggle(className);

  if (product.classList.contains(className)) cartedProducts.push(productImg);
  else cartedProducts.splice(cartedProducts.indexOf(productImg), 1);

  persistProductCarted(cartedProducts);
};

const persistItem = function (arr) {
  localStorage.setItem('cartedItem', JSON.stringify(arr));
};

const retrieveItem = function () {
  localStorage.getItem('cartedItem') &&
    cartedItemsArr.push(...JSON.parse(localStorage.getItem('cartedItem')));
};

const cartedItemsArr = [];

const cartItems = function (item) {
  if (cartedItemsArr.every(obj => obj.img !== item.img))
    cartedItemsArr.push(item);
  persistItem(cartedItemsArr);
};

const deCartItems = function (item) {
  cartedItemsArr.forEach(obj => {
    if (obj.img === item.img) cartedItemsArr.splice(obj, 1);
  });
  persistItem(cartedItemsArr);
};

const createItemObj = function () {
  const product = this.closest('.product-card');
  const img = product.querySelector('.product-card__img').src;
  const imgStartIndex = img.indexOf('img/');
  const price = product.querySelector('.product-card__price').innerText;
  const item = {
    img: img.slice(imgStartIndex),
    price: price,
  };
  if (product.classList.contains('carted')) cartItems(item);
  else deCartItems(item);
};

document.addEventListener('DOMContentLoaded', function () {
  renderIcons();
  retrieveProductCarted();
  retrieveItem();

  bookmarkIcons = document.querySelectorAll('.bookmark-icon');
  cartIcons = document.querySelectorAll('.cart-icon');
  bookmarkIcons.forEach(icon =>
    icon.addEventListener('click', addProduct.bind(icon, 'bookmarked'))
  );
  cartIcons.forEach(icon => {
    icon.addEventListener('click', function () {
      addProduct.call(icon, 'carted');
      createItemObj.call(icon);
    });
  });

  allProducts.forEach(product => {
    const productImg = getImgOfProductCard(product).replace('-lazy', '');
    const productsCarted = cartedProducts;

    productsCarted.forEach(src => {
      if (src === productImg) product.classList.add('carted');
    });
  });
});

const cartContainer = document.querySelector('.cart__container');

const clearCartContainer = function () {
  cartContainer.innerHTML = '';
};

const renderCartedItems = function (items) {
  const headHTML = `
    <h2 class="heading-tertiary h3">
      Cart <span class="cart__items-count">(${items.length} items)</span>
    </h2>
  `;
  cartContainer.insertAdjacentHTML('beforeend', headHTML);

  items.forEach(item => {
    const itemHTML = `
      <div class="row row cart__item gy-4 pt-4">
        <div class="item-col col-sm-6 col-lg-3">
          <div class="cart__img">
            <img
              src="../${item.img}"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
        <div class="cart__details col-sm-6 col-lg-4">
          <h3 class="cart__heading m-0">Product name</h3>
          <p class="cart__cat">Product category</p>
          <p class="m-0">Color: Grey</p>
          <p class="mb-5">Size: XL</p>
          <p class="cart__action">Remove from cart</p>
          <br />
          <p class="cart__action">Move to bookmarks</p>
        </div>
        <div class="cart__quan col-sm-6 col-lg-4">
          <label for="quan" class="form-label pe-2">Quantity</label>
          <input
            type="number"
            class="form-control d-inline-block w-25"
            id="quan"
            placeholder="1"
            min="1"
          />
        </div>
        <div class="cart__price col-sm-6 col-lg-1 text-lg-end">
          <p>${item.price}</p>
        </div>
      </div>
    `;

    cartContainer.insertAdjacentHTML('beforeend', itemHTML);
  });
};

if (window.location.pathname === '/html/cart.html') {
  window.addEventListener('DOMContentLoaded', function () {
    cartedItemsArr.length && clearCartContainer();
    renderCartedItems(cartedItemsArr);
  });
}
