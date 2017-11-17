/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import share from './components/share.vue'
const routes =
    [
        {
            path: '/',
            component: share,
        },{
            path: '/rule',
            component: share
        }
    ];
export default routes;
