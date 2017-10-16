<template>
    <div class="index">
        <div class="top">
            <a class="top-left" :href="hosts+'/friends/index.html#/?userId=' + userinfo.id+'&did='+snsId">Friends</a>
            <div class="top-title">Home</div>
            <a class="top-right" :href="hosts+'/questions/index.html#/?userId=' + userinfo.id+'&did='+snsId">Play</a>
        </div>
        <div class="main-content">
            <div class="userinfo">
                <img :src="userinfo.avatar?userinfo.avatar:'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/pic_girl.png'" class="userinfo-avatar" v-if="userinfo.gender == 'F'">
                <img :src="userinfo.avatar?userinfo.avatar:'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/pic_boy.png'" class="userinfo-avatar" v-else>
                <div class="userInfo_content">
                  <p class="userinfo-nickname">{{userinfo.name}}</p>
                  <div class="userInfo_content-school">
                    <p class="userinfo-info userinfo-school">{{userinfo.school}}</p><p class="userinfo-info">Grade {{userinfo.grade}} , Class {{userinfo.clazz}}</p>
                  </div>
                  <div class="userinfo-diamonds">
                    <p class="userinfo-diamonds-1"><img class="diamonds-pic vertical-align" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_diamond_3.png"><span class="vertical-align">{{blueDiamond}}</span></p>
                    <p class="userinfo-diamonds-1"><img class="diamonds-pic vertical-align" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_diamond_4.png"><span class="vertical-align">{{redDiamond}}</span></p>
                  </div>
                </div>
            </div>
            <div class="tbh-friends">
                <h5 class='tbh-friends-tips'>What my friends received</h5>
                <ul class="friends-received-list">
                    <li class="tbh-friends-list" v-for="moments in friendsMoments" v-if="moments.question">
                        <div class='tbh-friend-content' v-if="moments.friend">
                          <img class="friends-avatar" :src="moments.friend.avatar?moments.friend.avatar:'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/pic_girl.png'" v-if="moments.friend.gender == 'F'">
                          <img class="friends-avatar" :src="moments.friend.avatar?moments.friend.avatar:'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/pic_boy.png'" v-else>
                          <div class='tbh-friends-info'>
                            <p class='friends-name'>{{moments.friend.name}}</p>
                            <p class='friends-received'>{{moments.question.content}}</p>
                            <div class="friends-diamonds"><img class="diamonds-pic-2 vertical-align" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_diamond_3.png" v-if="moments.replier?moments.replier.gender=='M':'false'"><img class="diamonds-pic-2 vertical-align" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_diamond_4.png" v-if="moments.replier?moments.replier.gender=='F':'true'"><p class='friends-from vertical-align' v-if="moments.replier">From a {{moments.replier.gender == "F" ? 'girl' : 'boy'}} in {{moments.question.dimension}} {{moments.replier[moments.question.dimension]}}</p></div>
                          </div>
                        </div>
                        <!-- <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_diamond_1 copy 6.png" class="tbh-diamond" v-if="moments.replier?moments.replier.gender=='M':'false'">
                        <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_diamond_2 copy 7.png" class="tbh-diamond" v-if="moments.replier?moments.replier.gender=='F':'true'"> -->
                    </li>
                    <div class='downloads' v-if="friendsMoments.length <= 0">
                      <h5>No friends here ?</h5>
                      <button class="share" data-clipboard-text="https://play.google.com/store/apps/details?id=com.midnightlabs.tbhapp" @click="copySucess()">Invite my friends</button>
                    </div>
                </ul>
            </div>
        </div>
        <!-- <a class="bottom" :href="hosts+'/questions/index.html#/?userId=' + userinfo.id+'&did='+snsId">Play Now !</a> -->
        <div class="loading" :class="{'hide':loadingShow}"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/loading.gif"></div>
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
                toastLink: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_tick.png',
                redDiamond: 0,
                blueDiamond: 0
            }
        },
        methods: {
          getUserInfo() {
            let self = this;
            if(self.idx < 2) {
              http.get(`/users/login?snsId=${self.snsId}`).then(function(res){
                if(res.user) {
                  self.userinfo = res.user;
                  self.diamonds = res.diamondCount;
                  self.blueDiamond = res.blueDiamond;
                  self.redDiamond = res.redDiamond;
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
              if(res.friendsMoments) {
                self.friendsMoments = res.friendsMoments;
                console.log(res)
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
                self.toastLink = 'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_tick.png'
                setTimeout(function(){
                    self.toast = '';
                    self.toastShow = false;
                },1500)
            });

            //复制失败执行的回调
            copys.on('error', (e)=> {
                self.toast = 'Sorry ！Network Error …';
                self.toastShow = true;
                self.toastLink = 'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_error_1.png'
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
    .tbh-friends-list {
      position: relative;
      padding: 0 0 12px;
    }
    .tbh-friend-content {
      padding: 8vw 0 7px;
    }
    .tbh-diamond {
      width: 50px;
      height: 50px;
      position: absolute;right: 0;
      top: 50%;margin-top: -25px;
    }
    .friends-avatar {
      width: 16vw;
      height: 16vw;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 2.77777vw;
      position: absolute;
      left: 50%;
      top: 0;
      margin-left: -8vw;
      box-sizing: border-box;
      border: 2px solid #fff;
      background:#fff2e5;
    }
    .tbh-friends-info {
      // display: inline-block;
      // max-width: 55.55555vw;
      // vertical-align: middle;
      background: #fff;
      border-radius: 8px;
      margin:0 5.55555vw;
      padding-top: 8vw;
      text-align: center;
      box-sizing: border-box;
    }
    .friends-name {
      font-size:16px;
      color: #FFAE30;
      font-weight: 600;
      padding-bottom: 5px;
      padding-top: 5px;
    }
    .friends-diamonds {
      border-top: 1px solid #E6DEFF;
      padding: 3px 0 5px;
      margin-top: 10px;
    }
    .friends-name-received {
      font-size: 14px;
      color: #666666;
      margin-left: 6px;
    }
    .friends-received {
      font-size: 16px;
      color: #491CC6;
      font-weight: 600;
      padding: 0 12px;box-sizing: border-box;
    }
    .diamonds-pic-2 {
      width: 15px;
      margin-right: 7px;
    } 
    .friends-from {
      font-size: 12px;
      color: #8064CD;
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