/**
 * Created by zhuangjianjia on 17/5/2.
 */
import cc, {
  director,
  TransitionSlideInR,
  MenuItemImage,
  Menu,
  Sprite,
  Scene,
  eventManager,
  EventListener,
} from '@cc'
import HallScene, {resources as HallResources} from './Hall'
import Loading from '../Common/Layer/Loading'
import Alert from '../Common/Layer/Alert'
import {uiPath} from '../utils/path'
import {
  canWechatLogin,
  bindClick,
  clickBling,
} from '../utils/core'
import {preload} from '../utils/promise'


export const resources = {
  bg: uiPath('bg/login.png'),
  guestLogin: uiPath('button/guestLogin.png'),
  guestLogin_on: uiPath('button/guestLogin.png'),
  wechatLogin: uiPath('button/wechatLogin.png'),
  wechatLogin_on: uiPath('button/wechatLogin.png'),
  protocal: uiPath('text/protocal.png'),
  checkbox: uiPath('button/checkbox.png'),
  checkbox_on: uiPath('button/checkbox_on.png'),
}

export default Scene.extend({
  ctor() {
    this._super()
    let size = cc.winSize
    let canWechat = canWechatLogin()

    this.bgSprite = new Sprite(resources.bg)
    this.bgSprite.attr({
      x: size.width / 2,
      y: size.height / 2,
    })

    let loginBtn = null
    if (canWechat) {
      loginBtn = new MenuItemImage(resources.wechatLogin, resources.wechatLogin_on, () => {
        clickBling()
        preload(Object.values(HallResources)).then(() =>
          director.runScene(new TransitionSlideInR(0.33, new HallScene))
        )
      }, this)
    } else {
      loginBtn = new MenuItemImage(resources.guestLogin, resources.guestLogin_on, () => {
        clickBling()
        preload(Object.values(HallResources)).then(() => {
            if (this.protocal_checkbox_val !== true) {
              this.alert.show('请同意用户使用协议')
              return
            }
            director.runScene(new TransitionSlideInR(0.33, new HallScene))
          }
        )
      }, this)
    }

    loginBtn.setPosition((size.width / 2) + 150, size.height / 2 - 20)

    this.menu = new Menu(loginBtn)
    this.menu.setPosition(0, 0)

    this.protocal = new Sprite(resources.protocal)
    this.protocal.setPosition((size.width / 2) + 150, size.height / 2 - 110)

    this.protocal_checkbox_val = true
    this.protocal_checkbox = new Sprite(resources.checkbox_on)
    this.protocal_checkbox.setPosition((size.width / 2) + 30, size.height / 2 - 110)

    let cb = () => {
      if (this.protocal_checkbox_val === true) {
        this.protocal_checkbox_val = false
        this.protocal_checkbox.setTexture(resources.checkbox)
        return
      }
      this.protocal_checkbox.setTexture(resources.checkbox_on)
      this.protocal_checkbox_val = true
    }
    bindClick(this.protocal, cb)
    bindClick(this.protocal_checkbox, cb)

    this.loading = new Loading
    this.alert = new Alert
    return true
  },
  onEnter() {
    this._super()

    this.addChild(this.bgSprite)
    this.addChild(this.menu)
    this.addChild(this.protocal)
    this.addChild(this.protocal_checkbox)
    this.addChild(this.loading)
    this.addChild(this.alert)
  },
  onEnterTransitionDidFinish() {
    this._super()

  },
  onExitTransitionDidStart(){
    this._super()

  },
  onExit() {
    this._super()

  },
})
