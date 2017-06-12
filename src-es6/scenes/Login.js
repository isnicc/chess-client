/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {Scene, LabelTTF, Sprite} from '@cc'
import {VERSION} from 'src/constances'
import {
  runScene,
  offsetCenter,
  offsetDownRight,
  bindClick,
} from 'utils/core'
import {canWechat as canWechatLogin} from 'utils/jsb'
import Checkbox from 'commons/Checkbox'
import Alert from 'commons/Alert'
import Loading from 'commons/Loading'
import {Button} from '@ccui'
import Hall from 'scenes/Hall'
import Semver from 'semver'
import {initialization, bindScene, getConnect} from 'src/socket'
import {getUser} from 'src/auth'
import HelloPacket from 'packets/Hello'
import LoginPacket from 'packets/Login'
import RegistPacket from 'packets/Regist'
import Packet from 'datastructs/Packet'
import {LOGIN, HELLO} from 'packets/receiver'
import {setUser} from 'src/auth'
import {mapButtons} from 'utils/resources'

const resources = {
  bg: 'res/ui/bg/login.png',
  ...mapButtons('ui/button/guestLogin', false),
  ...mapButtons('ui/button/wechatLogin', false),
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
      loginBtn = new Button(resources.wechatLogin, resources.wechatLogin_on)
      bindClick(loginBtn, () => runScene(Hall))
    } else {
      loginBtn = new Button(resources.guestLogin, resources.guestLogin_on)
      bindClick(loginBtn, () => {
        this.loading.setTitle('登录中').show()
        RegistPacket(getConnect())
      })
    }
    this.loginBtn = loginBtn
    loginBtn.setAnchorPoint(0, 0.5)
    offsetCenter(loginBtn, -10, -20)

    this.protocalCheckbox = new Checkbox(1, true)
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
  onWsOpen() {
    // 发送hello消息， 取得服务器主要配置[服务器要求版本号等等]
    HelloPacket(getConnect())
  },
  onWsClose() {
    this.alert.show('与服务器断开链接', '错误', false)
  },
  onWsError() {
    this.alert.show('无法连接服务器', '错误', false)
  },
  onWsMessage({data, target}) {
    let packet = new Packet(data)
    cc.log('接收', packet.toHexString())

    switch (packet.readHead()) {
      case HELLO:
        let reqVer = packet.readString()
        cc.log('比较版本号', VERSION, reqVer)
        if (!Semver.satisfies(VERSION, reqVer)) {
          this.alert.show('当前版本号太旧，请更新游戏', '错误', false)
        } else {
          let loginKey = getUser().login_key || 'hello'
          if (loginKey) {
            this.loading.setTitle('登陆中').show()
            LoginPacket(getConnect(), loginKey)
          }
        }
        break;
      case LOGIN:
        this.loading.hide()
        let loginStat = packet.readByte()
        cc.log('loginStat', loginStat)
        if (loginStat) {
          // 设置用户信息
          let id = packet.readUInt(),
            login_key = packet.readString(),
            nickname = packet.readString(),
            avatar = packet.readString(),
            diamond = packet.readUInt()
          setUser({
            id,
            login_key,
            nickname,
            avatar,
            diamond,
          })
          runScene(Hall)
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