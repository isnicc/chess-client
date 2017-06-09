/**
 * Created by zhuangjianjia on 17/5/29.
 */
import  cc, {loader} from '@cc'

export const preload = (resources, ProgressCallback) => new Promise((resolve, reject) => {
  if (resources instanceof Array === false) resources = Object.values(resources)
  return loader.load(resources, (result, count, loadedCount) =>
  ProgressCallback && ProgressCallback((++loadedCount / count * 100) | 0), () =>
    resolve())
})

export const loadImg = url => new Promise((resolve, reject) => loader.loadImg(url, {isCrossOrigin: true}, (err, img) => err ? reject(err) : resolve((img => {
    if (cc.sys.isNative) return img
    let t2d = new cc.Texture2D
    t2d.initWithElement(img)
    t2d.handleLoadedTexture()
    return t2d
  })(img))))

export const loadText = url => new Promise((resolve, reject) => loader.loadTxt(url, (err, text) => err ? reject(err) : resolve(text)))