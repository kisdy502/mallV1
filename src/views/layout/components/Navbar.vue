<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <breadcrumb></breadcrumb>
    </el-menu>
</template>

<script type="text/javascript">
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { mapGetters } from 'vuex'
export default {
    name: "navBar",
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'avatar'
        ])
    },
    components: {
        Breadcrumb,
        Hamburger,
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .hamburger-container {
        line-height: 54px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
}
</style>
