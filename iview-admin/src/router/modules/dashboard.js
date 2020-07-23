import BasicLayout from '@/layouts/basic-layout';
// import Framework from '@/views/Framework';

const meta = {
    auth: true
};

const pre = 'dashboard-';

export default {
    path: '/dashboard',
    name: 'dashboard',
    redirect: {
        name: `${pre}console`
    },
    meta,
    component: BasicLayout,
    // component: Framework,
    children: [
        {
            path: 'console',
            name: `${pre}console`,
            meta: {
                ...meta,
                title: '主控台',
                closable: false
            },
            component: () => import('@/pages/dashboard/console')
        }
    ]
};
