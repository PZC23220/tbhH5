<template>
    <div class="index">
        <div class="top">
            <a class="top-left" :href="hosts+'/index/index.html#/?'+urlQuery">Home</a>
            <div class="top-title">Add Friends</div>
            <!-- <a class="top-right" :href="hosts+'/index/index.html'">Share</a> -->
        </div>
        <div class='add-friends'>
          <input type='text' placeholder='Search your friends' class='search-friends' v-model="searchValue" @input="bindSearch()"></input>
          <div class='friends-list' v-if='!hasFriend'>
            <div class="haved-friends">
              <p class='friends-tips'>Recommended friends</p>
              <!-- 已关注列表 -->
             <div class='list-content' v-for="(friend,idx) in recommendations" v-if="idx < 2">
                <div class='friends-list-content'>
                  <img class="friend-avatar vertical-align" :src="friend.avatar?friend.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_girl.png'" v-if="friend.gender == 'F'">
                  <img class="friend-avatar vertical-align" :src="friend.avatar?friend.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_boy.png'" v-else>
                  <div class='friend-info vertical-align'>
                    <p class='friend-info-text friend-info-name'>{{friend.name}}</p>
                    <p class='friend-info-text friend-info-school'>{{friend.school}}</p>
                    <p class='friend-info-text friend-info-class'>Grade {{friend.grade}}，Class {{friend.clazz}}</p>
                  </div>
                  <img class="add-friends-icon" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_add copy.png" @click="bindFollow(friend.id,'Friends have been added!')">
                </div>
              </div>
            </div>
          </div>
          <div class='friends-list' v-else>
            <div class="haved-friends" v-if="displayNone">
              <p class='friends-tips'>My friends</p>
              <!-- 已关注列表 -->
              <div class='list-content' v-for="(friend,idx) in friendsList">
                <div class='friends-list-content'>
                  <img class="friend-avatar vertical-align" :src="friend.avatar?friend.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_girl.png'" v-if="friend.gender == 'F'">
                  <img class="friend-avatar vertical-align" :src="friend.avatar?friend.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_boy.png'" v-else>
                  <div class='friend-info vertical-align'>
                    <p class='friend-info-text friend-info-name'>{{friend.name}}</p>
                    <p class='friend-info-text friend-info-school'>{{friend.school}}</p>
                    <p class='friend-info-text friend-info-class'>Grade {{friend.grade}}，Class {{friend.clazz}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="noHaved-friends" v-else>
              <p class='friends-tips'>Add friends</p>
              <!-- 搜索已关注 -->
              <div class='list-content' v-for="(friend,idx) in following">
                <div class='friends-list-content'>
                  <img class="friend-avatar vertical-align" :src="friend.avatar?friend.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_girl.png'" v-if="friend.gender == 'F'">
                  <img class="friend-avatar vertical-align" :src="friend.avatar?friend.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_boy.png'" v-else>
                  <div class='friend-info vertical-align'>
                    <p class='friend-info-text friend-info-name'>{{friend.name}}</p>
                    <p class='friend-info-text friend-info-school'>{{friend.school}}</p>
                    <p class='friend-info-text friend-info-class'>Grade {{friend.grade}}，Class {{friend.clazz}}</p>
                  </div>
                  <img class="add-friends-icon" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_added copy.png" @click="bindFollow(friend.id,'Friends have been deleted!')">
                </div>
              </div>
              <!-- 搜索未关注 -->
              <div class='list-content' v-for="(friend,idx) in others">
                <div class='friends-list-content'>
                  <img class="friend-avatar vertical-align" :src="friend.avatar?friend.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_girl.png'" v-if="friend.gender == 'F'">
                  <img class="friend-avatar vertical-align" :src="friend.avatar?friend.avatar:'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_boy.png'" v-else>
                  <div class='friend-info vertical-align'>
                    <p class='friend-info-text friend-info-name'>{{friend.name}}</p>
                    <p class='friend-info-text friend-info-school'>{{friend.school}}</p>
                    <p class='friend-info-text friend-info-class'>Grade {{friend.grade}}，Class {{friend.clazz}}</p>
                  </div>
                  <img class="add-friends-icon" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_add copy.png" @click="bindFollow(friend.id,'Friends have been added!')">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="toast" :class="{'show':toastShow}"><span><img :src="toastLink"><br>{{toast}}</span></div>
    </div>
</template>

<style scoped>
    /* pages/friends/friends.wxss */
    .add-friends {
      background: #633aed;
      height: calc(100vh - 50px);
      width: 100%;
      overflow: auto;
      padding: 14px 0 0;
      box-sizing: border-box;
    }
    .search-friends {
      background: #FFFFFF;
      border-radius: 4px;
      display: block;
      margin: 0 5.55555vw;
      line-height: 44px;
      height: 44px;
      font-size: 16px;
      color: #8064CD;
      padding: 0 17px;
      width: 88.88888vw;
      box-sizing: border-box;
    }
    .search-friends-placeholder {
      color: #D1B4E0;
    }
    .no-friend {
      text-align: center;
      opacity: 0.5;
      font-size: 18px;
      color: #FFFFFF;
      line-height: 30px;
      margin-top: 76px;
    }
    .friends-list {
      margin-top: 25px;
    }
    .friends-tips {
      display: block;
      padding-left: 8.33333vw;
      opacity: 0.5;
      font-size: 16px;
      color: #FFFFFF;
      margin-bottom: 12px;
    }
    .list-content {
      position: relative;
      padding: 0 5.55555vw;
    }
    .friends-list-content {
      /*background: #FFFFFF;*/
      box-sizing: border-box;
      padding: 0 0 12px;
      margin-bottom: 10px;
      color: #fff;
      border-bottom: 1px solid #9287B1;
    }
    .friend-avatar {
      width: 16vw;
      height: 16vw;
      margin-right: 10px;
      border-radius: 50%;
      border: 2px solid #fff;
      box-sizing: border-box;
    }
    .friend-info {
      max-width: calc(72.88888vw - 20px);
    }
    .friend-info-text {
      display: block;
    }
    .friend-info-name {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .friend-info-school {
      font-size: 12px;
    }
    .friend-info-class {
      font-size: 12px;
    }
    .add-friends-icon {
      position: absolute;
      right: 5.55555vw;
      top: 50%;
      width: 8vw;
      height: 8vw;
      margin-top: -4vw;
    }
    .displayNone {
      display: none;
    }
</style>
<script>
  import http from '../../../js/http.js';
  require('../../../js/common.js')
  export default {
    data() {
      return {
          hosts: 'http://tbh.groupy.vip',
          userInfo: {},
          friendsList: [],
          recommendations: [],
          hasFriend: false,
          following: [],
          others: [],
          displayNone: true,
          searchValue: '',
          toast: '',
          toastShow: false,
          toastLink: 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_tick.png',
          userId: '',
          urlQuery: '',
          idx: 0
      }
    },
    methods: {
      getFriends: function() {
        let self = this;
        if(self.idx < 2) {
          http.get(`/users/friends?userId=${self.userId}`).then(function(res){
            if(res.friends.length > 0) {
              self.friendsList = res.friends;
              self.hasFriend = true;
            }else {
              self.friendsList = [];
              let arr = res.recommendations.sort(function(){ return 0.5 - Math.random(); }); 
              self.recommendations = arr;
              self.hasFriend = false;
            }
            
          }).catch(function(err){
              self.idx++;
          });
        }else {

        }
      },
      bindSearch: function() {
        var self = this;
        if (self.searchValue) {
          http.get(`/users/search?userId=${self.userId}&keyword=${self.searchValue}`).then(function (res) {
            if (res.following) {
                self.following = res.following;
                self.hasFriend = true;
                self.displayNone = false
            }else {
              self.following = [];
            }
            if (res.others) {
                self.others = res.others;
                self.hasFriend = true;
                self.displayNone = false
            }else {
              self.others = [];
            }
          })
        }else {
          if (self.friendsList.length > 0) {
              self.following = [];
              self.others = [];
              self.hasFriend = true;
              self.displayNone = true;
          }else {
              self.following = [];
              self.others = [];
              self.hasFriend = false;
              self.displayNone = true
          }
        }
      
      },
      bindFollow: function(id,toast) {
        var self = this;
        var newdata = {
          followingId: self.userId,
          followedId: id
        }
        http.post(`/users/follow`,newdata).then(function(res){
          if(res.id) {
            self.bindSearch();
            self.getFriends();
            self.toast = toast;
            self.toastLink = 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_tick.png';
            self.toastShow = true;
            setTimeout(function(){
              self.toast = '';
              self.toastShow = false;
            },1500)
          }else {
            self.toast = 'Sorry ！Network Error …';
            self.toastLink = 'http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/icon_error_1.png';
            self.toastShow = true;
            setTimeout(function(){
              self.toast = '';
              self.toastShow = false;
            },1500)
          }
        })
      }
    },
    mounted() {
    },
    created() {
        this.hosts = `http://${location.host}`;
        this.urlQuery = location.href.split('?')[1];
        this.userId = this.$route.query.userId;
        this.getFriends();
    }
  }
</script>