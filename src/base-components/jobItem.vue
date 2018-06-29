<template>
    <div class="item" :class="hasBottom ? 'has-bottom' : 'has-border'" @click="toDetail">
        <div class="top flex-row-between">
            <span class="name">{{jobItem.position}}
                <img class="prize-icon" v-if="hasPrize" src="../assets/img/prize.png" alt="">
            </span>
            <span class="salary">{{jobItem.wagemin}}k-{{jobItem.wagemax}}k</span>
        </div>
        <div class="middle flex-row-between">
            <div class="flex">
                <span class="text-item">{{jobItem.prov}} - {{jobItem.city}}</span>
                <span class="text-item">{{jobItem.workexp_text}}</span>
                <span class="text-item">{{jobItem.edu_text}}</span>
            </div>
            <div v-if="!hasCopany">
                <span class="updata">{{jobItem.published_text}}</span>
            </div>
        </div>
        <div v-if="hasCopany" class="bottom flex-row-between">
            <div class="flex-row-between">
                <img class="companyLogo" :src="jobItem.companyLogo ? jobItem.companyLogo : 'http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/default-c.png'">
                <span class="company">{{jobItem.companyName}}</span>
            </div>
            <div class="">
                <span class="updata">{{jobItem.published_text}}</span>
                <!-- <span v-if="{{}}" class="updata">{{jobItem.published_text_second}}</span> 当天的不显示年 但是格式不好判断暂时不做
                <span v-else class="updata">{{jobItem.published_text}}</span> -->
            </div>
        </div>
        <div @click.stop="toUploadContract" v-if="stateType===1&&jobItem.accepted>0&&jobItem.isPrizes===1" class="job-state flex-row-between">
            <div class="state-left flex-row-between">
                <span class="state-icon">入职奖</span>
                <span class="state-text">入职成功</span>
            </div>
            <div class="state-right flex-row-between">
                <div class="state-disc">{{statusTxt}}</div>
                <img mode="widthFix" style="width:12px;margin-left:10px;" src="../assets/img/arrow-right.png">
            </div>
        </div>
        <div @click.stop="toInvitingJobDetail" v-if="stateType===2" class="job-state flex-row-between">
            <div class="state-left flex-row-between">
                <span class="state-text">已有{{exData.recommendNum}}人接受推荐</span>
            </div>
            <div class="state-right flex-row-between">
                <div class="state-disc">成功入职{{exData.successNum}}人</div>
                <img mode="widthFix" style="width:12px;margin-left:10px;" src="../assets/img/arrow-right.png">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        hasBottom:{
            type:Boolean,
            default:true
        },
        hasCopany:{
            type:Boolean,
            default:true
        },
        jobItem:{
            type:Object,
            default:{},
            required: true
        },
        stateType:{
            type:Number,
            default:0
        },
        exData:{
            type:Object,
        },
        index:{
            type:Number,
            default:null
        },
        hasPrize:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            statusTxt:'上传合同领取奖金',
        }
    },
    created(){
        this.$nextTick(()=>{
            this.chooseStatus()
        })
    },
    methods: {
        toDetail(){
            document.querySelector('#app').scrollTop = 0
            this.$router.push({
                path:'/jobdetail',
                query:{
                    jid:this.jobItem.jid,
                    cid:this.jobItem.cid,
                    pos:this.jobItem.position
                }
            })
        },
        chooseStatus(status){
            if(status){
                this.jobItem.status = status
            }
            switch(this.jobItem.status){
                case 0:
                    this.statusTxt = '简历未投递'
                    break
                case 1:
                    this.statusTxt = '上传合同领取奖金'
                    break
                case 2:
                    this.statusTxt = '审核中'
                    break
                case 3:
                case 4:
                    this.statusTxt = '审核成功'
                    break
                case 5:
                    this.statusTxt = '审核失败'
                    break
            }
        },
        toUploadContract(e){
            if(this.jobItem.status === 1){
                this.$emit('uploadContract',this.jobItem.jid,this.index)
            }else{
                this.$router.push(`/contract?jid=${this.jobItem.jid}&cid=${this.jobItem.cid}`)
            }
        },
        toInvitingJobDetail(){
            this.$router.push(`/inviting-jobdetail?jid=${this.jobItem.jid}&cid=${this.jobItem.cid}`)
        },
        changeStatus(status){
            this.jobItem.status = status
            this.chooseStatus(status)
        }
    }
}
</script>

<style scoped>
.prize-icon{width:20px;height:auto;}
.has-bottom{margin-bottom:10px;}
.has-border{border-bottom:1px solid #f3f5f7;}
.item{
  width:100%;
  background:#fff;
  padding:20px 15px;
}
.name{
  font-size:15px;
  font-weight:bold;
  color:#374665;
  line-height:1.4;
}
.salary{
  font-size:17px;
  color:#ff824b;
  min-width:90px;
  text-align:right;
}

.middle{
  font-size:12px;
  color:#909ba3;
  margin-top: 5px;
  padding:0;
}
.text-item:nth-child(n+2){
  margin-left:20px;
  position:relative;
}
.text-item:nth-child(n+2):before{
  content:'';
  display:block;
  position:absolute;
  width:1px;
  left:-10px;
  top:5px;
  bottom:3px;
  background:#e9eef5;
}

.bottom{
  margin-top:20px;
  font-size:12px;
}
.company{
  color:#909ba3;
}
.updata{
  color:#cbd4db;
  min-width:90px;
  display:block;
  padding-left:10px;
}
.companyLogo{width:20px;height:20px;border-radius:2px;margin-right:5px;}

.job-state{margin-top:15px;padding-top:13px;border-top:1px solid #f2f5f7;position:relative;}
.job-state:before{position: absolute;left:-15px;right:-15px;top:0px;bottom:-20px;z-index:1;content:'';display:block;}
.state-icon{background:#ec5151;border-radius:100px 100px 100px 0px;color:#fff;font-size:10px;padding:2px 4px;margin-right:5px;transform:scale(0.9);}
.state-disc{font-size:14px;color:#29a1f3;margin-top:0px;}

</style>
