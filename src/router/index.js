import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: { title: '首页', icon: 'dashboard' },
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home'),
      meta: {title: '首页', icon: 'dashboard'}
    }]
  },
  {
    path: '/riskInfo',
    component: Layout,
    meta: {title: '风控图书馆', icon: 'dashboard'},
    children: [
      {
        path: 'riskInfoClaimQuery',
        name: 'RiskInfoClaimQuery',
        meta: {title: '典型案例分析', icon: 'dashboard'},
        component: () => import('@/views/riskInfo/RiskInfoClaimQuery')
      },
      {
        path: 'riskInfoFileQuery',
        name: 'RiskInfoFileQuery',
        meta: {title: '优秀风控报告', icon: 'dashboard'},
        component: () => import('@/views/riskInfo/RiskInfoFileQuery')
      },
      {
        path: 'riskInfoExpertQuery',
        name: 'RiskInfoExpertQuery',
        meta: {title: '专家资源库', icon: 'dashboard'},
        component: () => import('@/views/riskInfo/RiskInfoExpertQuery')
      },
      {
        path: 'riskInfoReportTemplate',
        name: 'RiskInfoReportTemplate',
        meta: {title: '专业风控模板', icon: 'dashboard'},
        component: () => import('@/views/riskInfo/RiskInfoReportTemplate')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    meta: {title: '风控报告', icon: 'dashboard'},
    level: 0,
    icon: 'icon-manage_fill',
    fixed: false,
    children: [
      {
        path: '/riskins_select',
        name: '风控报告录入',
        meta: {title: '风控报告录入', icon: 'dashboard'},
        component: () => import('@/views/riskins/RiskInsSelectInput'),
      },
      {
        path: '/riskins_input',
        name: '2017版财产险风控模板（专职版）',
        meta: {title: '风控报告专职版', icon: 'dashboard'},
        component: () => import('@/views/riskins/RiskInsDetailInput'),
        // component: () => import('@/views/testLoad/TestLoading'),
      },
      {
        path: '/riskins_firePlu',
        name: '火灾风险排查模板(简化版)',
        meta: {title: '火灾风险排查模板(简化版)', icon: 'dashboard'},
        component: () => import('@/views/riskins/RiskInsFireDangerPluralism'),
      },
      {
        path: '/riskins_pluralism',
        name: 'RiskInsPluralismInput',
        component: () => import('@/views/riskins/RiskInsPluralismInput')
      },
      {
        path: '/riskins_machine',
        name: 'riskInsMachine',
        component: () => import('@/views/riskins/RiskInsMachine')
      },
      {
        path: '/riskins_clobusiness',
        name: '营业中断险专用风控模板',
        meta: {title: '营业中断险专用风控模板', icon: 'dashboard'},
        component: () => import('@/views/riskins/RiskInsDetailInputCloBusiness'),
      },
    ]
  },
  {
    path: '/riskinsMainCheckQuery',
    name: 'riskinsMainCheckQuery',
    component: () => import('@/views/riskcheck/RiskinsMainCheckQuery')
  },
  {
    path: '/file',
    component: Layout,
    meta: {title: '影像上传', icon: 'dashboard'},
    children: [
      {
        path: 'fileUpload',
        name: 'FileUpload',
        meta: {title: '影像上传测试', icon: 'dashboard'},
        component: () => import('@/views/fileupload/FileUpload')
      }]
  },
  // {
  //   path: '/',
  //   meta: {title: '风控巡检', icon: 'dashboard'},
  //   children:[
  //     {
  //       path: '/riskinsMainCheckQuery',
  //       name: '/riskinsMainCheckQuery',
  //       meta: {title: '巡检报告查询', icon: 'dashboard'},
  //       component: () => import('@/views/riskcheck/RiskinsMainCheckQuery')
  //     }
  //   ]
  // },
  {
    path: '/riskins_input',
    name: '2017版财产险风控模板（专职版）',
    meta: {title: '风控报告专职版', icon: 'dashboard'},
    component: () => import('@/views/riskins/RiskInsDetailInput'),
  },
  {
    path: '/riskins_firePlu',
    name: '火灾风险排查模板(简化版)',
    meta: {title: '火灾风险排查模板(简化版)', icon: 'dashboard'},
    component: () => import('@/views/riskins/RiskInsFireDangerPluralism'),
  },
  {
    path: '/riskins_underwrite',
    name: 'RiskInsUnderwrite',
    component: () => import('@/views/riskins/RiskInsUnderwrite')
  },
  {
  path: '/riskins_machine',
    name: 'riskInsMachine',
  component: () => import('@/views/riskins/RiskInsMachine')
  },
  {
  path: '/riskins_pluralism',
    name: 'RiskInsPluralismInput',
    component: () => import('@/views/riskins/RiskInsPluralismInput')
  },
  {
    path: '/riskinfo_riskInfoExpertView',
    name: 'RiskInfoExpertView',
    component: () => import('@/views/riskInfo/RiskInfoExpertView')
  },
  /*{
    path: '/',
    name: '照片档案资料',
    icon: 'icon-manage_fill',
    fixed: false,
    children: [
      {
        level: 1,
        path: '/riskSale_mainQuery',
        children: [],
        fixed: false,
        allowedPost: '照片档案审核岗',
        name: '照片档案审核'
      }
    ]
  },
  {
    path: '/',
    name: '风控报告',
    level: 0,
    icon: 'icon-manage_fill',
    fixed: false,
    children: [
      {
        level: 1,
        path: '/riskins_select',
        children: [],
        fixed: false,
        allowedPost: '风控报告录入岗',
        name: '风控报告录入'
      },
      {
        level: 1,
        path: '/riskins_query',
        children: [],
        fixed: false,
        allowedPost: '风控报告查询岗',
        name: '风控报告查询'
      },
      {
        level: 1,
        path: '/riskins_underwrite',
        children: [],
        fixed: false,
        allowedPost: '风控报告一级审核岗,风控报告二级审核岗',
        name: '风控报告审核'
      },
    ]
  },
  {
    path: '/',
    name: '风控巡检',
    level: 0,
    icon: 'icon-manage_fill',
    fixed: false,
    children: [
      {
        level: 1,
        path: '/riskcheck_pectionEntry',
        children: [],
        fixed: false,
        allowedPost: '风控报告录入岗',
        name: '汛期报告录入'
      },
      {
        level: 1,
        path: '/riskcheck_query',
        children: [],
        fixed: false,
        allowedPost: '风控报告查询岗',
        name: '汛期报告查询'
      },
      {
        level: 1,
        path: '/riskcheck_mainInfo',
        children: [],
        fixed: false,
        allowedPost: '风控报告录入岗',
        name: '巡检任务派坑'
      }
    ]
  },
  {
    path: '/',
    name: '管睆酝置',
    level: 0,
    icon: 'icon-manage_fill',
    fixed: false,
    children: [
      {
        level: 1,
        path: '/riskset_clearCache',
        children: [],
        fixed: false,
        allowedPost: '风控管睆岗',
        name: '缓存管睆'
      },
      {
        level: 1,
        path: '/riskset_warningPush',
        children: [],
        fixed: false,
        allowedPost: '风控管睆岗',
        name: '预警推逝'
      },
      {
        level: 1,
        path: '/riskset_riskDnaturel',
        children: [],
        fixed: false,
        allowedPost: '风控管睆岗',
        name: '环境信杯维护'
      },
      {
        level: 1,
        path: '/riskset_riskSwitchControl?menFlag=true',
        children: [],
        fixed: false,
        allowedPost: '风控管睆岗',
        name: '系统开关维护'
      },
      {
        level: 1,
        path: '/riskset_riskBasicInfoTend',
        children: [],
        fixed: false,
        allowedPost: '风控信杯维护岗',
        name: '基本信杯维护'
      },
      {
        level: 1,
        path: '/riskset_riskBasicWeight',
        children: [],
        fixed: false,
        allowedPost: '风控信杯维护岗',
        name: '睾因权針维护'
      },
      {
        level: 1,
        path: '/riskset_riskClaim',
        children: [],
        fixed: false,
        allowedPost: '风控信杯维护岗,风控信杯审核岗',
        name: '典型案例维护'
      },
      {
        level: 1,
        path: '/riskimg_transferHandle',
        children: [],
        fixed: false,
        allowedPost: '风控管睆岗',
        name: '手工針传影僝'
      },
      {
        level: 1,
        path: '/riskset_riskFile',
        children: [],
        fixed: false,
        allowedPost: '风控信杯维护岗,风控信杯审核岗',
        name: '优秀报告维护'
      },
      {
        level: 1,
        path: '/riskInfo_expertDelQuery',
        children: [],
        fixed: false,
        allowedPost: '风控专家维护岗',
        name: '专家资溝维护'
      }
    ]
  },
  {
    path: '/',
    name: '风险地图',
    level: 0,
    icon: 'icon-manage_fill',
    fixed: false,
    children: [
      {
        level: 1,
        path: '/riskMap',
        children: [],
        fixed: false,
        allowedPost: '风控信杯岗',
        name: '风控风险地图'
      }
    ]
  },
  {
    path: '/',
    name: '风控物蝔',
    level: 0,
    icon: 'icon-manage_fill',
    fixed: false,
    children: [
      {
        level: 1,
        path: '/riskinfo_couplet',
        children: [],
        fixed: false,
        allowedPost: '风控信杯岗',
        name: '城房巡检'
      }
    ]
  },*/
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {title: 'Example', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: {title: 'Table', icon: 'table'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: {title: 'Tree', icon: 'tree'}
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: {title: 'Form', icon: 'form'}
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: {title: 'Menu1'},
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: {title: 'Menu1-1'}
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: {title: 'Menu1-2'},
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: {title: 'Menu1-2-1'}
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: {title: 'Menu1-2-2'}
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: {title: 'Menu1-3'}
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: {title: 'menu2'}
      }
    ]
  },
  // 404 page must be placed at the end !!!
  // {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  base: '/riskcontrol',
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
