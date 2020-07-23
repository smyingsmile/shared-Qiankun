const pre = '/dashboard/';

export default {
        path: '/dashboard',
        title: 'Dashboard',
        header: 'home',
        icon: 'md-speedometer',
        children: [
            {
                path: `${pre}console`,
                title: '主控台'
            },
            // {
            //     key: "VueMicroApp",
            //     title: "Vue 主页",
            //     path: "/vue",
            //     // icon: 'md-speedometer',
            // },
            // {
            //     key: "IviewApp",
            //     title: "iview 主页",
            //     path: "/iview",
            //     // icon: 'md-speedometer',
            // },
            // {
            //     key: "StaticMicroApp",
            //     title: "Static 微应用",
            //     path: "/static",
            //     // icon: 'md-speedometer',
            // }
        ]
}