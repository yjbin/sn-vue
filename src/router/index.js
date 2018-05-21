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
import projectReserve from '@/views/projectManage/projectReserve'
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
import fileManagementSee from '@/views/postManagemen/fileManagementSee'
import noticeAnnouncement from '@/views/postManagemen/noticeAnnouncement'
import noticeAnnouncementSee from '@/views/postManagemen/noticeAnnouncementSee'
//综合查询
import ZhprojectApplication from '@/views/integratedQuery/projectApplication'
import ZhcapitalSource from '@/views/integratedQuery/capitalSource'
import ZhprojectOutline from '@/views/integratedQuery/projectOutline'
import ZhwarningInformation from '@/views/integratedQuery/warningInformation'
//统计分析
import projectCollect from '@/views/statisticAnalysis/projectCollect'
import AbnormalCapital from '@/views/statisticAnalysis/AbnormalCapital'
import capitalCollect from '@/views/statisticAnalysis/capitalCollect'
import projectFund from '@/views/statisticAnalysis/projectFund'
import projectProgress from '@/views/statisticAnalysis/projectProgress'
//领导指挥舱
import CommandModule from '@/views/CommandModule/CommandModule'
Vue.use(Router)

export const constantRouterMap = [{
    path: '/refersh',
    component: Layout,
    hidden: true
  }, {
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
      icon: ['home.png', 'home-c.png']
    },
    children: [{
      path: 'home',
      component: home,
      name: 'home',
      meta: {
        title: '首页',
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
export let asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/largetSet',
    meta: {
      title: '系统设置',
      icon: '',
      rid: ""
    },
    children: [{
      path: 'largetSet',
      component: largetSet,
      name: 'largeSet',
      meta: {
        title: '大额设置',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'exploiting',
      component: exploiting,
      name: 'exploiting',
      meta: {
        title: '实施单位',
        icon: '',
        rid: "-1"
      }
    }]
  }, {
    path: '/projectBudget',
    component: Layout,
    meta: {
      title: '项目预算',
      icon: ["projectBenefit.png", "projectBenefit-c.png"],
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
      icon: ['projectManager.png', 'projectManager-c.png'],
      rid: ""
    },
    children: [{
      path: 'projectOutline',
      component: projectOutline,
      name: 'projectOutline',
      meta: {
        title: '项目概述',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'projectProcess',
      component: projectProcess,
      name: 'projectProcess',
      meta: {
        title: '项目进度',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'projectAppropriation',
      component: projectAppropriation,
      name: 'projectAppropriation',
      meta: {
        title: '项目拨款',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'projectAccept',
      component: projectAccept,
      name: 'projectAccept',
      meta: {
        title: '项目验收',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'projectBenefit',
      component: projectBenefit,
      name: 'projectBenefit',
      meta: {
        title: '项目效益',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'projectAssess',
      component: projectAssess,
      name: 'projectAssess',
      meta: {
        title: '项目考核',
        icon: '',
        rid: "-1"
      }
    }]
  }, {
    path: '/warnManage',
    component: Layout,
    redirect: '/warnManage/bigWarn',
    meta: {
      title: '预警管理',
      icon: ['warn.png', 'warn-c.png'],
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
        icon: '',
        rid: ""
      }
    }, {
      path: 'areProject',
      component: areProject,
      name: 'areProject',
      meta: {
        title: '超期项目',
        icon: '',
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
  }, {
    path: '/projectManage2',
    component: Layout,
    redirect: '/projectManage2/projectReserve2',
    meta: {
      title: '储备项目库',
      icon: ['projectpool.png', 'projectpool-c.png'],
      rid: ""
    },
    children: [{
      path: 'projectReserve2',
      component: projectReserve,
      name: 'projectReserve',
      meta: {
        title: '储备项目库',
        icon: '',
        rid: ""
      }
    }]
  }, {
    path: '/ZhprojectApplication',
    component: Layout,
    redirect: '/ZhprojectApplication/ZhprojectApplication',
    meta: {
      title: '综合查询',
      icon:  ['query.png', 'query-c.png'],
      rid: ""
    },
    children: [{
      path: 'ZhprojectApplication',
      component: ZhprojectApplication,
      name: 'ZhprojectApplication',
      meta: {
        title: '项目申报',
        icon: '',
        rid: ""
      }
    }, {
      path: 'ZhcapitalSource',
      component: ZhcapitalSource,
      name: 'ZhcapitalSource',
      meta: {
        title: '资金来源',
        icon: '',
        rid: ""
      }
    }, {
      path: 'ZhprojectOutline',
      component: ZhprojectOutline,
      name: 'ZhprojectOutline',
      meta: {
        title: '项目概述',
        icon: '',
        rid: ""
      }
    }, {
      path: 'ZhwarningInformation',
      component: ZhwarningInformation,
      name: 'ZhwarningInformation',
      meta: {
        title: '预警信息',
        icon: '',
        rid: ""
      }
    }]
  }, {
    path: '/postManagemen',
    component: Layout,
    redirect: '/postManagemen/fileManagement',
    meta: {
      title: '发文管理',
      icon: ['postManager.png', 'postManager-c.png'],
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
      path: 'fileManagementSee',
      component: fileManagementSee,
      name: 'fileManagementSee',
      meta: {
        title: '收到文件',
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
    }, {
      path: 'noticeAnnouncementSee',
      component: noticeAnnouncementSee,
      name: 'noticeAnnouncementSee',
      meta: {
        title: '收到通知',
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
      icon: ['system.png', 'system-c.png'],
      rid: ""
    },
    children: [{
      path: 'user',
      component: user,
      name: 'user',
      meta: {
        title: '用户管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'role',
      component: role,
      name: 'role',
      meta: {
        title: '角色管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'source',
      component: source,
      name: 'source',
      meta: {
        title: '资源管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'dict',
      component: dict,
      name: 'dict',
      meta: {
        title: '字典管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'administrative',
      component: administrative,
      name: 'administrative',
      meta: {
        title: '行政区划',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'department',
      component: department,
      name: 'department',
      meta: {
        title: '部门管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'multistageDown',
      component: multistageDown,
      name: 'multistageDown',
      meta: {
        title: '多级下拉设置',
        icon: '',
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
        icon: '',
        rid: ""
      },
      children: [{
        path: '/ideologicalBuilingd/theoryofArmed/ysxtjs',
        name: 'ysxtjs',
        component: Inner_Layout,
        redirect: '/ideologicalBuilding/theoryofArmed/ysxtjs/instituTional',
        meta: {
          title: '意识形态建设',
          icon: '',
          rid: ""
        },
        children: [{
          path: 'instituTional',
          name: 'instituTional',
          component: institutional,
          meta: {
            title: '组织机构',
            icon: '',
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
        icon: '',
        rid: ""
      },
      children: [{
        path: '/messMedia',
        name: 'messMedia',
        component: Inner_Layout,
        meta: {
          title: '融媒体宣传',
          icon: '',
          rid: ""
        },
        children: [{
          path: 'build',
          name: 'build',
          component: build,
          meta: {
            title: '平台搭建',
            icon: '',
            rid: "-1"
          }
        }, {
          path: 'Information',
          name: 'Information',
          component: Information,
          meta: {
            title: '信息推送',
            icon: '',
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
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'regulations/regulations',
      name: 'regulations',
      component: regulations,
      meta: {
        title: '政策法规',
        icon: '',
        rid: "-1"
      }
    }]
  }, {
    path: '/origin',
    component: Layout,
    redirect: '/origin/originBuild',
    meta: {
      title: '组织建设',
      icon: '',
      rid: ""
    },
    children: [{
      path: 'originBuild',
      component: originBuild,
      name: 'originBuild',
      meta: {
        title: '组织建设',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'originhost',
      component: originhost,
      name: 'originhost',
      meta: {
        title: '组织活动',
        icon: '',
        rid: "-1"
      }
    }]
  }, {
    path: '/statisticAnalysis',
    component: Layout,
    redirect: '/statisticAnalysis/projectCollect',
    meta: {
      title: '统计分析',
      icon: ["statistic.png", "statistic-c.png"],
      rid: ""
    },
    children: [{
      path: 'projectCollect',
      component: projectCollect,
      name: 'projectCollect',
      meta: {
        title: '项目申报汇总表',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'capitalCollect',
      component: capitalCollect,
      name: 'capitalCollect',
      meta: {
        title: '资金来源统计表',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'projectFund',
      component: projectFund,
      name: 'projectFund',
      meta: {
        title: '项目资金分布表',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'projectProgress',
      component: projectProgress,
      name: 'projectProgress',
      meta: {
        title: '项目进度汇总表',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'AbnormalCapital',
      component: AbnormalCapital,
      name: 'AbnormalCapital',
      meta: {
        title: '资金异常分析表',
        icon: '',
        rid: "-1"
      }
    }]
  }, {
    path: '/CommandModule',
    component: Layout,
    redirect: '/CommandModule/CommandModule',
    meta: {
      title: '统计分析',
      icon: ["lead.png", "lead-c.png"],
      rid: ""
    },
    children: [{
      path: 'CommandModule',
      component: CommandModule,
      name: 'CommandModule',
      meta: {
        title: '领导指挥舱',
        icon: '',
        rid: "-1"
      }
    }]
  }
]
