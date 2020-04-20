import axios from '../../src/index'
import { AxiosError } from '../../src/helpers/error';
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123;

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }), // post 请求 默认为headers 添加content-type
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})






