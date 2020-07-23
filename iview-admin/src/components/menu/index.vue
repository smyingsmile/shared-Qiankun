<template>
  <section class="cns-main-menu">
    <Col span="8">
        <Menu ref="sideMenu" :active-name="selectKey" @on-select="changeMenu">
            <MenuItem :name="item.key" v-for="item in menus" :key="item.key" :to="{ path: item.path }" >
                <Icon v-if="item.icon" :type="item.icon" />
                <span>{{item.title}}</span>
            </MenuItem>
        </Menu>
    </Col>
  </section>
</template>

<script>
    export default {
        name: 'MainMenu',
        Component: {},
        props: {
            menus: {
                type: Array,
                default: () => ([])
            }
        },
        data () {
            return {
                selectKey: ''
            }
        },
        created () {
            this.initMenus()
        },
        methods: {
            initMenus () {
                // log('menus', this.menus)
                let currentMenu = this.findCurrentMenu(this.menus, this.$route.path)
                // 主应用没有找到 跳转404页面
                // log('currentMenu', currentMenu)
                if (!currentMenu) {
                    this.$router.push('/404')
                }
                let { key } = currentMenu
                this.selectKey = key
            },
            findCurrentMenu (menus, currentPath) {
                for (let i = 0; i < menus.length; i++) {
                    let menu = menus[i]
                    let { path } = menu
                    if (path === '/') {
                        if (currentPath === '/') {
                            return menu
                        } else {
                            continue
                        }
                    } else if (currentPath.startsWith(path)) {
                        return menu
                    }
                    let currentMenu = this.findCurrentMenu(menu.children || [], currentPath)
                    if (currentMenu) {
                        return currentMenu
                    }
                }
                return null
            },
            /**
             * 切换菜单
             */
            changeMenu () {
                console.log('currentMenu', name)
            }
        },
        Watch: {
            '$route.path': {
                handler () {
                    this.initMenus()
                    // this.selectKey = this.$route.path
                },
                deep: true
            }
        }
    }

</script>
