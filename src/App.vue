<template>
  <div id="app">
    <transition :name="transitionName" >
      <keep-alive :include="cacheVueComponents.join(',')">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>

require('./utils/css/base.css');

export default {
  name: 'App',
  computed: {

  },
  data() {
    return {
      transitionName : '',
      cacheVueComponents: ['Root']
    }
  },
  mounted() {
  },
  methods: {

  },
  watch:{
    '$route' (to, from) {
      var route_opt = sessionStorage.getItem('k_route_opt');

      var cacheVueComponents = this.cacheVueComponents;

      var cacheComponentsStr = sessionStorage.getItem('k_cache_componets');
      if (cacheComponentsStr && cacheComponentsStr.length > 0) {
        var cacheComponents = JSON.parse(cacheComponentsStr);
        if (cacheVueComponents.length != cacheComponents.length) {
          cacheVueComponents = cacheComponents;
        }
      }

      if (route_opt == 'push') {
        // 前进
        this.transitionName = "slide-left";
        cacheVueComponents.push(to.name);
      }else if (route_opt == 'replace') {
        // 替换
        this.transitionName = "slide-left";
        cacheVueComponents.pop();
        cacheVueComponents.push(to.name);
      }else {
        // 后退
        this.transitionName = "slide-right";

        //防止返回多级
        var index = -1;
        for (var i in cacheVueComponents) {
          var component = cacheVueComponents[i];
          if (component == to.name) {
            index = Number(i);
            break;
          }
        }
        if (index != -1) {
          cacheVueComponents.splice(index+1, cacheVueComponents.length-index-1);
        }else {
          cacheVueComponents.pop();
        }

      }
      sessionStorage.removeItem('k_route_opt');

      this.cacheVueComponents = null;

      // 适用于首页tabbar切换
      if (cacheVueComponents.length > 0) {
        cacheVueComponents[0] = 'Root';
      }

      this.cacheVueComponents = cacheVueComponents;
      console.log(JSON.stringify(cacheVueComponents));
      // 将需要缓存的页面存起来
      sessionStorage.setItem('k_cache_componets', JSON.stringify(cacheVueComponents));
    }
  },

}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding:0;
  margin:0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
  width:100%;
  height:100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>
