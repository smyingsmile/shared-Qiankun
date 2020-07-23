// 菜单，侧边栏
import dashboard from './modules/dashboard';
import menus from './modules/micro';
// 系统
import log from './modules/log';

export default [
    dashboard,
    ...menus,
    log
];
