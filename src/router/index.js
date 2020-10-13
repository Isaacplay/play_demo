import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/base/Index'

import flv from '@/components/demo_page/flv'
import solt from '@/components/demo_page/solt'
import css_test from '@/components/demo_page/css_test'
Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/Index',
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/flv',
      name: 'flv',
      component: flv,
      meta: {
        title: 'flv'
      }
    },
    {
      path: '/solt',
      name: 'solt',
      component: solt,
      meta: {
        title: 'solt'
      }
    },
    {
      path: '/css_test',
      name: 'css_test',
      component: css_test,
      meta: {
        title: 'css_test'
      }
    },
  ]
})

/**
 * 重写路由的push方法
 * 解决，相同路由跳转时，报错
 * 添加，相同路由跳转时，触发watch (针对el-menu，仅限string方式传参，形如"view?id=5")
 */
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  sessionStorage.setItem('k_route_opt', 'push');
  //if(typeof(location)=="string"){
  //  var Separator = "&";
  //  if(location.indexOf('?')==-1) { Separator='?'; }
  //  location = location + Separator + "random=" + Math.random();
  //}
  return routerPush.call(this, location).catch(error=> error)
}

//重写路由的replace方法
const routerReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  sessionStorage.setItem('k_route_opt', 'replace');
  //if(typeof(location)=="string"){
  //  var Separator = "&";
  //  if(location.indexOf('?')==-1) { Separator='?'; }
  //  location = location + Separator + "random=" + Math.random();
  //}
  return routerReplace.call(this, location).catch(error=> error)
}
