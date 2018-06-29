<template>
    <div class="container-width-header">
        <Header title="项目经验"></Header>
        <div class="">
            <div>
                <div>
                    <MyLine title="项目名称" :showRightIcon="false">
                        <input class="myline-text" v-model="obj.projectName" placeholder="请输入项目名称"/>
                    </MyLine>
                    <MyLine title="职位名称" :showRightIcon="false">
                        <input class="myline-text" v-model="obj.position" placeholder="请输入职位名称"/>
                    </MyLine>            
                    <MyLine title="开始时间" @click.native="openMyTime(0)">
                        <span class="myline-text">{{obj.projectStart}}</span>
                    </MyLine>
                    <MyLine title="结束时间" @click.native="openMyTime(1)">
                        <span class="myline-text">{{obj.projectEnd}}</span>
                    </MyLine>
                    <span class="title-nobg">项目描述</span>
                    <textarea maxlength="-1" class="bor0" v-model="obj.projectDesc" placeholder="填写项目描述"/>
                    <span class="title-nobg">职责描述</span>
                    <textarea maxlength="-1" class="bor0" v-model="obj.responsibility" placeholder="填写工作职责"/>
                </div>
                <MyTime ref="myTime" @getTime="getTime"></MyTime>
                <div class="button-container-normal">
                    <van-button type="primary" @click="saveResume">保存</van-button>
                    <div v-if="deleteShow" class="delete-button" @click="deleteItem">删除</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import MyLine from 'base-components/myLine'
import MyTime from 'base-components/myTime'
import storage from 'good-storage';
import api from 'api/api.js';
import { Toast} from 'vant';
export default {
    data(){
       return {
            sign:0,
            deleteShow:false,
            obj:{
                  "company": "",
                  "position": "",
                  "primaryId": 0,
                  "projectDesc": "",
                  "projectEnd": "",
                  "projectName": "",
                  "projectStart": "",
                  "responsibility": ""
            },
            userInfo:{
                educationExperiences:[]
            },
            index:'',
            repeatFlag:false, 
            delFlag:false
       }
    },
    components:{
        Header,
        MyLine,
        MyTime
    },
    created(){
        this.getResume();
        console.log(this.$route.query,"参数")
        this.index=this.$route.query.index;
        this.obj = {
          "company": "",
          "position": "",
          "primaryId": 0,
          "projectDesc": "",
          "projectEnd": "",
          "projectName": "",
          "projectStart": "",
          "responsibility": ""
        }
        this.deleteShow=false;
        if (this.index!=-1) {   
            this.deleteShow=true;         
        }
    },
    methods:{
        openMyTime(sign){
            this.sign = sign
            this.$refs.myTime.toggle()
        },
        getTime(time){
            if(this.sign==0){
                this.obj.projectStart=time;
            }else{
                this.obj.projectEnd=time;
            }
        },
        getResume(){
            this.$ajax.get(api.getResume,{params:{}}).then(res=>{
                console.log(res,"获取简历")
                if(res.data.code===0){
                    this.userInfo=res.data.data;
                    this.obj=Object.assign({},this.obj,this.userInfo.projectExperiences[this.index])
                    console.log(this.userInfo.projectExperiences,"Experiences")
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'eventExp获取简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'eventExp获取简历'+err,duration:1000});
            })
        },
        saveResume(){
            var toast1= Toast.loading({
              mask: true,
              message: '保存中...'
            });
            if(!this.delFlag){
                this.index ==-1 ? this.userInfo.projectExperiences.push(this.obj):this.userInfo.projectExperiences[this.index]=Object.assign({},this.obj)   
            }
            this.delFlag=false;
            console.log(this.userInfo.projectExperiences,"简历内容")            
            this.$ajax.post(api.resumeUpdate,this.userInfo).then(res=>{
                console.log(res,"保存简历")
                if(res.data.code===0){
                    toast1.clear();
                    Toast.success({message:'保存成功',duration:1000});
                    setTimeout(()=>{
                        this.$router.push("/myresume");
                    },1000)
                    this.obj = {
                      "company": "",
                      "position": "",
                      "primaryId": 0,
                      "projectDesc": "",
                      "projectEnd": "",
                      "projectName": "",
                      "projectStart": "",
                      "responsibility": ""
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'eventExp保存简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'eventExp保存简历'+err,duration:1000});
            })
        },
        deleteItem(){
          this.delFlag=true;
          this.userInfo.projectExperiences.splice(this.index,1)
          this.saveResume()
        }
    },
    
}
</script>

<style scoped>

</style>
