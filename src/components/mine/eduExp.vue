<template>
    <div class="container-width-header">
        <Header title="教育经历"></Header>
        <div class="">           
            <div>
                <div>
                    <MyLine title="学校名称" :showRightIcon="false" :hasTopBorder="false">
                        <input class="myline-text" v-model="obj.school"  placeholder="请输入学校名称"/>
                    </MyLine>
                    <MyLine title="专业名称" :showRightIcon="false">
                        <input class="myline-text" v-model="obj.major"  placeholder="请输入专业名称"/>
                    </MyLine>                   
                    <MyLine title="入学时间" @click.native="openMyTime(0)">
                        <span class="myline-text">{{obj.educationStart}}</span>
                    </myline>
                    <MyLine title="毕业时间" @click.native="openMyTime(1)">
                        <span class="myline-text">{{obj.educationEnd}}</span>
                    </MyLine>
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
                school:"",
                major:"",
                educationStart:"",
                educationEnd:"",
                arrangement:"",
                learningForm:"",
                overseaEducation:"",
                majorDesc:"",
                primaryId:0
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
            school:"",
            major:"",
            educationStart:"",
            educationEnd:"",
            arrangement:"",
            learningForm:"",
            overseaEducation:"",
            majorDesc:"",
            primaryId:0
        }
        this.deleteShow=false;
        if (this.index!=-1) {   
            // this.index=this.userInfo.educationExperiences.length*1,
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
                this.obj.educationStart=time;
            }else{
                this.obj.educationEnd=time;
            }
        },
        deleteItem(){
          this.delFlag=true;
          this.userInfo.educationExperiences.splice(this.index,1)
          this.saveResume()
        },
        saveResume(){
            var toast1= Toast.loading({
              mask: true,
              message: '保存中...'
            });
            if(!this.delFlag){
                var arr=[];
                this.index =="-1" ? this.userInfo.educationExperiences.push(this.obj) : this.userInfo.educationExperiences[this.index]=Object.assign({},this.obj)
                console.log(this.index,"a")
                console.log(arr,"a1")
            }
            this.delFlag=false;
            console.log(this.userInfo.educationExperiences,"简历内容")            
            this.$ajax.post(api.resumeUpdate,this.userInfo).then(res=>{
                console.log(res,"保存简历")
                if(res.data.code===0){
                    toast1.clear();
                    Toast.success({message:'保存成功',duration:1000});
                    setTimeout(()=>{
                        this.$router.push("/myresume");
                    },1000)
                    this.obj = {
                        school:"",
                        major:"",
                        educationStart:"",
                        educationEnd:"",
                        arrangement:"",
                        learningForm:"",
                        overseaEducation:"",
                        majorDesc:"",
                        primaryId:0
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
        getResume(){
            this.$ajax.get(api.getResume,{params:{}}).then(res=>{
                console.log(res,"获取简历")
                if(res.data.code===0){
                    this.userInfo=res.data.data;
                    this.obj=Object.assign({},this.obj,this.userInfo.educationExperiences[this.index])
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'education获取简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'education获取简历'+err,duration:1000});
            })
        },
    }
}
</script>

<style scoped>

</style>
