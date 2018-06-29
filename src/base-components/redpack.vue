<template>
    <div v-if="rewardShow" class="myShadow flex-column-center">
        <div class="shadow-top flex-column-center">
            <img class="red-page" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/red-page2.png">
            <span class="shadow-text-bottom"><span class="money">{{money}}</span>元</span>
            <div @click.stop="hide" class="clickButton">确定</div>
            <div class="close-icon" @click.stop="hide"></div>
        </div>
    </div>
</template>

<script>
import Back from 'base-components/back'
export default{
    props:{
        money:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            rewardShow:false
        }
    },
    methods:{
        hide(){
            this.rewardShow = false
        },
        show(){
            this.rewardShow = true
        }
    }
}
</script>

<style scoped lang="stylus">
.close-icon{margin-top:5px;}
.shadow-top{position:relative;}
.shadow-text-bottom,.clickButton{position:absolute;left:0;right:0;text-align:center;color:#db2b30;font-size:14px;z-index:1;}
.shadow-text-bottom{top:145px;color:#ffe13a;}
.clickButton{top:230px;color:#fff7f8;font-size:15px;padding:9px 20px;border-radius:100px;border:1px solid #fcbbc4;margin:auto;width:150px;}
.money{font-size:50px;margin-right:5px;margin-left:10px;}
.myShadow{position:fixed;z-index:1;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0.4);}
.close-icon{position:absolute;right:0;top:0;width:40px;height:40px;padding:10px;}
.flex-column-center{display:flex;flex-direction:column;justify-content:center;align-items:center;}
.red-page{width:250px;height:290px}
</style>
