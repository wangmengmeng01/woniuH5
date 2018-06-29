<template>
    <div>
        <!-- 选择职位 -->
        <div class="wrap-job-container" v-show="positionSelectShow" @click="toggle"></div>
        <div class="wrap-job flex-row-center" :class="{'joblistshow':positionSelectShow}">
            <div class="job-l">
                <div v-for="(e,i) in positionArr[0]" :key="i">
                    <div class="wrap-category" :class="{'select-active':i===positionValue[0]}">
                        <div class='category-item' @click='setPositionLevel2(i)'>
                            <span class="txt">{{e}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="job-r flex">
                <div v-for="(e,i) in positionArr[1]" :key="i">
                    <span class="seconde">{{e.value}}</span>
                    <div class="group">
                        <span @click='getPositionLevel2(k,j)' v-for='(k,j) in e.son' :key='j'>{{k.value}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import storage from 'good-storage';
export default {
    props:{
        
    },
    data(){
        return{
            positionArr:[], //职位arr 遍历用
            positionValue:[0,0], //职位values码值
            positionSelectShow:false
        }
    },
    methods: {
        toggle(){
            this.positionSelectShow = !this.positionSelectShow
        },
        setPositionArr(){
            let _arr = []
            _arr.push(storage.get('positionListLevel1'))
            _arr.push(storage.get('positionListLevel2')[0])
            this.positionArr = _arr
        },
        setPositionLevel2(i){
            this.positionArr.splice(1,1,storage.get('positionListLevel2')[i])
            this.positionValue = [i,0]
        },
        getPositionLevel2(e,i){
            this.positionSelectShow = false
            this.$emit('getPosition',e.value) //只抛出了value 没有index
        },
    },
    created(){
        this.setPositionArr() //初始化职位
    }
}
</script>

<style scoped>
.wrap-job {
  width:85%;
  height: 100%;
  position: fixed;
  top:44px;
  bottom:0;
  left:100%;
  right:0;
  transition:all 0.3s;
  overflow:hidden;
}
.wrap-job-container{
  position: fixed;
  background:rgba(0,0,0,.4);
  top:44px;
  bottom:0;
  left:0;
  right:0;
  transition:all 0.3s;
}
.select-active {
  color: #29a1f7 !important;
  background-color: #f3f5f7;
}
.select-active .txt{
  color: #29a1f7 !important;
}
.select {
  color: #29a1f7 !important;
  background-color: #e4f0f9 !important;
  border-color: #29a1f7 !important;
}

.wrap-category {
  display: flex;
  flex-direction: column;
}
.category-item {
 border-bottom: 1px solid #f2f5f7;
  padding: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}
.wrap-category span {
  color: #909ba3;
}

.job-l {
  width: 110px;
  height: 100%;
  font-size: 15px;
  text-align: center;
  background-color: #fff;
}
.job-r {
  height: 100%;
  padding: 20px 10px;
  background-color: #f3f5f7;
  /* overflow:scroll; */
}

.seconde {
  display: inline-block;
  font-size: 15px;
  color: #374665;
  padding: 15px 0 5px 10px;
}

.group span {
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  padding: 10px;
  font-size: 12px;
  color: #546473;
  border-radius: 4px;
  border: 1px solid #e4e9f0;
  background-color: #fff;
}
.joblistshow{
  left:15%;
}
</style>
