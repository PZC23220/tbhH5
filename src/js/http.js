import axios from 'axios'
var baseURL;
if(location.host == 'tbh.midnightlabs.top:8060') {
	baseURL = 'https://wechat-tbh.midnightlabs.top/tbh';
}else {
	baseURL = 'https://wechat-tbh.midnightlabs.top/test/tbh';
}
var instance = axios.create({
	baseURL: baseURL,
    timeout: 8000
});
instance.interceptors.response.use(function(response){
        return response.data;
}, function(error){
    console.error('http请求失败', error);
    return error;
    // return Promise.reject(error);
});
instance.defaults.headers.common['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default instance;
