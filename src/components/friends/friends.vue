<template>
    <div class="container-width-header">
        <Header title="朋友">
            <div slot="left-icon"></div>
        </Header>
        <div class="">
             <div class="contain">
                <div class="box" bindtap="showWaiting">
                    <img class="left-icon" mode="widthFax" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/know.png">
                    <div >
                        <span>新的好友</span>
                        <img mode="widthFix" style="width:12px;margin-left:10px;" src="../../assets/img/arrow-right.png">
                    </div>
                </div>
                <div class="box" bindtap="showWaiting">
                    <img class="left-icon" mode="widthFax" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/job.png">
                    <div>
                        <span>我的好友</span>
                        <img mode="widthFix" style="width:12px;margin-left:10px;" src="../../assets/img/arrow-right.png">
                    </div>
                </div>
             </div>         
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import storage from 'good-storage';
import api from 'api/api.js';
import { waiting } from 'util/common.js'
export default {
    data(){
       return {

       }
    },
    methods:{
        showWaiting(){
            waiting()
        }
    },
    components:{
        Header
    }
}
</script>

<style scoped>
    .contain{
        padding: 0 15px;
        background-color: #fff;
    }
    .box {
        font-size: 15px;
        color: #374665;
        position: relative;
        border-bottom: 1px solid #f2f5f7;
    }
    .box div{
        display: flex;
        justify-content:space-between;
        align-items:center;
    }
    .box span{
        line-height: 80px!important;
    }
    .left-icon{
        width: 36px;
        height: 36px;
        position: absolute;
        top: 23px;
        left: 0px;
    }
    .box span:first-child{
        margin-left: 51px;
    }
</style>
