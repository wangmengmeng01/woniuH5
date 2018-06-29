<template>
    <van-popup v-model="showIndustryList" position="bottom">
        <van-picker :columns="industryArr" @confirm="getIndustry" @change="change" :show-toolbar="true"/>
    </van-popup>
</template>

<script>
import storage from 'good-storage';
export default{
    props:{

    },
    data(){
        return{
            industryArr:[],
            showIndustryList:false,
        }
    },
    methods:{
        change(picker,val) {
            let _index = storage.get('industryListLevel1').findIndex((e)=>e === val[0])
            picker.setColumnValues(1,storage.get('industryListLevel2')[_index]);
        },
        setIndustryArr(){
            let _arr = []
            _arr.push({values:storage.get('industryListLevel1')})
            _arr.push({values:storage.get('industryListLevel2')[0]})
            this.industryArr = _arr
        },
        getIndustry(e){
            this.$emit('getIndustry',`${e[0]}-${e[1]}`)
            this.toggle()
        },
        toggle(){
            this.showIndustryList = !this.showIndustryList
        }
    },
    created(){
        this.setIndustryArr() //初始化行业
    },
}
</script>

<style lang="stylus" scoped>

</style>