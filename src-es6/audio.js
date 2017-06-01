/**
 * Created by zhuangjianjia on 17-6-1.
 */
import {audioEngine} from '@cc'
import {getItem, setItem} from 'utils/store'
import {audio} from 'src/resources'

export const getBgVolumn = () => parseFloat(getItem('sys.bg.volume', 0.5))

export const setBgVolunm = v => setItem('sys.bg.volume', String(v))

export const getEffectVolumn = () => parseFloat(getItem('sys.effect.volume', 0.5))

export const setEffectVolunm = v => setItem('sys.effect.volume', String(v))

export const init = () => {
  audioEngine.setMusicVolume(getBgVolumn())
  audioEngine.setEffectsVolume(getEffectVolumn())
}

export const playBg = () => {
  audioEngine.playMusic(audio.bg, true)
}

export const playBling = () => {
  audioEngine.playEffect(audio.click)
}