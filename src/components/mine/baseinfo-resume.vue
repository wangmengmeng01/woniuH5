<template>
    <div class="container-width-header">
        <Header title="基本信息"></Header>
        <div class="">
            <div>
                <div>
                    <MyLine title="更换头像" :showRightIcon="false" @click.native="chooseAvatar" :hasTopBorder="false">
                        <img class="avatar" :src="userInfo.basicInfo.avatar">
                    </MyLine>
                    <MyLine title="真实姓名" :showRightIcon="false">
                        <input type="text" class="myline-text" v-model="userInfo.basicInfo.name" placeholder="请输入真实姓名">
                    </MyLine>
                    <MyLine title="性别" @click.native="openMyPicker('gender')">
                        <span class="myline-text">{{userInfo.basicInfo.gender}}</span>
                    </MyLine>
                    <MyLine title="生日" @click.native="openMyTime()">
                        <span class="myline-text">{{userInfo.basicInfo.birthday}}</span>
                    </MyLine>
                    <MyLine title="所在地区" @click.native="openAreaList">
                        <span class="myline-text" v-if="userInfo.basicInfo.province">{{userInfo.basicInfo.province}}{{userInfo.basicInfo.city!=''?" · "+userInfo.basicInfo.city:''}}{{userInfo.basicInfo.area!=''?" · " + userInfo.basicInfo.area:""}}</span>
                    </MyLine>
                    <MyLine title="工作经验" :showRightIcon="false">
                        <input type="text" class="myline-text" v-model="userInfo.basicInfo.workLife" placeholder="请输入工作年限">
                    </MyLine>
                    <div class="mgtop10"></div>
                    <MyLine title="手机号码" :showRightIcon="false" :hasTopBorder="false">
                        <input type="text" class="myline-text" v-model="userInfo.basicInfo.mobile" placeholder="请输入手机号码">
                    </MyLine>
                    <MyLine title="联系邮箱" :showRightIcon="false">
                        <input type="text" class="myline-text" v-model="userInfo.basicInfo.email" placeholder="请输入联系邮箱">
                    </MyLine>
                </div>
                <div class="button-container-normal">
                    <van-button @click.native="saveResume" type="primary">保存</van-button>
                </div>
            </div>
            <MyPicker ref="picker" :pickerArr="pickerArr" @getVal="getVal"></MyPicker>
            <MyArea ref="myArea" @getArea="getArea"></MyArea>
            <MyTime ref="myTime" @getTime="getTime"></MyTime>
            <!-- 图片input -->
            <input id="takepicture" @change="uploading" type="file" accept="image/jpg,image/jpeg,image/png,image/bmp" class="dis-none">
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import MyLine from 'base-components/myLine'
import MyTime from 'base-components/myTime'
import PositionList from 'base-components/positionList'
import IndustryList from 'base-components/industryList'
import MyPicker from 'base-components/myPicker'
import MyArea from 'base-components/myArea'
import storage from 'good-storage';
import api from 'api/api.js';
import { Toast } from 'vant';
export default {
    data(){
       return {
            userInfo:{basicInfo:{}},
            pickerArr:[],
            sexOption:['男','女']
       }
    },
    created(){
        this.getResume()
    },
    methods:{
        chooseAvatar(){
            document.getElementById('takepicture').click()
        },
        uploading(e){
            let regexp = new RegExp("(.jpg$)|(.png$)|(.bmp$)|(.jpeg$)","i");
            if(e.target.files[0]&&regexp.test(e.target.files[0].name)){
                var formdata = new FormData();
                formdata.append ("file" , e.target.files[0]);
                this.$ajax({
                    method:"post",
                    url:api.avatarUpload,
                    data:formdata
                }).then((res)=>{
                    console.log(res.data,'图片上传')
                    if(res.data.code === 0){
                        this.userInfo.basicInfo.avatar = res.data.url
                    }else{
                        Toast({message:'baseinfo-resume图片上传'+res.data.msg,duration:1000});
                    }
                }).catch((res)=>{
                    Toast({message:'baseinfo-resume图片上传'+res,duration:1000});
                })
            }
        },
        saveResume(){
            a(this.userInfo.basicInfo.name)
            var toast1= Toast.loading({
              mask: true,
              message: '保存中...'
            });;
            this.$ajax.post(api.resumeUpdate,this.userInfo).then(res=>{
                console.log(res.data,"保存简历")
                if(res.data.code===0){
                    toast1.clear();
                    Toast.success({message:'保存成功',duration:1000});
                    setTimeout(()=>{
                        this.$router.push("/myresume");
                    },1000)
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'baseinfo-resume保存简历'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'baseinfo-resume保存简历'+err,duration:1000});
            })
        },
        getResume(){
            this.$ajax.get(api.getResume,{params:{}}).then(res=>{
                console.log(res.data.data,"简历基本信息")
                if(res.data.code===0){
                    this.userInfo=res.data.data;
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'baseinfo-resume简历基本信息'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'baseinfo-resume简历基本信息'+err,duration:1000});
            })
        },
        openMyTime(){
            this.$refs.myTime.toggle()
        },
        openMyPicker(name){
            this.pickerArr = this.sexOption
            this.openPickerName = name
            this.$refs.picker.toggle()
        },
        openAreaList(){
            this.$refs.myArea.toggle()
        },
        getTime(val){
            this.userInfo.basicInfo.birthday = val
        },
        getVal(val){
            this.userInfo.basicInfo[this.openPickerName] = val
        },
        getArea(val){c(val)
            this.userInfo.basicInfo.province = val[0].name
            this.userInfo.basicInfo.city = val[1].name
            this.userInfo.basicInfo.area = val[2].name
        }
    },
    components:{
        Header,
        MyLine,
        MyArea,
        MyPicker,
        MyTime
    }
}
</script>

<style scoped>
.avatar{border-radius:100px;width:60px;height:60px;}
</style>
