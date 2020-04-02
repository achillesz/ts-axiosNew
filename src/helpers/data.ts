import { isObject, isPlanObject } from './util'

export function transformRequest(data: any): any {
  if (isPlanObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export function transformResponse(data: any): any {
  if (typeof data == 'string') {
    try {
      data = JSON.parse(data)
    } catch {}
  }

  return data
}
