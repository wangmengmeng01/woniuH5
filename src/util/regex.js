export default{
    //手机号 1开头的11位数字
    telRegExp(str){
        let reg = /^[1]\d{10}/;
        return reg.test(str) ? true : false
    },
    //密码 6位以上任意
    passwordRegExp(str){
        let reg = /.{6,}/;
        return reg.test(str) ? true : false
    },
    //姓名 1-20位的中英文和空格
    nameRegExp(str){
        let reg = /^[a-zA-Z\u4e00-\u9fa5 ]{1,20}$/;
        return reg.test(str) ? true : false
    },
    //邮箱 邮箱 mp.12-34.qq.com
    emailRegExp(str){
        let reg = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/;
        return reg.test(str) ? true : false
    },
    //日期是否存在
    isDate(year,month,day){
        if((month==4||month==6||month==9||month==11)&&(day>30)){
            return false
        }
        if(month==2){
            if(day>29){
                return false
            }
            if((((year%100==0)&&(year%400!=0))||(year%4!=0))&&(day>28)){
                return false
            }
        }
        return true;
    }

}