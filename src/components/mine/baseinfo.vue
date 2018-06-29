<template>
    <div class="container-width-header">
        <Header title="基本信息"></Header>
        <div class="">
            <div>
                <div>
                    <MyLine title="更换头像" :showRightIcon="false" @click.native="chooseAvatar" :hasTopBorder="false">
                        <img class="avatar" :src="userInfo.avatarPhoto">
                    </MyLine>
                    <MyLine title="真实姓名" :showRightIcon="false">
                        <input type="text" class="myline-text" v-model="userInfo.realName" placeholder="请输入真实姓名">
                    </MyLine>
                    <MyLine title="性别" @click.native="openMyPicker('gender')">
                        <span class="myline-text">{{userInfo.gender}}</span>
                    </MyLine>
                    <MyLine title="生日" @click.native="openMyTime()">
                        <span class="myline-text">{{userInfo.birthday}}</span>
                    </MyLine>
                    <MyLine title="所在地区" @click.native="openAreaList">
                        <span class="myline-text" v-if="userInfo.province">{{userInfo.province}}{{userInfo.city!=''?" · "+userInfo.city:''}}{{userInfo.area!=''?" · " + userInfo.area:""}}</span>
                    </MyLine>
                </div>
                <div class="button-container-normal">
                    <van-button @click.native="save" type="primary">保存</van-button>
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
            userInfo:{},
            pickerArr:[],
            sexOption:['男','女']
       }
    },
    created(){
        this.getUserInfo()
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
                        this.userInfo.avatarPhoto = res.data.url
                    }else{
                        Toast({message:'baseinfo图片上传'+res.data.msg,duration:1000});
                    }
                }).catch((res)=>{
                    Toast({message:'baseinfo图片上传'+res,duration:1000});
                })
            }
        },
        save(){
            var toast1= Toast.loading({
              mask: true,
              message: '保存中...'
            });
            if(this.userInfo.email){
                this.$set(this.userInfo,'email','')
            }
            this.$ajax.post(api.updateUserInfo,JSON.stringify(this.userInfo)).then(res=>{
                console.log(res.data.data,'保存个人信息')
                if(res.data.code===0){
                    toast1.clear();
                    Toast.success({message:'修改成功',duration:1000});
                    setTimeout(()=>{
                        this.$router.back()
                    },1000)
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    toast1.clear();
                    Toast({message:'baseinfo保存个人信息'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                toast1.clear();
                Toast({message:'baseinfo保存个人信息'+res,duration:1000});
            })
        },
        getUserInfo(){
            this.$ajax.get(api.getUserInfo).then(res=>{             
                console.log(res.data.data,'个人信息')
                if(res.data.code===0){
                    this.userInfo = res.data.data
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'baseinfo个人信息'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'baseinfo个人信息'+res,duration:1000});
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
            this.userInfo.birthday = val
        },
        getVal(val){
            this.userInfo[this.openPickerName] = val
        },
        getArea(val){c(val)
            this.userInfo.province = val[0].name
            this.userInfo.city = val[1].name
            this.userInfo.area = val[2].name
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
