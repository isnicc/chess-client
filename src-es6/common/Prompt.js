/**
 * Created by zhuangjianjia on 17-6-1.
 */
import cc, {
  Layer
} from '@cc'

export const TYPE_MD = 'md'
export const TYPE_LG = 'lg'
export const TYPE_SM = 'sm'

export default class Prompt extends layer {
  constructor(type = TYPE_MD) {
    super()
  }
}