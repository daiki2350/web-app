import { createRouter, createWebHistory } from 'vue-router'
import DailyLoginView from '../components/templates/DailyLoginView.vue'
import DailyRegisterView from '../components/templates/DailyRegisterView.vue'
import DailyUserRegisterView from '../components/templates/DailyUserRegisterView.vue'
import DailyResultView from '../components/templates/DailyResultView.vue'
import DailyReportView from '../components/templates/DailyReportView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth/login'
    },
    {
      path: '/auth/dataRegister',
      name: 'home',
      component: DailyRegisterView,
      meta: {requireAuth:true}
    },
    {
      path: '/auth/login',
      name: 'login',
      component: DailyLoginView
    },
    {
      path: '/auth/register',
      component: DailyUserRegisterView
    },
    {
      path: '/auth/result',
      component: DailyResultView
    },
    {
      path: '/auth/report',
      component: DailyReportView
    }
  ]
})

export default router
