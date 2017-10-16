/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import diamonds from './components/diamonds.vue'
const routes =
    [
        {
            path: '/',
            component: diamonds,
        },{
            path: '/rule',
            component: diamonds
        }
    ];
export default routes;
