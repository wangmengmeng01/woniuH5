<template>
	<div class="container-width-header">
		<Header title="反馈帮助"></Header>
		<div>
			<textarea maxlength="-1" style="border-width:0;" auto-height auto-focus  v-model="feedbackText" placeholder="填写反馈问题" placeholder-class="placeholder"/>
			<div class="button-container-normal">
				<van-button type="primary" @click="feedback">提交</van-button>			    
			</div>
		</div>
	</div>
</template>

<script>
import Header from 'base-components/header'
import api from '../../api/api.js';
import Vue from 'vue'
import { Toast} from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Toast)
export default {
	data(){
		return {
			feedbackText:""
		}
	},
	methods:{
		feedback(){
			var toast1= Toast.loading({
			  mask: true,
			  message: '保存中...'
			});
			this.$ajax({
				method:"post",
				url:api.feedback,
				data:{
					feedBackContent:this.feedbackText,
					feedBackType:0
				}
			}).then(res=>{
			    console.log(res,"反馈")
			    if(res.data.code===0){
			    	this.feedbackText="";
			        toast1.clear();
			        Toast.success({message:'反馈成功',duration:1000});			       
			    }else if(res.data.code===-99){
			        this.$router.push('/login')
			    }else{
			    	toast1.clear();
			        Toast({message:'education保存简历'+res.data.msg,duration:1000});			        
			    }
			}).catch(err=>{
				toast1.clear();
			    Toast({message:'education保存简历'+err,duration:1000});
			})
		}
	},
	components:{
		Header
	}
}
</script>

<style scoped>
</style>