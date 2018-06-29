<template>
    <div>
        <div class="container-width-header">
            <Header :title="title"></Header>
            <div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="getJobListByStatus(pageNow,type,false)"
                    :offset="100"
                >
                    <div v-for="(e,i) in jobList" :key="i">
                        <JobItem ref="jobItem" @uploadContract="uploadContract" :index="i" :jobItem="e" :stateType="stateType"></JobItem>
                    </div>
                </van-list>
                <input id="takepicture" @change="uploading" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp" class="dis-none">
                <!-- <van-uploader class="dis-none" ref="uploader" accept="image/jpg,image/jpeg,image/png"></van-uploader> -->
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
            noResult:false,
            stateType:0,
            contractJid:''
        }
    },
    methods:{
        getJobListByStatus(page,type,refresh){ //获取已投递职沟通过位表 
            this.stateType = 0
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.getJobListByStatus,{params:{status:type,page:page}}).then(res=>{             
                console.log(res.data.data,'已投递')
                if(res.data.code===0){
                    this.noResult = res.data.data.totals === 0 ? true : false
                    if(res.data.data.data.length<10) this.finished = true //层级有不一样
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
                    Toast({message:'joblist已投递+沟通过职位表'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'joblist已投递+沟通过职位表'+res,duration:1000});
            })
        },
        jobListInterviewed(page,type,refresh){ //获取待面试
            this.stateType = 1
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.jobListInterviewed,{params:{page:page}}).then(res=>{             
                console.log(res.data.data,'待面试')
                if(res.data.code===0){
                    this.noResult = res.data.data.length === 0 ? true : false
                    if(res.data.data.length<10) this.finished = true //层级有不一样
                    this.repeatFlag = false
                    this.loading = false
                    if(refresh){
                        this.jobList = res.data.data
                        this.pageNow = 2 //刷新时请求的第一页 下一次从2开始
                    }else{
                        this.jobList = this.jobList.concat(res.data.data)
                        this.pageNow++
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'joblist待面试职位表'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'joblist待面试职位表'+res,duration:1000});
            })
        },
        jobSaveList(page,type,refresh){ //获取职位收藏表
            this.stateType = 0
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.jobSaveList).then(res=>{             
                console.log(res.data.data,'职位收藏')
                if(res.data.code===0){
                    this.noResult = res.data.data.length === 0 ? true : false
                    if(res.data.data.length<10) this.finished = true //层级有不一样
                    this.repeatFlag = false
                    this.loading = false
                    if(refresh){
                        this.jobList = res.data.data
                        this.pageNow = 2 //刷新时请求的第一页 下一次从2开始
                    }else{
                        this.jobList = this.jobList.concat(res.data.data)
                        this.pageNow++
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'joblist职位收藏'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'joblist职位收藏'+res,duration:1000});
            })
        },
        uploading(e){
            let regexp = new RegExp("(.jpg$)|(.png$)|(.bmp$)|(.jpeg$)","i");
            if(e.target.files[0]&&regexp.test(e.target.files[0].name)){
                var formdata = new FormData();
                formdata.append ("file" , e.target.files[0]);
                formdata.append ("jobId" , this.contractJid);
                this.$ajax({
                    method:"post",
                    url:api.uploadContract,
                    data:formdata
                }).then((res)=>{
                    console.log(res.data.url,'图片上传')
                    if(res.data.code === 0){
                        this.$refs.jobItem[index].changeStatus(2)
                    }else{
                        oast({message:'joblist职位收藏'+res.data.msg,duration:1000});
                    }
                }).catch((res)=>{
                    Toast({message:'joblist职位收藏'+res,duration:1000});
                })
            }
        },
        uploadContract(jid,index){
            this.contractJid = jid
            document.getElementById('takepicture').click()
        },
        changeType(){
            this.jobList = []
            this.type = this.$route.query.type
            this.pageNow = 1
            this.loading = true
            this.finished = false
            switch(this.type*1){
                case -1:
                    this.title = '待面试'
                    this.jobListInterviewed(this.pageNow)
                    break
                case 0:
                    this.title = '已投递'
                    this.getJobListByStatus(this.pageNow,this.type,true)
                    break
                case 1:
                    this.title = '沟通过'
                    this.getJobListByStatus(this.pageNow,this.type,true)
                    break
                case 2:
                    this.title = '职位收藏'
                    this.jobSaveList(this.pageNow)
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