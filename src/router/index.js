import {
  createRouter,
  createWebHistory
} from "vue-router";
import {
  amberTrack
} from '@/Composables/amber.js'

const backUrl = {
    homeUrl: 'https://cn.vuejs.org/guide/essentials/lifecycle.html',
    centerListUrl: 'https://cn.vuejs.org/guide/essentials/lifecycle.html'
}

const routes = [{
    path: '/',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list.vue'),
    meta: {
      title: 'AI表情列表页',
      keepAlive: true,
      backUrl: backUrl.homeUrl,
      isExternal: true
    },
  },
  {
    path: '/details',
    name: 'details',
    meta: {
      title: 'AI表情包详情页',
      backUrl: '/list',
      isExternal: false
    },
    component: () => import('@/views/details.vue'),
    props: true,
  },
  {
    path: '/center',
    name: 'center',
    component: () => import('@/views/center.vue'),
    meta: {
      title: '',
      keepAlive: true,
      backUrl: backUrl.centerListUrl,
      isExternal: true
    },
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  sessionStorage.setItem("activity", `{
    "activityId": "test",
    "appId": "10004"
  }`)
  if(to.query.title) to.meta.title = to.query.title 
  console.log(to.path, "to.path-------------------")
  amberTrack('page_click', {
    element_id: emojiData.value.template2Id,
    element_name: activityData.activityId,
    element_type: '3'
  })
  if (to.query.data) {
    sessionStorage.setItem("data", decodeURIComponent(atob(to.query.data)))
  } else {
    // console.log(to.path,"to.path-------------------")
    // if (to.path == "/list") {
    //   sessionStorage.removeItem("data") 
    // }
  }
  next()
})

router.afterEach((to, from) => {
  const _title = to.meta.title;
  if (_title) {
    window.document.title = _title;
  }
})

export default router