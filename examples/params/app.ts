


import axios from '../../src/index'
import qs from 'qs'

// 当前域下请求
axios.get('/params/get', {
  params: new URLSearchParams('a=b&c=d')
}).then(res => {
  console.log(res)
})

axios.get('/params/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
})


const instance = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets'
    })
  }
})

instance.get('/params/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then((res) => {
  console.log(res)
})



