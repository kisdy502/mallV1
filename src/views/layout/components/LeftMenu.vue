<template>
  <div id="app">
    <el-menu mode="vertical" :show-timeout="200" :collapse="isCollapse" :default-active="$route.path"
      background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sub-item :routes="routers"></sub-item>
    </el-menu>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SubItem from "./SubItem.vue";
export default {
  components: { SubItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'routers'
    ]),
    routes() {
      // return this.$router.options.routes
      return this.routers
    },
    isCollapse() {
      return !this.sidebar.opened
    }

  }
}



</script>

<style></style>
