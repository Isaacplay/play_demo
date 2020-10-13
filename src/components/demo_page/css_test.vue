<template>
	<div class="container">
    <div class="demo-box">
      箭头旋转：
      <div class="closeBox">
        <img src="../../assets/exchange rate.png" alt="">
      </div>
    </div>
		
	</div>
</template>
<script type="text/ecmascript-6">
var flvPlayer;
export default {
	name: 'css_test',
	data () {
		return {
		}
	},
	mounted () {

	},
	methods: {

	},
}
</script>

<style scoped>
.container {
	padding: 10px 5px;
  display: flex;
}
.demo-box{
  margin: 0 20px;
  padding: 30px;
  width: 512px;
  border: black 1px solid;
  display: flex;
  align-items: center;
}
.closeBox {
	display: inline-block;
	width: 50px;
	height: 50px;
	transition: transform 0.5s;
	-moz-transition: -moz-transform 0.5s; /* Firefox 4 */
	-webkit-transition: -webkit-transform 0.5s; /* Safari 和 Chrome */
	-o-transition: -o-transform 0.5s;
}
.closeBox img{
  width: 100%;
  height: 100%;
}
.closeBox:hover {
	transform: rotate(180deg);
	-webkit-transform: rotate(180deg);
	-moz-transform: rotate(180deg);
	-o-transform: rotate(180deg);
}
</style>
