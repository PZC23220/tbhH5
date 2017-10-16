<template>
    <div class="index">
        <div class="top">
            <a class="top-left" :href="hosts+'/index/index.html#/?'+urlQuery">Home</a>
            <div class="top-title">My Diamonds</div>
            <!-- <a class="top-right" :href="hosts+'/index/index.html'">Share</a> -->
        </div>
        <div class='diamonds'>
          <p class='wow'>WOW ！ I’ve received</p>
          <div class='diamonds-images'>
            <div class='diamonds-content'>
              <img class="diamonds-pic vertical-align" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_diamond_3.png">
              <p>{{blueDiamonds}}</p>
            </div>
            <div class='diamonds-content'>
              <img class="diamonds-pic vertical-align" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_diamond_4.png">
              <p>{{redDiamonds}}</p>
            </div>
          </div>
          <button class='share' data-clipboard-text="https://play.google.com/store/apps/details?id=com.midnightlabs.tbhapp" @click="copySucess()">Invite my friends</button>
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
                idx: 0,
                toast: '',
                toastShow: false,
                toastLink: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_tick.png'
            }
        },
        methods: {
          getDiamonds() {
            let self = this;
            if(self.idx < 2) {
              http.get(`/users/me?userId=${self.userId}`).then(function(res){
                if(res.blueDiamonds) {
                  self.blueDiamonds = res.blueDiamonds;
                }
                if(res.redDiamonds) {
                  self.redDiamonds = res.redDiamonds;
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
            this.hosts = `http://${location.host}`;
            this.urlQuery = location.href.split('?')[1];
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
      background: #A341D3;
      height: 100vh;
      width: 100%;
      overflow: auto;
      padding: 16px 5.55555vw 0;
      box-sizing: border-box;
      color: #fff;
      border-top: 1px solid rgba(255,255,255,0.3);
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
      color: #E8009E;
      font-weight: 600;
    }
    .diamonds-content:first-child {
      float: left;
      color: #00B7D8;
    }
    .diamonds-pic {
      width: 86px;
      height: 79px;
      display: block;
      margin: 0 auto 16px;
    }
    .share {
      border: 2px solid #FFFFFF;
      border-radius: 8px;
      box-sizing: border-box;
      height: 55px;
      line-height: 51px;
      width: 77.77777vw;
      background: none;
      font-family: FiraSansCondensed-HeavyItalic;
      font-size: 26px;
      color: #FFFFFF;
      letter-spacing: 1.2px;
      font-style: italic;
    }
</style>