import 'es6-promise/auto'
import cc, {view, director, sys, TransitionFade, audioEngine} from '@cc'
import LoadingScene, {resources as loadingResources} from './Scene/Loading'
import {preload} from './utils/promise'
import HallScene, {resources as hallResources} from './Scene/Hall'

cc.game.onStart = () => {
  view.enableRetina(sys.os === sys.OS_IOS)
  view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT)
  view.adjustViewPort(true)
  view.setOrientation(cc.ORIENTATION_LANDSCAPE)

  preload(Object.values(loadingResources)
    // , percent => cc.log(percent)
  )
    .then(() => audioEngine.playMusic(loadingResources.audio_bg))
    .then(() => preload(Object.values(hallResources)))
    .then(() => director.runScene(new TransitionFade(0.33, new HallScene)))
}
