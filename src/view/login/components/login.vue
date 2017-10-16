<template>
    <div class="login">
        <div class="login-welcome"><b class="vertical-align">WELCOME</b></div>
        <div class="choose-avatar">
            <!-- <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/pic_boy.png" class="avatar-priview"> -->
            <!-- <image-inputer :onChange="imgChange" placeholder="选择图片"></image-inputer> -->
            <el-upload class="avatar-uploader avatar-priview-content" action="http://h3.groupy.cn:3000/api/fileupload" :show-file-list="false" :on-success="handleAvatar">
                <img :src="loginInfo.avatar" class="avatar-priview">
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
            <p class="choose-tips">Choose a photo</p>
        </div>
        <div class="input-content">
            <div class="inputs-title">
                <span class="inputs-title-2">name</span>
                <span class="inputs-title-2">gender</span>
            </div>
            <div class="input-enter">
                <input type="text" name="" class="inputs-title-2" v-model="loginInfo.name">
                <div class="select-content">
                    <img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_pull.png">
                    <select class="inputs-title-2 select" v-model="loginInfo.gender">
                        <option value="M">Boy</option>
                        <option value="F">Gril</option>
                    </select>
                </div>
            </div>
        </div>
        <!-- <div class="input-content">
            <div class="inputs-title">
                <span class="inputs-title-3">province</span>
                <span class="inputs-title-3">city</span>
                <span class="inputs-title-3">county</span>
            </div>
            <div class="input-enter">
                <input type="text" name="" class="inputs-title-3" v-model="loginInfo.province">
                <input type="text" name="" class="inputs-title-3" v-model="loginInfo.city">
                <input type="text" name="" class="inputs-title-3" v-model="loginInfo.county">
            </div>
        </div> -->
        <div class="input-content">
            <div class="inputs-title">
                <span class="inputs-title-1">school</span>
            </div>
            <div class="input-enter">
                <input type="text" name="" class="inputs-title-1" v-model="loginInfo.school">
            </div>
        </div>
        <div class="input-content">
            <div class="inputs-title">
                <span class="inputs-title-2">grade</span>
                <span class="inputs-title-2">class</span>
            </div>
            <div class="input-enter">
                <input type="number" name="" class="inputs-title-2" v-model="loginInfo.grade">
                <input type="number" name="" class="inputs-title-2" v-model="loginInfo.clazz">
            </div>
        </div>
        <div class="login-ok" @click="loginUser()">OK</div>
        <div class="toast" :class="{'show':toastShow}"><span><img :src="toastLink"><br>{{toast}}</span></div>
        <div class="loading" :class="{'hide':loadingShow}"><img src="http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/loading.gif"></div>
    </div>
</template>

<style lang="scss" scoped>
    .login {
        width: 100vw;
        height: 100vh;
        overflow: auto;
        box-sizing: border-box;
        padding: 0 5.55555vw;
        background: #633aed; 
    }
    .login-welcome {
        margin-top: 14px;
        margin-bottom: 14px;
        color: #fff;
        font-family: 'FiraSansCondensed-HeavyItalic'; 
        font-size: 23px;
        text-align: center;
        b {
            font-size: 30px;
            letter-spacing: 3.6px;
            margin-left: 11px;
        }
        b,span {
            line-height: 64px;
        }
    }
    .choose-avatar {
        text-align: center;
        color: #fff;
        font-size: 16px;
        margin-bottom: 15px;
    }
    .avatar-priview-content {
        width: 21.33333vw;
        height: 21.33333vw;
        border-radius: 50%;
        margin: 0 auto;
    }
    .avatar-priview {
        width: 21.33333vw;
        height: 21.33333vw;
        border-radius: 50%;
    }
    .input-content {
        margin-bottom: 23px;
        span,input {
            float: left;
            box-sizing: border-box;
        }
        input,.select {
            height: 44px;
            line-height: 44px;
            font-size: 16px;
            color: #222222;
            border-radius: 8px;
            background: #fff;
            border: none;
            padding-left: 8px;
        }
    }
    .select-content {
        width: 33.33333vw;float: left;
        position: relative;
        img {
            position: absolute;
            right: 8px;
            width: 16px;
            top: 15px;
        }
    }
    .inputs-title {
        color: #fff;
        font-size: 18px;
        overflow: hidden;
        margin-bottom: 3px;
    }
    .input-enter {
        overflow: hidden;
    }
    .inputs-title-2:first-child {
        width: 50vw;
        margin-right: 2.77777vw;
    }
    .inputs-title-2:last-child {
        width: 33.33333vw;
    }
    .inputs-title-3 {
        width: 27.77777vw;
    }
    .inputs-title-3:not(:last-child) {
        margin-right: 1.38888vw;
    }
    .inputs-title-1 {
        width: 86.11111vw;
    }
    .login-ok {
        width: 83vw;
        border: 1px solid #FFFFFF;
        border-radius: 8px;
        margin: 31px auto 0;
        height: 55px;
        line-height: 55px;
        text-align: center;
        color: #fff;
        font-size: 28px;
        font-family: 'FiraSansCondensed-HeavyItalic'; 
        letter-spacing: 2.6px;
        background: #00A9FF;
    }
</style>
<script>
    import ImageInputer from '../../../components/ImageUploader.vue'
    import http from '../../../js/http.js';
    require('../../../js/common.js')
    export default {
        data() {
            return {
                hosts: 'http://tbh.groupy.vip',
                loginInfo: {
                    name: '',
                    gender: 'M',
                    province: '',
                    city: '',
                    county: '',
                    school: '',
                    grade: '',
                    clazz: '',
                    snsId: '',
                    avatar: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/pic_boy.png'
                },
                toast: '',
                toastShow: false,
                canLogin: true,
                loadingShow: true,
                toastShow: false,
                toastLink: 'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_tick.png'
            }
        },
        components: {
          ImageInputer
        },
        methods: {
           handleAvatar(res, file) {
              this.loginInfo.avatar = res.url;
           },
          loginUser() {
            let self = this;
            if(self.loginInfo.name  && self.loginInfo.school && self.loginInfo.grade && self.loginInfo.clazz && self.canLogin) {
                self.canLogin = false;
                self.loadingShow = true;
                http.post('/users',self.loginInfo).then(function(res){
                    self.canLogin = true;
                    self.loadingShow = false;
                    if(res.id) {
                        location.href = `http://${location.host}/index/index.html#/?userId=${res.id}&did=${res.snsId}`
                    }else {
                        self.toast = 'Sorry ！Network Error …';
                        self.toastLink = 'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_error_1.png';
                        self.toastShow = true;
                        setTimeout(function(){
                            self.toast = '';
                            self.toastShow = false;
                        },1500)
                    }
                }).catch(function(){
                    self.canLogin = true;
                    self.toast = 'Sorry ！Network Error …';
                    self.toastShow = true;
                    setTimeout(function(){
                        self.toast = '';
                        self.toastShow = false;
                    },1500)
                });
            }else {
                self.toast = 'Please improve the information！';
                self.toastLink = 'http://photodebug.oss-cn-hongkong.aliyuncs.com/tbh/icon_alert.png';
                self.toastShow = true;
                setTimeout(function(){
                    self.toast = '';
                    self.toastShow = false;
                },1500)
            }
          }
        },
        mounted() {
        },
        created() {
            this.hosts = `http://${location.host}`;
            this.loginInfo.snsId = this.$route.query.did;
        }
    }
</script>