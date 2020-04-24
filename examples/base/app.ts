import axios from '../../src/index'
import { Terminal } from 'xterm/lib/xterm'

// window.onload = () => {
//   var term = new Terminal();
//   console.log(term, 'term...')
//   term.open(document.getElementById('terminal'));
//   // term.on('key', (key, ev) => {
//   //   console.log(key.charCodeAt(0));
//   //   if (key.charCodeAt(0) == 13)
//   //       term.write('\n');
//   //   term.write(key);
//   // });

//   term.textarea.onkeypress = function (e) {
//     console.log(e, 'textarea.onkeypress...')
//     term.write(String.fromCharCode(e.keyCode));
//   }

//   term.onKey((e) => {
//       let key = e.key;
//        console.log(key, key.charCodeAt(0));
//       if (key.charCodeAt(0) == 13) {
//         term.write('\n');
//         term.write(key);
//       }
//   })

//   term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
// }

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })


/* axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
}) */
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(typeof res.data, res)
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'Accept': 'application/json, text/plain, */*'
  },
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(typeof res.data)
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
}).then((res) => {
  console.log(typeof res.data)
})
