<template>
    <div class="container-width-header">
        <Header title="我的">
            <!-- <div slot="left-icon"></div> -->
        </Header>
        <div class="">
            <div>
                <div>
                    <MyLine title="公司名称" showLeftIcon="" showRightIcon="">
                        <input class="myline-text" v-model="obj.company" bindinput="nameChange" placeholder="请输入公司名称" placeholder-class="placeholder"/>
                    </MyLine>
                    <MyLine title="职位名称" showLeftIcon="" showRightIcon="">
                        <input class="myline-text" v-model="obj.position" bindinput="positionChange" placeholder="请输入职位名称" placeholder-class="placeholder"/>
                    </MyLine>                    
                    <MyLine title="入职时间" showLeftIcon="" @click.native="startT" >
                        <span class="myline-text">{{obj.workStart}}</span>
                    </MyLine>
                    <MyLine title="离职时间" showLeftIcon="" @click.native="endT">
                        <span class="myline-text">{{obj.workEnd}}</span>
                    </MyLine>
                    <MyTime :s="tFlag" :sign="sign" @showFlag="showFlag" @getTime="getTime"></MyTime>
                    <span class="title-nobg">工作职责</span>
                    <textarea maxlength="-1" style="border-width:0;" auto-height bindinput="textChange" v-model="obj.workDesc" placeholder="填写工作职责" placeholder-class="placeholder"/>
                </div>
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
import api from '../../api/api.js';
import Vue from 'vue'
import { Toast} from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Toast)
export default {
    data(){
       return {
            tFlag:false,
            sign:"startTime",                      
            deleteShow:false,
            obj:{
                "company": "",
                 "industry": "",
                 "overview": "",
                 "position": "",
                 "primaryId": 0,
                 "salary": "",
                 "workDesc": "",
                 "workEnd": "",
                 "workNature": "",
                 "workPlace": "",
                 "workStart": ""
            },
            userInfo:{},
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
    activated(){
        this.getResume();
        console.log(this.$route.query,"参数")
        this.index=this.$route.query.index;
        this.obj = {
            "company": "",
             "industry": "",
             "overview": "",
             "position": "",
             "primaryId": 0,
             "salary": "",
             "workDesc": "",
             "workEnd": "",
             "workNature": "",
             "workPlace": "",
             "workStart": ""
        }
        this.deleteShow=false;
        if (this.index!=-1) {   
            this.deleteShow=true;         
        }
    },
    methods:{
        showFlag(value){
            this.tFlag=!value;
            console.log(value,"aaaaa");
        },
        startT(){
            this.tFlag=true;
            this.sign="startTime"
        },
        endT(){
            this.tFlag=true;
            this.sign="endTime"
        },
        getTime(time,sign){
            console.log(time,sign,"aaaaa");
            if(sign=="startTime"){
                this.obj.workStart=time;
            }else{
                this.obj.workEnd=time;
            }
        },
        deleteItem(){
          this.delFlag=true;
          this.userInfo.workExperiences.splice(this.index,1)
          this.saveResume()
        },
        saveResume(){
            var toast1= Toast.loading({
              mask: true,
              message: '保存中...'
            });
            if(!this.delFlag){
                var arr=[];
                // this.userInfo.educationExperiences.push(this.obj)
                // arr.push(...this.userInfo.workExperiences)
                // this.index =="-1" ? this.userInfo.workExperiences=Object.assign([],arr):this.userInfo.educationExperiences[this.index]=Object.assign({},this.obj)
                this.index =="-1" ? this.userInfo.workExperiences.push(this.obj) : this.userInfo.workExperiences[this.index]=Object.assign({},this.obj)
                console.log(this.index,"a")
                console.log(arr,"a1")
            }
            this.delFlag=false;
            console.log(this.userInfo.workExperiences,"简历内容")            
            console.log(this.obj,"this.obj")            
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
                         "industry": "",
                         "overview": "",
                         "position": "",
                         "primaryId": 0,
                         "salary": "",
                         "workDesc": "",
                         "workEnd": "",
                         "workNature": "",
                         "workPlace": "",
                         "workStart": ""
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'education保存简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'education保存简历'+err,duration:1000});
            })
          },
        getResume(fn){
            this.$ajax.get(api.getResume,{params:{}}).then(res=>{
                console.log(res,"获取简历")
                if(res.data.code===0){
                    this.userInfo=res.data.data;
                     console.log(this.obj,"this.obj")
                    this.obj=Object.assign({},this.obj,this.userInfo.workExperiences[this.index])
                    console.log(this.userInfo,"userInfo")
                    console.log(this.obj,"this.obj1")
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'myresume获取简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'myresume获取简历'+err,duration:1000});
            })
        },
    }
}
</script>

<style scoped>

</style>
