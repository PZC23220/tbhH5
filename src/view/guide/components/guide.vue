<template>
    <div class="guide">
        <div class='welcome-tbh'>
            <p class='welcome'>Welcome to</p>
            <p class='tbh'>tbh</p>
        </div>
        <div class='guide-pic'>
            <img class="guide-pic-image-1" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_1.png">
            <img class="guide-pic-image-2" src="http://photoh5-us.oss-us-east-1.aliyuncs.com/tbh/pic_2.png">
             <p class='guide-pic-text guide-pic-text-1'>Answer polls
             about friends</p>
             <p class='guide-pic-text guide-pic-text-2'>Responses are
            anonymous</p>
        </div>
        <a class="play" :href="hosts+'/questions/index.html#/?'+urlQuery">Play Now !</a>
    </div>
</template>

<style scoped>
    .guide {
      background: #A341D3;
      height: 100vh;
      width: 100%;
      overflow: auto;
      padding: 18px 5.55555vw 0;
      box-sizing: border-box;
      color: #fff;
      text-align: center;
      border-top: 1px solid rgba(255,255,255,0.3);
    }
    .welcome {
      display: block;
      font-family: FiraSansCondensed-HeavyItalic;
      font-size: 23px;
    }
    .tbh {
      font-family: FiraSansCondensed-HeavyItalic;
      font-size: 44px;
      letter-spacing: 3.6px;
      line-height: 64px;
      display: block;
      margin-bottom: 50px;
    }
    .guide-pic {
      overflow: hidden;
    }
    .guide-pic-image-1 {
      width: 41.38888vw;
      height: 61.38888vw;
      float: left;
      margin-top: 1.38888vw;
    }
    .guide-pic-image-2 {
      width: 44.72222vw;
      height: 62.77777vw;
      float: right;
    }
    .guide-pic-text {
      display: block;
      font-size: 14px;
      letter-spacing: 0.4px;
      line-height: 17px;
      margin-top: 18px;
      margin-bottom: 30px;
    }
    .guide-pic-text-1 {
      width: 41.38888vw;
      float: left;
    }
    .guide-pic-text-2 {
      width: 44.72222vw;
      float: right;
    }
    .play {
      display: block;
      text-align: center;
       background: #FFAE30;
      border: 2px solid #FFFFFF;
      border-radius: 11px;
      width: 77.77777vw;
      margin: 20px auto;
      box-sizing: border-box;
      height: 52px;
      line-height: 48px;
      font-family: FiraSansCondensed-HeavyItalic;
      font-size: 26px;
      color: #FFFFFF;
      letter-spacing: 2px; 
    }
</style>
<script>
  import http from '../../../js/http.js';
  require('../../../js/common.js')
  export default {
    data() {
      return {
          hosts: 'http://tbh.groupy.vip',
          userId: '',
          urlQuery: ''
      }
    },
    methods: {
    },
    mounted() {
    },
    created() {
        this.hosts = `http://${location.host}`;
        this.urlQuery = location.href.split('?')[1];
        this.userId = this.$route.query.userId;
        localStorage.setItem('guide','guide');
        // var userinfo = localStorage.getItem('userinfo');
        // this.userinfo = JSON.parse(userinfo);
    }
  }
</script>