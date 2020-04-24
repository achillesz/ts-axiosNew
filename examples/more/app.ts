import axios from '../../src/index'

document.cookie = 'a=b'
// 当前域下请求
axios.get('/more/get').then(res => {
  console.log(res)
})


// 8088
axios.post('http://127.0.0.1:8088/more/server2', {}, {
  withCredentials: true
}).then(res => {
  console.log(res)
})
