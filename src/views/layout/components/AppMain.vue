<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <!-- <transition name="fade" mode="out-in"> -->
      <keep-alive :include="isCached">
        <component :is="Component" />
      </keep-alive>
      <!-- </transition> -->
    </router-view>

  </section>
</template>
  
<script>
export default {
  name: "AppMain",
  data() {
    return {
      isFrom: ""
    }
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
    isCached() {
      return this.$store.getters.isCached
    }
  },
  activated() {
    console.log('component activated!');
  },
  deactivated() {
    console.log('component  deactivated!');
  }
};
</script>
  

<style></style>