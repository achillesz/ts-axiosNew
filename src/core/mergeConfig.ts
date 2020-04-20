import { AxiosRequestConfig } from '../types'
import { isPlanObject, deepMerge } from '../helpers/util';


const strategy = Object.create(null);

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1;
}

function fromVal2Strategy(val1: any, val2: any): any {
  if(typeof val2 !== 'undefined') {
    return val2;
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if(isPlanObject(val2)) {
    return deepMerge(val1, val2)
  }  else if(typeof val2 !== 'undefined') {
    return val2;
  } else if(isPlanObject(val1)) {
    return deepMerge(val1)
  } else if(typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2:string[] = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strategy[key] = fromVal2Strategy
})

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strategy[key] = deepMergeStrat
})

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
  if(!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for(let key in config2) {
    mergeField(key)
  }

  for(let key in config1) {
    if(!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strategy[key] || defaultStrategy

    config[key] = strat(config1[key], config2![key])
  }

  return config;

}
