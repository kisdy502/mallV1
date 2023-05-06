<template>
  <div id="app">
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse"
      background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <template v-for="item in routers">
        <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children && !item.alwaysShow"
          :to="item.path + '/' + item.children[0].path" :key="item.children[0].name">
          <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{ 'submenu-title-noDropdown': !isNest }">
            <span v-if="item.children[0].meta && item.children[0].meta.title" slot="title">{{ item.children[0].meta.title
            }}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-else :index="item.name || item.path" :key="item.name">
          <template slot="title">
            <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
          </template>

          <template v-for="child in item.children">
            <el-menu-item v-if="!child.hidden && child.children && child.children.length > 0" :routes="[child]"
              :key="child.path">
              <span v-if="child.meta && child.meta.title" slot="title">{{ child.meta.title }}</span>
            </el-menu-item>
            <router-link v-else :to="item.path + '/' + child.path" :key="child.name">
              <el-menu-item :index="item.path + '/' + child.path">
                <span v-if="child.meta && child.meta.title" slot="title">{{ child.meta.title }}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>

  </div>
</template>
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { useGetters } from "@/store/useGetters.js";
import { ref, onMounted, computed } from "vue";
import { useStore, mapGetters } from 'vuex';
import CircularJSON from 'circular-json'// JSON格式转化：
const isActive = ref(false);
const awesome = ref(false);
const activeIndex = ref("1");
const activeIndex2 = ref("1");
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

function hasOneShowingChildren(children) {
  if (children != null) {
    const showingChildren = children.filter(item => {
      return !item.hidden
    })
    if (showingChildren.length === 1) {
      return true
    }
    return false
  }
  return false

}


</script>

<style>
th,
tr,
td {
  font-size: 14px;
  font-weight: 400;
  color: #1d1a1a;
  line-height: 30px;
}
</style>
