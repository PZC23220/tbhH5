<template>
    <div class="index">
        <div class="top">
            <a class="top-left" :href="hosts+'/friends/index.html#/?userId=' + userinfo.id+'&did='+snsId">Friends</a>
            <div class="top-title">Home</div>
            <!-- <a class="top-right" :href="hosts+'/questions/index.html#/?userId=' + userinfo.id+'&did='+snsId">Play</a> -->
        </div>
        <div class="main-content">
            <div class="userinfo">
                <img :src="userinfo.avatar?userinfo.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_girl.png'" class="userinfo-avatar" v-if="userinfo.gender == 'F'">
                <img :src="userinfo.avatar?userinfo.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_boy.png'" class="userinfo-avatar" v-else>
                <div class="userInfo_content">
                  <p class="userinfo-nickname">{{userinfo.name}}</p>
                  <div class="userInfo_content-school">
                    <p class="userinfo-info userinfo-school">{{userinfo.school}}</p><p class="userinfo-info">Grade {{userinfo.grade}} , Class {{userinfo.clazz}}</p>
                  </div>
                  <a class="userinfo-diamonds" :href="hosts+'/diamonds/index.html#/?userId=' + userinfo.id+'&did='+snsId">
                    <p class="userinfo-diamonds-1"><img class="diamonds-pic vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_4.png"><span class="vertical-align" style="color: #E8009E;">{{redDiamond}}</span></p>
                    <p class="userinfo-diamonds-1"><img class="diamonds-pic vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_3.png"><span class="vertical-align" style="color: #00B7D8;">{{blueDiamond}}</span></p>
                  </a>
                </div>
            </div>
            <div class="tbh-friends">
                <h5 class='tbh-friends-tips' v-if="friendsMoments.length > 0">What my friends received</h5>
                <ul class="friends-received-list">
                    <li class="tbh-friends-list" v-for="moments in friendsMoments" v-if="moments.question">
                        <div class='tbh-friend-content' v-if="moments.receiver">
                          <img class="friends-avatar" :src="moments.receiver.avatar?moments.receiver.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_girl.png'" v-if="moments.receiver.gender == 'F'">
                          <img class="friends-avatar" :src="moments.receiver.avatar?moments.receiver.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_boy.png'" v-else>
                          <a :href="hosts+'/detail/index.html#/?question='+moments.id+'&html=index'+'&'+urlQuery" class='tbh-friends-info'>
                            <p class='friends-name'>{{moments.receiver.name}}</p>
                            <p class='friends-received'>{{moments.question.title}}</p>
                            <div class="friends-diamonds"><img class="diamonds-pic-2 vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_3.png" v-if="moments.sender?moments.sender.gender=='M':'false'"><img class="diamonds-pic-2 vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_4.png" v-if="moments.sender?moments.sender.gender=='F':'true'"><p class='friends-from vertical-align' v-if="moments.sender">From a {{moments.sender.gender == "F" ? 'girl' : 'boy'}} in {{changeClass(moments.sender,moments.receiver)}}</p></div>
                          </a>
                        </div>
                    </li>
                    <div class='downloads' v-if="friendsMoments.length <= 0">
                      <h5>No friends here ?</h5>
                      <a class="share"  :href="hosts+'/friends/index.html#/?userId=' + userinfo.id+'&did='+snsId" style="margin-bottom: 14px;">Add friends</a>
                      <button class="share" data-clipboard-text="https://play.google.com/store/apps/details?id=com.midnightlabs.thb" @click="shareTwitter()">Invite my friends</button>
                    </div>
                </ul>
            </div>
        </div>
        <a class="bottom" :href="hosts+'/questions/index.html#/?userId=' + userinfo.id+'&did='+snsId">Play Now !</a>
        <div class="loading" :class="{'hide':loadingShow}"><img src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/loading.gif"></div>
        <div class="toast" :class="{'show':toastShow}"><span><img :src="toastLink"><br>{{toast}}</span></div>
    </div>
</template>
<script>
    //复制功能
    var clipboard = require('clipboard')
    import http from '../../../js/http.js';
    require('../../../js/common.js')
    export default {
        data() {
            return {
                hosts: 'http://tbh.groupy.vip',
                userinfo:{},
                notFound: false,
                urlQuery:'',
                snsId: '',
                idx: 0,
                diamonds: 0,
                friendsMoments: [],
                loadingShow: false,
                toast: '',
                toastShow: false,
                toastLink: 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_tick.png',
                redDiamond: 0,
                blueDiamond: 0
            }
        },
        methods: {
          shareTwitter() {
            let str = JSON.stringify({
              title: "Want to know what I've received in TBH? Play with me : https://play.google.com/store/apps/details?id=com.midnightlabs.thb",
              desc: '',
              img: 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon.png',
              url:''
            })
            console.log(str)
            window.tbhBridge.shareTbh(str)
          },
          changeClass(sender,receiver) {
            if(receiver.clazz == sender.clazz) {
              return `class ${sender.clazz}`;
            }else {
              return `class ${sender.grade}`;
            }
          },
          getUserInfo() {
            let self = this;
            if(self.idx < 2) {
              http.get(`/users/login?snsId=${self.snsId}`).then(function(res){
                console.log(res)
                if(res.user) {
                  self.userinfo = res.user;
                  self.diamonds = res.diamondCount;
                  self.blueDiamond = res.blueDiamonds;
                  self.redDiamond = res.redDiamonds;
                  self.loadingShow = true;
                  self.getDynamic();
                }else {
                  location.href = `http://${location.host}/login/index.html#/?did=${self.snsId}`
                }
                
              }).catch(function(err){
                  self.idx++;
              });
            }else {

            }
          },
          getDynamic() {
            let self = this;
            http.get(`/users/home?userId=${self.userinfo.id}`).then(function(res){
                console.log(res)
              if(res.moments) {
                self.friendsMoments = res.moments;
              }
              setTimeout(function(){
                self.getDynamic();
              },30000);
            })
          },
          copySucess: function (){
            var self = this;
            let copys = new clipboard('.share');
            //复制成功执行的回调
            copys.on('success', (e)=> {
                self.toast = 'Share the download links to friends';
                self.toastShow = true;
                self.toastLink = 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_tick.png'
                setTimeout(function(){
                    self.toast = '';
                    self.toastShow = false;
                },1500)
            });

            //复制失败执行的回调
            copys.on('error', (e)=> {
                self.toast = 'Sorry ！Network Error …';
                self.toastShow = true;
                self.toastLink = 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_error_1.png'
                setTimeout(function(){
                    self.toast = '';
                    self.toastShow = false;
                },1500)
            });
          }
        },
        bind(el, binding, vnode, oldVnode) {
            new clipboard(el);
        },
        mounted() {
        },
        created() {
          var self = this;
          self.snsId = self.$route.query.did;
          self.urlQuery = location.href.split('?')[1];
          self.hosts = `http://${location.host}`;
          self.getUserInfo();
        }
    }
</script>

<style lang="scss" scoped>
    .no-found {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      background: #A341D3;
      text-align: center;
      box-sizing: border-box;
      padding-top: 10vh;
      font-size: 30px;
      color: #fff;
    }
    .userinfo {
      padding-top: 9.72222vw;
      position: relative;
      overflow: hidden;
      margin: 0 5.55555vw 8px;
    }
    .userinfo-avatar {
      width: 19.44444vw;
      height: 19.44444vw;
      border-radius: 50%;
      position: absolute;left: 50%;top: 0;
      margin-left: -9.72222vw;
      background: #fff2e5;
      box-sizing: border-box;
      border: 2px solid #fff;
    }
    .userInfo_content {
      background: #fff;
      border-radius: 10px;
      text-align: center;
      padding-top: 11.38888vw;
      padding-bottom: 11px;
    }
    .userInfo_content-school {
      display: flex;
    }
    .userInfo_content .userinfo-info {
      font-size: 12px;
      color: #8064CD;
      box-sizing: border-box;
      padding: 0 15px;
      flex: 1;
      text-align: left;
    }
    .userInfo_content .userinfo-school {
      border-right: 1px #E6DEFF solid;
      text-align: right;
      
    }
    .userInfo_content .userinfo-nickname {
      font-size: 19px;
      color: #491CC6;
      font-weight: 600;
       padding-bottom: 7px; 
      display: block;
    }
    .tbh-friends-tips {
      opacity: 0.5;
      font-size: 16px;
      color: #FFFFFF;
      padding-left: 10px;
      display: block;
      margin: 10px 5.55555vw 5px;
      text-align: center;
      margin: 15px 0;
    }
    
    .userinfo-diamonds {
      display: flex;
      border-top: #E6DEFF 1px solid;
      padding-top: 10px;
      margin-top: 10px;
      color: #FFAE30;
      font-size: 18px;
    }
    .userinfo-diamonds-1 {
      flex: 1;
      text-align: center;
    }
    .diamonds-pic {
      width: 21px;
      margin-right: 13px;
    }
</style>