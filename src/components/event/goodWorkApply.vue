<template>
    <div class="container-width-header">
        <Header title="活动">
            <div slot="left-icon"></div>
        </Header>
        <div class="">
            <div class="bg">
                <img mode="widthFix" style="width:100%;" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/rewardJobBg.jpg">
                <div class="people-box">
                    <img class="people" hidden="{{imgFlag}}" binderror="imgError" mode="widthFix" src="{{detail.avatar}}" >
                </div>
                <span class="dec">好友  {{detail.name}}  给你推荐热门职位啦
                入职后，即可得到奖金哦~
                </span>
                <div class="title">
                    <span >{{detail.jobDetail.position}}</span>
                    <span >{{detail.jobDetail.wagemin}}K-{{detail.jobDetail.wagemax}}K</span>
                </div>
                <div class="bot">
                    <img  mode="widthFix" src="{{detail.jobDetail.companyLogo}}">
                    <span>{{detail.jobDetail.companyName}}</span>
                </div>
                <div class="adress">
                    <span>{{detail.jobDetail.prov}}-{{detail.jobDetail.city}}</span>
                    <span>{{detail.jobDetail.workexp_span}}</span>
                    <span>{{detail.jobDetail.edu_span}}</span>
                    <span>{{detail.jobDetail.published_span}}</span>
                </div>
                <div class="clickJob" bindtap="apply"></div>
                <div class="bottom flex-row-around" bindtap="apply">
                    <span class="apply">立即申请</span>
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

       }
    },
    components:{
        Header
    },
    created(){

    },
    methods:{
        shareJobDetail(){
          this.$ajax.get(api.shareJobDetail,{params:{}}).then(res=>{
              console.log(res)
              if(res.data.code===0){
                  this.inviteNumber=res.data.data.inviteNumber
                  this.recommNumber=res.data.data.recommNumber
              }else if(res.data.code===-99){
                  this.$router.push('/login')
              }else{
                  Toast({message:'goodWorkApply分享岗位详情'+res.data.msg,duration:1000});
              }
          }).catch(err=>{
              Toast({message:'goodWorkApply分享岗位详情'+err,duration:1000});
          })
          // wx.request({
          //   url: api.shareJobDetail,
          //   method:"GET",
          //   header:{
          //     sessionId: wx.getStorageSync('sessionId')
          //   },
          //   data: {
          //     inviteCode:_this.data.inviteCode,
          //     jid:_this.data.jid,
          //   },
          //   success(res){
          //     console.log(res,"bbbbb")
          //     if(res.data.msg=="success")
          //     {
          //       console.log(res.data.data)
          //       _this.setData({
          //         detail:res.data.data
          //       })
          //       if(_this.data.detail.avatar){
          //         _this.setData({
          //         imgFlag:false
          //       })
          //       }
          //     }
          //   },
          //   fail(res){
          //     console.log(res)
          //   }
          // })
        },
    }
}
</script>

<style scoped>
.bg{
    position: relative;
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
.people-box{
    position: absolute;
    top: 14%;
    left:0;
    right:0;
    text-align:center;
}
.people{
    width: 75px;
    border-radius: 50%;
    box-shadow:0 1px 8px rgba(0,0,0,0.4);
}
.dec{
    font-size: 14px;
    color: #544342;
    position: absolute;
    left: 0;
    top: 18.5%;
    width: 100%;
    text-align: center;
}

.title{
    position: absolute;
    left: 0;
    top: 23%;
    width: 100%;
    padding: 0 45px;
    background-color: transparent;
}
.title span:nth-child(1){
    font-size: 15px;
    font-weight: bold;
    float: left;
}
.title span:nth-child(2){
    font-size: 15px;
    font-weight: bold;
    float: right;
    color: #ff824b;
}
.adress{
    position: absolute;
    left: 0;
    top: 24.5%;
    width: 100%;
    font-size: 12px;
    line-height: 12px;
    color: #bab0a9;
    padding: 0 34px;
}
.adress span{
    float: left;
    padding: 0 10px;
    border-left: 1px solid #bab0a9;
}
.adress span:first-child{
    border-left: none;
}
.adress span:last-child{
    float: right;
    border-left: none;
}
.bot{
    position: absolute;
    left: 0;
    top: 25.5%;
    width: 100%;
    font-size: 12px;
    line-height: 20px;
    padding-left: 44px;
    color: #9a9188;
}
.bot img{
    width: 20px;
    height: 20px;
    vertical-align: top;
    margin-right: 5px;
}
.clickJob{
    width: 100%;
    height: 106px;
    position: absolute;
    left: 0;
    top: 22%;
}
</style>
