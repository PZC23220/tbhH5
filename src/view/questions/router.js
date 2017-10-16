/**
 * Created by yaoze on 2016/9/26.
 */

// 组件只有import之后才能使用
import questions from './components/questions.vue'
const routes =
    [
        {
            path: '/',
            component: questions,
        },{
            path: '/rule',
            component: questions
        }
    ];
export default routes;
