/**
 * Created by zhuangjianjia on 17/5/29.
 */
import  cc, {loader} from '@cc'
import axios from 'axios'

export const preload = (resources, ProgressCallback) => new Promise((resolve, reject) => {
  if (resources instanceof Array === false) resources = Object.values(resources)
  return loader.load(resources, (result, count, loadedCount) =>
  ProgressCallback && ProgressCallback((++loadedCount / count * 100) | 0), () =>
    resolve())
})

export const loadImg2 = url => new Promise((resolve, reject) => cc.textureCache.addImageAsync(url, texture => {
  if (texture instanceof cc.Texture2D) {
    resolve(texture)
  } else {
    reject('加载图片失败')
  }
}))

export const loadImg = url => new Promise((resolve, reject) => {
  loader.loadImg(url, {isCrossOrigin: false,}, (err, img) => {
    if (img instanceof cc.Texture2D) {
      resolve(img)
    } else if (img) {
      let t2d = new cc.Texture2D
      t2d.initWithElement(img)
      t2d.handleLoadedTexture()
      resolve(t2d)
    } else {
      reject(err)
    }
  })
})

// export const loadImg = url => new Promise((resolve, reject) => loader.loadImg(url, {isCrossOrigin: true}, (err, img) => err ? reject(err) : resolve((img => {
//     if (img instanceof cc.Texture2D) {
//       return img
//     }
//     let t2d = new cc.Texture2D
//     t2d.initWithElement(img)
//     t2d.handleLoadedTexture()
//     return t2d
//   })(img))))

export const loadText = url => axios.get(url, {responseType: 'text',}).then(r => r.data)
