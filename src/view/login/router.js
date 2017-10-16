/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import login from './components/login.vue'
const routes =
    [
        {
            path: '/',
            component: login,
        },{
            path: '/rule',
            component: login
        }
    ];
export default routes;
