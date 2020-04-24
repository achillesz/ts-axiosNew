import axios, { AxiosTransformer } from '../../src/index'
import { AxiosError } from '../../src/helpers/error';
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123;

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }), // post 请求 默认为headers 添加content-type
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })

// axios({
//   transformRequest: [(function(data) {
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResopnse: [
//     ...(axios.defaults.transformResopnse as AxiosTransformer[]),
//     (function(data) {
//     if(typeof data === 'object') {
//       data.b = 2;
//     }
//     return data;
//   })],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }, // post 请求 默认为headers 添加content-type
//   headers: {
//     test: '321'
//   }
// }).then((res) => {
//   console.log(res.data)
// })

const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResopnse: [
    ...(axios.defaults.transformResopnse as AxiosTransformer[]),
    (function(data) {
    if(typeof data === 'object') {
      data.b = 2;
    }
    return data;
  })]
})

instance({
  url: '/config/post',
  method: 'post',
  data:  {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})







