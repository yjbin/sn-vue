<template>
  <el-scrollbar class="page-component__scroll">
    <el-menu mode="vertical" unique-opened :default-active="$route.path"   @select="handleselect"  class="el-menu-vertical-demo">
      <!-- <el-menu-item index="" class="sideBar_title">功能菜单</el-menu-item> -->
      <sidebar-item :routes="permission_routers"  :proObj="aloneMenu"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./sideBar_item";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routers"])
  },
  data() {
    return {
      aloneMenu: {
        path: null,
        num: ""
      }
    };
  },
  methods: {
    handleselect(key, keyPath) {
      let str = key;
      (str = str.substring(str.indexOf("/") + 1, str.indexOf("/", 2))),
        (this.aloneMenu = {
          path: "/" + str,
          num: Math.random()
        });
    }
  },
  mounted() {
    let str = this.$route.path;
    str = str.substring(str.indexOf("/") + 1, str.indexOf("/", 2));
    this.aloneMenu = {
      path: "/" + str,
      num: Math.random()
    };
  }
};
</script>
<style lang="scss" scoped>
.sideBar_title {
  border-bottom: 1px solid #fff;
}
</style>
