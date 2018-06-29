<template>
    <div class="container-width-header">
        <Header title="好友注册"></Header>
        <redpack ref="redpack" :money="money"></redpack>
        <span class="title-nobg">
            <span class="title-item">邀请成功注册({{sum}}人)</span>
        </span>
        <div class="register-list">
            <van-list
                v-model="loading"
                :finished="finished"
                @load="myInvitingList(pageNow,false)"
                :offset="100"
            >
                <div v-for="(e,i) in registerObj" :key="i">
                    <div class="register-card flex-row-center">
                        <img class="register-avatar" :src="e.userPhoto">
                        <div class="card-middle flex-column-center flex">
                            <span class="register-name">{{e.inviteUserName}}</span>
                            <span v-if="e.inviteRewardFlag===0" class="register-state-no">简历待完善</span>
                            <span v-else class="register-state">简历已完善</span>
                            <span class="register-time">已注册：{{e.inviteTime}}</span>
                        </div>
                        <div class="card-right flex-column-center">
                            <span v-if="e.inviteRewardFlag===1" class="register-reward" @click="getReward(e.id,i)">领红包</span>
                            <span v-if="e.inviteRewardFlag===2" class="register-reward-no">已领取</span>
                        </div>
                    </div>
                </div>
            </van-list>
            
        </div>
        <span v-if="noResult" class="loading-text">到底了</span>
    </div>
</template>

<script>
import Header from 'base-components/header'
import Redpack from 'base-components/Redpack'
import storage from 'good-storage';
import api from 'api/api.js';
import Vue from 'vue'
import { Toast, List} from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Toast)

export default {
    data(){
       return {
            res:{},
            sum:0,
            registerObj:[], //热门相关
            money:0,
            pageNow:1,
            repeatFlag:false,
            loading:true,
            finished:false,
            noResult:false
       }
    },
    created(){
        this.pageNow = 1
        this.myInvitingList(this.pageNow,true)
    },
    methods:{
        myInvitingList(page,refresh){
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.myInvitingList,{params:{page:page}}).then(res=>{             
                console.log(res.data.data,'邀请列表')
                if(res.data.code===0){
                    this.noResult = res.data.data.sum === 0 ? true : false
                    if(res.data.data.inviteUserAccountVOS.length<10) this.finished = true
                    this.repeatFlag = false
                    this.loading = false
                    this.sun = res.data.data.sum
                    if(refresh){
                        this.registerObj = res.data.data.inviteUserAccountVOS,
                        this.pageNow = 2 //刷新时请求的第一页 下一次从2开始
                    }else{
                        this.registerObj = this.registerObj.concat(res.data.data.inviteUserAccountVOS,)
                        this.pageNow++
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'inviting-registerlist邀请列表'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'inviting-registerlist邀请列表'+res,duration:1000});
            })
        },
        getReward(id,index){
            this.$ajax.get(api.inviteMoney,{params:{id:id}}).then(res=>{
                console.log(res.data.data,"得到红包")
                if(res.data.code===0){
                    if (!res.data.data.money) {
                        Toast({message:'服务器异常',duration:1000});
                        return
                    };
                    this.registerObj[index].inviteRewardFlag = 2
                    this.money = res.data.data.money/100
                    this.$refs.redpack.show()
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'inviting-registerlist得到红包'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast.fail({message:'inviting-registerlist得到红包'+err,duration:1000});
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
.register-list{padding:0 15px;background:#fff;}
.register-card{padding:15px 0 20px;align-items:flex-start;}
.register-card:nth-last-child(n+2){border-bottom:1px solid #f2f5f7;}
.register-avatar{width:40px;height:40px;border-radius:100px;margin-right:15px;}
.card-middle{align-items:flex-start;line-height:1.4;}
.card-right{height:75px;}
.register-name{font-size:15px;color:#374665;}
.register-state{font-size:12px;color:#909ba3;margin-top:10px;}
.register-state-no{font-size:12px;color:#ec5151;margin-top:10px;}
.register-time{font-size:12px;color:#909ba3;margin-top:10px;}
.register-reward{color:#fff;background:#ff824b;padding:3px 8px;border-radius:100px;font-size:14px;}
.register-reward-no{color:#fff;background:#cbd4db;padding:3px 8px;border-radius:100px;}
</style>
