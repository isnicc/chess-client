import cc from '@cc'
import resources from './resources'
import {preload} from './Scene/Loading'
import LoginScene from './Scene/Login'

cc.game.onStart = () => {
  // 是否启用retina, 在其他设备上开启会损耗性能
  cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS)
  // 设置虚拟分辨率 1280*720, 高度固定720
  cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_HEIGHT)
  // 调整视图
  cc.view.adjustViewPort(true)
  // 设置旋转方向: 横向
  cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE)
  preload(Object.values(resources), () => cc.director.runScene(new cc.TransitionFade(0.33, new LoginScene())))
}