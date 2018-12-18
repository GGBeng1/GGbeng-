<template>
    <div class='leftbar'>
        <mu-drawer :open.sync="open" :docked='false'>
            <mu-list>
                <mu-list-item button v-for='(item,index) in leftlist' :key='index' :to='item.path' @click='tap' :ripple="true">
                    <mu-list-item-action>
                        <mu-icon :value="item.icon" :size='item.size' :color='item.color'></mu-icon>
                    </mu-list-item-action>
                    <mu-list-item-title>{{item.name}}</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
    </div>
</template>
<script>
export default {
    name: 'leftbar',
    data() {
        return {
            open: false,
            leftlist: [{
                    name: '菜单',
                }, {
                    name: 'GGbeng',
                    path: '/home/welcome',
                    icon: "home",
                    color: 'amber',
                    size: "28",

                },
                {
                    name: 'bug提交',
                    path: '/home/bug',
                    icon: "send",
                    size: "24",
                    color: 'red'
                }
            ]
        }
    },
    computed: {

    },
    methods: {
        tap() {
            this.open = false;
        }
    },
    created() {
        window.bus.$on("open", () => {
            this.open = !this.open
        })
    },
    beforeDestory() {
        window.bus.$off("open")
    },
    mounted() {

    }

}
</script>
<style lang='scss'>
.leftbar {}
</style>