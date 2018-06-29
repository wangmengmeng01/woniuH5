<template>
    <div class="container-width-header">
        <Header title="我的">
            <!-- <div slot="left-icon"></div> -->
        </Header>
        <div class="">
            <textarea maxlength="-1" style="border-width:0;" auto-height bindinput="textChange" v-model="userInfo.jobIntension.selfEvaluation" placeholder="请输入" placeholder-class="placeholder"/>
            <div class="button-container-normal">
                 <van-button type="primary" @click="saveResume">保存</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import storage from 'good-storage';
import api from '../../api/api.js';
import Vue from 'vue'
import { Toast} from 'vant';
import 'vant/lib/vant-css/index.css';
export default {
    data(){
       return {
            userInfo:{
                jobIntension:{
                   selfEvaluation :""
                }
            },
       }
    },
    components:{
        Header
    },
    created(){
        this.getResume();
    },
    methods:{
        getResume(){
            this.$ajax.get(api.getResume,{params:{}}).then(res=>{
                console.log(res,"获取简历")
                if(res.data.code===0){
                    this.userInfo=res.data.data;
                    this.obj=Object.assign({},this.obj,this.userInfo.projectExperiences[this.index])
                    console.log(this.userInfo,"userInfo")
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'advantage获取简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'advantage获取简历'+err,duration:1000});
            })
        },
        saveResume(){           
            var toast1= Toast.loading({
              mask: true,
              message: '保存中...'
            });                         
            this.$ajax.post(api.resumeUpdate,this.userInfo).then(res=>{
                console.log(res,"保存简历")
                if(res.data.code===0){
                    toast1.clear();
                    Toast.success({message:'保存成功',duration:1000});
                    setTimeout(()=>{
                        this.$router.push("/myresume");
                    },1000)                        
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'advantage保存简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'advantage保存简历'+err,duration:1000});
            })
        }
    }
}
</script>

<style scoped>

</style>
