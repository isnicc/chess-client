/**
 * Created by zhuangjianjia on 17-6-1.
 */
import cc, {sys} from '@cc'

const {localStorage} = sys

export const getItem = (k, d) => localStorage.getItem(k) || d

export const setItem = (k, v) => localStorage.setItem(k, v)

