import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'

import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'


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
      xsrfHeaderName
    } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if(timeout) {
      request.timeout = timeout;
    }

    if(withCredentials) {
      request.withCredentials = withCredentials;
    }

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


    request.open(method.toUpperCase(), url!, true)

    if((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
      const xsrfValue = cookie.read(xsrfCookieName)


      if(xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue
      }
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })


    if(cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason);
      })
    }
    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if(response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }
  })
}
