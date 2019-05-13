// module.exports = function say() {
//     console.log('hello world,12345678');
// }

import axios from "axios";

export default {
    say(){
        console.log("123asd");
        axios.get("/index/test",{
            params:{
                name:"asjd"
            }
        }).then(res=>{
            console.log('res======',res);
        })
    },
    getData() {
        return new Promise((resolve, reject) => {
            resolve('ok');
        })
    }
}