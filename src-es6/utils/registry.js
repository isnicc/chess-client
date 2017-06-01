/**
 * Created by zhuangjianjia on 17-6-1.
 */
const tree = {}

export const set = (k, v) => tree[k] = v

export const get = (k, d = null) => tree[k] || (d instanceof Function ? d() : d)