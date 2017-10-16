/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import friends from './components/friends.vue'
const routes =
    [
        {
            path: '/',
            component: friends,
        },{
            path: '/friends',
            component: friends
        }
    ];
export default routes;
