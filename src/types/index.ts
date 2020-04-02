export type Method = 'get' | 'GET' | 'delete' | 'Delete' | 'head' | 'HEAD' | 'options' | 'OPTIONS' |  'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH'

export interface AxiosRequestConfig { // 参数类型
  url: string,
  method?: Method,
  data?: any,
  params?: any,
  headers?: any
  responseType?: XMLHttpRequestResponseType //
  timeout?: number
}

export interface AxiosResponse { // 响应数据类型
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosErrors extends Error {
  isAxiosError: boolean,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
}

export interface AxiosPromise extends Promise<AxiosResponse> {}


