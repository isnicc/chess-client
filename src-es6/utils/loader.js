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