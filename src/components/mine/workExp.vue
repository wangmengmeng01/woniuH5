<template>
    <div class="container-width-header">
        <Header title="工作履历"></Header>
        <div class="">
            <div>
                <div>
                    <MyLine title="公司名称" :showRightIcon="false" :hasTopBorder="false">
                        <input class="myline-text" v-model="obj.company" placeholder="请输入公司名称"/>
                    </MyLine>
                    <MyLine title="职位名称" :showRightIcon="false">
                        <input class="myline-text" v-model="obj.position" placeholder="请输入职位名称"/>
                    </MyLine>                    
                    <MyLine title="入职时间" @click.native="openMyTime(0)" >
                        <span class="myline-text">{{obj.workStart}}</span>
                    </MyLine>
                    <MyLine title="离职时间" @click.native="openMyTime(1)">
                        <span class="myline-text">{{obj.workEnd}}</span>
                    </MyLine>
                    <MyTime ref="myTime" @getTime="getTime"></MyTime>
                    <span class="title-nobg">工作职责</span>
                    <textarea maxlength="-1" class="bor0" v-model="obj.workDesc" placeholder="填写工作职责"/>
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
import api from 'api/api.js';
import { Toast} from 'vant';
export default {
    data(){
       return {
            sign:0,                      
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
    created(){
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
        openMyTime(sign){
            this.sign = sign
            this.$refs.myTime.toggle()
        },
        getTime(time){
            if(this.sign==0){
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
                this.index =="-1" ? this.userInfo.workExperiences.push(this.obj) : this.userInfo.workExperiences[this.index]=Object.assign({},this.obj)
                console.log(this.index,"a")
                console.log(arr,"a1")
            }
            this.delFlag=false;
            console.log(this.userInfo.workExperiences,"简历内容")            
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
                    Toast({message:'workExp保存简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'workExp保存简历'+err,duration:1000});
            })
          },
        getResume(){
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
                    Toast({message:'workExp获取简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'workExp获取简历'+err,duration:1000});
            })
        },
    }
}
</script>

<style scoped>

</style>
