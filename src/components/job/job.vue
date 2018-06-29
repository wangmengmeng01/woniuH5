<template>
    <div>
        <!-- 意向弹窗 -->
        <div v-if="!hasIntention" class="intention-box">
            <div class="container flex-column-center bg-fff">
                <div>
                    <div class="title-box border-top">
                        <span class="title">你期望的工作</span>
                    </div>
                    <div class="search-box-index flex-row-center flex">
                        <div class="flex-row-center" @click="toggleAreaList">
                            <div>
                                <div>
                                    <span class="search-box-txt">{{city}}</span>
                                </div>
                            </div>
                            <img class="arr" src="../../assets/img/arrow-bottom.png">
                        </div>
                        <div class="flex">
                            <van-field class="search-box-input" @input="checkInput" v-model.trim="searchText" placeholder="请输入关键词，如产品"/>
                        </div>
                    </div>
                    <div class="tip-box">
                        <span class="tip" :class="{'active':activeTip==i}" v-for="(e,i) in tipArr" :key="i" @click="changeActiveTip(e.name,i)">{{e.name}}</span>
                    </div>
                    <div class="button-container">
                        <van-button :disabled="!canTap" @click="next" type="primary">我选好了，去找工作</van-button>
                    </div>
                </div>
            </div>
            <MyArea ref="myArea" @getArea="changeIntentionArea"></MyArea>
        </div>
        <div class="container-width-header">
            <Header title="职场">
                <div slot="left-icon"></div>
            </Header>
            <div>
                <div class="job-top flex-column-center">
                    <div class="search-box-container">
                        <router-link to="/jobsearch">
                            <div class="search-box flex-row-center">
                                <img class="search-icon" src="../../assets/img/search.png" >
                                <span>搜索职位公司</span>
                            </div>
                        </router-link>
                    </div>
                    <img @click="toEvent" style="width:100%;" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/banner/banner-02.jpg">
                </div>
                <div class="job-middle flex-row-around">
                    <div class="job-type flex-column-around" @click="toJobList(0)">
                        <img class="pos-icon" src="../../assets/img/pos-all.png">
                        <span>全部职位</span>
                    </div>
                    <div class="job-type flex-column-around" @click="toJobList(1)">
                        <img class="pos-icon" src="../../assets/img/pos-new.png">
                        <span>全新职位</span>
                    </div>
                    <div class="job-type flex-column-around" @click="toJobList(2)">
                        <img class="pos-icon" src="../../assets/img/pos-hot.png">
                        <span>热门职位</span>
                    </div>
                    <div class="job-type flex-column-around" @click="toJobList(3)">
                        <img class="pos-icon" src="../../assets/img/pos-top.png">
                        <span>高薪职位</span>
                    </div>
                </div>
                <TextSingle :text="'有奖推荐职位'"></TextSingle>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="getJobListByType(pageNow,4,false)"
                    :offset="100"
                >
                    <div v-for="(e,i) in jobList" :key="i">
                        <JobItem :hasPrize="true" :jobItem="e"></JobItem>
                    </div>
                </van-list>

                <!-- 提醒完善简历领红包 -->
                <div v-if="rewardFlag==0" class="gift orange-tip flex-row-between" @click="toResume">
                    <div class="flex-row-between">
                        <img class="gift-left"  src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/gift.png">
                        <span>完善简历立得现金红包</span>
                    </div>
                    <div class="flex-row-between">
                        <span>立即填写</span>
                        <img class="gift-right" src="../../assets/img/arrow-right-orange.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import TextSingle from 'base-components/textSingle'
import JobItem from 'base-components/jobItem'
import MyArea from 'base-components/myArea'
import storage from 'good-storage'
import api from 'api/api.js'
import { Toast, List } from 'vant';
export default {
    data(){
        return {
            jobList:[],
            pageNow:1,
            repeatFlag:false,
            loading:false,
            finished:false,
            hasIntention:true,
            tipArr:[],
            canTap:false,
            activeTip:-1,
            city:'上海市',
            searchText:'',
            rewardFlag:''
        }
    },
    methods:{
        toEvent(){
            this.$router.push('/invitingFriend?type=0')
        },
        toggleAreaList(){
            this.$refs.myArea.toggle()
        },
        changeIntentionArea(e){
            this.city = e[0].name
        },
        getJobListByType(page,type,refresh){ //获取职位表
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.getJobListByType,{params:{type:type,page:page}}).then(res=>{             
                console.log(res.data.data,'获取职位表')
                if(res.data.code===0){
                    if(res.data.data.data.length<10) this.finished = true
                    this.repeatFlag = false
                    this.loading = false
                    if(refresh){
                        this.jobList = res.data.data.data
                        this.pageNow = 2
                    }else{
                        this.jobList = this.jobList.concat(res.data.data.data)
                        this.pageNow++
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'job获取职位表'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'job获取职位表'+res,duration:1000});
            })
        },
        toJobList(type){
            this.$router.push(`/joblist?type=${type}`)
        },
        changeActiveTip(e,i){
            this.activeTip = i
            this.searchText = e
            this.canTap = true
        },
        getHot(){ //弹窗的热门职位推荐
            this.$ajax.get(api.getHotJobAndCompany).then((res)=>{
                console.log(res.data,'热门职位')
                if(res.data.code===0){
                    this.tipArr = res.data.hotJobList
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'job获取热门职位表'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'job获取热门职位表'+res,duration:1000});
            })
        },
        checkInput(){
            this.canTap = this.searchText.trim().length>0 ? true : false
            this.activeTip = -1
        },
        next(){
            this.$ajax.post(api.updateJobIntention,{prov:this.city,jobTraidId:this.searchText.trim()}).then((res)=>{
                console.log(res.data,'保存求职意向')
                if(res.data.code===0){
                    storage.set('jobIntentionFlag',0)
                    this.hasIntention = true
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'job保存求职意向'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'job保存求职意向'+res,duration:1000});
            })
        },
        toResume(){
            this.$router.push('/myresume')
        }
    },
    created(){
        if(storage.get('jobIntentionFlag')==1){
            c(storage.get('没有意向'))
            this.getHot()
            this.hasIntention = false
        }
    },
    components:{
        Header,
        TextSingle,
        JobItem,
        MyArea,
    }
}
</script>

<style scoped>
.van-button{width:100%;}
.arr{width:12px;height:auto;}
.van-cell{width:90%;padding:0;}
.job-top{position:relative;}
.job-middle{background:#fff;padding:15px 0 20px;}
.job-type span{font-size:12px;color:#546373;margin-top:8px;}
.search-box-container{position:absolute;top:0;width:100%;}
.search-box{text-align:center;font-size:12px;color:#cbd4db;padding:7px;}
.button-container{margin-top:45px;}
.intention-box{position:fixed;top:0;bottom:0;left:0;right:0;background:#fff;z-index:10;}
.search-box-index{border:1px solid #d7dee2;border-radius:100px;padding:10px 20px;font-size:14px;width:100%;z-index:1;background:#fff;}
.pos-icon{width:45px;height:45px;}
.search-icon{width:12px;height:12px;margin-right:10px;}
.gift{position:fixed;bottom:49px;left:0;right:0;padding:15px 15px 15px 55px;}
.gift-left{width:45px;position:fixed;bottom:54px;left:10px;}
.gift-right{width:12px;height:12px;margin-left:5px;}
</style>