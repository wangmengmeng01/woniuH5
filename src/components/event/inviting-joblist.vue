<template>
    <div class="container-width-header">
        <Header title="推荐职位"></Header>
        <span class="title-nobg">
            <span class="title-item">已推荐职位({{res.jobSum}})</span>
            <span class="title-item">成功入职({{res.successSum}})</span>
        </span>
        <div v-for="(e,i) in jobObj" :key="i">
            <job-item :stateType="2" :jobItem="e.jobDetailBean" :exData="e"></job-item>
        </div>
        <span v-if="noResult" class="loading-text">到底了</span>
    </div>
</template>

<script>
import Header from 'base-components/header'
import JobItem from 'base-components/jobItem'
import storage from 'good-storage';
import api from 'api/api.js';
import Vue from 'vue'
import { Toast} from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Toast)

export default {
    data(){
        return {
            res:{},
            jobObj:[],
            pageNow:1,
            repeatFlag:false,
            loading:true,
            finished:false,
            noResult:false
        }
    },
    components:{
        Header,
        JobItem
    },
    created(){
        this.pageNow = 1
        this.invitingJob(this.pageNow,true) //查询
    },
    methods:{
        invitingJob(page,refresh){
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.invitingJob,{params:{page:page}}).then(res=>{             
                console.log(res.data.data,'邀请岗位列表')
                if(res.data.code===0){
                    this.noResult = res.data.data.jobSum === 0 ? true : false
                    if(res.data.data.resultList.length<10) this.finished = true
                    this.repeatFlag = false
                    this.loading = false
                    if(refresh){
                        this.res = res.data.data
                        this.jobObj = res.data.data.resultList
                        this.pageNow = 2 //刷新时请求的第一页 下一次从2开始
                    }else{
                        this.jobObj = _this.data.jobObj.concat(res.data.data.resultList),
                        this.pageNow++
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'inviting-joblist邀请岗位列表'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'inviting-joblist邀请岗位列表'+res,duration:1000});
            })
        },
    }
}
</script>

<style scoped>
</style>
