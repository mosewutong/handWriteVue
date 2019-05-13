// let util = require("./util.js");
// util();
import Vue from 'vue';
import uilt from "./util";
uilt.say();
console.log("main.js文件")

import "./style/main.less"

// vue实例化
let app = new Vue({
    'el':'#app',
    data:{
        message:"132456"
    },
    methods:{
        async fetchData() {
            const data = await uilt.getData();
            this.message = data;
        }
    },
    mounted(){
        this.fetchData();
    }
})

// let app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   }
// });