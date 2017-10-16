<template>
    <div class="index">
        <div class="top">
            <a class="top-left" :href="hosts+'/index/index.html#/?'+urlQuery">Home</a>
            <div class="top-title">Play</div>
            <!-- <a class="top-right" :href="hosts+'/index/index.html'">Share</a> -->
        </div>
        <div class="play" v-if="!answerComplete">
          <div class="questuins-cotainer">
            <div class='questions-nums'>
              <span class='current-num'>{{currentTopic}}</span>
              <span class='total-num'>／{{totalTopic}}</span>
            </div>
            <div class="questions-container-content">
              <div class='questions-title'>
                <p>{{question.content}}</p>
              </div>
              <div class='answers'>
                <p class='answers-one' :class='[{"active-else":(!answerTap?currentAnswer == idx: false)}]' v-for="(answer,idx) in answersList" @click="bindAnswer(idx,answer.id)">{{answer.name}}</p>
              </div>
              <div class='downloads' v-if="answersList.length <= 2">
                <h5>No friends here ?</h5>
                <button class="share" data-clipboard-text="https://play.google.com/store/apps/details?id=com.midnightlabs.tbhapp" @click="copySucess()">Invite my friends</button>
              </div>
            </div>
          </div>
          <div class='questions-options'>
            <div class='options-button' @click="bindSwitch()"><img class="options-image vertical-align" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_random copy.png" ><span class='options-image'>Shuffle</span></div>
            <div class='options-button' @click="bindFilter()"><img class="options-image vertical-align" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_next copy.png"><span class='options-image'>Skip</span></div>
          </div>
        </div>
        <!-- 问题结果 -->
        <div class='play-result' v-else>
          <div class='play-success' v-if='CompleteSuccess'>
            <img class="result-image" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/pic_ok copy.png">
            <p class='success-tips'>WOW！<br>You’ve finished the <br>questions !!!</p>
            <a class="ok" :href="hosts+'/index/index.html#/?'+urlQuery">OK ! </a>
          </div>
          <div class='play-success' v-else>
            <img class="result-image" src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/pic_error copy.png">
            <p class='success-tips'>Sorry ！<br>Network Error …</p>
            <button class='ok' bindtap='bindRefresh'>Refresh</button>
          </div>
        </div>
        <div class="toast" :class="{'show':toastShow}"><span><img :src="toastLink"><br>{{toast}}</span></div>
        <div class="loading" :class="{'hide':loadingShow}"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/loading.gif"></div>
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
                userinfo: {},
                questionsList:[],
                answersList:[],
                totalTopic: 0,
                currentTopic: 0,
                question:{},
                answerTap: true,
                // bgColor: [' #008AD0', '#F6A322', '#07B3AB','#D73884'],
                activeColor: '#633aed',
                colorIdx: 0,
                answerComplete: false,
                CompleteSuccess: true,
                userId: '',
                urlQuery: '',
                loadingShow: false,
                toast: '',
                toastShow: false,
                toastLink: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_tick.png'
            }
        },
        methods: {
          getQuestionsList() {
            let self = this;
            http.get(`/questions?userId=${self.userId}`).then(function(res){
              self.loadingShow = true;
              if(res[0].question) {
                self.answersList = res[0].answers;
                self.question = res[0].question;
                self.questionsList = res;
                self.totalTopic = res.length;
                self.currentTopic = 1;

              }else {

              }
            }).catch(function(){
                self.answerTap = true;
                self.currentAnswer = 4;
                self.answerComplete = true;
                self.CompleteSuccess = false;
            });
          },
          //点击答案
          bindAnswer(idx,ids) {
            var self = this;
            if(self.answerTap) {
                self.answerTap = false;
                self.currentAnswer = idx;
              var newdata = {
                questionId: self.question.id,
                answerId: ids,
                replierId: self.userId
              }
              http.post('/answers',newdata).then(function (res) {
                if (!res) {
                  if (self.currentTopic == self.totalTopic) {
                      self.answerTap = true;
                      self.currentAnswer = 4;
                      self.answerComplete = true;
                      self.CompleteSuccess = true;
                  } else {
                    var questionsList_ = self.questionsList[self.currentTopic];
                      self.answerTap = true;
                      self.currentAnswer = 4;
                      self.currentTopic = ++(self.currentTopic);
                      self.question = questionsList_.question;
                      self.answersList = questionsList_.answers;
                      self.colorIdx = ++(self.colorIdx);
                      // self.activeColor = self.bgColor[self.colorIdx]
                    if (self.colorIdx == 4) {
                        self.colorIdx = 0;
                    }
                  }
                } else {
                  self.answerTap = true;
                  self.currentAnswer = 4;
                  self.answerComplete = true;
                  self.CompleteSuccess = false;
                }
              }).catch(function(err){
                  self.answerTap = true;
                  self.currentAnswer = 4;
                  self.answerComplete = true;
                  self.CompleteSuccess = false;
              });
            }   
          },
          // 刷新列表
          bindRefresh() {
            var self = this;
            http.get('/questions?userId=' + self.userId).then(function (res) {
              if (res[0].question) {
                  self.answerTap = true;
                  self.currentAnswer = 4;
                  self.questionsList = res;
                  self.question = res[0].question;
                  self.totalTopic = res.length;
                  self.answersList = res[0].answers;
                  self.currentTopic = 1
              } else {
                  self.answerTap = true;
                  self.currentAnswer = 4;
                  self.answerComplete = true;
                  self.CompleteSuccess = false;
              }
            })
          },
          // 跳过题目
          bindFilter() {
            var self = this;
            if (self.currentTopic == self.totalTopic) {
                self.answerTap = true;
                self.currentAnswer = 4;
                self.answerComplete = true;
                self.CompleteSuccess = true;
                self.activeColor = '#A341D3';
            } else {
              var questionsList_ = self.questionsList[self.currentTopic]
                self.answerTap = true;
                self.currentAnswer = 4;
                self.currentTopic = ++(self.currentTopic);
                self.question = questionsList_.question;
                self.answersList = questionsList_.answers;
                self.colorIdx = ++(self.colorIdx);
                // self.activeColor = self.bgColor[self.colorIdx]
              if (self.colorIdx == 4) {
                  self.colorIdx = 0;
              }
            }
          },
          // 切换答案
          bindSwitch: function() {
            var self = this;
            http.get(`/questions/answers?userId=${self.userId}&questionId=${self.question.id}`).then(function(res){
              if(res.length>0) {
                  self.answersList = res;
                  console.log(self.answersList)
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
            this.userId = this.$route.query.userId;
            this.urlQuery = location.href.split('?')[1];
            this.getQuestionsList();
            var guide = localStorage.getItem('guide');
            if(!guide) {
              location.href = `${this.hosts}/guide/index.html?${this.urlQuery}`
            }
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
      background: #00A9FF;
      border-radius: 50%;
      height: 16vw;
      width: 16vw;
      font-size: 12px;
      line-height: 16vw;
      color: #fff;
      position: absolute;left: 50%;top: 0;
      margin-left: -8vw;
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
      border-top: 1px solid #E6DEFF;
      box-sizing: border-box;
    }
    .answers-one:last-child{
      border-bottom: 1px solid #E6DEFF;
      border-radius: 0 0 8px 8px;
    }
    .active {
      opacity: 1;
    }
    .active-else {
      opacity: 0.6;
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
</style>