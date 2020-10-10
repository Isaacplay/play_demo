// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    name:'1111', // this.$store.state.name
    
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  //loading: require('./assets/check_status_2.png'),
  //error: require('./assets/check_status_2.png')
})

new Vue({
  el: '#app',
  router,store,
  components: { App },
  template: '<App/>'
})
