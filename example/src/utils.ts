/**
 * 防抖函数，指定的时间内只触发一次
 *
 * @param {Function} fn 需要执行的函数
 * @param {number} timeout 防抖的时间
 * @returns {Function}
 */
export const debounce = (fn: Function, timeout: number): Function => {
  let prevTime: number | undefined
  let timer: any

  const debouncedFn = (...args: any[]) => {
    const now = Date.now()

    if (!prevTime) {
      prevTime = now
    }

    if (!timer) {
      timer = setTimeout(fn, timeout)
    }

    if (now - prevTime < timeout) {
      // 未超时,清除之前的定时器,设置新的定时器
      clearTimeout(timer)
      timer = setTimeout(() => fn.apply(null, args), timeout)
    } else {
      clearTimeout(timer)
      timer = undefined
      prevTime = undefined
    }
  }

  return debouncedFn
}
