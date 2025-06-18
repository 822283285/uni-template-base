<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { $c } from "./utils/xh-utils";

onLaunch(() => {
  console.log("App Launch");
  console.log($c.getCurrentTheme())
  setTimeout(()=>{
	  uni.setTabBarStyle({
	    backgroundColor: $c.getColor('bg-base'),
	    color: $c.getColor('text-secondary'),
	    selectedColor: $c.getColor('text-base'),
      borderStyle: $c.getCurrentTheme() == 'dark' ? 'white' : 'black',
	  })
	  uni.setNavigationBarColor({
	    frontColor: $c.getColor('status-light'),
	  })
  },0)
  
});
onShow(() => {
  console.log("App Show");

});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
/* 引入sard组件库样式 */
@import 'sard-uniapp/index.scss';

/* 重置样式 */
page {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
}
</style>
