


import axios from '../../src/index'


const instance = axios.create({
  baseUrl: 'https://gss0.bdstatic.com'
})

instance.get('/94o3dSag_xI4khGkpoWK1HF6hhy/baike/pic/item/503d269759ee3d6d3d710c184d166d224e4adeaa.jpg').then((res) => {
  console.log(res)
})

instance.get('https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/pic/item/503d269759ee3d6d3d710c184d166d224e4adeaa.jpg');



