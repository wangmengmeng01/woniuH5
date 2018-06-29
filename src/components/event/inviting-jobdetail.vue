<template>
    <div class="container-width-header">
        <Header title="推荐职位"></Header>
        <div class="big-box">
            <job-item :jobItem="jobObj"></job-item>
            <div class="register-list">
                <div v-for="(e,i) in userList" :key="i">
                    <div class="register-card flex-row-center">
                        <img class="register-avatar" :src="e.userPhoto">
                        <div class="card-middle flex-column-center flex">
                            <span class="register-name">{{e.applyUserName}}</span>
                            <span class="register-state">已申请：{{e.effectiveTime}}</span>
                            <span v-if="e.status == 3 || e.status == 4" class="register-state-success">已入职：{{e.applyRewardTime}}</span>
                        </div>
                    </div>
                </div>
                <span v-if="noResult" class="loading-text">到底了</span>
            </div>
        </div>
        <div class="mybutton-box">
            <van-button class="w100" @click="share" type="primary">再次分享</van-button>
        </div>
    </div>
    
</template>

<script>
import Header from 'base-components/header'
import JobItem from 'base-components/jobItem'
import storage from 'good-storage';
import api from 'api/api.js';
import { Toast } from 'vant';
import 'vant/lib/vant-css/index.css';

export default {
    data(){
        return {
            jobObj:{},
            userList:{},
            noResult:false,
            userName:''
        }
    },
    created(){
        this.getUserInfo() //查询分享者信息
        this.invitingRegister() //查询
    },
    methods:{
        share(){},
        invitingRegister(){
            this.$ajax.get(api.invitingRegister,{params:{jobId:this.$route.query.jid}}).then(res=>{             
                console.log(res.data.data,'邀请的人和岗位')
                if(res.data.code===0){
                    // this.noResult = res.data.data.jobSum === 0 ? true : false
                    this.jobObj = res.data.data.jobDetailBean
                    this.userList = res.data.data.userList
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'inviting-jobdetail邀请的人和岗位'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'inviting-jobdetail邀请的人和岗位'+res,duration:1000});
            })
        },
        getUserInfo(){
            this.$ajax.get(api.getUserInfo).then(res=>{             
                console.log(res.data.data,'保存个人信息')
                if(res.data.code===0){
                    this.userName = res.data.data.realName
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'inviting-jobdetail保存个人信息'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'inviting-jobdetail保存个人信息'+res,duration:1000});
            })
        }
    },
    components:{
        Header,
        JobItem
    },
}
</script>

<style scoped>
.register-list{padding:0 15px;background:#fff;}
.register-card{padding:15px 0 20px;align-items:flex-start;}
.register-card:nth-last-child(n+2){border-bottom:1px solid #f2f5f7;}
.register-avatar{width:40px;height:40px;border-radius:100px;margin-right:15px;}
.card-middle{align-items:flex-start;}
.card-right{height:75px;}
.register-name{font-size:15px;color:#374665;}
.register-state{font-size:12px;color:#909ba3;margin-top:10px;}
.register-state-success{font-size:12px;color:#29a1f7;margin-top:10px;}
.share-btn{display:block;text-align:center;border-radius:6px;line-height:45px;font-size:15px;background:#29a1f7;color:#fff;}
.big-box{padding-bottom:60px;}
</style>
