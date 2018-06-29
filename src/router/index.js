import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//登录页--------------------------
const Login = (resolve) =>{
    import('components/login/login').then((module)=>{
        resolve(module)
    })
}
//选项卡页--------------------------
const Tab = (resolve) =>{
    import('components/tab/tab').then((module)=>{
        resolve(module)
    })
}

// 各大主页
const Job = (resolve) =>{
    import('components/job/job').then((module)=>{
        resolve(module)
    })
}
const Msg = (resolve) =>{
    import('components/msg/msg').then((module)=>{
        resolve(module)
    })
}
const Friends = (resolve) =>{
    import('components/friends/friends').then((module)=>{
        resolve(module)
    })
}
const Mine = (resolve) =>{
    import('components/mine/mine').then((module)=>{
        resolve(module)
    })
}

//【job】--------------------------
//职位搜索页
const Jobsearch = (resolve) =>{
    import('components/job/Jobsearch').then((module)=>{
        resolve(module)
    })
}
//职位搜索列表
const Joblist = (resolve) =>{
    import('components/job/joblist').then((module)=>{
        resolve(module)
    })
}
//和我相关的职位列表 已投递 沟通过 待面试
const JoblistAboutMe = (resolve) =>{
    import('components/job/joblist-aboutme').then((module)=>{
        resolve(module)
    })
}
//职位详情
const Jobdetail = (resolve) =>{
    import('components/job/jobdetail').then((module)=>{
        resolve(module)
    })
}
//公司详情
const Companydetail = (resolve) =>{
    import('components/job/companydetail').then((module)=>{
        resolve(module)
    })
}
//公司地图
const Companymap = (resolve) =>{
    import('components/job/companymap').then((module)=>{
        resolve(module)
    })
}
//合同详情
const Contract = (resolve) =>{
    import('components/job/contract').then((module)=>{
        resolve(module)
    })
}
//谁看了我
const Whofocusme = (resolve) =>{
    import('components/job/whofocusme').then((module)=>{
        resolve(module)
    })
}

//【我的】--------------------------
// 账号基本信息
const Baseinfo = (resolve) =>{
    import('components/mine/baseinfo').then((module)=>{
        resolve(module)
    })
}
// 简历基本信息
const BaseinfoResume = (resolve) =>{
    import('components/mine/baseinfo-resume').then((module)=>{
        resolve(module)
    })
}
// 求职意向
const Intention = (resolve) =>{
    import('components/mine/intention').then((module)=>{
        resolve(module)
    })
}
// 我的简历
const MyResume = (resolve) =>{
    import('components/mine/myresume').then((module)=>{
        resolve(module)
    })
}
// 教育经历
const EduExp = (resolve) =>{
    import('components/mine/eduExp').then((module)=>{
        resolve(module)
    })
}
// 项目经历
const EventExp = (resolve) =>{
    import('components/mine/eventExp').then((module)=>{
        resolve(module)
    })
}
// 技能
const Kill = (resolve) =>{
    import('components/mine/myKill').then((module)=>{
        resolve(module)
    })
}
// 优势
const Advantage = (resolve) =>{
    import('components/mine/advantage').then((module)=>{
        resolve(module)
    })
}
// 工作履历
const WorkExp = (resolve) =>{
    import('components/mine/workExp').then((module)=>{
        resolve(module)
    })
}
//【个人账户】--------------------------
// 奖金
const PersonalReward = (resolve) =>{
    import('components/account/personalReward').then((module)=>{
        resolve(module)
    })
}

//【活动】--------------------------
// 邀请好友
const InvitingFriend = (resolve) =>{
    import('components/event/invitingFriend').then((module)=>{
        resolve(module)
    })
}
// 邀请好友展示页面
const GoodWorkRegister = (resolve) =>{
    import('components/event/goodWorkRegister').then((module)=>{
        resolve(module)
    })
}
// 好友注册
const InvitingRegisterlist = (resolve) =>{
    import('components/event/inviting-registerlist').then((module)=>{
        resolve(module)
    })
}
// 推荐职位
const InvitingJoblist = (resolve) =>{
    import('components/event/inviting-joblist').then((module)=>{
        resolve(module)
    })
}
// 推荐职位
const InvitingJobdetail = (resolve) =>{
    import('components/event/inviting-jobdetail').then((module)=>{
        resolve(module)
    })
}

//【其他】--------------------------
//more
const More = (resolve) =>{
    import('components/more/more').then((module)=>{
        resolve(module)
    })
}
//反馈
const Feedback = (resolve) =>{
    import('components/more/feedback').then((module)=>{
        resolve(module)
    })
}
//404
const NoWeb = (resolve) =>{
    import('components/noWeb').then((module)=>{
        resolve(module)
    })
}


export default new Router({
    // mode: 'history',
    // scrollBehavior (to, from, savedPosition) {
    //     console.log(111111111,savedPosition)
    //     if(savedPosition) {
    //         return savedPosition
    //     }
    // },
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/tab',
            component: Tab,
            children:[
                {
                    path:'/job',
                    component:Job
                },
                {
                    path:'/msg',
                    component:Msg
                },
                {
                    path:'/friends',
                    component:Friends
                },
                {
                    path:'/mine',
                    component:Mine
                },
            ]
        },
        {
            path:'/joblist',
            name:'joblist',
            component:Joblist
        },
        {
            path:'/contract',
            name:'contract',
            component:Contract
        },
        {
            path:'/whofocusme',
            component:Whofocusme
        },
        {
            path:'/joblist-aboutme',
            name:'joblist-aboutme',
            component:JoblistAboutMe
        },
        {
            path:'/jobdetail',
            name:'jobdetail',
            component:Jobdetail
        },
        {
            path:'/jobsearch',
            name:'jobsearch',
            component:Jobsearch
        },
        {
            path:'/companydetail',
            name:'companydetail',
            component:Companydetail
        },
        {
            path:'/companymap',
            name:'companymap',
            component:Companymap
        },
        {
            path:'/intention',
            component:Intention
        },
        {
            path:'/personalReward',
            component:PersonalReward
        },
        {
            path:'/baseinfo',
            component:Baseinfo
        },
        {
            path:'/baseinfo-resume',
            component:BaseinfoResume
        },
        {
            path: '/eventExp',
            component: EventExp
        },
        {
            path: '/myKill',
            component: Kill
        },
        {
            path: '/advantage',
            component: Advantage
        },
        {
            path: '/invitingfriend',
            component: InvitingFriend
        },
        {
            path: '/goodworkregister',
            component: GoodWorkRegister
        },
        {
            path: '/inviting-joblist',
            component: InvitingJoblist
        },
        {
            path: '/inviting-registerlist',
            component: InvitingRegisterlist
        },
        {
            path: '/inviting-Jobdetail',
            component: InvitingJobdetail
        },
        {
            path: '/myresume',
            component: MyResume
        },
        {
            path: '/eduExp',
            component: EduExp
        },
        {
            path: '/workExp',
            component: WorkExp
        },
        {
            path: '/more',
            component: More
        },
        {
            path: '/feedback',
            component: Feedback
        },
        {
            path: '*',
            component: NoWeb
        },
        {
            path: '/',
            redirect:'/login'
        }
    ]
})

