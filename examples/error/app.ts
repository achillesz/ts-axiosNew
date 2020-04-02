import axios from '../../src/index'

axios({
  url: '/error/get1',
  method: 'GET'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
}) // 404

axios({
  url: '/error/get',
  method: 'GET'
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

setTimeout(() => {
  axios({
    url: '/error/get',
    method: 'GET'
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 5000)

axios({
  url: '/error/timeout',
  method: 'GET',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e.message)
})
