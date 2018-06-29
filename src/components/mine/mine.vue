<template>
    <div class="mine">
        <Header title="我的">
            <div slot="left-icon"></div>
        </Header>
        <div class="container-width-header">
            <div class="flex-column-center shadow-box">
                <div class="top">
                    <router-link to="/baseinfo">
                        <div class="flex-row-center top-top">
                            <img style="background:#fff;width:30px;height:30px;border-radius:50%;" :src="userInfo.avatarPhoto">
                            <span class="name">{{userInfo.realName}}</span>
                        </div>
                    </router-link>
                    <div class="flex-row-center top-bottom">
                        <div>
                            <span class="block p12 mgbt5">诚信刀值</span>
                            <span v-if="userInfo.scoreVO">{{userInfo.scoreVO.totalScore}}</span>
                        </div>
                        <div class="rank">
                            <span class="block p12 mgbt5">好友排名</span>
                            <span>{{userInfo.friendRank}}</span>
                        </div>
                    </div>
                </div>
                <div class="middle flex-row-around">
                    <div class="state flex-column-center" data-type="1" @click="toUrl('/joblist-aboutme?type=0')">
                        <span class="state-num">{{countJobStatus.applyed||0}}</span>
                        <span class="state-disc">已投递</span>
                    </div>
                    <div class="state flex-column-center" data-type="2" @click="toUrl('/joblist-aboutme?type=1')">
                        <span class="state-num">{{countJobStatus.sended||0}}</span>
                        <span class="state-disc">沟通过</span>
                    </div>
                    <div class="state flex-column-center" data-type="3" @click="toUrl('/joblist-aboutme?type=-1')">
                        <div class="state-icon">
                            <span class="state-num orange">{{countJobStatus.interviewed||0}}</span>
                            <span class="state-text">入职奖</span>
                        </div>

                        <span class="state-disc">待面试</span>
                    </div>
                </div>
                <div class="middle flex-row-around">
                    <div class="state flex-column-center" @click="toUrl('/myresume')">
                        <div class="resume-icon">
                            <img class="service-icon" src="../../assets/img/mine-icon-1-1.png">
                            <span class="resume-percent">{{resumePercent}}%</span>
                        </div>
                        <span class="state-disc">我的简历</span>
                    </div>
                    <div class="state flex-column-center" @click="toUrl('/intention')">
                        <img class="service-icon" src="../../assets/img/mine-icon-1-2.png">
                        <span class="state-disc">求职意向</span>
                    </div>
                    <div class="state flex-column-center" @click="toUrl('/joblist-aboutme?type=2')">
                        <img class="service-icon" src="../../assets/img/mine-icon-1-3.png">
                        <span class="state-disc">职位收藏</span>
                    </div>
                    <div class="state flex-column-center" @click="toUrl('/whofocusme')">
                        <img class="service-icon" src="../../assets/img/mine-icon-1-4.png">
                        <span class="state-disc">谁看过我</span>
                    </div>
                </div>
                <div class="middle-sp flex-row-around mgbt0 grid">
                    <div class="state flex-column-center pos-rel" @click="toUrl('invitingFriend?type=0')">
                        <div style="position:absolute;top:10px;left:0;right:0;text-align:center;">
                            <img class="service-icon" style="width:40px;height:40px;" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/gift.png">
                            <span class="state-text" style="left:70%;width:auto">奖</span>
                        </div>
                        <img class="service-icon" src="../../assets/img/mine-icon-2-1.png">
                        <span class="state-disc">好友注册</span>
                    </div>
                    <div class="state flex-column-center" @click="showWaiting">
                        <img class="service-icon" src="../../assets/img/mine-icon-2-2.png">
                        <span class="state-disc">日志</span>
                    </div>
                    <div class="state flex-column-center"  @click="showWaiting">
                        <img class="service-icon" src="../../assets/img/mine-icon-2-3.png">
                        <span class="state-disc">足迹</span>
                    </div>
                    <div class="state flex-column-center" @click="showWaiting">
                        <img class="service-icon" src="../../assets/img/mine-icon-2-4.png">
                        <span class="state-disc">相册</span>
                    </div>
                </div>
                <div class="middle-sp flex-row-around grid border-top">
                    <div class="state flex-column-center" @click="showWaiting">
                        <img class="service-icon" src="../../assets/img/mine-icon-2-5.png">
                        <span class="state-disc">运动</span>
                    </div>
                    <div class="state flex-column-center" @click="showWaiting">
                        <img class="service-icon" src="../../assets/img/mine-icon-2-6.png">
                        <span class="state-disc">城市服务</span>
                    </div>
                    <div class="state flex-column-center" @click="showWaiting">
                        <img class="service-icon" src="../../assets/img/mine-icon-2-7.png">
                        <span class="state-disc">手机充值</span>
                    </div>
                    <div class="state flex-column-center" @click="toUrl('/more')">
                        <img class="service-icon" src="../../assets/img/mine-icon-2-8.png">
                        <span class="state-disc">更多</span>
                    </div>
                </div>
                <div class="w100 mgbt10">
                    <MyLine url="/personalReward" title="奖金账户" icon="mine-icon-3-3.png" :hasTopBorder="false"></MyLine>
                    <!-- <MyLine url="/pages/account/credit/personal-creditindex/personal-creditindex" title="我的信钻" icon="../../assets/img/mine-icon-3-4.png"></MyLine> -->
                    <!-- <MyLine url="/pages/mine/setting/personal-setting/personal-setting" title="设置" icon="../../assets/img/mine-icon-3-1.png"></MyLine> -->
                    <MyLine url="/feedback" title="反馈帮助" icon="mine-icon-3-2.png"></MyLine>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import MyLine from 'base-components/myLine'
import storage from 'good-storage';
import basedata from 'util/basedata'
import api from 'api/api.js';
import { Toast } from 'vant';
import { waiting } from 'util/common.js'
export default {
    data(){
       return {
           userInfo:{},
            name:'',
            avatar:'',
            resumePercent:0,
            countJobStatus:{},
            canTap:false
       }
    },
    activated(){
        this.getCvDegree()
        this.getBaseData()
        this.countJobStatusFunc()
        this.getUserInfo()
    },
    methods:{
        getUserInfo(){
            this.$ajax.get(api.getUserInfo).then(res=>{
                console.log(res.data.data,'个人信息')
                if(res.data.code===0){
                    if (res.data.data.scoreVO.totalScore == -1) {
                        res.data.data.scoreVO.totalScore = 0
                    };
                    this.userInfo = res.data.data
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'mine个人信息'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'mine个人信息'+res,duration:1000});
            })
        },
        countJobStatusFunc(){
            this.$ajax.get(api.countJobStatus).then(res=>{             
                console.log(res.data.data,'3个数据')
                if(res.data.code===0){
                    this.countJobStatus = res.data.data
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'mine计算工作状态'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'mine计算工作状态'+res,duration:1000});
            })
        },
        getCvDegree(){
            this.$ajax.get(api.getCvDegree).then(res=>{             
                console.log(res.data.data,'简历百分比')
                if(res.data.code===0){
                    this.resumePercent = res.data.data
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'mine简历百分比'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'mine简历百分比'+res,duration:1000});
            })
        },
        getBaseData(){
            basedata.getPositionList()
            basedata.getSalaryList()
            basedata.getScaleList()
            basedata.getJobStateList()
            basedata.getIndustryList()
            basedata.getWorkStartList()
            basedata.getExperienceList()
        },
        showWaiting(){
            waiting()
        },
        toUrl(url){
            this.$router.push(url)
        },
    },
    components:{
        Header,
        MyLine
    }
}
</script>

<style scoped>
.top{
    background:url("http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/mine-bg.png") no-repeat center/100%;
    color:#fff;
    padding:20px;
    width:100%;
    height:258rpx;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
}
.top-top{margin-bottom: 26px;}
.rank{margin-left:30px;}
.name{margin-left:10px;color:#fff;}

.resume-icon{position:relative;}
.resume-percent{position:absolute;left:100%;top:-2px;background:#ff824b;border-radius:100px 100px 100px 0px;color:#fff;font-size:10px;transform:scale(0.8);padding:2px 4px;}
.shadow-box{position:relative;}
.shadow{position:absolute;top:0;bottom:0;left:0;right:0;}
.service-icon{width:24px;height:24px;}
.state-icon{position:relative;}
.state-text{position:absolute;left:130%;top:-2px;background:#ec5151;border-radius:100px 100px 100px 0px;color:#fff;font-size:10px;padding:0 4px;width:46px;transform:scale(0.8);padding:4px;}
.reward-card{position:relative;}
</style>
