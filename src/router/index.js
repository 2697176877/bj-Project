import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



// 把二级路由提出来
export const secRoute = [

  {
    path: "/role",
    component: () => import("@/views/role/role"),
    name: "角色管理"
  },
  {
    path: "/admin",
    component: () => import("@/views/admin/admin"),
    name: "管理员管理"
  },
  {
    path: "/menu",
    component: () => import("@/views/menu/menu"),
    name: "菜单管理"
  },
  {
    path: "/sort",
    component: () => import("@/views/sort/sort"),
    name: "商品分类"
  },
  {
    path: "/goods",
    component: () => import("@/views/goods/goods"),
    name: "商品管理"
  },
  {
    path: "/specs",
    component: () => import("@/views/specs/specs"),
    name: "商品规格"
  }, 
  {
    path: "/banner",
    component: () => import("@/views/banner/banner"),
    name: "轮播图管理"
  }, {
    path: "/seck",
    component: () => import("@/views/seck/seck"),
    name: "秒杀管理"
  }, {
    path: "/member",
    component: () => import("@/views/member/member"),
    name: "会员管理"
  }

];
const router = new Router({

  routes: [{
      path: "/login",
      component: () => import("@/pages/login")
    },
    {
      path: "/index",
      component: () => import("@/pages/index"),
      children: [{
          path: "/home",
          component: () => import("@/views/home"),
        },
        ...secRoute,
        {
          path: "",
          redirect: "/home"
        },
      ]

    },
    // 设置路由重定向
    {
      path: "*",
      redirect: "/login"
    },
  ]
})


// 全局导航守卫（登录拦截）
router.beforeEach((to, from, next) => {
  //如果你去的是登录就 next
  if (to.path == '/login') {
    next()
    return
  }
  //如果你有登录状态就next
  if (sessionStorage.getItem('loginInfo')) {
    next()
    return
  }
  //都没有就强制跳转回登录页
  next('/login')
})
export default router
