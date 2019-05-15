// let util = require("./util.js");
// util();
import Vue from 'vue';
import App from "./app.vue";
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

import router  from "./router.js";

// import uilt from "./util";
// uilt.say();
// console.log("main.js文件")

import "./style/main.less"
import 'babel-polyfill';

// vue实例化
// let app = new Vue({
//     'el':'#app',
//     data:{
//         message:"132456"
//     },
//     methods:{
//         async fetchData() {
//             const data = await uilt.getData();
//             this.message = data;
//         }
//     },
//     mounted(){
//         this.fetchData();
//     }
// })

let app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});