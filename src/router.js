import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('./components/Login.vue'),
    },
    // {
    //     path: '/404',
    //     name: '404',
    //     meta: { title: '404' },
    //     component: () => import('../components/404.vue'),
    // },
    // { path: '/', redirect: '/date' },
]

const createRouter = () => new Router({
    routes: commonRoutes,
})

const router = createRouter()
export default router