<!-- 意向弹窗 包括手机授权 -->
<template>
    <div class="container-width-header">
        <Header :type="2" title=""></Header>
        <div class="">
            <div class="full-page-flex">
                <div>
                    <myLoading :isLoading="isLoading"></myLoading>
                    <div class="baseinfo">
                        <div class="flex-row-between flag-box">
                            <span class="name">{{jobDetail.position}}</span>
                            <span class="salary">{{jobDetail.wagemin}}-{{jobDetail.wagemax}} k</span>
                        </div>
                        <div class="disc-line flex-row-center rewardBox">
                            <div class="disc-item flex-row-center">
                                <span>{{jobDetail.prov}} - {{jobDetail.city}}</span>
                            </div>
                            <div class="disc-item flex-row-center">
                                <span>{{jobDetail.workexp_text}}</span>
                            </div>
                            <div class="disc-item flex-row-center">
                                <span>{{jobDetail.edu_text }}</span>
                            </div>
                        </div>
                        <div class="reward">
                            <img class="rewardLogo" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/rewardLogo.png">
                            <img class="rewardBox" src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/rewardBox.png">
                            <span class="reTitle">候选人成功入职后可得奖励(仅限首位)</span>
                            <div>
                                <span>入职候选人</span>
                                <span class="reward-menoy">￥{{jobDetail.rewardAmountCandidate}}</span>
                                <span>;邀请人</span>
                                <span class="reward-menoy">￥{{jobDetail.rewardAmountInviter}}</span>
                                <span>;分享岗位人</span>
                                <span class="reward-menoy">￥{{jobDetail.rewardAmountPostPerson}}</span>
                            </div>
                        </div>
                        <div class="company-info flex-row-between" @click="toCompanyDetail" >
                            <img class="default-c" :src="companyDetail.image ? companyDetail.image : 'http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/default-c.png'">
                            <div class="company-info-right flex">
                                <span class="company-name">{{jobDetail.companyName}}</span>
                                <div :class="companyDetail.status == 3 ? 'indentify':'indentify-no'"></div>
                                <div class="company-disc">
                                    <span class="company-disc-item">{{companyDetail.industry}}</span>
                                    <span class="company-disc-item">{{companyDetail.financle_text}}</span>
                                    <span class="company-disc-item">{{companyDetail.size}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="big-card">
                        <span class="middle-title">职位介绍</span>
                        <div class="job-disc">
                            <div class="welfare-line">                                
                                 <span v-for="(item,i) in jobDetail.attractionList" :key="i" class="mybutton-rect">{{item.value}}</span>        
                            </div>
                            <div :class="{'job-content':true }">
                                <span v-html="jobDetail.descp"></span>
                            </div>
                            <div class="expend" @click="jobDec" v-if="flag"></div>
                        </div>
                    </div>
                    <div class="big-card">
                        <span class="middle-title">公司地址</span>
                        <div class="address-disc flex-row-between" @click="toAddress">
                            <div>
                                <img class="address-icon" src="../../assets/img/place.png">
                                <span>{{jobDetail.address}}</span>
                            </div>
                            <img mode="widthFix" style="width:12px;margin-left:10px;" src="../../assets/img/arrow-right.png">
                        </div>
                    </div>
                    <TextSingle text="热门推荐"></TextSingle>
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        @load="getHotJobList(pageNow,false)"
                        :offset="100"
                    >
                        <div v-for="(e,i) in jobList" :key="i">
                            <JobItem :jobItem="e"></JobItem>
                        </div>
                    </van-list>
                </div>
            </div>
            <div class="operation flex-row-around fix-bottom">
                <div class="operation-item flex-column-center share-btn" @click="share">
                    <img class="bottom-icon" src="../../assets/img/share.png">
                    <span style="line-height:20px;color:#909ba3">分享</span>
                </div>
                <div class="operation-item flex-column-center" @click="collection">
                    <img class="bottom-icon" src="../../assets/img/collect.png">
                    <span>收藏</span>
                </div>
                <div :class="{ btn:true,send:ResumeFlag}" @click="sendResume">{{ResumeText}}</div>
            </div>
            <Share ref="share"></Share>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import Share from 'base-components/share'
import MyLoading from 'base-components/myLoading'
import TextSingle from 'base-components/textSingle'
import JobItem from 'base-components/jobItem'
import storage from 'good-storage'
import api from '../../api/api.js'
import { Toast, List } from 'vant';
export default {
    components:{
        Header,
        TextSingle,
        JobItem,
        MyLoading,
        Share
    },
    data(){
        return {
            ResumeFlag:true,
            CollectionFlag:true,
            flag:true,
            cid:'',
            jobDetail:{},
            companyDetail:{},
            ResumeText:"应聘职位",
            jobList:[],
            pageNow:1,
            repeatFlag:false,
            loading:false,
            finished:false,
            isLoading:false,
            pos:'',
            shareDesc:'',
            shareTitle:'',
            shareUrl:'',
        }
    },
    created(){
        this.getJobInfo()
        this.pos = this.$route.query.pos
        this.weixinInit()
    },
    watch:{
        $route(to,from){
            if(to.path === '/jobdetail'){
                this.getJobInfo()
                document.querySelector('#app').scrollTop = 0
            }
        }
    },
    methods:{
        weixinInit(){
            this.$ajax.get(api.wxShare).then(res=>{
                console.log(res.data,'微信分享内容')
                if(res.data.code===0){
                    this.shareDesc = res.data.data.desc;
                    this.shareTitle = res.data.data.title;
                    this.shareUrl = res.data.data.shareUrl;
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'invitingFriend获取微信分享内容'+res.data.msg,duration:1000});
                }
            })
            .then(()=>{
                this.$ajax.get(api.wxShareConfig).then(res=>{
                    console.log(res.data,"配置微信权限")
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                        appId: 'wx996d7ea6f254589c', // 必填，公众号的唯一标识
                        timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
                        signature: res.data.data.signature,// 必填，签名
                        jsApiList: [
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline'
                        ] // 必填，需要使用的JS接口列  
                    });
                    wx.ready(() => {
                        wx.onMenuShareAppMessage({
                            title: this.shareTitle, // 分享标题
                            desc: this.shareDesc, // 分享描述
                            link: this.shareUrl, // 分享链接
                            imgUrl: '', // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户点击了分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareTimeline({
                            title: this.title, // 分享标题
                            link: this.url, // 分享链接
                            imgUrl: '', // 分享图标
                            success: function () {
                            // 用户点击了分享后执行的回调函数
                            }
                        });
                    }); 
                }) 
            })
            .catch(err=>{
                Toast({message:err,duration:1000});
            })
        },
        share(){
            this.$refs.share.toggle()
        },
        getJobInfo(){
            this.isLoading = true
            window.scrollTo(0,0)
            this.queryCompanyDetail();
            this.queryJobDetail();
            this.seeCollection();
            this.getSendResumeStatus();
        },
        jobDec(){
            $(".job-content").css({maxHeight:"1000px"});
            $(".expend").css({display:"none"})
        },
        getSendResumeStatus(){
            // 是否投递简历
            this.$ajax.get(api.getSendResumeStatus,{params:{jid:this.$route.query.jid}}).then(res=>{
                console.log(res.data,"是否投递简历")
                if(res.data.code===0){
                    this.ResumeFlag=res.data.data;
                    this.ResumeFlag?this.ResumeText="已经投递":this.ResumeText="应聘职位"
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'jobdetail是否投递简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'jobdetail是否投递简历'+err,duration:1000});
            })
        },
        sendResume(){
          if(!this.ResumeFlag){
                this.clickResume=false;
                this.$ajax.post(api.sendResume,{cid:this.jobDetail.cid,jid:this.jobDetail.jid,jobPosition:this.jobDetail.positionid,userId:this.jobDetail.user_id}).then(res=>{
                    console.log(res.data,"发送简历")
                    if(res.data.code===500){
                        this.ResumeFlag=true;
                    }else if(res.data.code===-99){
                        this.$router.push('/login')
                    }else{
                        Toast({message:'jobdetail发送简历'+res.data.msg,duration:1000});
                    }
                  }).catch(err=>{
                    Toast({message:'jobdetail发送简历'+err,duration:1000});
                  })
            }
        },
        seeCollection(){
            //是否收藏
          this.$ajax.get(api.jobSaveFlag,{params:{jobId:this.$route.query.jid}}).then(res=>{
              console.log(res.data,"查询是否收藏")
              if(res.data.code===0){
                  var flag=res.data.data;
                  if(flag){
                    $(".bottom-icon").eq(1).attr({src:"../../../static/img/collected.png"})
                  }else{
                    $(".bottom-icon").eq(1).attr({src:"../../../static/img/collect.png"})
                  }
              }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'jobdetail查询是否收藏'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
              Toast({message:'jobdetail查询是否收藏'+err,duration:1000});
            })
        },
        collection(){
            //收藏
          if(this.CollectionFlag)
          {
            this.CollectionFlag=false;
            console.log($(".bottom-icon"),"收藏")
             var imgUrl= $(".bottom-icon").eq(1).attr("src") =="../../assets/img/collect.png"?api.jobSave : api.jobSaveNo;
            this.$ajax.get(imgUrl,{params:{jobId:this.$route.query.jid}}).then(res=>{              
                this.CollectionFlag=true;
                if(res.data.code===0){
                    if(imgUrl==api.jobSave){
                      $(".bottom-icon").eq(1).attr({src:"../../assets/img/collected.png"})
                    }else{
                      $(".bottom-icon").eq(1).attr({src:"../../assets/img/collect.png"})
                    }
                    Toast.success({message:"保存成功",duration:1000});
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'jobdetail收藏职位'+res.data.msg,duration:1000});
                }
              }).catch(err=>{
                Toast({message:'jobdetail收藏职位'+err,duration:1000});
              })
          }
        },
        queryJobDetail(){
          this.$ajax.get(api.queryJobDetail,{params:{jid:this.$route.query.jid}}).then(res=>{
                console.log(res.data,"工作详情")
                if(res.data.code===0){
                    this.cid = res.data.data.cid
                    this.jobDetail=Object.assign({},res.data.data)
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'jobdetail查询工作详情'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
              Toast.fail({message:'jobdetail查询工作详情'+err,duration:1000});
            })
        },
        queryCompanyDetail(){
            console.log(1)
            this.$ajax.get(api.queryCompanyDetail,{params:{cid:this.$route.query.cid}}).then(res=>{
                console.log(res.data,"公司详情")
                if(res.data.code===0){
                    this.companyDetail=Object.assign({},res.data.data)
                }else if(res.data.code===-99){
                        this.$router.push('/login')
                }else{
                    Toast({message:'jobdetail查询公司详情'+res.data.msg,duration:1000});
                }
                this.isLoading = false
            }).catch(err=>{
            Toast.fail({message:'jobdetail查询公司详情'+err,duration:1000});
            })
        },
        getHotJobList(page,refresh){ //获取职位表
            let _this = this
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.getHotJobList,{params:{position:this.pos,page:page}}).then(res=>{             
                console.log(res.data.data.data)
                if(res.data.code===0){
                    if(res.data.data.data.length<10) this.finished = true
                    _this.repeatFlag = false
                    _this.loading = false
                    if(refresh){
                        _this.jobList = res.data.data.data
                        _this.pageNow = 1
                    }else{
                        _this.jobList = _this.jobList.concat(res.data.data.data)
                        _this.pageNow++
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'jobdetail获取职位表'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast.fail({message:'jobdetail获取职位表'+res,duration:1000});
            })
        },
        toCompanyDetail(){
            this.$router.push(`/companydetail?cid=${this.cid}`)
        },
        toAddress(){
            this.$router.push(`/companymap?address=${this.companyDetail.adress}`)
        }
    }  
}
</script>

<style scoped>
*{line-height:1.4;}
.baseinfo{padding:15px 15px 30px;background:#fff;margin-bottom:10px;}
.name{font-size:24px;font-weight:bold;color:#32405e;}
.salary{font-size:15px;color:#ff824b;font-weight:bold;}
.disc-line{font-size:12px;color:#909ba3;padding:10px 0 15px;/* border-bottom:1px solid #f2f5f9; */justify-content:flex-start;}
.disc-item{margin-right:15px;position:relative;}
.disc-item:nth-child(n+2):after{content:'';display:block;position:absolute;left:-5px;top:5px;width:1px;bottom:3px;background:#e9eef5;}
.disc-item text{margin-left:5px;}
.company-info{align-items:flex-start;padding:15px 0 0;}
.job-disc{padding:20px 0 10px;}
.job-content{margin-top:0px;font-size:15px;color:#546373;line-height:1.7;max-height: 50px;overflow: hidden;}
.company-info-right{margin-left:15px;position:relative;top:-5px;background:url("http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/arrow-right.png") no-repeat right 20px/12px;}
.company-name{font-size:14px;color:#32405e;}
.company-disc{margin-top:10px;color:#909ba3;font-size:12px;}
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
.btn{
	display: block;
	padding: 0 50px;
	text-align:center;
	 border-radius:6px;
	 line-height:45px;
	 font-size:15px;
	 background:#29a1f7;
	 color:#fff;
}
.send{
	background-color: #cbd4db !important;
}
.address-icon{width:12px;height:12px;margin-right:5px;}
.normal-icon{width:12px;height:12px;}
.bottom-icon{width:18px;height:18px;}
.default-c{width:40px;height:40px;border-radius:3px;}
.prize{position:fixed;right:0;bottom:100px;}
.flag-box{
	position: relative;
}
.rewardBox{
	position: relative;
}
.reward{
	color: #546373;
	width: 100%;
	height: 65px;
	position: relative;
	background-color: #fff5ee;
	border-bottom:1px solid #f2f5f9;
	overflow: hidden;
}

.reward .rewardLogo{
	width: 54px;
	height: 15px;
	position: absolute;
	top: 0;
	left: 0;
	/* border-top-left-radius: 5px;
	border-bottom-right-radius: 5px; */

}
.reward .rewardBox{
	width: 57px;
	height: 64px;
	position: absolute;
	top: 0;
	right: 5px;
}
.reward .reTitle{
	font-size: 10px;
	line-height: 10px;
	display: block;
	margin-top: 26px;
	margin-left: 10px;
}
.reward div{
	font-size: 0;
	margin-left: 10px;
	margin-top: 10px;
}
.reward div span{
	font-size: 10px;
	line-height: 10px;
}
.reward-menoy{
	color: #ff824b;
	margin-right: 5px;
}
</style>