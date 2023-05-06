<template>
  <div class="app-wrapper" :class="classObj">
    <left-menu class="left-nav"></left-menu>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import AppMain from "./components/AppMain.vue";
import LeftMenu from "./components/LeftMenu.vue";
export default {
  name: "appLayout",
  components: {
    AppMain,
    LeftMenu,
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        mobile: this.device === "mobile",
      };
    },
  },

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>