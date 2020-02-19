class LazyList {
  constructor(generator, length) {
    this[Symbol.iterator] = generator
    this.length = length
  }

  static integers() {
    return new LazyList(function* () {
      let i = 0
      while(true) {
        yield i++
      }
    }, Infinity)
  }

  static fromRange(start = 0, stop, step = 1) {
    return new LazyList(function* () {
      let i = start
      while(i < stop) {
        yield i
        i += step
      }
    }, (stop - start) / step)
  }

  take(n) {
    const iterator = this[Symbol.iterator]()
    let i = 0
    let current = iterator.next()

    return new LazyList(function* () {
      while(!current.done && i < n) {
        yield current.value
        current = iterator.next()
        i = i + 1
      }
    }, this.length > n ? n : this.length)
  }

  toArray() {
    return [...this]
  }
}

console.log(...LazyList.fromRange(0, 8, 10))
console.log(LazyList.fromRange(0, 8, 1).length)

class Option {
  static of(value) {
    return new Option(value)
  }

  map(f) {
    console.log(this.value)
    return this.value ? new Option(f(this.value)) : new None()
  }
}

class Some extends Option {
  constructor(value) {
    super()
    this.value = value
  }
}
class None extends Option {}

console.log(new Some(3).map(x => x * 2).map(x => x.toString()))
console.log(new Some(3))