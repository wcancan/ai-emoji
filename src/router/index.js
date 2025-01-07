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
import backUrl from '@/config/urlConfig.js'

localStorage.setItem("userData","JTdCJTIyc2Vzc2lvbklkJTIyJTNBJTIyZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBjM01pT2lKb2IzVnVaQzF3YjNKMFlXd2lMQ0pwWVhRaU9qRTNNell4TmpjME9EZ3NJbVY0Y0NJNk1UY3pOakkxTXpnNE9Dd2ljR0Z6YzE5cFpDSTZJalkxTlRJNE1EQXlOek01TlRZMU9EYzNOU0lzSW1Gd2NHbGtJam9pSWl3aWRHVnNJam9pTVRnNE9ERXlNRFF5TmpBaWZRLmdFV3BUWm9uVTdEdDVhUW5aS0NvaW1ld3RrNGFlbmV6dUNFeDRpc3BNVU0lMjIlMkMlMjJkaWdpdGFsU2Vzc2lvbklkJTIyJTNBJTIyZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5YVdRaU9pSTJOVFV5T0RBd01qY3pPVFUyTlRnM056VWlMQ0poY0hCcFpDSTZJaUlzSW5Cb2IyNWxJam9pSWl3aWFXRjBJam94TnpNMk1UWTNORGc0TENKbGVIQWlPakUzTXpZeU5UTTRPRGg5LjIxUnhCMk1id1owNXJMRHNkYXRndEFHem90a25tRGJBRHhtVWpjZmI3LTAlMjIlMkMlMjJwYXNzSWQlMjIlM0ElMjI2NTUyODAwMjczOTU2NTg3NzUlMjIlMkMlMjJzZWNyZXQlMjIlM0ElMjIlMjIlMkMlMjJtc2lzZG4lMjIlM0ElMjIxODg4MTIwNDI2MCUyMiUyQyUyMm1zaXNkblR5cGUlMjIlM0ElMjIwJTIyJTJDJTIydXNlc3Npb25JZCUyMiUzQSUyMlVEbmlkMDAwMDAxMTczNjE2NzQ4ODM0NHQ2bVNUT2VEa0kwNjc0clF0cjhyNmNSbzZNdE14dXhYJTIyJTJDJTIybmlja25hbWUlMjIlM0ElMjIlMjIlMkMlMjJ0YWd2YWxzJTIyJTNBJTVCJTIyMCUyMiUyQyUyMjAlMjIlNUQlMkMlMjJfbG9jYWx0aW1lU3RhbXBlXyUyMiUzQTE3MzYxNjc0ODg1NjUlN0Q=")
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
    window.location.href = backUrl.homeUrl
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