import {
  createRouter,
  createWebHashHistory
} from "vue-router";
import {
  amberTrack
} from '@/Composables/amber.js'
import {
  getActivityDetail
} from "@/api/api";
import backUrl from '@/config/urlConfig.js'

// localStorage.setItem("userData", "JTdCJTIyc2Vzc2lvbklkJTIyJTNBJTIyZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnBjM01pT2lKb2IzVnVaQzF3YjNKMFlXd2lMQ0pwWVhRaU9qRTNNell5TXpnek5qWXNJbVY0Y0NJNk1UY3pOak15TkRjMk5pd2ljR0Z6YzE5cFpDSTZJakk1TXprNE9URTVOall5TVRVeU9ETTROQ0lzSW1Gd2NHbGtJam9pSWl3aWRHVnNJam9pTVRjMk1URXlOVEU1TWpVaWZRLkdxSm9wOFNaMkcyY21wb0paQnVQU21Cd3lNSFBIcmUtREk3XzZ1M19ZZFElMjIlMkMlMjJkaWdpdGFsU2Vzc2lvbklkJTIyJTNBJTIyZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5YVdRaU9pSXlPVE01T0RreE9UWTJNakUxTWpnek9EUWlMQ0poY0hCcFpDSTZJaUlzSW5Cb2IyNWxJam9pSWl3aWFXRjBJam94TnpNMk1qTTRNelkyTENKbGVIQWlPakUzTXpZek1qUTNOalo5LmNNTnBxTGVPbkN0T3ZxMnJYaEx5dmdzVXJoVDV0b2RwMF9iVFowZUZMNTAlMjIlMkMlMjJwYXNzSWQlMjIlM0ElMjIyOTM5ODkxOTY2MjE1MjgzODQlMjIlMkMlMjJzZWNyZXQlMjIlM0ElMjIlMjIlMkMlMjJtc2lzZG4lMjIlM0ElMjIxNzYxMTI1MTkyNSUyMiUyQyUyMm1zaXNkblR5cGUlMjIlM0ElMjIyJTIyJTJDJTIydXNlc3Npb25JZCUyMiUzQSUyMlVEbmlkMDAwMDAxMTczNjIzODM2NjMxM3VmRVYwc013R3FzTHZPM2JOdWF0VUxDTnZjS2ZsR0lJJTIyJTJDJTIybmlja25hbWUlMjIlM0ElMjIlRTUlOTIlQUElRTUlOTIlOTUlRTclOTQlQTglRTYlODglQjclMjIlMkMlMjJ0YWd2YWxzJTIyJTNBJTVCJTIyMCUyMiUyQyUyMjAlMjIlNUQlMkMlMjJfbG9jYWx0aW1lU3RhbXBlXyUyMiUzQTE3MzYyMzgzNjQ2OTUlN0Q=")

const routes = [{
    path: '/',
    component: () => import('@/views/layout.vue'),
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list.vue'),
    meta: {
      title: 'AI表情',
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
  history: createWebHashHistory(),
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
router.beforeEach(async (to, from, next) => {
  const resp1 = await getActivityDetail({
    activityId: backUrl.activityId
  })
  let configureId = ''
  if (resp1.data && resp1.data.activityRelevanceList && resp1.data.activityRelevanceList.length) {
    let configureIds = resp1.data.activityRelevanceList.filter((item) => item.relevanceType == 8)
    configureId = configureIds && configureIds.length ? configureIds[0].relevanceId : 'a1876466496061399041'
  }
  let data = resp1.data || {
    activityId: "test",
    appId: "10004"
  }
  sessionStorage.setItem("activity", JSON.stringify({
    "activityId": data.activityId,
    "appId": data.appConfigId,
    "configureId": configureId
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
  next()
})


router.afterEach((to, from) => {
  const _title = to.meta.title;
  if (_title) {
    window.document.title = _title;
  }
})

export default router