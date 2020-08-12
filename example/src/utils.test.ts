import { debounce } from './utils'

describe('debounce function', () => {
  it('only exec function once', () => {
    const mockFn = jest.fn()

    const debounced = debounce(mockFn, 100)

    function* executerFactory() {
      while (true) yield debounced()
    }

    const executer = executerFactory()

    let count = 0
    let pending = false

    while (count < 3) {
      if (pending) return
      pending = true
      setTimeout(() => {
        executer.next()
        count++
        pending = false
      }, 10)
    }

    expect(mockFn).toBeCalledTimes(0)
  })
})
