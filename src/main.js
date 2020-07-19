import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from "firebase";
import {firebaseConfig} from './config/firebase-config.js'
Vue.config.productionTip = false
// console.log(firebaseConfig, 'firebaseConfig');
firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(configOptions);
// firebase.auth().signOut()
// firebase.auth().$ = 'iw';
// firebase.auth().$ = i18n.locale;
firebase.auth().languageCode = 'fr';
firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
    // store.dispatch("fetchAnonymousUser", user);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
