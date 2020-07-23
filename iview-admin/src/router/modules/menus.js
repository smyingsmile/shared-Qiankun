import BasicLayout from '@/layouts/basic-layout';
// import Framework from '@/views/Framework';

const meta = {
    auth: true
};

const menus = [
    {
        key: "VueMicroApp",
        // name: "Vue 主页",
        title: "Vue 主页",
        path: "/vue",
        component: BasicLayout,
        // component: Framework,
        children: [
            {
                key: "VueMicroAppList",
                title: "Vue 列表页",
                path: "/vue/list"
            }
        ]
    },
    {
        key: "IviewApp",
        title: "iview 主页",
        // name: "iview 主页",
        path: "/iview",
        redirect: {
            name: `iviewPro`
        },
        icon: 'md-speedometer',
        component: BasicLayout,
        children: [
            {
                path: 'dashboard/console',
                name: `iviewPro`,
                meta: {
                    ...meta,
                    // title: '主控台',
                    // closable: false
                },
                component: () => import('@/pages/dashboard/console')
            }
        ]
        // component: Framework,
    },
    {
        key: "StaticMicroApp",
        title: "Static 微应用",
        // name: "Static 微应用",
        path: "/static",
        icon: 'md-speedometer',
        component: BasicLayout,
        // component: Framework,
    }
]


export default menus
