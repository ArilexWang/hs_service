import Vue from 'vue'
import App from './App.vue'
import cloudbase from '@cloudbase/js-sdk'
import router from "./router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import createRoutes  from '@/utils/createRoutes'
import store from './store'


Vue.config.productionTip = false
Vue.use(Antd);

const app = cloudbase.init({
  env: 'test-7ggypkpn0dd471ba',
  // env: 'props-5gyd9ji1143b3cf0',
})
Vue.prototype.$app = app
// app.auth()
//     .anonymousAuthProvider()
//     .signIn()
//     .then(() => {
//         alert("登录云开发成功！");
//     });

const auth = app.auth({
  persistence: "local"
})

const loginState = auth.hasLoginState()
if (loginState) {
  console.log('haslogin', app.auth().hasLoginState())
} else {
  console.log('has not login',app.auth().hasLoginState())
}

router.beforeEach(async (to, from, next) => {
  if (loginState) {
    if(to.path === 'login'){
      next({ path: '/' })
    } else {
      const routes = createRoutes(store.state.menuItems)
      console.log(routes)
      router.addRoutes(routes)
      next()
      // next({ path: to.path || '/' })
    }
      // if (to.path === '/login') {
      //     next({ path: '/' })
      // } else {
      //     try {
      //         // 这里可以用 await 配合请求后台数据来生成路由
      //         // const data = await axios.get('xxx')
      //         // const routes = createRoutes(data)
      //         // 动态添加路由
      //         // hasMenus = true
              // next({ path: to.path || '/' })
      //     } catch (error) {
      //         // resetTokenAndClearUser()
      //         next(`/login?redirect=${to.path}`)
      //     }
      // }
  } else {
      if (to.path === '/login') {
          next()
      } else {
          console.log('abcd')
          next(`/login?redirect=${to.path}`)
      }
  }
})

const vue = new Vue({
  el: '#app',
  router,
  render: h => h(App),
})

export default vue