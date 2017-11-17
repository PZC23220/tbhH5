<template>
    <div class="index">
        <div class="top">
            <a class="top-left" :href="hosts+'/index/index.html#/?'+urlQuery">Home</a>
            <div class="top-title">My Diamonds</div>
            <!-- <a class="top-right" :href="hosts+'/index/index.html'">Share</a> -->
        </div>
        <div class='diamonds'>
          <div class='diamonds-images'>
            <div class='diamonds-content'>
              <img class="diamonds-pic vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_4.png">
              <p>{{redDiamonds?redDiamonds:0}}</p>
            </div>
            <div class='diamonds-content'>
              <img class="diamonds-pic vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_3.png">
              <p>{{blueDiamonds?blueDiamonds:0}}</p>
            </div>
            </div>
            <div class="tbh-friends">
              <ul class="friends-received-list">
                  <li class="tbh-friends-list" v-for="moments in diamonds" v-if="moments.question">
                      <div class='tbh-friend-content' v-if="moments.receiver">
                        <img class="friends-avatar" v-lazy="moments.receiver.avatar?moments.receiver.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_girl.png'" v-if="moments.receiver.gender == 'F'">
                        <img class="friends-avatar" v-lazy="moments.receiver.avatar?moments.receiver.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_boy.png'" v-else>
                        <img src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_new.png" alt="" v-if="moments.new" class="moments-new">  
                        <a :href="hosts+'/detail/index.html#/?question='+moments.id+'&html=diamonds'+'&'+urlQuery" class='tbh-friends-info'>
                          <p class='friends-name'>{{moments.receiver.name}}</p>
                            <p class='friends-received'>{{moments.question.title}}</p>
                            <div class="friends-diamonds"><img class="diamonds-pic-2 vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_3.png" v-if="moments.sender?moments.sender.gender=='M':'false'"><img class="diamonds-pic-2 vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_4.png" v-if="moments.sender?moments.sender.gender=='F':'true'"><p class='friends-from vertical-align' v-if="moments.sender">From a {{moments.sender.gender == "F" ? 'girl' : 'boy'}} in {{changeClass(moments.sender,moments.receiver)}}</p></div>
                        </a>
                      </div>
                      <!-- <img src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_1 copy 6.png" class="tbh-diamond" v-if="moments.replier?moments.replier.gender=='M':'false'">
                      <img src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_2 copy 7.png" class="tbh-diamond" v-if="moments.replier?moments.replier.gender=='F':'true'"> -->
                  </li>
                  <div class='downloads' v-if="diamonds.length <= 0">
                    <h5>Haven’t received any diamonds ?</h5>
                    <button class="share" data-clipboard-text="https://play.google.com/store/apps/details?id=com.midnightlabs.thb" @click="shareTwitter()">Invite my friends</button>
                  </div>
              </ul>
          </div>
        </div>
        <div class="toast" :class="{'show':toastShow}"><span><img :src="toastLink"><br>{{toast}}</span></div>
    </div>
</template>
<!-- <script src="../../../js/vue-clipboard.min.js"></script> -->
<script>
    //复制功能
    var clipboard = require('clipboard')
    import http from '../../../js/http.js';
    // require('@api/js/common.js')
    export default {
        data() {
            return {
                hosts: 'http://tbh.groupy.vip',
                userId: '',
                urlQuery: '',
                blueDiamonds: 0,
                redDiamonds: 0,
                diamonds: [],
                idx: 0,
                toast: '',
                toastShow: false,
                toastLink: 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_tick.png'
            }
        },
        methods: {
          shareTwitter() {
            let str = JSON.stringify({
              title: "Want to know what I've received in THB? Play with me : https://play.google.com/store/apps/details?id=com.midnightlabs.thb",
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
          getDiamonds() {
            let self = this;
            if(self.idx < 2) {
              http.get(`/users/diamonds?userId=${self.userId}`).then(function(res){
                console.log(res)
                if(res.blue) {
                  self.blueDiamonds = res.blue;
                }
                if(res.red) {
                  self.redDiamonds = res.red;
                }
                if(res.diamonds) {
                  self.diamonds = res.diamonds;
                }
                
              }).catch(function(err){
                  self.idx++;
              });
            }else {

            }
          },
          copySucess: function (e){
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
            this.hosts = `http://${location.host}`;
            this.urlQuery = location.href.split('?')[1];
            this.blueDiamonds = this.$route.query.blueDiamonds;
            this.redDiamonds = this.$route.query.redDiamonds;
            this.userId = this.$route.query.userId;
            this.getDiamonds();
        }
    }
</script>

<style scoped>
    .top-left,.top-right {
        font-size: 18px;
    }
    .top-left {
        left: 12px;
    }
    .top-right {
        right: 12px;
    }
    /* pages/diamonds/diamonds.wxss */
    .diamonds {
      height: 100vh;
      width: 100%;
      overflow: auto;
      padding: 16px 5.55555vw 0;
      box-sizing: border-box;
      color: #fff;
      text-align: center;
    }
    .wow {
      display: block;
      font-family: FiraSansCondensed-HeavyItalic;
      font-size: 21.6px;
      color: #FFFFFF;
      letter-spacing: 1.01px;
      margin-bottom: 24px;
    }
    .diamonds-images {
      overflow: hidden;
      margin-bottom: 26px;
    }
    .diamonds-content {
      width: 41.66666vw;
      float: right;
      background: #fff;
      border-radius: 10px;
      padding: 25px 0 10px;
      font-size: 20px;
      color: #00B7D8;
      font-weight: 600;
    }
    .diamonds-content:first-child {
      float: left;
      color: #E8009E;
    }
    .diamonds-pic {
      width: 60px;
      display: block;
      margin: 0 auto 16px;
    }
    .tbh-friends-info {
      margin:  0;
    }
</style>