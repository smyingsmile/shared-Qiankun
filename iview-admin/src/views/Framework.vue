<template>

</template>

<script>
import MainMenu from '../components/menu'

export default {
    components: { MainMenu },
    data() {
        return {
            menus: [
                {
                    key: "Home",
                    title: "主页",
                    path: "/"
                },
                {
                    key: "VueMicroApp",
                    title: "Vue 主页",
                    path: "/vue"
                },
                {
                    key: "IviewApp",
                    title: "Iview 主页",
                    path: "/iview"
                },
                {
                    key: "StaticMicroApp",
                    title: "Static 微应用",
                    path: "/static"
                }
            ]
        }
    }
}
</script>