'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// do not use fetch!! Only Promise!
let getRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject(('Error'));
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  })
};


class ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') { // img = './img/img.jpg'
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id_product}">
    <img src="${this.img}" alt="Some img">
    <div class="desc">
        <h3>${this.product_name}</h3>
        <p>${this.price} ₽</p>
        <button class="buy-btn"
        data-id="${this.id_product}"
        data-name="${this.product_name}"
        data-price="${this.price}">Купить</button>
    </div>
</div>`;
  }
}

class ProductList {
  constructor(container = '.products') {
    // this.container = container;
    this.container = container;
    this.goods = [];
    this.allProducts = [];

    // this._fetchGoods();
    // this._render();
    this.getProducts().then((data) => {
      this.goods = data;
      this.render();
    });
  }


  sum() {
    // return this._goods.reduce((sum, { price }) => sum + price, 0);
    return this.goods.reduce(function (sum, good) {
      return sum + good.price;
    }, 0);
  }

  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    const block = document.querySelector(this.container);
    let productObject = null;
    for (let product of this.goods) {
      productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

}

class Item {
  constructor(el, img = 'https://via.placeholder.com/200x150') {
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }
}


class Basket {
  constructor(container = '.basket_info', url = '/getBasket.json') {
    this.container = container;
    this.url = url;
    this.goods = [];
    this.allProducts = [];

    return fetch(`${API + this.url}`)
      .then(result => result.json())
      .then((data) => {
        this.goods = data.contents;
        this.render();
        this.init();
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const block = document.querySelector(this.container);
    let productObject = null;
    for (let product of this.goods) {
      productObject = new CartItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  addProduct(element) {
    return fetch(`${API}/addToBasket.json`)
      .then(result => result.json())
      .then((data) => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if (find) {
            find.quantity++;
            this.updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            this.goods = [product];
            this.render();
          }
        } else {
          alert('error');
        }
      })
  }

  removeProduct(element) {
    return fetch(`${API}/deleteFromBasket.json`)
      .then(result => result.json())
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
            find.quantity--;
            this.updateCart(find);
          } else { // удаляем
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }

  updateCart(product) {
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
  }

  init() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('del-btn')) {
        this.removeProduct(e.target);
      }
    });
    document.querySelectorAll('.product-item').forEach(el => {
      el.addEventListener('click', e => {
        if (e.target.classList.contains('buy-btn')) {
          this.addProduct(e.target);
        }
      });
    });
  }
}

class CartItem extends Item {
  constructor(el, img = 'https://via.placeholder.com/50x100') {
    super(el, img);
    this.quantity = el.quantity;
  }
  render() {
    return `<div class="cart-item" data-id="${this.id_product}">
                <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                <p class="product-title">${this.product_name}</p>
                <p class="product-quantity">Количество: ${this.quantity}</p>
            <p class="product-single-price">${this.price} за ед.</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">${this.quantity * this.price} ₽</p>
                <button class="del-btn" data-id="${this.id_product}">&times;</button>
            </div>
            </div>`
  }
}



new ProductList();
new Basket();
