/**
 * Created by zhuangjianjia on 17/6/5.
 */
import {sys} from '@cc'

export const canWechat = () => {
  if (sys.platform === sys.IPHONE || sys.platform === sys.IPAD || sys.platform === sys.ANDROID) {
    return true
  }
  return false
}
