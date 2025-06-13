<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");

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
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
}
</style>
