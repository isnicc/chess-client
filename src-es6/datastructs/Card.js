/**
 * Created by zhuangjianjia on 17/6/3.
 */

export default class Card {
  constructor(type) {
    this.type = type.replace(/\d+$/, '')
    this.value = type.replace(/^[a-z]+/, '')
  }

  toString() {
    return `${this.type}${this.value}`
  }

  getValue() {
    return parseInt(this.value)
  }

  getCmpValue() {
    return this.getValue() > 10 ? 10 : this.getValue()
  }
}