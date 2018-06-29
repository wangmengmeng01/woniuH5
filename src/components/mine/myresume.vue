<template>
    <div class="container-width-header">
        <Header title="我的简历"></Header>
        <div class="">
            <redpack ref="redpack" :money="money"></redpack>
            <div class="full-page-flex">
                <div class="overflow-s">
                    <!-- 提醒完善简历 -->
                    <div v-if="rewardFlag==0" class="orange-tip flex-row-between" @click="getReward">
                        <div class="flex-row-between">
                            <img class="tip-left" mod="" src="../../assets/img/notice.png">
                            <span class="nowrap">完善基本信息、工作履历、教育背景</span>
                        </div>
                        <div class="flex-row-between">
                            <span>领取奖金</span>
                            <img class="tip-right" src="../../assets/img/arrow-right-orange.png">
                        </div>
                    </div>
                    <!-- 可以领取 -->
                     <div v-if="rewardFlag===1" class="orange-tip flex-row-between" @click="getReward">
                        <div class="flex-row-between">
                            <img class="tip-left" src="../../assets/img/notice.png">
                            <span>简历已完善，请领取红包</span>
                        </div>
                        <div class="flex-row-between">
                            <span>领取奖金</span>
                            <img class="tip-right" src="../../assets/img/arrow-right-orange.png">
                        </div>
                    </div>
                    
                    <div class="top" @click="toBaseInfo">
                        <div class="edit"></div>
                        <div class="flex-row-center avatar-box border-bottom">                       
                            <img style="width:55px;height:55px;border-radius:50%;" :src="userInfo.basicInfo.avatar">            
                        </div>
                        <div class="">
                            <span class="name block">{{userInfo.basicInfo.name}}</span>
                            <div class="base-info">
                                <span v-if="userInfo.basicInfo.gender">{{userInfo.basicInfo.gender}}</span>
                                <span v-if="userInfo.basicInfo.age">{{userInfo.basicInfo.age}}岁</span>
                                <span v-if="userInfo.basicInfo.workLife">{{userInfo.basicInfo.workLife}}年</span>
                                <span v-if="userInfo.jobIntension.onBoardDate">{{userInfo.jobIntension.onBoardDate}}</span>
                                <span v-if="userInfo.basicInfo.address">{{userInfo.basicInfo.address}}</span>
                            </div>
                        </div>
                        <div class="info-normal">
                            <span class="">手机号码：</span>
                            <span class="info-normal-data">{{userInfo.basicInfo.mobile}}</span>
                        </div>
                        <div class="info-normal">
                            <span class="">联系邮箱：</span>
                            <span class="info-normal-data">{{userInfo.basicInfo.email}}</span>
                        </div>
                    </div> 
                    <!-- 求职意向 -->
                    <div class="big-card">
                        <text class="middle-title">求职意向</text>
                        <div class="middle-for-info" @click="toIntention">
                            <div class="pos-rel">
                                <div class="edit"></div>
                                <div class="info-normal mgtop0">
                                    <span class="">期望职位：</span>
                                    <span class="info-normal-data">{{userInfo.jobIntension.position}}</span>
                                </div>
                                <div class="info-normal">
                                    <span class="">工作地点：</span>
                                    <span class="info-normal-data">{{userInfo.jobIntension.workPlace}}</span>
                                </div>
                                <div class="info-normal">
                                    <span class="">薪资待遇：</span>
                                    <span class="info-normal-data">{{userInfo.jobIntension.expectedSalary}}</span>
                                </div>
                                <div class="info-normal">
                                    <span class="">期望行业：</span>
                                    <span class="info-normal-data">{{userInfo.jobIntension.industry}}</span>
                                </div>
                                <div class="info-normal">
                                    <span class="">公司规模：</span>
                                    <span class="info-normal-data">{{userInfo.jobIntension.companyScale}}</span>
                                </div>
                                <div class="info-normal">
                                    <span class="">求职状态：</span>
                                    <span class="info-normal-data">{{userInfo.jobIntension.workStatus}}</span>
                                </div>
                                <div class="info-normal">
                                    <span class="">到岗时间：</span>
                                    <span class="info-normal-data">{{userInfo.jobIntension.onBoardDate}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 工作 -->
                    <div class="big-card">
                        <span class="middle-title">工作履历</span>
                        <div class="middle-for-card" v-if="userInfo.workExperiences.length>0">
                              <div v-for="(item,index) in userInfo.workExperiences" :key="index">
                                <div class="card-item" @click="toWorkExp(index)" :data-index="index">
                                    <div class="edit"></div>
                                    <div class="card-top">
                                        <span class="">{{item.position}}</span>
                                        <span class="">{{item.company}}</span>
                                    </div>
                                    <div class="card-middle">
                                        <span class="">{{item.workStart}}~{{item.workEnd}}</span>
                                    </div>
                                    <div class="card-bottom">
                                        <span class="">{{item.workDesc}}</span>
                                    </div>
                                </div>
                              </div>
                        </div>
                        <div class="card-add flex-row-center" @click="toWorkExp(-1)" data-index="-1">
                            <img class="title-icon" src="../../assets/img/add.png">
                            <span>工作履历</span>
                        </div>
                    </div>
                    <!-- 教育 -->
                    <div class="big-card">
                        <span class="middle-title">教育经历</span>
                        <div class="middle-for-card" v-if="userInfo.educationExperiences.length>0">
                            <div v-for="(item,index) in userInfo.educationExperiences" :key="index">
                                <div class="card-item" @click="toEduExp(index)" :data-index="index">
                                    <div class="edit"></div>
                                    <div class="card-top">
                                        <span class="">{{item.school}}</span>
                                    </div>
                                    <div class="card-middle">
                                        <span class="">{{item.educationStart}}~{{item.educationEnd}}</span>
                                    </div>
                                    <div class="card-bottom">
                                        <span class="">{{item.major}}</span>
                                        <span class="">{{item.arrangement}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-add flex-row-center" @click="toEduExp(-1)" data-index="-1">
                            <img class="title-icon" src="../../assets/img/add.png">
                            <span>教育经历</span>
                        </div>
                    </div>
                    <!-- 项目 -->
                    <div class="big-card">
                        <span class="middle-title">项目经验</span>
                        <div class="middle-for-card" v-if="userInfo.projectExperiences.length>0">
                            <div v-for="(item,index) in userInfo.projectExperiences" :key="index">
                                <div class="card-item" @click="toEventExp(index)" :data-index="index">
                                    <div class="edit"></div>
                                    <div class="card-top">
                                        <span class="">{{item.projectName}}</span>
                                        <span class="">{{item.position}}</span>
                                    </div>
                                    <div class="card-middle">
                                        <span class="">{{item.projectStart}}~{{item.projectEnd}}</span>
                                    </div>
                                    <div class="card-bottom">
                                        <span class="">{{item.responsibility}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-add flex-row-center" @click="toEventExp(-1)" data-index="-1">
                            <img class="title-icon" src="../../assets/img/add.png">
                            <span>项目经验</span>
                        </div>
                    </div>
                    <!-- 技能 -->
                    <div class="big-card">
                        <span class="middle-title">我的技能</span>
                        <div class="skill-box"  v-if="userInfo.skill.languages.length>0">
                            <span @click="toMySkill(index)" v-for="(item,index) in userInfo.skill.languages" :key="index">
                                <span class="mybutton-sp mgbt10">{{item.languageName}}</span>
                            </span>
                        </div>
                        <div class="card-add flex-row-center" @click="toMySkill(-1)">
                            <img class="title-icon" src="../../assets/img/add.png">
                            <span>添加技能</span>
                        </div>
                    </div>
                    <!-- 优势 -->
                    <div class="big-card">
                        <span class="middle-title">我的优势</span>
                        <div class="advantage-box" @click="toAdvantage">
                            <div class="edit"></div>
                            <span class="normal-text">{{userInfo.jobIntension.selfEvaluation}}</span>
                        </div>
                    </div>
                </div> 
                 <div class="button-container-bottom">
                    <!-- <van-button type="primary" @click="toAdvantage">保存</van-button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import Redpack from 'base-components/Redpack'
import storage from 'good-storage';
import api from '../../api/api.js';
import Vue from 'vue'
import { Toast} from 'vant';
import 'vant/lib/vant-css/index.css';
export default {
    data(){
       return {
            rewardFlag:2,
            userInfo:{
                basicInfo:{},
                jobIntension:{},
                workExperiences:[],
                educationExperiences:[],
                projectExperiences:[],
                skill:{
                    languages:[]
                }                
            },
            rewardObj:{},
            hasReward:false,
            money:0
       }
    },
    activated(){
        this.getResume();
        this.getRewardStatus();
    },
    methods:{
        toBaseInfo(){
            this.$router.push("/baseinfo-resume")
        },
        toIntention(){
            this.$router.push("/intention")
        },
        toWorkExp(index){
            this.$router.push("/workExp?index="+index);
        },
        toAdvantage(){
            this.$router.push("/advantage");
        },
        toMySkill(index){
            this.$router.push("/mykill?index="+index);
        },
        toEventExp(index){
            this.$router.push("/eventExp?index="+index);
        },
        toEduExp(index){
            this.$router.push("/eduExp?index="+index);
        },
        getResume() {
          this.$ajax.get(api.getResume,{params:{}}).then(res=>{
              console.log(res.data,"获取简历")
              if(res.data.code===0){
                  this.userInfo=res.data.data
              }else if(res.data.code===-99){
                  this.$router.push('/login')
              }else{
                  Toast({message:'myresume获取简历'+res.data.msg,duration:1000});
              }
          }).catch(err=>{
              Toast({message:'myresume获取简历'+err,duration:1000});
          })
        },
        getReward(){
            if (this.rewardFlag!==1){
              if(this.rewardObj.baseinfoSc===0){
                Toast.fail({message:'请先完善基本信息',duration:1000});             
                return
              }
              if(this.rewardObj.eduSc===0){
                  Toast.fail({message:'请先填写一段教育背景',duration:1000});
                return
              }
              if(this.rewardObj.workExperienceSc===0){
                  Toast.fail({message:'请先填写一段工作经历',duration:1000});             
                return
              }
            }
            this.$ajax.get(api.registMoney,{params:{}}).then(res=>{
                console.log(res.data,"获取奖金")
                if(res.data.code===0){
                    this.money=res.data.money/100,
                    this.rewardFlag=-1
                    this.userInfo=res.data.data
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'myresume获取奖金'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'myresume获取奖金'+err,duration:1000});
            })
        },
        getRewardStatus(){
          this.$ajax.get(api.getRewardStatus,{params:{}}).then(res=>{
                console.log(res.data,"奖金状态")
                if(res.data.code===0){
                    this.rewardObj=res.data.data
                    this.rewardFlag=res.data.data.rewardFlag
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'myresume奖金状态'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'myresume奖金状态'+err,duration:1000});
            })
        },
    },
    components:{
        Header,
        Redpack
    },
}
</script>

<style scoped>
.card-add span{margin-left:5px;}
.top{background:#fff;padding:0 15px 25px;margin-bottom:10px;position:relative;}
.top .edit{position:absolute;right:15px;top:15px;}
.avatar-box{padding:30px 0 40px 0;}
.name{margin-top:18px;color:#394763;font-weight:bold;}
.base-info{margin-top:15px;color:#c7cde3;font-size:12px;}
.base-info span{margin-right:20px;position:relative;}
.base-info span:nth-child(n+2):after{content:'';display:block;position:absolute;left:-10px;top:3px;width:1px;height:12px;background:#c7cde3;}
.skill-box{padding:20px 0px;}
.skill-box span:nth-last-child(n+2){margin-right:13px;}
.advantage-box{position:relative;padding:25px 0;}
.full-page-flex{padding-bottom:0px;}
.title-icon{width:10px;height:10px;}
</style>
