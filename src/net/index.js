import axios from 'axios'
export  function require(config){
    const ax =  axios.create({
        method:'get',
        // baseURL:"http://localhost:3000",
        baseURL:"https://autumnfish.cn/",
        timeout:5000,
    });
    return  ax(config)
}
