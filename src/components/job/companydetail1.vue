<!-- 意向弹窗 包括手机授权 -->
<template>
    <div class="container-width-header">
        <Header title="公司详情"></Header>
        <div class="">
            <div class="full-page-flex">
                <div>
                    <myLoading :isLoading="isLoading"></myLoading>
                    <div class="baseinfo">
                        <img class="company-avatar" :src="companyDetail.image">
                        <div class="company-name flex-row-between">
                            <span class="name">{{companyDetail.name}}</span>
                            <div :class="companyDetail.status == 3 ? 'indentify':'indentify-no'"></div>
                        </div>
                        <div class="disc-line flex-row-center">
                            <div class="mgtop10">
                                <span class="company-disc-item">{{companyDetail.industry}}</span>
                                <span class="company-disc-item">{{companyDetail.financle_text}}</span>
                                <span class="company-disc-item">{{companyDetail.size}}</span>
                            </div>
                        </div>
                        <div class="welfare-line">                
                            <span v-for="(item,index) in companyDetail.welfare" :key="index" class="mybutton-rect" v-html="item.value"></span>
                        </div>
                    </div>
                    <div class="big-card">
                        <span class="middle-title">公司简介</span>
                        <div class="company-disc">
                            <div :class="{'company-content':true}">
                                <span v-html="companyDetail.content"></span>
                            </div>
                            <div class="expend" @click="companyDec"></div>
                        </div>
                    </div>
                    <div class="big-card">
                        <span class="middle-title">公司地址</span>
                        <div class="address-disc flex-row-between" @click="toAddress">
                            <div>
                                <img class="address-icon" src="../../assets/img/place.png">
                                <span>{{companyDetail.adress}}</span>
                            </div>
                            <img style="width:12px;margin-left:10px;" src="../../assets/img/arrow-right.png">
                        </div>
                    </div>
                    <TextSingle text="他们还在招"></TextSingle>
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="getCompanyJobList(pageNow,false)"
                        :offset="100"
                    >
                        <div v-for="(e,i) in jobList" :key="i">
                            <JobItem :hasCopany="false" :jobItem="e"></JobItem>
                        </div>
                    </van-list>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import MyLoading from 'base-components/myLoading'
import TextSingle from 'base-components/textSingle'
import JobItem from 'base-components/jobItem'
import storage from 'good-storage'
import api from '../../api/api.js'
import { Toast, List } from 'vant';
export default {
    data(){
        return {
            jobList:[],
            pageNow:1,
            repeatFlag:false,
            loading:false,
            finished:false,
            companyDetail:{},
            isLoading:false
        }
    },
    watch:{
        $route(to,from){
            if(to.path === '/companydetail'){
                this.isLoading = true
                this.queryCompanyDetail()
            }
        }
    },
    methods:{
        companyDec(){
            $(".company-content").css({maxHeight:"1000px"})
            $(".expend").css({display:"none"})
        },
        queryCompanyDetail(){
            this.$ajax.get(api.queryCompanyDetail,{params:{cid:this.$route.query.cid}}).then(res=>{
                console.log(res.data.data,"公司详情")
                if(res.data.code===0){
                    this.companyDetail=Object.assign({},res.data.data);                                                
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'companydetail获取公司详情'+res.data.msg,duration:1000});
                }
                this.isLoading = false
            }).catch(err=>{
                Toast({message:'companydetail获取公司详情'+err,duration:1000});
            })
        },
        getCompanyJobList(page,refresh){ //获取职位表
            let _this = this
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.getCompanyJobList,{params:{cid:105005,page:page}}).then(res=>{             
                console.log(res.data.data)
                if(res.data.code===0){
                    if(res.data.data.data.length<10) this.finished = true
                    _this.repeatFlag = false
                    _this.loading = false
                    if(refresh){
                        _this.jobList = res.data.data.data
                        _this.pageNow = 2
                    }else{
                        _this.jobList = _this.jobList.concat(res.data.data.data)
                        _this.pageNow++
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'companydetail获取热门职位'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'companydetail获取热门职位'+res,duration:1000});
            })
        },
        toAddress(){
            this.$router.push(`/companymap?address=${this.companyDetail.address}`)
        }
    },
    created(){
        this.queryCompanyDetail()
    },
    components:{
        Header,
        TextSingle,
        JobItem,
        MyLoading,
    }
}
</script>

<style scoped>
*{line-height:1.4;}
.baseinfo{padding:15px 15px 30px;background:#fff;margin-bottom:10px;background:#fff url("http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/company-bg.png") no-repeat top center/100% auto;}
.company-name{justify-content: flex-start;margin-top:20px;}
.company-name .mgtop0{margin-left:10px;}
.name{font-size:18px;font-weight:bold;color:#32405e;}
.salary{font-size:15px;color:#ff824b;font-weight:bold;min-width:90px;text-align:right;}
.disc-line{font-size:12px;color:#909ba3;padding:0 0 25px;border-bottom:1px solid #f2f5f9;justify-content:flex-start;}
.disc-item{margin-right:30px;}
.disc-item text{margin-left:5px;}
.welfare-line{padding-top:15px;}
.company-info{align-items:flex-start;padding:25px 0 0;}
.company-content{font-size:15px;color:#546373;line-height:1.7;max-height: 50px;overflow: hidden;}
.company-info-right{margin-left:15px;position:relative;top:-5px;background:url("http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/arrow-right.png") no-repeat right 20px/12px;}
.company-name{font-size:14px;color:#32405e;align-items:flex-start;}
.company-disc{padding:20px 0 10px;margin-top:0px;color:#909ba3;font-size:12px;}
.company-disc-item{font-size:12px;}
.company-disc-item:nth-child(n+2){margin-left:20px;position:relative;}
.company-disc-item:nth-child(n+2):after{content:'';display:block;position:absolute;left:-10px;top:5px;width:1px;bottom:3px;background:#e9eef5;}
.operation{padding:15px;width:100%;background:#fff;box-shadow:0px -2px 5px rgba(0,0,0,0.05);}
.operation-item{padding:0 15px;color:#909ba3;}
.operation-item:nth-child(n+2){margin-left:5px;margin-right:15px;}
.dec{
	max-height: 100px;
	overflow: hidden;
}
.company-avatar{width:60px;height:60px;border-radius:5px;border:1px solid #fff;margin-top:40px;}
.address-icon{width:12px;height:12px;margin-right:5px}
</style>