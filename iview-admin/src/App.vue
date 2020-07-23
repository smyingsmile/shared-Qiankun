<template>
    <div id="main-app">
        <!-- login不显示主应用菜单 -->
        <section id="cns-main-app">
            <Layout>
                <Header>Header</Header>
                <Layout>
                    <Sider hide-trigger v-show="$route.name !== 'login'">
                        <main-menu :menus="menus" />
                    </Sider>
                    <Content>
                        <router-view v-show="$route.name"/>
                        <!-- 切换应用 -->
                        <section v-show="!$route.name" id="frame"></section>
                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </section>
    </div>
</template>
<script>
    import { on, off } from 'view-design/src/utils/dom';
    import { setMatchMedia } from 'view-design/src/utils/assist';

    import { mapMutations } from 'vuex';
    import Setting from '@/setting';

    import { requestAnimation } from '@/libs/util';

    // import Framework from '../src/views/Framework.vue'
    // import iMenuSideItem from './layouts/basic-layout/menu-side/menu-item';
    // import iMenuSideSubmenu from './layouts/basic-layout/menu-side/submenu';

    //
    import MainMenu from '../src/components/menu'

    setMatchMedia();

    export default {
        name: 'main-app',
        //  iMenuSideItem, iMenuSideSubmenu,
        components: { MainMenu },
        data () {
            return {
                menus: [
                    {
                        key: 'Home',
                        title: '主页',
                        path: '/'
                    },
                    {
                        key: 'VueMicroApp',
                        title: 'Vue 主页',
                        path: '/vue'
                    },
                    {
                        key: 'IviewApp',
                        title: 'Iview 主页',
                        path: '/iview'
                    },
                    {
                        key: 'StaticMicroApp',
                        title: 'Static 微应用',
                        path: '/static'
                    }
                ]
            }
        },
        methods: {
            ...mapMutations('admin/layout', [
                'setDevice'
            ]),
            handleWindowResize () {
                this.handleMatchMedia();
            },
            handleMatchMedia () {
                const matchMedia = window.matchMedia;

                if (matchMedia('(max-width: 600px)').matches) {
                    this.setDevice('Mobile');
                } else if (matchMedia('(max-width: 992px)').matches) {
                    this.setDevice('Tablet');
                } else {
                    this.setDevice('Desktop');
                }
            }
        },
        mounted () {
            on(window, 'resize', this.handleWindowResize);
            this.handleMatchMedia();
        },
        beforeDestroy () {
            console.log('router', this.$router)
            off(window, 'resize', this.handleWindowResize);
        }
    }
</script>
<style>
</style>
