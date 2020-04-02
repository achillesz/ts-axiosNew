const toString = Object.prototype.toString

export function isDate(val: any): val is object {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object'
}

export function isPlanObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
