import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vue from 'vue'

new Vue({
    vuetify,
    router,
    render: h => h(App),
}).$mount('#app');