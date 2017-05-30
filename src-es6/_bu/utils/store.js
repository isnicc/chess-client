/**
 * Created by zhuangjianjia on 17-5-22.
 */
import cc, {sys} from '@cc'

const {localStorage}= sys

export const getItem = (k, d) => localStorage.getItem(k) || d

export const setItem = (k, v) => localStorage.setItem(k, v)

export const getBgVolumn = () => parseFloat(getItem('sys.bg.volume', 0.5))

export const setBgVolunm = v => setItem('sys.bg.volume', String(v))

export const getEffectVolumn = () => parseFloat(getItem('sys.effect.volume', 0.5))

export const setEffectVolunm = v => setItem('sys.effect.volume', String(v))
