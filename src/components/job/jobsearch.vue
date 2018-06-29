<template>
    <div class="container-width-header">
        <Header title="搜索"></Header>
        <div class="search">
            <div class="search-box-container flex-row-center">
                <div class="my-search flex search-box-circle">
                    <van-field class="my-input" v-model="searchText" placeholder="搜索职位 / 公司" @input="hasContent" @keydown.13="search"/>
                </div>
                <span class="cancel" @click="cancel">取消</span>
            </div>
            <div class="middle">
                <div class="item" v-if="tipArrHistory.length>0">
                    <div class="flex-row-between">
                        <span class="search-title">历史搜索</span>
                        <img @click="clearHistory" style="width:15px;height:15px;" src="../../assets/img/delete.png">
                    </div>
                    <div class="tip-box">
                        <span class="tip" :class="{'active':activeTip==i&&selectType==0}" v-for="(e,i) in tipArrHistory" :key="i" data-text="e" @click="changeActiveTip(0,i,e)">{{e}}</span>
                    </div>
                </div>
                <div class="item">
                    <span class="search-title">热门职位</span>
                    <div class="tip-box">
                        <span class="tip" :class="{'active':activeTip==i&&selectType==1}" v-for="(e,i) in tipArrJob" :key="i" data-text="e" @click="changeActiveTip(1,i,e.name)">{{e.name}}</span>
                    </div>
                </div>
                <div class="item">
                    <span class="search-title">热门公司</span>
                    <div class="tip-box">
                        <span class="tip" :class="{'active':activeTip==i&&selectType==2}" v-for="(e,i) in tipArrCompany" :key="i" data-text="e.name" @click="changeActiveTip(2,i,e.name)">{{e.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import storage from 'good-storage';
import api from '../../api/api.js';
import { Toast } from 'vant';
export default {
    data(){
       return {
            city:'上海',
            selectType:'',
            tipArrHistory:[],
            tipArrJob:[],
            tipArrCompany:[],
            canTap:false,
            searchText:'',
            activeTip:''
       }
    },
    created(){
        this.getHotJobAndCompany()
        if (!storage.get('tipArrHistory')) {
            storage.set('tipArrHistory',[])
        }else{
            this.tipArrHistory = storage.get('tipArrHistory')
        }
    },
    methods:{
        search(){
            if (this.tipArrHistory.indexOf(this.searchText)<0) {
                if (this.tipArrHistory.length===3) {
                    this.tipArrHistory.splice(-1,1)
                };
                this.tipArrHistory.unshift(this.searchText)
                // console.log(_tipArrHistory)
                storage.set('tipArrHistory',this.tipArrHistory)
            };
            this.$router.push(`/joblist?type=-1&keyword=${this.searchText}`)
        },
        getHotJobAndCompany(){
            this.$ajax.get(api.getHotJobAndCompany).then(res=>{
                console.log(res.data,"热门")
                if(res.data.code===0){
                    this.tipArrJob = res.data.hotJobList,
                    this.tipArrCompany = res.data.hotCompanyList
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'jobsearch获取热门职位和公司'+res.data.msg,duration:1000});
                }
            }).catch(err=>{
                Toast({message:'jobsearch获取热门职位和公司'+err,duration:1000});
            })
        },
        changeActiveTip(type,i,e){
            this.selectType = type
            this.activeTip = i
            this.searchText = e
            this.search()
        },
        hasContent(){
            this.activeTip = -1
        },
        clearHistory(){
            storage.set('tipArrHistory',[])
            this.tipArrHistory = []
        },
        cancel(){
            this.$router.back()
        },
    },
    components:{
        Header
    }
}
</script>

<style scoped>
.container-width-header{background:#fff;min-height:100%;}
/* .search{position:fixed;top:0;bottom:0;left:0;right:0;background:#fff;} */
.search-box-container{width:100%;padding:10px 15px;background:#fff;box-shadow:0px 2px 5px rgba(0,0,0,0.05);}
.search-box-circle{padding:2px 10px;}
.my-search{font-size:12px;color:#32405e;justify-content:flex-start;margin-right:10px;padding-left:15px;border:1px solid #d7dee2;border-radius:100px;}
.my-search .van-cell{padding:2px 5px;}
.cancel{font-size:14px;color:#546373;}
.middle{padding:0 15px 20px;}
.search-title{font-size:15px;color:#32405e;}
.tip-box{margin-top:0;position:relative;}
.item{margin-top:30px;}
</style>
