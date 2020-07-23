import shared from '../shared';

const apps = [
    /**
     * name: 微应用名称 - 具有唯一性
     * entry: 微应用入口 - 通过该地址加载微应用
     * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
     * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
     */
    {
        name: 'VueMicroApp',
        entry: '//localhost:10200',
        container: '#frame',
        activeRule: '/vue',
        // 通过 props 将 shared 传递给子应用
        props: { shared }
    },
    {
        name: 'IviewApp',
        entry: '//localhost:65534',
        container: '#frame',
        activeRule: '/iview',
        props: { shared }
    },
    {
        name: 'StaticMicroApp',
        entry: '//localhost:10400',
        container: '#frame',
        activeRule: '/static',
        props: { shared }
    }
];

export default apps;
