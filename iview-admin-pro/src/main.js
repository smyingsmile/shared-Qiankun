import '@babel/polyfill';

// Vue
import Vue from 'vue';
import App from './App';
import VueRouter from "vue-router";

// 配置
import Setting from './setting';

// 混合
import mixinApp from '@/mixins/app';

// 插件
import plugins from '@/plugins';

// store
import store from '@/store/index';

// iView 和 iView Pro
import ViewUI from 'view-design';
import iViewPro from '@/libs/iview-pro/iview-pro.min.js';

// 菜单和路由
// import router from './router';
import menuHeader from '@/menu/header';
import menuSider from '@/menu/sider';
import { frameInRoutes } from '@/router/routes';
// import router from '@/router/index';

// 多语言
import i18n from '@/i18n';

// 方法
import { getHeaderName, getMenuSider, getSiderSubmenu } from '@/libs/system';

// 内置组件
import iLink from '@/components/link';

// 使用样式，修改主题可以在 styles 目录下创建新的主题包并修改 iView 默认的 less 变量
// 参考 https://www.iviewui.com/docs/guide/theme
import './styles/index.less';
import './libs/iview-pro/iview-pro.css';

import "./public-path";

if (window) window.$t = (key, value) => i18n.t(key, value);

Vue.use(plugins);

Vue.use(ViewUI, {
    i18n: (key, value) => i18n.t(key, value)
});
Vue.use(iViewPro);
Vue.component('i-link', iLink);


// import routes from "./routes";

Vue.use(VueRouter);
Vue.config.productionTip = false;

let instance = null;
let router = null;
/**
 * 渲染函数
 * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
 */
function render() {
    // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
    router = new VueRouter({
        // 运行在主应用中时，添加路由命名空间 /vue
        base: window.__POWERED_BY_QIANKUN__ ? "/iview" : "/",
        mode: "history",
        routes: frameInRoutes,
    });
    console.log('router', router)
    // 挂载应用
    instance = new Vue({
        mixins: [mixinApp],
        router,
        store,
        i18n,
        render: h => h(App),
        created() {
            // 处理路由 得到每一级的路由设置
            this.$store.commit('admin/page/init', frameInRoutes);
            // 设置顶栏菜单
            this.$store.commit('admin/menu/setHeader', menuHeader);
            // 加载用户登录的数据
            this.$store.dispatch('admin/account/load');
            // 初始化全屏监听
            this.$store.dispatch('admin/layout/listenFullscreen')
        },
        watch: {
            // 监听路由 控制侧边栏显示 标记当前顶栏菜单（如需要）
            '$route'(to, from) {
                let path = to.matched[to.matched.length - 1].path;
                if (!Setting.dynamicSiderMenu) {
                    let headerName = getHeaderName(path, menuSider);
                    if (headerName === null) {
                        path = to.path;
                        headerName = getHeaderName(path, menuSider);
                    }
                    // 在 404 时，是没有 headerName 的
                    if (headerName !== null) {
                        this.$store.commit('admin/menu/setHeaderName', headerName);
                        this.$store.commit('admin/menu/setMenuSider', menuSider);

                        const filterMenuSider = getMenuSider(menuSider, headerName);
                        this.$store.commit('admin/menu/setSider', filterMenuSider);
                        this.$store.commit('admin/menu/setActivePath', to.path);

                        const openNames = getSiderSubmenu(path, menuSider);
                        this.$store.commit('admin/menu/setOpenNames', openNames);
                    }
                }
                this.appRouteChange(to, from);
            }
        }
    }).$mount('#app');
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log("IviewApp bootstraped");
}

export async function mount(props) {
    console.log("IviewApp mount", props);
    render(props);
}

export async function unmount() {
    console.log("IviewApp unmount");
    instance.$destroy();
    instance = null;
    router = null;
}