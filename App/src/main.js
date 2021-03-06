import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vue from 'vue'
import './firebase'
import firebase from 'firebase/app'

Vue.config.productionTip = false;

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log(user)
  if(!app){
    app = new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})