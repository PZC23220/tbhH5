/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import guide from './components/guide.vue'
const routes =
    [
        {
            path: '/',
            component: guide,
        },{
            path: '/guide',
            component: guide
        }
    ];
export default routes;
