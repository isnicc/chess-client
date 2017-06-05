/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {Scene, winSize, LabelTTF, LayerColor, Sprite} from '@cc'
import {preload} from 'utils/loader'
import {audio} from 'src/resources'
import {init, playBg} from 'src/audio'
import {runScene} from 'utils/core'
import LoginScene from 'scenes/Login'
import {offsetCenter, callArray, bindClick} from 'utils/core'

const resources = {
  logo: 'res/ui/Logo.png',
}

const Class = Scene.extend({
  ctor() {
    this._super()

    this.bg = new LayerColor(cc.color(255, 255, 255, 255))
    this.loadText = new LabelTTF('正在加载...', 'Arial', 24)
    this.logo = new Sprite(resources.logo)

    this.loadText.setColor(cc.color(0, 0, 0, 0))
    offsetCenter(this.loadText, 0, -200)
    offsetCenter(this.logo)
    this.addChild(this.bg)
    this.addChild(this.logo)
    this.addChild(this.loadText)
  },

  async onEnter() {
    this._super()
    await preload(audio)
    init()
    playBg()
    this.scheduleOnce(() => runScene(LoginScene), 1.5)
  },
})

Class.resources = resources
Class.className = 'Hello'

export default Class