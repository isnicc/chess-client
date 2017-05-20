/**
 * Created by zhuangjianjia on 17/5/2.
 */
import {loader} from '@cc'

export const preload = (resources, ProgressCallback) => new Promise((resolve, reject) =>
  loader.load(resources, (result, count, loadedCount) =>
  ProgressCallback && ProgressCallback((++loadedCount / count * 100) | 0), () =>
    resolve()))

export const loadBinary = url => new Promise((resolve, reject) =>
  loader.loadBinary(url, (err, binary) => {
    if (err) reject(err)
    else resolve(binary)
  }))

export const loadJson = url => new Promise((resolve, reject) =>
  loader.loadJson(url, (err, json) => {
    if (err) reject(err)
    else resolve(json)
  }))

export const loadImg = (url, option = {isCrossOrigin: true}) => new Promise((resolve, reject) =>
  loader.loadImg(url, option, (err, img) => {
    if (err) reject(err)
    else resolve(img)
  }))

export const loadText = url => new Promise((resolve, reject) =>
  loader.loadTxt(url, (err, txt) => {
    if (err) reject(err)
    else resolve(txt)
  }))
