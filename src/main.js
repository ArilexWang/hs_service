import Vue from 'vue'
import App from './App.vue'
import cloudbase from '@cloudbase/js-sdk'
import router from "./router";

Vue.config.productionTip = false
const app = cloudbase.init({
  env: 'test-7ggypkpn0dd471ba',
  // env: 'props-5gyd9ji1143b3cf0',
})
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
if (loginState && loginState.isAnonymousAuth) {
  console.log('haslogin', app.auth().hasLoginState())
  auth.signOut().then(() => {
    console.log("sign out")
  })
} else {
  console.log('has not login')
}

router.beforeEach(async (to, from, next) => {
  console.log("to", to)
  if (loginState && loginState.isAnonymousAuth) {
      // if (to.path === '/login') {
      //     next({ path: '/' })
      // } else {
      //     try {
      //         // 这里可以用 await 配合请求后台数据来生成路由
      //         // const data = await axios.get('xxx')
      //         // const routes = createRoutes(data)
      //         // const routes = createRoutes(store.state.menuItems)
      //         // 动态添加路由
      //         // router.addRoutes(routes)
      //         // hasMenus = true
      //         next({ path: to.path || '/' })
      //     } catch (error) {
      //         // resetTokenAndClearUser()
      //         next(`/login?redirect=${to.path}`)
      //     }
      // }
  } else {
    if(to.path === '/login') {
      next()
    }
      // if (to.path === '/login') {
      //     next()
      // } else {
      //     console.log('abcd')
      //     next(`/login?redirect=${to.path}`)
      // }
  }
})

const vue = new Vue({
  el: '#app',
  router,
  render: h => h(App),
})

export default vue