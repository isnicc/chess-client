/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {Scene, LabelTTF, Sprite} from '@cc'
import {VERSION} from 'src/constances'
import {
  runScene,
  offsetCenter,
  offsetUpLeft,
  offsetUpRight,
  offsetDownRight,
  offsetDownLeft,
  offsetUp,
  offsetRight,
  offsetDown,
  offsetLeft,
  bindClick,
} from 'utils/core'
import {canWechat as canWechatLogin} from 'utils/jsb'
import Hello from 'scenes/Hello'
import Checkbox from 'commons/Checkbox'
import Alert from 'commons/Alert'
import Loading from 'commons/Loading'
import {Button} from '@ccui'
import Hall from 'scenes/Hall'
import Semver from 'semver'
import {initialization, bindScene} from 'src/socket'
import {getUser} from 'src/auth'
import HelloPacket from 'packets/Hello'
import LoginPacket from 'packets/Login'
import Packet from 'datastructs/Packet'

const resources = {
  bg: 'res/ui/bg/login.png',
  guest_login: 'res/ui/button/guestLogin.png',
  guest_login_on: 'res/ui/button/guestLogin_on.png',
  wechat_login: 'res/ui/button/wechatLogin.png',
  wechat_login_on: 'res/ui/button/wechatLogin_on.png',
}

const Class = Scene.extend({
  verify: false,

  ctor() {
    this._super()

    this.alert = new Alert(true)
    this.loading = new Loading

    this.versionLabel = new LabelTTF(`版本号:${VERSION}`, '', 30)
    offsetDownRight(this.versionLabel, 100, 40)

    this.bg = new Sprite(resources.bg)
    offsetCenter(this.bg)

    const canWechat = canWechatLogin()
    let loginBtn = null
    if (canWechat) {
      loginBtn = new Button(resources.wechat_login, resources.wechat_login_on)
    } else {
      loginBtn = new Button(resources.guest_login, resources.guest_login_on)
    }
    this.loginBtn = loginBtn
    loginBtn.setAnchorPoint(0, 0.5)
    offsetCenter(loginBtn, -10, -20)
    bindClick(loginBtn, () => runScene(Hall))

    this.protocalCheckbox = new Checkbox
    offsetCenter(this.protocalCheckbox, 20, -110)

    this.protocalLabel = new LabelTTF('同意用户使用协议', '', 30)
    this.protocalLabel.setAnchorPoint(0, 0.5)
    offsetCenter(this.protocalLabel, 50, -110)
    bindClick(this.protocalLabel, () => this.alert.show('1、aaa\n2、bbb', '用户协议'))

    this.addChild(this.bg)
    this.addChild(this.versionLabel)
    this.addChild(this.loginBtn)
    this.addChild(this.protocalCheckbox)
    this.addChild(this.protocalLabel)
    this.addChild(this.loading)
    this.addChild(this.alert)
  },
  onEnter() {
    this._super()

    bindScene(this)
  },
  onEnterTransitionDidFinish() {
    this._super()

    // 检测版本号
    if (!Semver.valid(VERSION)) {
      cc.error('错误的版本号')
      // 不合法的版本号，
      this.alert.show('当前版本号有错，请重新下载游戏', '错误', false)
    }

    this.loading.show()
    initialization()
  },
  onWsOpen({target}) {
    // 发送hello消息， 取得服务器主要配置[服务器要求版本号等等]
    HelloPacket(target)

    // let loginKey = getUser().login_key
    // if (loginKey) {
    //   cc.log('直接登录')
    // } else {
    //   this.loading.hide()
    // }
  },
  onWsMessage({data, target}) {
    let packet = new Packet(data)
    cc.log('接收', packet.toHexString())

    switch (packet.readHead()) {
      case 0x00:
        let reqVer = packet.readString()
        cc.log('比较版本号', VERSION, reqVer)
        if (!Semver.satisfies(VERSION, reqVer)) {
          this.alert.show('当前版本号太旧，请更新游戏', '错误', false)
        } else {
          let loginKey = getUser().login_key || 'hello'
          if (loginKey) {
            this.loading.setTitle('登陆中').show()
            LoginPacket(target, loginKey)
          }
        }
        break;
      default:
        cc.log('未处理封包')
    }
  },
})

Class.resources = resources
Class.className = 'Login'

export default Class