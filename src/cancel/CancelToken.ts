import { CancelExcutor, CancelTokenSource, Canceler } from "../types"
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(executor: CancelExcutor) {
    let resolvePromise: ResolvePromise;

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve;
    })

    executor(message => {
      if(this.reason) {
        return;
      }
      this.reason = new Cancel(message);
      resolvePromise(this.reason)
    })
  }

  throwIfRequested() {
    if(this.reason) {
      throw this.reason
    }
  }

  static source():CancelTokenSource {
    let cancel!: Canceler // 断言有值
    const token = new CancelToken(c => {
      // 赋值在函数内 外部检测不到 会报错
      cancel = c
    })

    return {
      cancel,
      token
    }
  }
}
