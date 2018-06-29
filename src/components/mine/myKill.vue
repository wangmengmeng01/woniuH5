<template>
    <div class="container-width-header">
        <Header title="我的">
            <!-- <div slot="left-icon"></div> -->
        </Header>
        <div class="">
            <div class="big-card">
                <div class="normal-input-container">
                    <input style="border-width:0;" class="normal-input" v-model="obj.languageName" placeholder="请输入技能名称" placeholder-class="placeholder" />
                </div>
                <div class="add-skill flex-row-center">
                    <img style="width:12px;height:12px;margin-right: 5px;" src="../../assets/img/add.png">
                    <span @click="addKill">添加到技能</span>
                </div>
            </div>
            <div class="overflow-h">
                <div class="hide-1px">
                    <div v-for="(item,index) in userInfo.skill.languages" :key="index" >                       
                        <MyLine :title="item.languageName" @del="delKill(index)" showLeftIcon="" :showRightIcon="true" rightIcon="delete.png">
                            <!-- <span class="del" :data-index="index" @click="delKill(index)">X</span> -->
                        </MyLine>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import MyLine from 'base-components/myLine'
import storage from 'good-storage';
import api from '../../api/api.js';
import Vue from 'vue'
import { Toast} from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Toast)
export default {
    data(){
       return {
        killName:"",
        obj:{
              languageName:"",
              qualification:"",
              primaryId:""
        },
        userInfo:{
            skill:[]
        },
        index:'',
       }
    },
    components:{
        Header,
        MyLine,   
    },
    created(){
        this.getResume();
        this.index=this.$route.query.index;
        this.obj = {
            languageName:"",
            qualification:"",
            primaryId:""
        }
    },
    methods:{
        addKill(){
           this.userInfo.skill.languages.push(this.obj)
           this.saveResume();
        },
        delKill(index){
          this.userInfo.skill.languages.splice(index,1);
          this.saveResume();
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
                    this.obj = {
                        languageName:"",
                        qualification:"",
                        primaryId:""
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'skill保存简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'skill保存简历'+err,duration:1000});
            })
          },
          getResume(){
              this.$ajax.get(api.getResume,{params:{}}).then(res=>{
                  console.log(res,"获取简历")
                  if(res.data.code===0){
                      this.userInfo=res.data.data;
                      this.obj=Object.assign({},this.obj,this.userInfo.skill.languages[this.index])
                  }else if(res.data.code===-99){
                      this.$router.push('/login')
                  }else{
                      Toast({message:'skill获取简历'+res.data.msg,duration:1000});
                  }
              }).catch(err=>{
                  Toast({message:'skill获取简历'+err,duration:1000});
              })
          },
    }
}
</script>

<style scoped>
.add-skill{color:#29a1f7;padding:10px 0;border-top:1px solid #e4e9f0;}
.del{
    width: 20px;
    height: 20px;
    float: right;
    margin-top: -30px;
    margin-right: 12px;
}
</style>
