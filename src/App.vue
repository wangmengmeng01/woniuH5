<template>
    <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import storage from 'good-storage'
export default {
    methods:{

    },
    watch: {
        $route (to, from) { //-99跳到login
            // document.querySelector('#app').scrollTop = 0
            if(to.path==="/login"){
                storage.set("sessionId",'');
            }
        }
    },
    components:{

    }
}
</script>

<style lang="stylus">
@import "~util/reset.styl"
@import "~util/base.styl"
@import '~util/common.styl'
#app
    background:#f3f5f7
    position:relative
    min-height:100%
    // width:100%
    // height:100%
    // overflow:auto
</style>
