<template>
<!-- 这是最大的选项卡路由页面 -->
	<div class="tab full">
        <div class="top">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <div class="bottom flex-row-around">
            <router-link :to="e.url" tag="div" v-for="(e,i) in tabItem" :key="i" class="flex-column-between" :class="{'tab-active':activeIndex===i}" @click.native="changeActive(i)">
                <img :src="activeIndex===i?e.imgActive:e.img" alt="">
                <p class="txt">{{e.txt}}</p>
            </router-link>
        </div>
	</div>
</template>

<script>

export default {
    data(){
        return{
            activeIndex:0,
            tabItem:[
                {path:'/job',txt:'职场',img:require('../../assets/img/tabBar/tab-1-1.png'),imgActive:require('../../assets/img/tabBar/tab-1-2.png'),url:'/job'},
                {path:'/msg',txt:'消息',img:require('../../assets/img/tabBar/tab-2-1.png'),imgActive:require('../../assets/img/tabBar/tab-2-2.png'),url:'/msg'},
                {path:'/friends',txt:'好友',img:require('../../assets/img/tabBar/tab-3-1.png'),imgActive:require('../../assets/img/tabBar/tab-3-2.png'),url:'/friends'},
                {path:'/mine',txt:'我的',img:require('../../assets/img/tabBar/tab-4-1.png'),imgActive:require('../../assets/img/tabBar/tab-4-2.png'),url:'/mine'},
            ]
        }
    },
	methods:{
        changeActive(index){
            this.activeIndex = index
        },
        getActive(){
            let _index = this.tabItem.findIndex((e)=>{
                return e.path === this.$route.path
            })
            this.activeIndex = _index
        }
    },
    activated(){
        this.getActive()
    },
    components:{

    }
}
</script>

<style lang="stylus" scoped>
@import "~util/base.styl"
.top
    height:calc(100% - 49px)
    width:100%
    background:#f3f5f7
    overflow:auto
.bottom
    position:fixed
    bottom:0
    width:100%
    padding:0 15px
    height:49px
    background:#fff
    overflow hidden
    img 
        width:27px
        height:27px
    .txt
        font-size:10px
        margin-top:5px
        color:#909ba3
.tab-active
    .txt
        color:$blue
</style>