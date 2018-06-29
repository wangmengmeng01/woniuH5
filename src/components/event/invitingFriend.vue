<template>
    <div class="container-width-header">
        <Header title="活动">
            <div v-if="this.$route.query.type*1" slot="left-icon"></div>
        </Header>
        <div class="">
            <div class="contain overflow-s">
                <img  class="bg" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/shareRe.jpg">
                <div @click="toUrl('inviting-registerlist')" class="see"></div>
                <div @click="toUrl('inviting-joblist')" class="see see1"></div>
                <span class="num">{{inviteNumber}} <span class="wei">位</span></span>
                <span class="num num1">{{recommNumber}} <span class="wei">位</span></span>
                <div class="bottom flex-row-around" @click="share">
                    <div class="apply" >立即邀请</div>
                </div>
            </div>
            <Share ref="share"></Share>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import Share from 'base-components/share'
import storage from 'good-storage';
import api from 'api/api.js';
import Vue from 'vue'
import { Toast} from 'vant';

export default {
    data(){
       return {
            inviteNumber: 0,
            recommNumber: 0,
            inviteCode:"",
            shareDesc:'',
            shareTitle:'',
            shareUrl:'',
       }
    },
    components:{
        Header,
        Share
    },
    created(){
        this.myInvitings()
        this.getCode()
        this.weixinInit()
    },
    methods:{
        toUrl(url){
            this.$router.push(url)
        },
        myInvitings(){
            this.$ajax.get(api.myInvitings,{params:{}}).then(res=>{
                console.log(res.data,'我的邀请数量')
                if(res.data.code===0){
                    this.inviteNumber=res.data.data.inviteNumber
                    this.recommNumber=res.data.data.recommNumber
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'invitingFriend获取我的邀请数量'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'invitingFriend获取我的邀请数量'+err,duration:1000});
            })
        },
        getCode(){
            this.$ajax.get(api.getUserInfo,{params:{}}).then(res=>{
                console.log(res,"获取邀请码")
                if(res.data.code===0){
                    this.inviteCode=res.data.data.inviteCode
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'invitingFriend获取分享验证码'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'invitingFriend获取分享验证码'+err,duration:1000});
            })
        },
        share(){
            this.$refs.share.toggle()
        },
        weixinInit(){
            this.$ajax.get(api.wxShare,{param:{'jid':this.$route.queryt.jid}}).then(res=>{
                console.log(res.data,'微信分享内容')
                if(res.data.code===0){
                    this.shareDesc = res.data.data.desc;
                    this.shareTitle = res.data.data.title;
                    this.shareUrl = res.data.data.shareUrl;
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'invitingFriend获取微信分享内容'+res.data.msg,duration:1000});
                }
            })
            .then(()=>{
                this.$ajax.get(api.wxShareConfig).then(res=>{
                    console.log(res.data,"配置微信权限")
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                        appId: 'wx996d7ea6f254589c', // 必填，公众号的唯一标识
                        timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
                        signature: res.data.data.signature,// 必填，签名
                        jsApiList: [
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline'
                        ] // 必填，需要使用的JS接口列  
                    });
                    wx.ready(() => {
                        wx.onMenuShareAppMessage({
                            title: this.shareTitle, // 分享标题
                            desc: this.shareDesc, // 分享描述
                            link: this.shareUrl, // 分享链接
                            imgUrl: '', // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户点击了分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareTimeline({
                            title: this.title, // 分享标题
                            link: this.url, // 分享链接
                            imgUrl: '', // 分享图标
                            success: function () {
                            // 用户点击了分享后执行的回调函数
                            }
                        });
                    }); 
                }) 
            })
            .catch(err=>{
                Toast({message:err,duration:1000});
            })
        },
        
    }
}
</script>

<style scoped>
.contain{
    position: relative;
    padding-bottom:20px;
}
.bg{
    display: block;
    width: 100%;
}
.num{
    font-size: 24px;
    position: absolute;
    left: 29%;
    top: 30.5%;
    /* color: blue; */
    color: #0b84d7;
}
.wei{
    font-size: 12px;
}
.num1{
    left: 29.3%;
    top: 38.3%;
}
.see{
    position: absolute;
    width: 325px;
    height: 59px;
    right: 7%;
    top: 28%;
     /* background-color: red;  */
}
.see1{
    right: 7%;
    top: 36.3%;
}
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
