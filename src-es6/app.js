import 'es6-promise/auto'
import cc, {view, sys, audioEngine, game} from '@cc'
import {runScene} from 'utils/core'
import {preload} from 'utils/loader'
import {ui} from 'src/resources'
import Hello from 'scenes/Hello'
import NiuNiuRoom from 'scenes/NiuNiuRoom'

game.onStart = async() => {
  view.enableRetina(sys.os === sys.OS_IOS)
  view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT)
  view.adjustViewPort(true)
  view.setOrientation(cc.ORIENTATION_LANDSCAPE)

  await preload(ui)

  // 载入Hello 场景
  await runScene(Hello)
}
