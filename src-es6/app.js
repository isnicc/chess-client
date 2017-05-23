import 'es6-promise/auto'
import cc, {view, director, sys, TransitionFade, audioEngine} from '@cc'
import LoadingScene, {resources as loadingResources} from './Scene/Loading'
import {preload} from './utils/promise'
import {getBgVolumn, getEffectVolumn,} from './utils/store'
import HallScene, {resources as hallResources} from './Scene/Hall'
import _13ShuiRoom, {resources as _13shuiRoomResources} from './Scene/13ShuiRoom'
import {get} from './utils/registry'

cc.game.onStart = () => {
  view.enableRetina(sys.os === sys.OS_IOS)
  view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT)
  view.adjustViewPort(true)
  view.setOrientation(cc.ORIENTATION_LANDSCAPE)

  preload(Object.values(loadingResources))
    .then(() => {
      audioEngine.setMusicVolume(getBgVolumn())
      audioEngine.setEffectsVolume(getEffectVolumn())
      audioEngine.playMusic(loadingResources.audio_bg, true)
    })
    .then(() => preload(Object.values(_13shuiRoomResources)))
    .then(() => director.runScene(new TransitionFade(0.33, get('scene.hall', () => new _13ShuiRoom))))
}
