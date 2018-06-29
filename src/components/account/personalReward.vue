<template>
	<div class="container-width-header">
		<Header title="账户"></Header>
		<div class="header-sp">
			<img src="http://nhh-image.oss-cn-shanghai.aliyuncs.com/mini-app/images/reward.png"/>
			<span class="moneyTit">奖金总数 (元)</span>
			<span class="money">{{moneyDetail.totalIncomeAmount_format}}</span>
			<span class="put">立即提现 ></span>
			<div class="nav">
				<div>
					<span>待结算(元)</span>
					<span>{{moneyDetail.blockedAmount_format}}</span>
				</div>
				<div>
					<span>可提现(元)</span>
					<span>{{moneyDetail.balanceAmount_format}}</span>
				</div>
				<div>
					<span>历史提现(元)</span>
					<span>{{moneyDetail.withdrawAmount_format}}</span>
				</div>
			</div>
		</div>
		<div class="body">
			<div class="body-nav">
				<div @click="all">
					<span :class="allFlag">全部</span>
				</div>
				<div  @click="invation">
					<span :class="invationFlag">邀请</span>
				</div>
				<div @click="recommend">
					<span :class="recommendFlag">推荐</span>
				</div>
				<div @click="put">
					<span :class="putFlag">提现</span>
				</div>
			</div>
			<div class="contain" >
				<van-list
				v-model="loading"
				:finished="finished"
				@load="Load"
				:offset="offset"
				>
					<div class="wrapper" v-for="(item,index) in userFlowingWater" :key="index" >
						<div class="flex-row-between">
							<span>{{item.remark}}</span>
							<span :style="{color: item.type===1 ?'#ec5151':'#29a1f7'}">{{item.type===1 ?'-':'+'}}{{item.incomeAmount_format}}</span>
						</div>					
						<div>
							<span>{{item.createTime_format}}</span>
						</div>
					</div>	
					<!-- <span v-show="loadingFlag" class="loading-text">到底了</span> -->
				</van-list>		 			
			</div>
		</div>
	</div>
</template>
<script>

// import api from "../../api/api.js";
import Header from 'base-components/header'
import Vue from 'vue'
import { Toast,List} from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Toast)
Vue.use(List)
	export default {
		data(){
			return {
				loadingFlag:false,
				offset:50,
				loading:false,
				finished:false,
				allFlag:"act",
				invationFlag:"",
				recommendFlag:"",
				requestFlag:true,
				putFlag:"",
				moneyDetail:{},
				userFlowingWater:[],
				pageNum:1,
				type:-1,
				text:"加载中..."
			}
		},
		components:{
		    Header
		},
		created(){									
			this.$ajax.get("/app/userAccount/getAccountInfo",{params:{}}).then(res=>{
				if(res.data.code===0){
					console.log(res.data)
					this.moneyDetail=Object.assign({},res.data.data)
				}else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
					Toast({message:'personalReward获取奖金详情'+res.data.msg,duration:1000});
				}
			}).catch(err=>{
				Toast({message:'personalReward获取奖金详情'+err,duration:1000});
			})			
			this.requestData(-1,this.pageNum,10,false);
		},
		methods:{
			Load(){
				// this.loading=false;
				console.log("xz");				
				this.requestData(this.type,this.pageNum,10,true);
				this.pageNum++;
			},
			requestData(type,page,pageSize,flag){
			  if(this.requestFlag)
			  {
			    console.log(this.userFlowingWater,"a")
			    this.requestFlag=false;
			     this.$ajax.get("/app/userAccount/getAccountRecordListByType",{params:{type:type,page:page,pageSize:pageSize}}).then(res=>{
					if(res.data.code===0){
						if(flag){             
							console.log(this.userFlowingWater,res.data.data.data,"aa") 			              
							this.userFlowingWater=Object.assign([],this.userFlowingWater,res.data.data.data)
							this.loading=false;           
							this.requestFlag=true;	
							if(res.data.data.data.length<10){
								this.finished=true;
								this.loadingFlag=true;
							}else{
								this.finished=false;
								this.loadingFlag=false;
							}
							console.log(this.userFlowingWater,"aas")			         
						}else{
							this.userFlowingWater=Object.assign([],res.data.data.data)
							this.requestFlag=true;
							if(res.data.data.data.length<10){
								this.loadingFlag=true;
							}else{
								this.finished=false;
								this.loadingFlag=false;
							}
							console.log(this.userFlowingWater,"a")			          
						}
					}else if(res.data.code===-99){
						this.$router.push('/login')
					}else{
						Toast({message:'personalReward获取筛选奖金'+res.data.msg,duration:1000});
					}
					// this.moneyDetail=Object.assign({},res.data.data)			     
			     }).catch(err=>{
			     	Toast({message:'personalReward获取筛选奖金'+err,duration:1000});
			     	Toast({message:'personalReward获取筛选奖金'+err,duration:1000});
			     }) 
			  }
			},
			all(){
			    // this.userFlowingWater=Object.assign([])
			    console.log(this.userFlowingWater)
			    this.allFlag="act",
			    this.invationFlag="",
			    this.recommendFlag="",
			    this.putFlag="",
			    this.type=-1,
			    this.pageNum=1
			  
			  this.requestData(-1,this.pageNum,10,false);
			},
			invation(){
			 console.log(this.userFlowingWater)
			    this.allFlag="",
			    this.invationFlag="act",
			    this.recommendFlag="",
			    this.putFlag="",
			    this.type=1,
			    this.pageNum=1
			 
			  this.requestData(1,this.pageNum,10,false);
			},
			recommend(){
			  
			    this.allFlag="",
			    this.invationFlag="",
			    this.recommendFlag="act",
			    this.putFlag="",
			    this.type=2,
			    this.pageNum=1
			  
			  this.requestData(2,this.pageNum,10,false);
			},
			put(){
			  
			    this.allFlag="",
			    this.invationFlag="",
			    this.recommendFlag="",
			    this.putFlag="act",
			    this.type=4,
			    this.pageNum=1
			  
			  this.requestData(4,this.pageNum,10,false);
			},			
		}
	}
</script>

 <style scoped>
 	.van-list{
 		height: 100%;
	    overflow: scroll;    
 	}
	.header-sp{
		/* margin-top: 44px; */
		width: 100%;
		position: relative;
	}
	.header-sp img{
		width: 100%;
	}
	.header-sp>span{
		position: absolute;
	}
	.moneyTit{
		font-size: 12px;
		color: #cfedff;
		line-height: 12px;
		top: 22px;
		left: 15px;
	}
	.money{
		font-size: 29px;
		color: #fff;
		line-height: 29px;
		top: 44px;
		left: 15px;
	}
	.put{
		font-size: 12px;
		color: #fff;
		height: 24px;
		line-height: 24px;
		top: 43px;
		right: 0px;
		background-color: rgba(255,255,255,.4);
		padding: 0 15px 0 20px;
		border-bottom-left-radius: 13px;
		border-top-left-radius: 13px;
	}
	.nav{
		width: 100%;
		display: flex;
		/* justify-content:space-between; */
		position: absolute;
		left: 0;
		bottom: 0;
		border-top: 1px solid rgba(255,255,255,.3);
		color: #fff;
	}
	.nav div{
		flex:1 1;
		padding: 14.5px 0 15px 15px;
		border-left: 1px solid rgba(255,255,255,.3);
	}
	.nav div:first-child{

		border-left: none;
	}
	.nav div span{
		display: block;
		font-size: 12px;
		line-height: 12px;
	}
	.nav div span:nth-child(2){
		font-size: 12px;
		line-height: 12px;
		font-weight: bold;
		margin-top: 7.5px;
	}
	.body{
		height: 61.3%;
	}
	.body-nav{
		position: relative;
		height: 45px;
		margin-top: 10px;
		width: 100%;
		display: flex;
		background-color: #fff;
		box-shadow: 0px 2px 13px rgba(24,88,134,0.15) ;
	}
	.body-nav div{
		flex:1 1;
		text-align: center;
	}
	.body-nav div span{
		display: inline-block;
		line-height: 45px;

	}
	.act{
		border-bottom: 2px solid #29a1f7;
	}
	.contain{
		height: 100%;
		width: 100%;
		background-color: #fff;
	}
	.contain .wrapper{
		padding: 20px 15px 15px 21px;
		border-bottom: 1px solid #f2f5f9;
	}
	.contain .wrapper div{
		display: flex;
		justify-content:space-between;
	}
	.contain .wrapper div:nth-child(1){
		font-size: 15px;
		line-height: 15px;
		color: #32405e;
	}
	.contain .wrapper div:nth-child(1) span:nth-child(1){
		/* font-weight: bold; */
	}
	.contain .wrapper div:nth-child(1) span:nth-child(2){
		color: #ff824b;
	}
	.contain .wrapper div:nth-child(2) span:nth-child(1){
		color: #909ba3;
		font-size: 12px;
		line-height: 12px;
	}
	.contain .wrapper div:nth-child(2){
		margin-top: 8px;
	}
	.loading-text{
		background-color: #f3f5f7;
	}
	.text{
		display: block;
		width: 100%;
		text-align: center;
		background-color: #f3f5f7;
	}
</style> 