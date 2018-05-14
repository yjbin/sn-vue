import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'
import Inner_Layout from '@/views/layout/inner_layout'
import login from '@/views/login/login'
import home from '@/views/home/home'
import user from '@/views/manage/user'
import role from '@/views/manage/role'
import source from '@/views/manage/source'
import dict from '@/views/manage/dict'
//部门和行政区划
import administrative from '@/views/manage/administrative'
import department from '@/views/manage/department'
import multistageDown from '@/views/manage/multistageDown'
import institutional from '@/views/ideologicalBuilding/theoryofArmed/ysxtjs/instituTional'
import consensus from '@/views/ideologicalBuilding/consensus/consensus'
import build from '@/views/ideologicalBuilding/consensus/media/messMedia/build'
import Information from '@/views/ideologicalBuilding/consensus/media/messMedia/Information'
import regulations from '@/views/ideologicalBuilding/regulations/regulations'
import spiritual from '@/views/ideologicalBuilding/spiritual/spiritual'
import originBuild from '@/views/origin/originBuild'
import originhost from '@/views/origin/originhost'
//山西省涉农资金
//系统设置
import largetSet from '@/views/system/largetSet'
import exploiting from '@/views/system/exploiting'
//项目管理
import projectOutline from '@/views/projectManage/projectOutline'
import projectProcess from '@/views/projectManage/projectProcess'
import projectAccept from '@/views/projectManage/projectAccept'
import projectAppropriation from '@/views/projectManage/projectAppropriation'
import projectAssess from '@/views/projectManage/projectAssess'
import projectBenefit from '@/views/projectManage/projectBenefit'
//项目预算
import capitalSource from '@/views/projectBudget/capitalSource'
import moneyQuery from '@/views/projectBudget/moneyQuery'
import moneyTracking from '@/views/projectBudget/moneyTracking'
//预警管理
import bigWarn from '@/views/warnManage/bigWarn'
import excessWarn from '@/views/warnManage/excessWarn'
import areProject from '@/views/warnManage/areProject'
import beyondMoney from '@/views/warnManage/beyondMoney'
//发文管理
import fileManagement from '@/views/postManagemen/fileManagement'
import noticeAnnouncement from '@/views/postManagemen/noticeAnnouncement'


Vue.use(Router)

export const constantRouterMap = [{
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    /**默认跳转到首页 */
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/home',
    meta: {
      title: '首页',
      icon: 'home'
    },
    children: [{
      path: 'home',
      component: home,
      name: 'home',
      meta: {
        title: '首页',
        icon: 'home'
      }
    }]
  }
]



export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export let asyncRouterMap = [{
  path: '/system',
  component: Layout,
  redirect: '/system/largetSet',
  meta: {
    title: '系统设置',
    icon: 'el-icon-menu',
    rid: ""
  },
  children: [{
    path: 'largetSet',
    component: largetSet,
    name: 'largeSet',
    meta: {
      title: '大额设置',
      icon: 'largetSet',
      rid: "-1"
    }
  }, {
    path: 'exploiting',
    component: exploiting,
    name: 'exploiting',
    meta: {
      title: '实施单位',
      icon: 'exploiting',
      rid: "-1"
    }
  }]
}, {
  path: '/projectBudget',
  component: Layout,
  meta: {
    title: '项目预算',
    icon: '',
    rid: ""
  },
  children: [{
    path: 'capitalSource',
    component: capitalSource,
    name: 'capitalSource',
    meta: {
      title: '资金来源',
      icon: '',
      rid: "-1"
    }
  }, {
    path: 'moneyQuery',
    component: moneyQuery,
    name: 'moneyQuery',
    meta: {
      title: '资金查询',
      icon: '',
      rid: "-1"
    }
  }, {
    path: 'moneyTracking',
    component: moneyTracking,
    name: 'moneyTracking',
    meta: {
      title: '资金跟踪',
      icon: '',
      rid: "-1"
    }
  }]
}, {
  path: '/projectManage',
  component: Layout,
  redirect: '/projectManage/projectOutline',
  meta: {
    title: '项目管理',
    icon: '',
    rid: ""
  },
  children: [{
    path: 'projectOutline',
    component: projectOutline,
    name: 'projectOutline',
    meta: {
      title: '项目概述',
      icon: 'projectOutline',
      rid: "-1"
    }
  }, {
    path: 'projectProcess',
    component: projectProcess,
    name: 'projectProcess',
    meta: {
      title: '项目进度',
      icon: 'projectProcess',
      rid: "-1"
    }
  }, {
    path: 'projectAppropriation',
    component: projectAppropriation,
    name: 'projectAppropriation',
    meta: {
      title: '项目拨款',
      icon: 'projectAppropriation',
      rid: "-1"
    }
  }, {
    path: 'projectAccept',
    component: projectAccept,
    name: 'projectAccept',
    meta: {
      title: '项目验收',
      icon: 'projectAccept',
      rid: "-1"
    }
  }, {
    path: 'projectBenefit',
    component: projectBenefit,
    name: 'projectBenefit',
    meta: {
      title: '项目效益',
      icon: 'projectBenefit',
      rid: "-1"
    }
  }, {
    path: 'projectAssess',
    component: projectAssess,
    name: 'projectAssess',
    meta: {
      title: '项目考核',
      icon: 'projectAssess',
      rid: "-1"
    }
  }]
}, {
  path: '/warnManage',
  component: Layout,
  redirect: '/warnManage/bigWarn',
  meta: {
    title: '预警管理',
    icon: '',
    rid: ""
  },
  children: [{
    path: 'bigWarn',
    component: bigWarn,
    name: 'bigWarn',
    meta: {
      title: '大额预警',
      icon: '',
      rid: ""
    }
  }, {
    path: 'excessWarn',
    component: excessWarn,
    name: 'excessWarn',
    meta: {
      title: '超额预警',
      icon: 'excessWarn',
      rid: ""
    }
  }, {
    path: 'areProject',
    component: areProject,
    name: 'areProject',
    meta: {
      title: '超期项目',
      icon: 'areProject',
      rid: ""
    }
  }, {
    path: 'beyondMoney',
    component: beyondMoney,
    name: 'beyondMoney',
    meta: {
      title: '超期资金',
      icon: '',
      rid: ""
    }
  }]
},{
  path: '/postManagemen',
  component: Layout,
  redirect: '/postManagemen/fileManagement',
  meta: {
    title: '发文管理',
    icon: '',
    rid: ""
  },
  children: [{
    path: 'fileManagement',
    component: fileManagement,
    name: 'fileManagement',
    meta: {
      title: '文件管理',
      icon: '',
      rid: ""
    }
  }, {
    path: 'noticeAnnouncement',
    component: noticeAnnouncement,
    name: 'noticeAnnouncement',
    meta: {
      title: '通知公告',
      icon: '',
      rid: ""
    }
  }]
},
{
  path: '/manage',
  component: Layout,
  redirect: '/manage/user',
  meta: {
    title: '系统管理',
    icon: 'manage',
    rid: ""
  },
  children: [{
    path: 'user',
    component: user,
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'user',
      rid: "-1"
    }
  }, {
    path: 'role',
    component: role,
    name: 'role',
    meta: {
      title: '角色管理',
      icon: 'role',
      rid: "-1"
    }
  }, {
    path: 'source',
    component: source,
    name: 'source',
    meta: {
      title: '资源管理',
      icon: 'source',
      rid: "-1"
    }
  }, {
    path: 'dict',
    component: dict,
    name: 'dict',
    meta: {
      title: '字典管理',
      icon: 'dict',
      rid: "-1"
    }
  }, {
    path: 'administrative',
    component: administrative,
    name: 'administrative',
    meta: {
      title: '行政区划',
      icon: 'administrative',
      rid: "-1"
    }
  }, {
    path: 'department',
    component: department,
    name: 'department',
    meta: {
      title: '部门管理',
      icon: 'department',
      rid: "-1"
    }
  }, {
    path: 'multistageDown',
    component: multistageDown,
    name: 'multistageDown',
    meta: {
      title: '多级下拉设置',
      icon: 'multistageDown',
      rid: "-1"
    }
  }]
}, {
  path: '/ideologicalBuilding',
  component: Layout,
  redirect: '/ideologicalBuilding/theoryofArmed',
  meta: {
    title: '思想建设',
    icon: 'manage',
    rid: ""
  },
  children: [{
    path: '/ideologicalBuilding/theoryofArmed',
    name: 'theoryofArmed',
    component: Inner_Layout,
    redirect: '/ideologicalBuilding/theoryofArmed/ysxtjs',
    meta: {
      title: '理论武装',
      icon: 'user',
      rid: ""
    },
    children: [{
      path: '/ideologicalBuilingd/theoryofArmed/ysxtjs',
      name: 'ysxtjs',
      component: Inner_Layout,
      redirect: '/ideologicalBuilding/theoryofArmed/ysxtjs/instituTional',
      meta: {
        title: '意识形态建设',
        icon: 'user',
        rid: ""
      },
      children: [{
        path: 'instituTional',
        name: 'instituTional',
        component: institutional,
        meta: {
          title: '组织机构',
          icon: 'user',
          rid: "-1"
        }
      }]
    }]
  }, {
    path: '/ideologicalBuilding/consensus',
    name: 'consensus',
    component: Inner_Layout,
    meta: {
      title: '舆论宣传',
      icon: 'consensus',
      rid: ""
    },
    children: [{
      path: '/messMedia',
      name: 'messMedia',
      component: Inner_Layout,
      meta: {
        title: '融媒体宣传',
        icon: 'consensus',
        rid: ""
      },
      children: [{
        path: 'build',
        name: 'build',
        component: build,
        meta: {
          title: '平台搭建',
          icon: 'consensus',
          rid: "-1"
        }
      }, {
        path: 'Information',
        name: 'Information',
        component: Information,
        meta: {
          title: '信息推送',
          icon: 'consensus',
          rid: "-1"
        }
      }]
    }]
  }, {
    path: 'spiritual/spiritual',
    component: spiritual,
    name: 'spiritual',
    meta: {
      title: '精神文明建设',
      icon: 'spiritual',
      rid: "-1"
    }
  }, {
    path: 'regulations/regulations',
    name: 'regulations',
    component: regulations,
    meta: {
      title: '政策法规',
      icon: 'regulations',
      rid: "-1"
    }
  }]
}, {
  path: '/origin',
  component: Layout,
  redirect: '/origin/originBuild',
  meta: {
    title: '组织建设',
    icon: 'ins',
    rid: ""
  },
  children: [{
    path: 'originBuild',
    component: originBuild,
    name: 'originBuild',
    meta: {
      title: '组织建设',
      icon: 'origin',
      rid: "-1"
    }
  }, {
    path: 'originhost',
    component: originhost,
    name: 'originhost',
    meta: {
      title: '组织活动',
      icon: 'origin',
      rid: "-1"
    }
  }]
}]
