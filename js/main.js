const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    searchLine: '',
    filterItems: [],
    products: [],
    cartItems: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgCart: 'https://via.placeholder.com/50x100',
    isVisibleCart: false,
  },

  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },

    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
              find.quantity++;
            } else {
              let prod = Object.assign({ quantity: 1 }, product);
              this.cartItems.push(prod)
            }
          } else {
            alert('Error');
          }
        })
    },

    remove(cartItem) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (cartItem.quantity > 1) {
              cartItem.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(cartItem), 1)
            }
          }
        })
    },

    filterGoods() {
      let regexp = new RegExp(this.searchLine, 'i');
      this.filterItems = this.products.filter(el => regexp.test(el.product_name));
    }
  },
  mounted() {
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.cartItems.push(el);
        }
      });

    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filterItems.push(el);
        }
      });
  }
})


