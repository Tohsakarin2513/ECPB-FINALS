// Adds a live item count to the cart navigation link.
(function () {
  const cartLink = document.querySelector('.topbar a[data-page="cart"]');
  const cartItems = document.getElementById('cart-items');
  if (!cartLink || !cartItems) return;

  const badge = document.createElement('span');
  badge.className = 'cart-count';
  badge.setAttribute('aria-label', 'items in cart');
  cartLink.append(' ', badge);

  function updateCartCount() {
    const count = [...cartItems.querySelectorAll('.cart-item')]
      .reduce((total, item) => total + Number(item.dataset.quantity || 1), 0);
    badge.textContent = count;
    badge.hidden = count === 0;
    cartLink.setAttribute('aria-label', `My Cart, ${count} ${count === 1 ? 'item' : 'items'}`);
  }

  new MutationObserver(updateCartCount).observe(cartItems, { childList: true, subtree: true });
  updateCartCount();
})();
