<template>
    <div class="view">
        <div  class="container-width-header">
            <Header title="公司地址"></Header>
            <div id="container">
                
            </div>
        </div>
    </div>
</template>

<script>
import Header from 'base-components/header'
import storage from 'good-storage'
import api from 'api/api.js'
import { Toast } from 'vant';
var startLat,endLon;
export default {
    data(){
        return {
            address:'',
            lat:"",
            lng:""
        }
    },
    created(){
        function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                }
            }        
            function showPosition(position) {
                console.log( "纬度：" + position.coords.latitude + "\n经度："
                        + position.coords.longitude);
                startLat= position.coords.latitude;
                endLon=position.coords.longitude;
            }         
            function showError(error) {
                switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.log( "用户拒绝对获取地理位置的请求。");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log( "位置信息是不可用的。");
                    break;
                case error.TIMEOUT:
                    console.log( "请求用户地理位置超时。");
                    break;
                case error.UNKNOWN_ERROR:
                    console.log( "未知错误。");                   
                    break;        
                }
            }
            getLocation();
    },
    components:{
        Header
    },
    mounted(){
        this.codeAddress();
        this.address = this.$route.query.address;
        console.log(this.address,"ajjjj");
    },
    methods:{
        codeAddress(){
            var geocoder, map, marker = null;
            geocoder = new qq.maps.Geocoder();
            var address = '上海市徐汇区桂平路44号';         
            geocoder.getLocation(address); //对指定地址进行解析
            //设置服务请求成功的回调函数
            geocoder.setComplete((result) =>{
                console.log(result.detail.location,"aaaaaaa");
                var lat = result.detail.location.lat; //经度
                var lng = result.detail.location.lng; //纬度
                var map = new qq.maps.Map(document.getElementById("container"),{
                    center: new qq.maps.LatLng(lat,lng),
                    zoom: 13,
                    panControl: false,               
                    zoomControl: true,      
                    scaleControl: true    
                });
                var marker = new qq.maps.Marker({
                        //设置Marker的位置坐标
                        position: new qq.maps.LatLng(lat,lng),
                        //设置显示Marker的地图
                        map: map
                    });
            })
               
        }
    }
}
</script>

<style scoped>
.view{
    height: 100%;
}
#container{
    width: 100%;
    height: 500px;
}
</style>