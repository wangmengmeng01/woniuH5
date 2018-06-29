// const baseUrl= "https://wxapitest.wnzx.com/credit"  //test
// const  baseUrl= "https://wxapi.wnzx.com/credit"  //prod


export default {
  login : "/wx/v1/login", //微信手机号快捷登录
  codeLogin : "/app/v1/login", //手机验证码登录
  sendVerifyCode: "/app/v1/sendVerifyCode", //手机验证码登录 发送验证码
  getAreaList : "/app/dict/getAreaList", //地区字典
  bindMobile : "/wx/v1/bindMobile",  //手机绑定
  authorize : "/wx/v1/authorize",  //用户授权
  getJobListByType : "/app/job/getJobListByType", //查询职位
  getResume : "/app/resume/get", //获取简历
  getHotJobAndCompany : "/app/dict/getHotJobAndCompany", //获取热门职位和热门公司
  updateJobIntention : "/app/job/v1/intention/update", //登录第一次填写后存到求职意向
  getHotJobList : "/app/job/getHotJobList", //职位详情下边的热门推荐
  queryJobDetail : "/app/job/queryJobDetail", //职位详情
  queryCompanyDetail : "/app/company/queryCompanyDetail", //公司详情
  getCompanyJobList : "/app/company/getCompanyJobList", //公司在招职位
  updateUserInfo : "/app/user/v1/updateUserInfo", //更新用户基本信息（账号）
  getUserInfo : "/app/user/v1/userInfo", //获取用户基本信息（账号）
  avatarUpload : "/common/upload", //上传头像
  countJobStatus : "/app/job/countJobStatus", //已投递、已沟通，待面试数量
  getJobListByStatus : "/app/job/getJobListByStatus", //列表 - 已投递、已沟通、待面试
  jobSaveList : "/app/job/favorite/jobList", //职位收藏
  whoFocus : "/app/resume/queryRecords", //谁看过我
  feedback : "/user/feedback", //反馈
  getSalaryList : "/app/dict/getSalaryList", //字典-薪资
  getScaleList : "/app/dict/getScaleList", //字典-公司规模
  getJobStateList : "/app/dict/getTargetcurrList", //字典-求职状态
  getIndustryList : "/app/dict/getIndustryList", //字典-行业
  getPositionList : "/app/dict/getPositionList", //字典-职位
  getExperienceList : "/app/dict/getExperienceList", //字典-工作经验
  getWorkStartList : "/app/dict/getWorkStartList", //字典-到岗时间
  getIntention : "/app/job/v1/intention/get", //单独获取求职意向
  intentionUpdate : "/app/job/v1/intention/update", //单独更新求职意向
  resumeUpdate : "/app/resume/update", //更新简历
  sendResume : "/app/job/sendResume", //投递简历
  getSendResumeStatus : "/app/job/getSendResumeStatus", //是否投递简历
  jobSave : "/app/job/favorite", //职位收藏
  jobSaveFlag : "/app/job/favorite/exist", //是否职位收藏
  jobSaveNo : "/app/job/unFavorite", //取消职位收藏
  getCvDegree : "/app/resume/getCvDegree", //简历完善度
  invitingJob : "/app/invite_recommend/v1/Recommend-Job-list", //查询我的推荐职位
  invitingRegister : "/app/invite_recommend/v1/Recommend-Job-user-list", //查询我的推荐职位详情
  myInvitingList : "/app/invite_recommend/v1/invite-list", //查询我的邀请人列表
  myInvitings: "/app/invite_recommend/v1/sum", //查询我的邀请和推荐的数量
  shareJobDetail: "/app/share/getShareJobDetail", //获取分享职位详情
  getUserMsg: "/app/userAccount/getAccountInfo", //获取用户账户信息
  getRewardStatus: "/app/resume/getResumeRewardStatus", //获取红包状态
  registMoney: "/app/invite_recommend/v1/regist-money", //完善简历领红包
  inviteMoney: "/app/invite_recommend/v1/invite-money/id", //邀请人领红包
  userFlowingWater: "/app/userAccount/getAccountRecordListByType", //根据类型查询账户流水（全部、邀请注册、推荐岗位、历史提现）
  jobListInterviewed: "/app/job/jobList-interviewed", //待面试职位（包含判断合同状态字段）
  contractpath: "/app/contract/v1/contractpath", //获取合同状态
  uploadContract: "/app/contract/v1/contract", //上传合同
  recommonedApply: "/app/job/recommend/apply", //收藏推荐岗位
  wxShare: "/wx/v1/shareUrl", //获取微信分享内容
  wxShareConfig: "/wx/v1/getJsConfig",//获取微信分享配置
}
