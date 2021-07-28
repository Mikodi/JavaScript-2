'use strict';
class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = product.img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
        <h3 class='title'>${this.title}</h3>
        <img src=${this.img} alt="picture">
        <p class='price'>${this.price}</p>
        <button class="by-btn">Добавить</button>
      </div>`
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];

        this.fetchGoods();
        this.productSum();
        this.render();
    }


    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 1000, img: 'https://picsum.photos/200/300?random=1' },
            { id: 2, title: 'Mouse', price: 100, img: 'https://picsum.photos/200/300?random=2' },
            { id: 3, title: 'Keyboard', price: 250, img: 'https://picsum.photos/200/300?random=3' },
            { id: 4, title: 'Gamepad', price: 150, img: 'https://picsum.photos/200/300?random=4' },
        ]
    }

    productSum() {
        let sum = 0;
        for (const product of this.goods) {
            sum += product.price;
        }

        document.querySelector('.productSum').insertAdjacentHTML('beforeend', `<div class="prodSum">Общая сумма товаров: ${sum}</div>`);
    }

    render() {
        const block = document.querySelector(this.container);

        for (const product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

const list = new ProductList();


/*
class Basket {

//Отрисовка корзины
    renderBasket() {

    }

//Общая сумма продуктов одного вида
    productSum() {

    }

//Подсчет общей суммы в корзине
    totalSum() {

    }
}



//Добавление продукта в корзину
class NewProdInBasket {

//Отрисовка продукта в корзине
    renderProduct() {

    }
//Изменение количесва продуктов при нажатии
    addProduct() {

    }

    removeProduct() {

    }
}
*/


