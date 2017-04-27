import cc from '@cc'
import resources from '../../resources'

export default cc.LayerColor.extend({
  m_touchListener: null,
  loading: null,
  loading_action: null,
  loading_label: null,
  modelOpacity: 200, // 最大的遮罩层

  ctor() {
    this._super(cc.color(0, 0, 0, this.modelOpacity))
    this.setVisible(false) // 默认隐藏
    this.m_touchListener = {
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: (touch, event) => !(!event.getCurrentTarget().isVisible() || (!this._isTouchInside(event.getCurrentTarget(), touch))),
    }

    cc.eventManager.addListener(this.m_touchListener, this)

    let size = cc.winSize

    let loading = this.loading = new cc.Sprite(resources.loading)
    let loadingSize = loading.getContentSize()
    loading.setScale(size.height / 8 / loadingSize.height)
    loading.attr({
      x: size.width / 2,
      y: size.height / 2,
    })
    this.loading_action = new cc.RepeatForever(new cc.RotateBy(2, 360, 360))
    this.addChild(loading)
    let label = this.loading_label = new cc.LabelTTF('加载中...', 'Arial', 20)
    label.attr({
      x: size.width / 2,
      y: size.height / 2 - size.height / 8,
    })
    this.addChild(label)
  },
  _isTouchInside(owner, touch) {
    if (!owner || !owner.getParent()) return false
    let touchLocation = owner.getParent().convertToNodeSpace(touch.getLocation())
    return cc.rectContainsPoint(owner.getBoundingBox(), touchLocation)
  },
  show(text = '加载中...') {
    this.runAction()
    this.setText(text)
    let opacity = 1
    this.setOpacity(opacity)
    this.setVisible(true)
    let opacityFunc = () => {
      this.setOpacity(opacity += 20)
      if (opacity >= this.modelOpacity) this.unschedule(opacityFunc)
    }
    this.schedule(opacityFunc, 0.005)
  },
  hide() {
    this.stopAction()
    let opacity = this.modelOpacity
    this.setOpacity(opacity)
    let opacityFunc = () => {
      this.setOpacity(opacity -= 20)
      if (opacity <= 0) {
        this.unschedule(opacityFunc)
        this.setVisible(false)
      }
    }
    this.schedule(opacityFunc, 0.005)
  },
  stopAction() {
    this.loading.stopAction(this.loading_action)
  },
  runAction() {
    this.loading.runAction(this.loading_action)
  },
  setText(text = '加载中...') {
    this.loading_label.setString(text)
  },
})