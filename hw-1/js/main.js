'use strict';
const products = [
    { id: 1, title: 'Notebook', price: 1000, photo: 'https://picsum.photos/200/300?random=1' },
    { id: 2, title: 'Mouse', price: 100, photo: 'https://picsum.photos/200/300?random=2' },
    { id: 3, title: 'Keyboard', price: 250, photo: 'https://picsum.photos/200/300?random=3' },
    { id: 4, title: 'Gamepad', price: 150, photo: 'https://picsum.photos/200/300?random=4' },
];

let product = document.querySelector('.products');

const renderProduct = (title, photo, price) => {
    return product.insertAdjacentHTML('beforeend',
        `<div class="product-item">
    <h3 class='title'>${title}</h3>
    <img src=${photo} alt="picture">
    <p class='price'>${price}</p>
    <button class="by-btn">Добавить</button>
  </div>`);
}

const renderProducts = products => {
    products.forEach(item => {
        renderProduct(item.title, item.photo, item.price);
    });
};

renderProducts(products);


// Данный вариант также убирает запятую, но реализован без функции.
// for (let i = 0; i < products.length; i++) {
//     let productList = renderProduct(products[i].title, products[i].photo, products[i].price);
//     product.insertAdjacentHTML('beforeend', productList);
// }



