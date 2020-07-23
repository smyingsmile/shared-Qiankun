import Home from "@/pages/home/index.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path:'/communication',
        name: 'Communication',
        component: () => import('@/pages/communication/index.vue')
    },
    {
        path: '/list',
        name: 'List',
        component: () => import('@/pages/list/index.vue')
    },
    {
        path: '/test1',
        name: 'vue-1',
        component: () => import('@/pages/list/index.vue')
    },
    {
        path: '/test2',
        name: "vue-2",
        component: () => import('@/pages/list/index.vue')
    },
    {
        path: '/test3',
        name: "vue-3",
        component: () => import('@/pages/list/index.vue')
    },
    {
        path: '*',
        name: '404',
        component: () => import('@/pages/error/404/index.vue')
    }
]

export default routes
