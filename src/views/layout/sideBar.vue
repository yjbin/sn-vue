<template>
  <el-menu mode="vertical" unique-opened :default-active="$route.path"  background-color="#fff"  >
    <el-menu-item index="" class="sideBar_title">功能菜单</el-menu-item>
    <sidebar-item :routes="permission_routers"></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./sideBar_item";

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(["permission_routers"])
  }
};
</script>
<style lang="scss" scoped>
.sideBar_title {
  border-bottom: 1px solid #fff;
}
</style>
