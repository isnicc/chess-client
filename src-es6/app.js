import 'es6-promise/auto'
import cc, {view, sys, audioEngine, game} from '@cc'
import {runScene} from 'utils/core'
import {preload} from 'utils/loader'
import {ui} from 'src/resources'
import Hello from 'scenes/Hello'
import Login from 'scenes/Login'

import {Buffer} from 'safe-buffer'
window.Buffer = Buffer

import Packet from 'datastructs/Packet'
window.Packet = Packet

game.onStart = async() => {
  view.enableRetina(sys.os === sys.OS_IOS)
  view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT)
  view.adjustViewPort(true)
  view.setOrientation(cc.ORIENTATION_LANDSCAPE)

  let pauseTime = 0
  cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, () => {
    pauseTime = new Date().getTime()
  })
  cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, () => {
    if (new Date().getTime() - pauseTime > 60 * 1000) {
      if (cc.sys.isNative) {
        runScene(Login)
      } else {
        window.location.reload()
      }
    }
  })

  await preload(ui)

  // 载入Hello 场景
  await runScene(Hello)
}
