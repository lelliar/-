import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'

import ClassifyInfo from '../views/ClassifyInfo.vue'
import ClassifyCreate from '../views/ClassifyCreate.vue'

import HeroInfo from '../views/HeroInfo.vue'
import HeroCreate from '../views/HeroCreate.vue'

import ItemInfo from '../views/ItemInfo.vue'
import ItemCreate from '../views/ItemCreate.vue'

import AricleInfo from '../views/AricleInfo.vue'
import AricleCreate from '../views/AricleCreate.vue'

import AdCreate from '../views/AdCreate.vue'
import AdInfo from '../views/AdInfo.vue'

import AdminUserInfo from '../views/AdminUserInfo.vue'
import AdminUserCreate from '../views/AdminUserCreate.vue'
import Login from '../views/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login,
      meta : { isPublic: true }
    },
    {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {path:'/classifies/info' , component : ClassifyInfo},
      //点击新建请求的路由
      {path : '/classifies/create' , component:ClassifyCreate},
      //点击编辑请求的路由
      {path : '/classifies/edit/:id' , component:ClassifyCreate , props:true},
      //英雄管理
      {path:'/heroes/info' , component : HeroInfo},
      {path : '/heroes/create' , component:HeroCreate},
      {path : '/heroes/edit/:id' , component:HeroCreate , props:true},
//装备管理
      {path:'/items/info' , component : ItemInfo},
      {path : '/items/create' , component:ItemCreate},
      {path : '/items/edit/:id' , component:ItemCreate , props:true},
      //文章管理
      {path:'/aricles/info' , component : AricleInfo},
      {path : '/aricles/create' , component:AricleCreate},
      {path : '/aricles/edit/:id' , component:AricleCreate , props:true},
      //广告位管理
      {path:'/ads/info' , component : AdInfo},
      {path : '/ads/create' , component:AdCreate},
      {path : '/ads/edit/:id' , component:AdCreate , props:true},
      //管理员
      {path:'/admin_user/info' , component : AdminUserInfo},
      {path : '/admin_user/create' , component:AdminUserCreate},
      {path : '/admin_user/edit/:id' , component:AdminUserCreate , props:true},
    ]
  }
]
})

// router.beforeEach((to, from ,next) => {
//   if (!to.meta.isPublic && !localStorage.token) {
//     return next('/login')
//   }
//   next()
// })

export default router
