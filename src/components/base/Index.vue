<template>
  <div class="container" >
    <div v-for="item in data_list" class="con-item" @click="goto_demo(item)" ><div>{{item.name}}</div></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Index',
    data () {
      return {
        data_list:[
          {name:'flv.js',val:'flv'},
          {name:'solt',val:'solt'},{name:'css_test',val:'css_test'}
        ],
      }
    },
    mounted () {
      console.log('123')
    },
    methods: {
      goto_demo(item){
        this.$router.push({name: item.val});
      }

    },
  }
</script>

<style scoped>
.container{
  padding: 10px 30px;
  display: flex;
  flex-wrap: wrap;
}
.con-item{
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100px;
  padding: 20px;
  background-color: rgb(245,245,245);
  margin-right: 15px;
}

</style>
