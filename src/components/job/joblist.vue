<template>
    <div>
        <div class="container-width-header">
            <Header :title="title"></Header>
            <div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="getJobListByType(pageNow,type,false)"
                    :offset="100"
                >
                    <div v-for="(e,i) in jobList" :key="i">
                        <JobItem :jobItem="e"></JobItem>
                    </div>
                </van-list>
                <span v-if="noResult" class="loading-text">到底了</span>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import TextSingle from 'base-components/textSingle'
import JobItem from 'base-components/jobItem'
import storage from 'good-storage'
import api from 'api/api.js'
import { Toast, List } from 'vant';
export default {
    data(){
        return {
            title:'',
            type:'',
            jobList:[],
            pageNow:1,
            repeatFlag:false,
            loading:true,
            finished:false,
            noResult:false
        }
    },
    methods:{
        getJobListByType(page,type,refresh){ //获取职位表
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.getJobListByType,{params:{type:type,page:page}}).then(res=>{             
                console.log(res.data.data,'职位表')
                if(res.data.code===0){
                    this.noResult = res.data.data.totals === 0 ? true : false
                    if(res.data.data.data.length<10) this.finished = true
                    this.repeatFlag = false
                    this.loading = false
                    if(refresh){
                        this.jobList = res.data.data.data
                        this.pageNow = 2 //刷新时请求的第一页 下一次从2开始
                    }else{
                        this.jobList = this.jobList.concat(res.data.data.data)
                        this.pageNow++
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'joblist获取职位表'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'joblist获取职位表'+res,duration:1000});
            })
        },
        changeType(){
            this.jobList = []
            this.type = this.$route.query.type
            this.pageNow = 1
            this.loading = true
            this.finished = false
            this.getJobListByType(this.pageNow,this.type,true)
            switch(this.type*1){
                case -1:
                    this.title = '搜索职位'
                    break
                case 0:
                    this.title = '全部职位'
                    break
                case 1:
                    this.title = '全新职位'
                    break
                case 2:
                    this.title = '热门职位'
                    break
                case 3:
                    this.title = '高薪职位'
                    break
            }
        }
    },
    created(){
        this.changeType()
    },
    components:{
        Header,
        TextSingle,
        JobItem
    }
}
</script>

<style scoped>
</style>