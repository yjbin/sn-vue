<template>
    <div class="layout">
        <navBar class="layout_navBar"></navBar>
        <div class="layout_body">
            <sideBar class="layout_sideBar"></sideBar>
            <div class="layout_main">
                <breadCrumb></breadCrumb>
                <div class="main_body">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navBar from "@/views/layout/navBar";
import sideBar from "@/views/layout/sideBar";
import breadCrumb from "@/views/layout/breadCrumb";
export default {
    components: {
        navBar,
        sideBar,
        breadCrumb
    }
};
</script>
<style>
@import "../../assets/style/style.scss";
</style>
<style lang="scss" scoped>
.layout {
    height: 100vh;
    min-width: 1000px;

    .layout_navBar {
        height: 80px;
    }
    .layout_body {
        height: calc(100% - 80px);
        .layout_sideBar {
            float: left;
            height: 100%;
            width: 200px;
            overflow: hidden;
            overflow-y: auto;

            .menu-wrapper {
                .el-submenu {
                    .router-link-active {
                        border-left: 8px solid #307ecd !important;
                    }
                }
            }
        }
        .layout_main {
            display: flex;
            flex-direction: column;
            float: left;
            width: calc(100% - 200px);
            height: 100%;
            .main_body {
                flex: 1;
                padding: 10px 20px;
            }
            overflow: auto;
        }
    }
}
</style>
<style lang="scss">
.layout {
    .layout_body {
        .layout_sideBar {
            .menu-wrapper {
                .el-submenu {
                    .router-link-active {
                        border-left: 6px solid #307ecd;
                        box-sizing: border-box;
                        .is-active {
                            min-width: 192px;
                        }
                    }
                    .el-menu--inline {
                        .el-menu-item {
                            padding-left: 70px!important;
                        }
                    }
                }
            }
        }
    }
}
</style>
