import LoginLayer from '../Layer/Login'
import ModelLayer from '../Common/Layer/ModelLayer'
import cc from '@cc'
import {getConnection, isConnect, send, register, unregister, tryConnect} from '../socket'
import {set, get} from '../store'
import {httpGet} from '../http'
import {decode} from '../Common/authcode'

export default cc.Scene.extend({
  login_id: null,
  login_key: null,
  modelLayer: null,
  loginLayer: null,
  ctor() {
    this._super()

    this.modelLayer = new ModelLayer()
    this.loginLayer = new LoginLayer()

    this.addChild(this.loginLayer)
    this.addChild(this.modelLayer)
  },
  onEnter() {
    this._super()

    this.modelLayer.show('Loading')
    this.modelLayer.hide()
    // register(this) // 绑定ws事件到当前对象
  },
  onEnterTransitionDidFinish() {
    this._super()
    set('login_key', 'bc01a02a-daa5-43e1-b887-2daf997b446e')
    let login_key = get('login_key')
    if (login_key) {
      cc.log('login_key', login_key)
      httpGet(`/auth.php?login_key=${login_key}`).then(r => {
        this.loginAction(r.data)
      }).catch(e => {
        cc.log('httpGET Exception', e)
        this.modelLayer.show('连接服务器失败')
      })
    }
  },
  onExit() {
    this._super()

    unregister(this)
  },
  onWsOpen(e) {
    // this.modelLayer.hide()
  },
  onWsError(e) {
    this.modelLayer.shutdownAction()
    this.modelLayer.setText('连接服务器失败')
  },
  loginAction(user){
    // user解密
    user.login_key = decode(user.login_key, String(user.id))
    cc.log('获得用户key', user)
    this.modelLayer.show('登陆中...')
    register(this)
    tryConnect()
  },
})
