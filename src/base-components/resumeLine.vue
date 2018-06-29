<template>
    <div>
        <div class="myline-with-icon" bindtap="gotoUrl">
          <div class="inner flex-row-between {{hasTopBorder ? 'has-top-border':''}}">
            <div class="left flex-row-center">
              <img wx:if="{{showLeftIcon}}" class="left-icon" src="{{icon}}">
              <div class="title">
                {{title}}
              </div>
            </div>
            <div class="right flex-row-between">
              <!-- 右边的值 -->
              <slot></slot>
              <img wx:if="{{showRightIcon}}" class="right-icon" src="{{rightIcon}}">
            </div>
          </div>
        </div>

    </div>
</template>

<script>
import storage from 'good-storage';
import api from '../../api/api.js';
export default {
    props:["title"],
    data(){
       return {

       }
    },
    components:{
        Header
    }
}
</script>

<style scoped>
.wrap-job {
  width:650rpx;
  height: 100%;
  position: fixed;
  top:0;
  bottom:0;
  left:100%;
  right:0;
  transition:all 0.3s;
  overflow:hidden;
}
.wrap-job-container{
  position: fixed;
  background:rgba(0,0,0,.4);
  top:0;
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
.wrap-category text {
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

.group text {
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
  left:100rpx;
}
</style>
