// 一个进度条插件
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

import { Message } from 'view-design';
// 当前版本 qiankun 对 insertBefore 处理有问题，这里先使用修改后的本地包

import router from '@/router';

import {
    registerMicroApps,
    addGlobalUncaughtErrorHandler,
    // runAfterFirstMounted,
    // setDefaultMountApp,
    initGlobalState,
    start
} from 'qiankun';

// 子应用注册
import apps from './apps';

/**
 * 注册子应用
 * 第一个参数 - 子应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps, {
    // qiankun 生命周期钩子 - 加载前
    beforeLoad: (app) => {
        // 加载子应用前，加载进度条
        // NProgress.start();
        // log('app', app)
        console.log('before load', app.name);
        if (!app.name) {
            // log('*****error', router)
            // router.push({ name: '404' })
        }
        return Promise.resolve();
    },
    // qiankun 生命周期钩子 - 子应用挂载后
    afterMount: (app) => {
        // 加载子应用前，进度条加载完成
        // NProgress.done();
        console.log('after mount', app.name);
        return Promise.resolve();
    }
});

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event) => {
    console.error(event);
    const { msg } = event;
    // 加载失败时提示
    if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
        Message.error({
            content: '子应用加载失败，请检查应用是否可运行',
            duration: 3
        })
    }
});

/**
 * 设置主应用的状态池
 */
const { onGlobalStateChange, setGlobalState } = initGlobalState({
    user: 'qiankun'
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
    ignore: 'master',
    user: {
        name: 'master'
    }
});

/**
 *  设置默认进入的子应用
 */
// setDefaultMountApp('/vue');

/**
 *  首次挂载后的钩子函数
 */
// runAfterFirstMounted(() => {
//     console.log('[MainApp] first app mounted');
// });

start({
    // 设置沙箱隔离
    sandbox: {
        strictStyleIsolation: true
    }
});
/**
 * 启动应用
 */

// 导出 qiankun 的启动函数
export default start;
