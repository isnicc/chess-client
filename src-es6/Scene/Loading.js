import cc, {director, TransitionSlideInR} from '@cc'
import BackgroundLayer from '../Common/Layer/Background'
import LoadLayer from '../Layer/Load'
import {uiPath} from '../utils/path'
import {preload} from '../utils/promise'
import LoginScene, {resources as loginResources} from './Login'
import globalResources from '../resources'
import {get} from '../utils/registry'

export const resources = {
  ...globalResources,
  loading: uiPath('Logo.png'),
}

export default cc.Scene.extend({
  ctor() {
    this._super()

    this.bgLayer = new BackgroundLayer(cc.color(255, 255, 255, 255))
    this.loadText = new cc.LabelTTF('正在加载...', 'Arial', 24)
    return true
  },
  onEnter() {
    this._super()

    this.logoLayer = new LoadLayer(resources.loading)

    let size = cc.winSize

    this.loadText.attr({
      x: size.width / 2,
      y: size.height / 2 - 200,
      color: cc.color(0, 0, 0, 0),
    })

    this.addChild(this.bgLayer)
    this.addChild(this.logoLayer)
    this.addChild(this.loadText)
  },
  onEnterTransitionDidFinish() {
    this._super()

    // this.scheduleOnce(() =>
    preload(Object.values(loginResources))
      .then(() =>
        director.runScene(new TransitionSlideInR(0.33, get('scene.login', () => new LoginScene)))
      )
    // , 0.0001)
  },
  onExitTransitionDidStart(){
    this._super()
  },
  onExit() {
    this._super()
  },
})
