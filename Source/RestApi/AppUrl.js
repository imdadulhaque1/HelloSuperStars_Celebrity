class AppUrl {
  // static BaseUrl = 'http://10.10.10.118/HelloSuperStarsBackend-2/public/api/';
  // static MediaBaseUrl = 'http://10.10.10.118/HelloSuperStarsBackend-2/public/';
  // static socketUrl = 'http://10.10.10.118:3005';

  static BaseUrl = 'https://tfpbackend.hellosuperstars.com/api/';
  static MediaBaseUrl = 'https://tfpbackend.hellosuperstars.com/';
  static socketUrl = 'https://socket.hellosuperstars.com';

  static QrVerification = this.BaseUrl + 'star_qr_verify';
  static CreateUser = this.BaseUrl + 'superStar/register';
  static otpVerification = this.BaseUrl + 'star_otp_verify';
  static StarInstrucation = this.BaseUrl + 'star-instrucation';
  static SuperStarReg = this.BaseUrl + 'superStar/register';
  static SuperStarLogin = this.BaseUrl + 'star_login';
  static getInformation = this.BaseUrl + 'star/getInformation';
  static getUserInfo = this.BaseUrl + 'user_info';

  static UserMediaUpload = this.BaseUrl + 'mobile/user-photo-upload';

  static schedule = this.BaseUrl + 'star/current_month_schedule_list';
  static addSchedule = this.BaseUrl + 'star/addScheduleMobile';
  static deleteSchedule = this.BaseUrl + 'star/deleteSchedule/'; //{id}

  static superStarRegister = this.BaseUrl + 'superStar/register';

  static superStarOtp = this.BaseUrl + 'star_otp_verify';

  static dashboard = this.BaseUrl + 'star/dashboard/mobile';

  //notification
  static notification = this.BaseUrl + 'star/notification';
  static totalNotificationCount = this.BaseUrl + 'star/notificationCount';
  //marketplace
  static starShowCaseCount = this.BaseUrl + 'star/showcase/count/mobile';
  static marketplaceProducts =
    this.BaseUrl + 'star/showcase/MarketplaceProductMobile/mobile';
  static createMarketplace = this.BaseUrl + 'star/marketplace/store/mobile';

  //Auction
  static auction = this.BaseUrl + 'star/add/auction/product/mobile';
  static auctionAdd = this.BaseUrl + 'star/add/auction/mobile';
  static AuctionDetails = this.BaseUrl + 'star/getStarAuctionProduct/'; // ${product?.id}
  static AuctionLiveBidding = this.BaseUrl + 'star/liveBidding/auction/'; // ${product?.id}

  //Souvenir
  static souvenir = this.BaseUrl + 'star/souvenir/register/list';
  static souvenirCheck = this.BaseUrl + 'star/souviner/check';
  static souvenirAdd = this.BaseUrl + 'star/souviner/store/mobile';

  //Greetings
  static allGreetingInfo = this.BaseUrl + 'star/allGreetingInfo/mobile';
  static greetingsCheck = this.BaseUrl + 'star/greetings_star_status';
  static greetingsAdd = this.BaseUrl + 'star/add_greetings/mobile';

  //learning session
  static learningSessionAll =
    this.BaseUrl + 'star/learning_session/allInOneMobile';
  static createLeaning = this.BaseUrl + 'star/mobile/learning_session/create';
  static learningApprove = this.BaseUrl + 'star/learning_session/approve/'; //{id}
  static learningReject = this.BaseUrl + 'star/learning_session/reject/'; //{id}

  //live chat
  static ImageUpload = this.BaseUrl + 'star/image-upload';
  static LiveChatCreate = this.BaseUrl + 'star/add_live_session';
  static LiveChatUpdate = this.BaseUrl + 'star/update_live_session';
  static LiveChatList = this.BaseUrl + 'star/live-chat/'; //type

  // meetup
  static MeetUpCount = this.BaseUrl + 'star/meetup_event/mobile/count';
  static MeetUpCreate = this.BaseUrl + 'star/add_meetup/mobile';
  static MeetUpUpdate = this.BaseUrl + 'star/meetup_event/edit/'; //meetpu id
  static MeetUpList = this.BaseUrl + 'star/meetup_event/';

  //QNA
  static QnaAllCount = this.BaseUrl + 'star/qna/allInOneMobile';
  static QnaCreate = this.BaseUrl + 'star/qna/add_qna_mobile';
  static QnaUpdate = this.BaseUrl + 'star/update_Qna';
  static QnaApproved = this.BaseUrl + 'star/qna/approved/';
  static QnaRejected = this.BaseUrl + 'star/qna/rejected/';

  static QnaPanding = this.BaseUrl + 'star/pending/qna';
  static QnaLive = this.BaseUrl + 'star/qna_live';
  static QnaCompleted = this.BaseUrl + 'star/qna_completed';

  //Audition
  static audition = this.BaseUrl + 'superstar/audition/mobile';
  static auditionRoundVideos = this.BaseUrl + 'superstar/audition/videos/'; //{round_info_id}
  static videoMarking = this.BaseUrl + 'star/audition/video/marking';
  static roundInstructionVideos =
    this.BaseUrl + 'superstar/audition/pending/roundInstructionVideos';
  static promoVideo = this.BaseUrl + 'superstar/promotional/video/list';

  //Post
  static simplePost = this.BaseUrl + 'star/simple_post/all/mobile';
  static simplePostAdd = this.BaseUrl + 'star/add_simple_post/mobile';
  static simplePostApprove = this.BaseUrl + 'star/approve_post/'; //id
  static simplePostDecline = this.BaseUrl + 'star/decline_post/'; //id

  //Fan group
  static fanGroup = this.BaseUrl + 'star/fan/group/starlist/status';
  static fanGroupInfo = this.BaseUrl + 'star/fan/group/show/'; //slug
  static fanGroupPostApprove = this.BaseUrl + 'star/fan/member/post/'; //{postId}
  static fanGroupMember = this.BaseUrl + 'star/fan/member/approve/'; //{joinMemberId}
  static fanGroupJoinPermission = this.BaseUrl + 'star/fan-group/join/'; //    ${slug}/${joinTo}
  static fanGroupPostPermission = this.BaseUrl + 'star/fan-group/post/'; //    ${slug}/${postTo}

  //Wallet
  static getWallet = this.BaseUrl + 'star/dashboard';
  static getProfitInfo = this.BaseUrl + 'star/profitShare';
  static profitWithdraw = this.BaseUrl + 'star/profit/withdraw';
  static updateInfo = this.BaseUrl + 'user_info_update/star_admin_info';
}

export default AppUrl;
