/**
 * Created by zhuangjianjia on 17/5/29.
 */

import  cc, {
  loader,
} from '@cc'

export const preload = (resources, ProgressCallback) => new Promise((resolve, reject) =>
  loader.load(resources, (result, count, loadedCount) =>
  ProgressCallback && ProgressCallback((++loadedCount / count * 100) | 0), () =>
    resolve()))