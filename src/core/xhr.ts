import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'

import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'


export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownLoadProgress,
      onUpLoadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)

    configureRequest();
    addEvents()
    processHeaders()
    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if(timeout) {
        request.timeout = timeout;
      }

      if(withCredentials) {
        request.withCredentials = withCredentials;
      }
    }

    function addEvents():void {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }

        if(request.status === 0) {
          // 超时和网络错误都是这个
          return
        }

        const responseHeaders = request.getAllResponseHeaders()
        let responseData = responseType !== 'text' ? request.response : request.responseText

        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: parseHeaders(responseHeaders),
          config,
          request
        }

        handleResponse(response)
      }

      request.onerror = function handleError() {
        reject(createError('network error', config, null, request))
      }

      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }

      if(onDownLoadProgress) {
        request.onprogress = onDownLoadProgress
      }


      if(onUpLoadProgress) {
        request.upload.onprogress = onUpLoadProgress
      }
    }

    function processHeaders():void {
      // 上传请求数据类型如果是formData 我们应该删除headers 中的 content-type 字段， 让浏览器自动根据请求数据设置content-type
      if(isFormData(data)) {
        delete headers['Content-Type']
      }


      if((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)


        if(xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
      // https://www.runoob.com/jsref/met-win-btoa.html
      if(auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }


      Object.keys(headers).forEach(name => {
        if (data === null && name.toLocaleLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel():void {
      if(cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason);
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      // 默认是有的 但用户如果主动设置为空
      if(!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }
  })
}
