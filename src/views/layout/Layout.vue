<template>
  <div class="app-wrapper" :class="classObj">
    <left-menu class="left-nav"></left-menu>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import AppMain from "./components/AppMain.vue";
import LeftMenu from "./components/LeftMenu.vue";

// import ResizeMixin from './mixin/ResizeHandler.js'

const { body } = document
const WIDTH = 1024
const RATIO = 3


export default {
  name: "appLayout",
  components: {
    AppMain,
    LeftMenu,
    Navbar,
  },
  //mixins: [ResizeMixin],
  computed: {
    device() {
      return this.$store.state.app.device
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },

  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.$store.dispatch('ToggleDevice', 'mobile')
      this.$store.dispatch('CloseSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        this.$store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          this.$store.dispatch('CloseSideBar', { withoutAnimation: true })
        }
      }
    }
  }

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