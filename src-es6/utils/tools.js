/**
 * Created by zhuangjianjia on 17/6/2.
 */

const permutation = arr => {
  let pArr = [], usedChars = []
  let m = arr => {
    for (let i = 0; i < arr.length; ++i) {
      let ch = arr.splice(i, 1)[0]
      usedChars.push(ch)
      if (arr.length === 0) {
        pArr.push(usedChars.slice())
      }
      m(arr)
      arr.splice(i, 0, ch)
      usedChars.pop()
    }
    return pArr
  }
  return m(arr)
}

export const bullSpecial = arr => {
  arr.sort((a, b) => a.getValue() > b.getValue())

  if (arr[1].getValue() === arr[2].getValue() && arr[2].getValue() === arr[3].getValue() && (arr[0].getValue() === arr[3].getValue() || arr[1].getValue() === arr[4].getValue())) {
    return 14
  }
  if (arr.every(v => v.getValue() < 5) && arr.reduce((v, v2) => v + v2.getValue(), 0) < 10) {
    return 13
  }
  if (arr[0].getValue() > 10) {
    return 12
  }
  if (arr[0].getValue() === 10 && arr[1].getValue() > 10) {
    return 11
  }
  return 0
}

export const bullNum = arr => {
  if (arr.slice(0, 3).reduce((v1, v2) => v1 + v2.getCmpValue(), 0) % 10 === 0) {
    let mod = arr.slice(3).reduce((v1, v2) => v1 + v2.getCmpValue(), 0) % 10
    if (mod === 0) {
      return 10
    } else {
      return mod
    }
  }
  return 0
}

export const bull = arr => {
  let num = bullNum(arr)
  let snum = bullSpecial(arr)
  if (snum > 10) return snum
  return num
}

export const bestBull = arr => {
  let num = bullSpecial(arr)
  if (num > 0) return [num, arr]

  let all = permutation(arr)
  let result = {}
  for (let each of all) {
    result[bullNum(each)] = each
  }
  for (let i = 10; i >= 0; --i) {
    if (result[i]) return [i, result[i]]
  }
  return [0, arr]
}