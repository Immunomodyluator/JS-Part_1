'use strict';

const shopCartIcon = document.querySelector('.rightHeader .cartIconWrap');
const cart = document.querySelector('.cart');
const cartCounter = document.querySelector('.cartIconWrap span');
const cartTotalValueEl = document.querySelector('.cartItemValue');
const cartTotalEl = document.querySelector('.cartTotal');

shopCartIcon.addEventListener('click', () => {
    console.log(cart.style.visibility);
    if (cart.style.visibility === 'hidden') {
        cart.style.visibility = 'visible';
    } else {
        cart.style.visibility = 'hidden';
    }
});

let shopItemList = {};

document.querySelector('.featuredItems').addEventListener('click', (event) => {
    console.log('click');
    if (!event.target.closest('.addToCart')) {
        console.log('aa');
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    console.log(id, name, price);
    addItemToCart(id, name, price);
});

function addItemToCart(id, name, cost) {
    if (!(id in shopItemList)) {
        shopItemList[id] = { id: id, name: name, cost: cost, count: 0 };
    }
    shopItemList[id].count++;
    cartCounter.textContent = getShopItemCount().toString();
    cartTotalValueEl.textContent = getTotalCartPrice(); /*.toFixed(2);*/
    renderItemInCart(id);
}

function getShopItemCount() {
    return Object.values(shopItemList).reduce(
        (acc, product) => acc + product.count,
        0
    );
}

function getTotalCartPrice() {
    return Object.values(shopItemList).reduce(
        (acc, product) => acc + product.cost * product.count,
        0
    );
}

function renderItemInCart(productId) {
    const cartRowEl = cart.querySelector(`.cartItem[data-id="${productId}"]`);
    if (!cartRowEl) {
        console.log('рендер');
        renderNewProductInCart(productId);
        return;
    }
    const item = shopItemList[productId];
    cartRowEl.querySelector('.productCount').textContent = item.count;
    cartRowEl.querySelector('.productTotalRow').textContent = (
        item.cost * item.count
    ).toFixed(2);
}

function renderNewProductInCart(productId) {
    const itemRow = `
    <div class='cartItem' data-id='${productId}'>
      <div class='cartItemName'>${shopItemList[productId].name}</div>
      <div class='cartItemCount'>
        <span class='productCount'>${shopItemList[productId].count}</span> шт.
      </div>
      <div class='cartItemPrice'>$${shopItemList[productId].cost}</div>
      <div class='cartItemTotal'>
        $<span class='productTotalRow'>${(
            shopItemList[productId].cost * shopItemList[productId].count
        ).toFixed(2)}</span>
      </div>
    </div>
    `;
    cartTotalEl.insertAdjacentHTML('afterbegin', itemRow);
}
