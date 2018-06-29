<template>
	<div class="container-width-header">
		<Header title="服务中心"></Header>
		<div class="middle-title-box">
			<span class="middle-title">我的应用</span>
		</div>
		<div class="middle-sp flex-row-around grid border-top">
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-2-2.png">
				<span class="state-disc">日志</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-2-3.png">
				<span class="state-disc">足迹</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-2-4.png">
				<span class="state-disc">相册</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-2-5.png">
				<span class="state-disc">活动</span>
			</div>
		</div>

		<div class="middle-title-box">
			<span class="middle-title">活动中心</span>
		</div>
		<div class="middle-sp flex-row-around grid border-top">
			<div class="state flex-column-center" @click="toUrl('invitingFriend?type=0')">
				<img class="service-icon" src="../../assets/img/mine-icon-2-1.png">
				<span class="state-disc">邀请奖励</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-4-2.png">
				<span class="state-disc">能力测试</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-4-3.png">
				<span class="state-disc">培训活动</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-4-4.png">
				<span class="state-disc">简历模板</span>
			</div>
		</div>

		<div class="middle-title-box">
			<span class="middle-title">服务中心</span>
		</div>
		<div class="middle-sp flex-row-around grid border-top mgbt0">
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-2-6.png">
				<span class="state-disc">城市服务</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-2-7.png">
				<span class="state-disc">手机充值</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-5-3.png">
				<span class="state-disc">共享单车</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-5-4.png">
				<span class="state-disc">优惠酒店</span>
			</div>
		</div>
		<div class="middle-sp flex-row-around grid border-top">
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-5-5.png">
				<span class="state-disc">机票预订</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-5-6.png">
				<span class="state-disc">火车票预订</span>
			</div>
			<div class="state flex-column-center" @click="showWaiting">
				<img class="service-icon" src="../../assets/img/mine-icon-5-7.png">
				<span class="state-disc">快递服务</span>
			</div>
			<div class="state flex-column-center">

			</div>
		</div>
	</div>
</template>

<script>
import Header from 'base-components/header'
import { waiting } from 'util/common.js'
export default {
	methods:{
		toUrl(url){
            this.$router.push(url)
        },
		showWaiting(){
            waiting()
        },
	},
	components:{
		Header
	}
}
</script>

<style scoped>
.service-icon{width:24px;height:24px;}
</style>