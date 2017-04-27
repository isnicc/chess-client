import LoginLayer from '../Layer/Login'
import ModelLayer from '../Common/Layer/ModelLayer'
import cc from '@cc'
import {getConnection, isConnect, send, register, unregister, tryConnect} from '../socket'

export default cc.Scene.extend({
  modelLayer: null,
  loginLayer: null,
  ctor() {
    this._super()

    this.modelLayer = new ModelLayer()
    this.loginLayer = new LoginLayer()

    this.addChild(this.loginLayer)
    this.addChild(this.modelLayer)
  },
  onEnterTransitionDidFinish() {
    this._super()

    register(this) // 绑定ws事件到当前对象
    // tryConnect()
  },

  onExit() {
    this._super()

    unregister(this)
  },
  onWsOpen(e) {
    this.modelLayer.hide()
  },
  onWsError(e) {
    this.modelLayer.stopAction()
    this.modelLayer.setText('连接服务器失败')
    // this.modelLayer.show('链接失败')
  },
})
