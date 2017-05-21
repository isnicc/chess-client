/**
 * Created by zhuangjianjia on 17/5/2.
 */
import cc, {
  LayerColor,
  eventManager,
  EventListener,
  Sprite,
  RepeatForever,
  RotateBy,
  LabelTTF,
} from '@cc'
import globalResources from '../../resources'
import {isTouchInside, fadeIn, fadeOut} from '../../utils/core'

export default LayerColor.extend({
  maxOpacity: 200, // 最大的遮罩层

  ctor() {
    this._super(cc.color(0, 0, 0, this.modelOpacity))
    this.setVisible(false)
    this.m_touchListener = {
      event: EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: (touch, event) => !(!event.getCurrentTarget().isVisible() || (!isTouchInside(event.getCurrentTarget(), touch))),
    }

    eventManager.addListener(this.m_touchListener, this)

    let size = cc.winSize
    this.loading = new Sprite(globalResources.ui_icon_load_a)
    let loadingSize = this.loading.getContentSize()
    this.loading.setScale(size.height / 8 / loadingSize.height)
    this.loading.attr({
      x: size.width / 2,
      y: size.height / 2,
    })

    this.loading_action = new RepeatForever(new RotateBy(2, 360, 360))
    this.loading.runAction(this.loading_action)
    this.loading_label = new LabelTTF('加载中...', 'Arial', 20)
    this.loading_label.attr({
      x: size.width / 2,
      y: size.height / 2 - size.height / 8,
    })
    return true
  },
  onEnter() {
    this._super()

    this.addChild(this.loading)
    this.addChild(this.loading_label)
  },
  onEnterTransitionDidFinish() {
    this._super()

  },
  onExitTransitionDidStart() {
    this._super()

  },
  onExit() {
    this._super()

  },
  icon(icon = globalResources.ui_icon_load_a) {
    this.loading.setTexture(icon)
  },
  show(text = '加载中...') {
    this.text(text)
    fadeIn(this, 10, 0.01, this.maxOpacity)
  },
  hide() {
    fadeOut(this, 10, 0.01, this.maxOpacity)
  },
  text(text = '加载中...') {
    this.loading_label.setString(text)
  },
})
