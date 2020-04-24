import axios from "../../src";

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/xsrf/get').then(res => {
  console.log(res)
})
