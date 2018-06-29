<template>
    <div class="container-width-header">
        <Header title="我的">
            <div slot="left-icon"></div>
        </Header>
        <div class="">
            <!-- <getphone-modal bindgetPhoneSuccess="getFlag" id="getPhone"></getphone-modal> -->
            <div>
                <img mode="widthFix" style="width:100%;" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/rewardBg.jpg">
                <div class="bottom flex-row-around" bindtap="registe">
                    <span v-if="stateFlag==false" class="apply">立即注册</span>
                    <span v-else class="apply">前往首页</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import storage from 'good-storage';
import api from '../../api/api.js';
export default {
    data(){
       return {
        stateFlag:true
       }
    },
    components:{
        Header
    },
    created(){

    },
    methods:{

    }
}
</script>

<style scoped>
.bottom{
    position: fixed;
    bottom: 0px;
    left: 0px;
    height: 64px;
    width: 100%;
    background-color: #fff; 
}
.apply{
    background-color: #29a1f7;
    color: #fff;
    width: 325px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 5px;
}
</style>
