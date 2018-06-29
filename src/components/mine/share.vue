<template>
    <div class="container-width-header">
        <Header title="我的">
            <!-- <div slot="left-icon"></div> -->
        </Header>
        <div class="">
            111111111
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import storage from 'good-storage';
import api from '../../api/api.js';
export default {
    data(){
       return {

       }
    },
    components:{
        Header
    },
    created(){
        //获取分享信息
        this.$ajax.get('/wx/v1/shareUrl').then(res => {
                        console.log(res);
                        this.desc = res.data.data.desc;
                        this.title = res.data.data.title;
                        this.url = res.data.data.title;
                    })
                    .catch(function (error) {
                        console.log(error);
                    }); 

                    //获取分享的config
           this.$ajax.get('/wx/v1/getJsConfig').then(res => {
                     console.log(res);
                     this.timestamp = res.data.data.timestamp;
                     this.signature = res.data.data.signature;
                     this.noncestr = res.data.data.noncestr;
                wx.config({
                     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
                     appId: 'wx996d7ea6f254589c', // 必填，公众号的唯一标识
                     timestamp: this.timestamp, // 必填，生成签名的时间戳
                     nonceStr: this.noncestr, // 必填，生成签名的随机串
                     signature: this.signature,// 必填，签名
                     jsApiList: [
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage"
                     ] // 必填，需要使用的JS接口列  
                });
                wx.ready(() => {
                    wx.onMenuShareAppMessage({
                       title: this.title, // 分享标题
                       desc: this.desc, // 分享描述
                       link: this.url, // 分享链接
                       imgUrl: '', // 分享图标
                       type: 'link', // 分享类型,music、video或link，不填默认为link
                       dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                       success: function () {
                        console.log("x")
                        // 用户点击了分享后执行的回调函数
                       }
                    });
                    wx.error(function(res) {
                        console.log(res,"a")
                    })
              // wx.onMenuShareTimeline({
              //     title: this.title, // 分享标题
              //     link: this.url, // 分享链接
              //     imgUrl: '', // 分享图标
              //     success: function () {
              //     // 用户点击了分享后执行的回调函数
              //     }
              // });
            });              
        })
        .catch(function (error) {
            console.log(error);
        });                      
    }
}
</script>

<style scoped>

</style>
