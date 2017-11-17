<template>
    <div class="index">
        <div class="top">
            <a class="top-left" :href="hosts+'/'+ pages +'/index.html#/?'+urlQuery">{{pages == 'index'? 'Home' : 'My Diamonds'}}</a>
            <div class="top-title">Play</div>
            <!-- <a class="top-right" :href="hosts+'/index/index.html'">Share</a> -->
        </div>
        <div class="play">
          <div class="questuins-cotainer">
            <img src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_girl.png" class="questions-nums" v-if="sender.gender == 'F'">
            <img src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_boy.png" class="questions-nums" v-else>
            <div class="questions-container-content">
              <div class="friends-diamonds"><img class="diamonds-pic-2 vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_3.png" v-if="sender?sender.gender=='M':'false'"><img class="diamonds-pic-2 vertical-align" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_diamond_4.png" v-if="sender?sender.gender=='F':'true'"><p class='friends-from vertical-align' v-if="sender">From a {{sender.gender == "F" ? 'girl' : 'boy'}} in {{changeClass(sender,receiver)}}</p></div>
              <div class='questions-title'>
                <p>{{question.content}}</p>
              </div>
              <div class='answers'>
                <div class="answers-one-div">
                  <p class='answers-one'>{{answersList}}</p>
                </div>
                <div class="answers-one-div">
                  <p class='answers-one active-else'>{{answersList}}<img src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_chosen.png" alt="" class='answers-one-chosen'></p>
                </div>
                <div class="answers-one-div">
                  <p class='answers-one'>{{answersList}}</p>
                </div>
                <div class="answers-one-div">
                  <p class='answers-one'>{{answersList}}</p>
                </div>
              </div>
              <div class='downloads' v-if="answersList.length <= 2">
                <h5>No friends here ?</h5>
                <button class="share" data-clipboard-text="https://play.google.com/store/apps/details?id=com.midnightlabs.thb" @click="shareTwitter()">Invite my friends</button>
              </div>
            </div>
          </div>
        </div>
        <a class="bottom" @click="shareTwitter()" >Share to Twitter</a>
        <div class="toast" :class="{'show':toastShow}"><span><img :src="toastLink"><br>{{toast}}</span></div>
        <div class="loading" :class="{'hide':loadingShow}"><img src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/loading.gif"></div>
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
                answersList:'',
                question:{},
                answerTap: true,
                activeColor: '#633aed',
                sender: {},
                receiver: {},
                userId: '',
                urlQuery: '',
                loadingShow: true,
                toast: '',
                toastShow: false,
                toastLink: 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_tick.png'
            }
        },
        methods: {
          shareTwitter() {
            let self = this;
            let str = JSON.stringify({
              title: self.question.content,
              desc: '',
              img: 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon.png',
              url:`${location.origin}/share/index.html#/question=${self.userId}`
            })
            window.tbhBridge.shareTbh(str)
          },
          changeClass(sender,receiver) {
            if(receiver.clazz == sender.clazz) {
              return `class ${sender.clazz}`;
            }else {
              return `class ${sender.grade}`;
            }
          },
          getQuestionsList() {
            let self = this;
            http.get(`/users/diamonds/${self.userId}`).then(function(res){
              console.log(res)
              self.loadingShow = true;
              if(res.question) {
                self.answersList = res.receiver.name;
                self.question = res.question;
                self.sender = res.sender;
                self.receiver = res.receiver;
              }
            });
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
          console.log(this.$route.query)
            this.hosts = `http://${location.host}`;
            this.userId = this.$route.query.question;
            this.pages = this.$route.query.html;
            this.urlQuery = `userId=${this.$route.query.userId}&did=${this.$route.query.did}`;
            this.getQuestionsList();
        }
    }
</script>

<style scoped>
    .play,.play-result {
      height: calc(100vh - 50px);
      width: 100%;
      overflow: auto;
      padding: 7.03125vh 5.55555vw 0;
      box-sizing: border-box;
      /*border-top: 1px solid rgba(255,255,255,0.3);*/
      text-align: center;
    }
    .questuins-cotainer {
      position: relative;
      padding-top: 8vw;
    }
    .questions-container-content {
      background: #fff;
      border-radius: 8px;
      padding-top: 8vw;
    }
    .questions-nums {
      border-radius: 50%;
      height: 16vw;
      width: 16vw;
      font-size: 12px;
      line-height: 16vw;
      color: #fff;
      position: absolute;left: 50%;top: 0;
      margin-left: -8vw;
      border:  1px solid #fff;
    }
    .current-num {
      font-size: 24px;
      font-weight: 600;
    }
    .questions-title {
      font-size: 20px;
      margin-bottom: 40px;
      color: #491CC6;
      padding-top: 20px;
      font-weight: 600;
      padding: 0 12px;
      box-sizing: border-box;
    }
    .answers {
      font-size: 20px;
      color: #A341D3;
      overflow: hidden;
    }
    .answers-one {
      opacity: 1;
      padding: 14px 12px;
      font-weight: 600;
      box-sizing: border-box;
      filter: blur(6px); 
    }
    .answers-one-div {
      border-top: 1px solid #E6DEFF;
    }
    .answers-one:last-child{
      border-bottom: 1px solid #E6DEFF;
      border-radius: 0 0 8px 8px;
    }
    .active {
      opacity: 1;
    }
    .active-else {
     filter: blur(0); 
     margin-left: 42px;
    }
    .questions-options {
      display: flex;
      position: absolute;
      bottom: 32px;
      width: 88.88888vw;
      font-size: 20px;
      color: #fff;
    }
    .options-button {
      flex: 1;
      background: none;
      border: none;
    }
    .options-image {
      width: 40px;
      height: 40px;
    }
    .play-result {
      padding: 69px 5.55555vw 0;
    }
    .result-image {
      width: 80px;
      height: 105px;
      display: block;
      margin: 0 auto;
    }
    .success-tips {
      font-size: 20px;
      margin-bottom: 48px;
      display: block;
      line-height: 34px;
      color: #fff;
    }
    .ok {
      border: 3px solid #FFFFFF;
      border-radius: 8px;
      font-family: FiraSansCondensed-HeavyItalic;
      font-size: 26px;
      background: none;
      color: #fff;
      width: 50vw;
      box-sizing: border-box;
      height: 55px;
      line-height: 49px;
      display: block;
      margin: 0 auto;
    }
    .friends-diamonds {
      border-top: none;
      padding: 3px 0 5px;
      margin-bottom: 10px;
      margin-top: 0;
    }
    .diamonds-pic-2 {
      width: 15px;
      margin-right: 7px;
    } 
    .friends-from {
      font-size: 12px;
      color: #8064CD;
    }
    .answers-one-chosen {
      width:  38px;
      vertical-align: middle;
      margin-left: 7px;
    }
</style>