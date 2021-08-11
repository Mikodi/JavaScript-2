const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        isHidden: true
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.isHidden = false,
                        this.$refs.error;
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

