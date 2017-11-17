/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import detail from './components/detail.vue'
const routes =
    [
        {
            path: '/',
            component: detail,
        },{
            path: '/rule',
            component: detail
        }
    ];
export default routes;
