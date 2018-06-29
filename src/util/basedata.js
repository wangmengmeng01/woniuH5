import storage from 'good-storage';
import api from 'api/api.js';
import axios from 'axios'
import { Toast } from 'vant';
export default {
    getSalaryList(){  //存薪资
        if (storage.get('expSalary')) return
        axios.get(api.getSalaryList).then(res=>{             
            console.log(res.data.data,'薪资')
            if(res.data.code===0){
                let _arr = []
                res.data.data.salaryList.map((e,i)=>{
                    _arr.push(e.value)
                })
                storage.set('expSalary' ,_arr)
            }else{
                Toast({message:'basedata存薪资'+res.data.msg,duration:1000});
            }
        }).catch((res)=>{
            Toast({message:'basedata存薪资'+res,duration:1000});
        })
    },
    getScaleList(){ //存规模
        if (storage.get('companyScale')) return
        axios.get(api.getScaleList).then(res=>{             
            console.log(res.data.data,'规模')
            if(res.data.code===0){
                let _arr = []
                res.data.data.scaleList.map((e,i)=>{
                    _arr.push(e.value)
                })
                storage.set('companyScale' ,_arr)
            }else{
                Toast({message:'basedata存规模'+res.data.msg,duration:1000});
            }
        }).catch((res)=>{
            Toast({message:'basedata存规模'+res,duration:1000});
        })
    },
    getJobStateList(){ //存求职状态
        if (storage.get('curentStatus')) return
        axios.get(api.getJobStateList).then(res=>{             
            console.log(res.data.data,'工作状态')
            if(res.data.code===0){
                let _arr = []
                res.data.data.targetcurrList.map((e,i)=>{
                    _arr.push(e.value)
                })
                storage.set('curentStatus', _arr)
            }else{
                Toast({message:'basedata得到工作状态'+res.data.msg,duration:1000});
            }
        }).catch((res)=>{
            Toast({message:'basedata得到工作状态'+res,duration:1000});
        })
    },
    getWorkStartList(){ //存到岗时间
        if (storage.get('onBoardDate')) return
        axios.get(api.getWorkStartList).then(res=>{             
            console.log(res.data.data,'到岗时间')
            if(res.data.code===0){
                let _arr = []
                res.data.data.workStartList.map((e,i)=>{
                    _arr.push(e.value)
                })
                storage.set('onBoardDate' ,_arr)
            }else{
                Toast({message:'basedata到岗时间'+res.data.msg,duration:1000});
            }
        }).catch((res)=>{
            Toast({message:'basedata到岗时间'+res,duration:1000});
        })
    },
    getExperienceList(){ //存经验
        if (storage.get('expList')) return
        axios.get(api.getExperienceList).then(res=>{             
            console.log(res.data.data,'经验')
            if(res.data.code===0){
                let _arr = []
                res.data.data.experienceList.map((e,i)=>{
                    _arr.push(e.value)
                })
                storage.set('expList' ,_arr)
            }else{
                Toast({message:'basedata工作经验'+res.data.msg,duration:1000});
            }
        }).catch((res)=>{
            Toast({message:'basedata工作经验'+res,duration:1000});
        })
    },
    getIndustryList(){ //存行业
        if (storage.get('industryListLevel2')) return
        axios.get(api.getIndustryList).then(res=>{             
            if(res.data.code===0){
                let _arrLevel1 = []
                let _arrLevel2 = []
                res.data.data.industryList.map((e,i)=>{
                    _arrLevel1.push(e.value)
                    let _arr = []
                    e.son.map((m,n)=>{
                        _arr.push(m.value)
                    })
                    _arrLevel2.push(_arr)
                })
                storage.set('industryListLevel1',_arrLevel1)
                storage.set('industryListLevel2',_arrLevel2)
                console.log('行业',_arrLevel1,_arrLevel2)
            }else if(res.data.code===-99){
                this.$router.push('/login')
            }else{
                Toast({message:res.data.msg,duration:1000});
            }
        }).catch((res)=>{
            Toast({message:res,duration:1000});
        })
    },
    getPositionList(){ //存职位
        if (storage.get('positionListLevel2')) return
        axios.get(api.getPositionList).then(res=>{             
            if(res.data.code===0){
                let _arrLevel1 = []
                let _arrLevel2 = []
                res.data.data.positionList.map((e,i)=>{
                    _arrLevel1.push(e.value)
                    let _arr = []
                    e.son.map((m,n)=>{
                        let _obj = {}
                        _obj.value = m.value
                        _obj.son = m.son
                        _arr.push(_obj)
                    })
                    _arrLevel2.push(_arr)
                })
                storage.set('positionListLevel1',_arrLevel1)
                storage.set('positionListLevel2',_arrLevel2)
                console.log('职位',_arrLevel1,_arrLevel2)
                storage.set('positionList' ,res.data.data)
            }else if(res.data.code===-99){
                this.$router.push('/login')
            }else{
                Toast({message:res.data.msg,duration:1000});
            }
        }).catch((res)=>{
            Toast({message:res,duration:1000});
        })
    },
}