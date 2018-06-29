<template>
    <div>
        <div class="container-width-header">
            <Header title="谁看过我"></Header>
            <div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="getJobListByType(pageNow,type,false)"
                    :offset="100"
                >
                    <div v-for="(e,i) in companyList" :key="i">
                        <CompanyItem :companyItem="e"></CompanyItem>
                    </div>
                </van-list>
                <span v-if="noResult" class="loading-text">到底了</span>
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import TextSingle from 'base-components/textSingle'
import CompanyItem from 'base-components/companyItem'
import storage from 'good-storage'
import api from 'api/api.js'
import { Toast, List } from 'vant';
export default {
    data(){
        return {
            companyList:[],
            pageNow:1,
            repeatFlag:false,
            loading:true,
            finished:false,
            noResult:false
        }
    },
    methods:{
        whoFocus(page,refresh){ //谁看过我
            if(this.repeatFlag) return //防重请求
            this.repeatFlag = true
            this.$ajax.get(api.whoFocus,{params:{page:page}}).then(res=>{             
                console.log(res.data.data,'谁看过我')
                if(res.data.code===0){
                    this.noResult = res.data.data.totalCount === 0 ? true : false
                    if(res.data.data.list.length<10) this.finished = true
                    this.repeatFlag = false
                    this.loading = false
                    if(refresh){
                        this.companyList = res.data.data.list
                        this.pageNow = 2 //刷新时请求的第一页 下一次从2开始
                    }else{
                        this.companyList = this.jobList.concat(res.data.data.data)
                        this.pageNow++
                    }
                }else if(res.data.code===-99){
                    this.$router.push('/login')
                }else{
                    Toast({message:'whofocusme谁看过我'+res.data.msg,duration:1000});
                }
            }).catch((res)=>{
                Toast({message:'whofocusme谁看过我'+res,duration:1000});
            })
        }
    },
    created(){
        this.pageNow = 1;
        this.whoFocus(this.pageNow,true) //查询
    },
    components:{
        Header,
        TextSingle,
        CompanyItem
    }
}
</script>

<style scoped>
</style>