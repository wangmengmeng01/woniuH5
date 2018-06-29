<template>
    <div>
        <div class="container-width-header">
            <Header title="上传合同"></Header>
            <div v-if="contractObj.status === 3" class="orange-tip flex-row-between">
                <div class="flex-row-between">
                    <img class="tip-left" src="../../assets/img/notice.png">
                    <span>您的合同审核通过，奖金即将到账。</span>
                </div>
            </div>
            <div v-if="enlargeFlag" class="enlarge-box flex-column-center" @click="enlargeHide">
                <img class="w100" :src="contractObj.contractPath">
            </div>
            <div class="bg">
                <div v-if="contractObj.status === 2 || contractObj.status === 5" class="contract-card-blank" @click="enlargeShow">
                    <div class="pd15">
                        <img class="w100" :src="contractObj.contractPath">
                    </div>
                </div>
                <div v-if="contractObj.status === 3 || contractObj.status === 4" class="pd15">
                    <div class="contract-card">
                        <img mode="widthFix" class="upload-indentify" src="../../assets/img/unload-success.png">
                        <div class="contract-top flex-row-between">
                            <img class="company-avatar" :src="jobDetail.companyLogo ? jobDetail.companyLogo : 'http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/default-c.png'">
                            <div class="contract-top-text flex">
                                <span class="name">{{jobDetail.position}}</span>
                                <span class="company">{{jobDetail.companyName}}</span>
                            </div>
                        </div>
                        <div class="contract-bottom flex-row-between">
                            <div class="contract-bottom-left flex-row-center">
                                <img style="width:12px;height:12px;margin-right:5px;" src="../../assets/img/shield.png">
                                <span class="txt">蜗牛正在保护你的隐私</span>
                            </div>
                            <span class="state-text"></span>
                        </div>
                    </div>
                </div>
                <!-- 先写麻烦 后期没问题再简化 -->
                <div v-if="contractObj.status === 1" class="uploadContract flex-row-between" @click="uploadContract">
                    <span class="upload-text">上传合同</span>
                    <img class="right-arr" src="../../assets/img/arrow-right.png">
                </div>

                <div v-if="contractObj.status === 2 || contractObj.status === 5" class="uploadContract flex-row-between" @click="uploadContract">
                    <span class="upload-text">重新上传合同</span>
                    <img class="right-arr" src="../../assets/img/arrow-right.png">
                </div>
                <div v-if="contractObj.status === 3 || contractObj.status === 4" class="uploadContract flex-row-between" @click="enlargeShow">
                    <span class="upload-text">查看合同</span>
                    <img class="right-arr" src="../../assets/img/arrow-right.png">
                </div>
                <!-- 图片input -->
                <input id="takepicture" @change="uploading" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp" class="dis-none">
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
import { Toast, List } from 'vant'
export default {
    data(){
        return {
            contractObj:{},
            jobDetail:{},
            enlargeFlag:false
        }
    },
    computed:{
        
    },
    activated(){
        this.queryJobDetail()
        this.contractpath()
    },
    components:{
        Header,
    },
    methods:{
        queryJobDetail(){
            this.$ajax.get(api.queryJobDetail,{params:{jid:this.$route.query.jid}}).then(res=>{
                console.log(res.data,"工作详情")
                if(res.data.code===0){
                    this.jobDetail = res.data.data
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'contract查询工作详情'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast.fail({message:'contract查询工作详情'+err,duration:1000});
            })
        },
        contractpath(){
            this.$ajax.get(api.contractpath,{params:{jobId:this.$route.query.jid}}).then(res=>{
                console.log(res.data,"合同详情")
                if(res.data.code===0){
                    this.contractObj = res.data.data
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'contract合同详情'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast.fail({message:'contract合同详情'+err,duration:1000});
            })
        },
        uploading(e){
            let regexp = new RegExp("(.jpg$)|(.png$)|(.bmp$)|(.jpeg$)","i");
            if(e.target.files[0]&&regexp.test(e.target.files[0].name)){
                var formdata = new FormData();
                formdata.append ("file" , e.target.files[0]);
                formdata.append ("jobId" , this.$route.query.jid);
                this.$ajax({
                    method:"post",
                    url:api.uploadContract,
                    data:formdata
                }).then((res)=>{
                    console.log(res.data,'图片上传')
                    if(res.data.code === 0){
                        Toast({message:'上传成功',duration:1000});
                        this.contractObj.contractPath = res.data.url
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
        enlargeShow(){
            this.enlargeFlag = true
        },
        enlargeHide(){
            this.enlargeFlag = false
        }
    }
}
</script>

<style scoped>
.right-arr{width:12px;margin-left:10px;}
.contract-card{padding:25px 20px;background:url("http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/contract-bg.png") no-repeat center center/100% 100%;color:#fff;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.4);position:relative;}
.contract-card-blank{color:#fff;}
.company-avatar{width:60px;height:60px;border-radius:5px;margin-right: 15px;border:1px solid #69c0ff;}
.name{display:block;font-size:18px;font-weight:bold;}
.company{font-size:12px;color:#c2e6ff;margin-top:20px;display:block;}
.contract-bottom{margin-top:30px;}
.bg{background:#fff;}
.avatar-box{position:relative;}
.uploadContract{padding:15px;border-top:1px solid #f2f5f7;}
.upload-indentify{position:absolute;right:35px;bottom:30px;z-index:1;width:100px;}
.state-text{position:relative;z-index:1;}
.enlarge-box{position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,1);z-index:11;}
</style>