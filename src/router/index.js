import {
  createRouter,
  createWebHistory
} from "vue-router";
import {
  amberTrack
} from '@/Composables/amber.js'
import {
  getActivityDetail
} from "@/api/api";

const backUrl = {
  homeUrl: 'https://avatar.migudm.cn/h5/newyear2025/',
  centerListUrl: 'https://avatar.migudm.cn/h5/newyear2025/?page=usercenter&tab=aigif'
}
console.log(import.meta)
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
const getActivityDetails = async (to) => {
  const resp1 = await getActivityDetail({
    activityId: 'test'
  })
  let data = resp1.data || {
    activityId: "test",
    appId: "10004"
  }

  sessionStorage.setItem("activity", JSON.stringify({
    "activityId": data.activityId ,
    "appId": data.appConfigId
  }))

  if (to.query.title) to.meta.title = to.query.title
  const start_time = new Date().getTime()
  sessionStorage.setItem('start_time', start_time)
  amberTrack('page_view', {
    age_id: to.name,
    page_name: '/' + to.name,
    start_time: start_time,
    operation_type: 1, // 1进入，2离开
  })

  let userData = localStorage.getItem("userData") ? decodeURIComponent(atob(localStorage.getItem("userData"))) : "";
  if (userData && JSON.parse(userData).sessionId) {
    sessionStorage.setItem("data", userData)
  } else {
    sessionStorage.removeItem("data");
    window.location.href = "https://avatar.migudm.cn/h5/newyear2025/"
  }
}
router.beforeEach((to, from, next) => {
  getActivityDetails(to)

  next()
})


router.afterEach((to, from) => {
  const _title = to.meta.title;
  if (_title) {
    window.document.title = _title;
  }
})

export default router