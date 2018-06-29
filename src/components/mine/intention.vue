<template>
    <div class="container-width-header">
        <Header title="求职意向"></Header>
        <div class="">
            <div>
                <div>
                    <MyLine title="期望职位" @click.native="openPositionSelect">
                        <span class="myline-text">{{jobIntension.jobTradeId}}</span>
                    </MyLine>
                    <MyLine title="工作地点" @click.native="openAreaList">
                        <span class="myline-text" v-if="jobIntension.prov">{{jobIntension.prov}}{{jobIntension.city!=''?" · "+jobIntension.city:''}}{{jobIntension.area!=''?" · " + jobIntension.area:""}}</span>
                    </MyLine>
                    <MyLine title="薪资待遇" @click.native="openMyPicker('expSalary')">
                        <span class="myline-text">{{jobIntension.expSalary}}</span>
                    </MyLine>
                    <MyLine title="期望行业" @click.native="openIndustrySelect">
                        <span class="myline-text">{{jobIntension.industry}}</span>
                    </MyLine>
                    <MyLine title="公司规模" @click.native="openMyPicker('companyScale')">
                        <span class="myline-text">{{jobIntension.companyScale}}</span>
                    </MyLine>
                    <MyLine title="求职状态" @click.native="openMyPicker('curentStatus')">
                        <span class="myline-text">{{jobIntension.curentStatus}}</span>
                    </MyLine>
                    <MyLine title="到岗时间" @click.native="openMyPicker('onBoardDate')">
                        <span class="myline-text">{{jobIntension.onBoardDate}}</span>
                    </MyLine>
                </div>
                <div class="button-container-normal">
                    <van-button @click.native="save" type="primary">保存</van-button>
                </div>
            </div>
            <PositionList ref="pos" @getPosition="getPosition"></PositionList>
            <IndustryList ref="industry" @getIndustry="getIndustry"></IndustryList>
            <MyPicker ref="picker" :pickerArr="pickerArr" @getVal="getVal"></MyPicker>
            <MyArea ref="myArea" @getArea="getArea"></MyArea>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import MyLine from 'base-components/myLine'
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
            jobIntension:{},
            companyScaleOption:[],
            salaryOption:[],
            jobStateOption:[],
            workStartOption:[],
            pickerArr:[],
            openPickerName:''
       }
    },
    methods:{
        save(){
            var toast1= Toast.loading({
              mask: true,
              message: '保存中...'
            });
            this.$ajax.post(api.intentionUpdate,JSON.stringify(this.jobIntension)).then(res=>{
                console.log(res.data.data,'个人意向')
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
                    Toast({message:'intention个人意向'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                toast1.clear();
                Toast({message:'intention个人意向'+res,duration:1000});
            })
        },
        getIntention(){
            this.$ajax.get(api.getIntention).then(res=>{
                console.log(res.data.data,'个人意向')
                if(res.data.code===0){
                    this.jobIntension = res.data.data
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'mine个人意向'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'mine个人意向'+res,duration:1000});
            })
        },
        openPositionSelect(){
            this.$refs.pos.toggle()
        },
        openIndustrySelect(){
            this.$refs.industry.toggle()
        },
        openMyPicker(name){
            this.pickerArr = storage.get(name)
            this.openPickerName = name
            this.$refs.picker.toggle()
        },
        openAreaList(){
            this.$refs.myArea.toggle()
        },
        getPosition(val){
            this.jobIntension.jobTradeId = val
        },
        getIndustry(val){
            this.jobIntension.industry = val
        },
        getVal(val){
            this.jobIntension[this.openPickerName] = val
        },
        getArea(val){
            this.jobIntension.prov = val[0].name
            this.jobIntension.city = val[1].name
            this.jobIntension.area = val[2].name
        }
    },
    created(){
        this.getIntention()
    },
    components:{
        Header,
        MyLine,
        MyArea,
        PositionList,
        IndustryList,
        MyPicker
    }
}
</script>

<style scoped>

</style>
