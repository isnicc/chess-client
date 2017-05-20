/**
 * Created by zhuangjianjia on 17/4/30.
 */
import cc from '@cc'

const localStorage = cc.sys.localStorage

export const set = (key, val) => localStorage.setItem(key, val)

export const get = key => localStorage.getItem(key)
