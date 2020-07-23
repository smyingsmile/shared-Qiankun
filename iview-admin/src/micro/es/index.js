/**
 * @since 2020-07-10
 */
export { loadMicroApp, registerMicroApps, start } from './apis';
export { initGlobalState } from './globalState';
export * from './errorHandler';
export * from './effects';
export { prefetchImmediately as prefetchApps } from './prefetch';