<template>
  <div id="app">
    <el-menu default-active="2" @open="handleOpen" @close="handleClose" mode="vertical" :show-timeout="200"
      :collapse="isCollapse" :default-active="$route.path" background-color="#304156" text-color="#bfcbd9"
      active-text-color="#409EFF">
      <sub-item :routes="routers"></sub-item>
    </el-menu>

  </div>
</template>
<script lang="ts" setup>

import SubItem from "./SubItem.vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ref, onMounted, computed } from "vue";
import { useStore, mapGetters } from 'vuex';
const isNest = ref(false);
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
onMounted(() => {
  console.log("挂载后");
})

//计算属性的使用
const reverseMsg = computed(() => {
  // ...mapGetters(['sidebar', 'routers']),
  return "test1243"
});

const $store = useStore()
const routers = computed(() => $store.getters.routers)

//let menuNode = CircularJSON.stringify(routers)

//const routers = computed(() => useGetters(['routers']))

//console.log("routes:::"+menuNode);

function hasMultiShowingChildren(children) {
  if (children != null) {
    const showingChildren = children.filter(item => {
      return !item.hidden
    })
    if (showingChildren.length > 1) {
      return true
    }
    return false
  }
  return false

}

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


</script>

<style></style>
