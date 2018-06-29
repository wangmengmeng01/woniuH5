<template>
    <div class="item flex-row-between" :class="hasBottom ? 'has-bottom' : 'has-border'" @click="toDetail">
        <div class="left">
            <img class="company-avatar" :src="companyItem.divCompanyLogo ? companyItem.divCompanyLogo : 'http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/default-c.png'">
        </div>
        <div class="right">
            <span class="name">{{companyItem.divCompanyName}}</span>
            <!-- <span class="industry">行业暂无</span> -->
            <div class="bottom flex-row-between">
                <!-- <div>
                    <span class="text-item">天使轮暂无</span>
                    <span class="text-item">规模暂无</span>
                </div> -->
                <span class="updata">{{companyItem.divTimeText}}</span>
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
        companyItem:{
            type:Object,
            default:{}
        }
    },
    data(){
        return{

        }
    },
    created(){
        
    },
    methods: {
        toDetail(){
            this.$router.push(`/companydetail?cid=${this.data.companyItem.viewCid}`)
        }
    }
}
</script>

<style scoped>
.has-bottom{margin-bottom:10px;}
.has-border{border-bottom:1px solid #f3f5f7;}
.item{
  width:100%;
  background:#fff;
  padding:20px 15px;
  align-items:flex-start;
}
.name{
  font-size:15px;
  font-weight:bold;
  display:block;
  color:#374665;
}
.industry{
  font-size:12px;
  color:#909ba3;
}

.bottom{
  font-size:12px;
  color:#909ba3;
  margin-top: 5px;
}
.text-item:nth-child(2){
  margin-left:20px;
  position:relative;
}
.text-item:nth-child(2):before{
  content:'';
  display:block;
  position:absolute;
  width:1px;
  left:-10px;
  top:5px;
  bottom:3px;
  background:#e9eef5;
}
.updata{
  color:#ff824b;
  min-width:90px;
  display:block;
  /* padding-left:10px; */
}
.right{
  flex:1 1;
  margin-left:10px;
}
.company-avatar{width:45px;height:45px;border-radius:2px;margin-right:5px;}
</style>
