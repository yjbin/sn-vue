<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadCrumb">
    <el-breadcrumb-item v-for="(item,index) in breadList" :key="item.path" v-if='item.meta.title'>
      <span v-if='item.redirect==="noredirect"||index==breadList.length-1' class="no-redirect">{{item.meta.title}}</span>
      <router-link v-else :to="item.redirect||item.path" tag="span">{{item.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      breadList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.breadList = matched;
    }
  }
};
</script>
<style lang="scss" scoped>
.breadCrumb {
  padding: 0 20px;
  line-height: 55px;
  border-bottom: 1px dotted #dedede;
}
</style>
<style lang="scss">
.breadCrumb {
  .el-breadcrumb__inner span {
    color: #5b93d3;
    cursor: pointer;
  }
}
</style>
