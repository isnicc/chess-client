/**
 * Created by zhuangjianjia on 17/5/21.
 */
import cc, {
  Layer,
  winSize as size,
  Sprite,
  eventManager,
  EventListener,
  LabelTTF,
} from '@cc'
import {isTouchInside, fadeIn, fadeOut} from '../../utils/core'
import globalResources from '../../resources'
import {Button} from '@ccui'

export default Layer.extend({
  ctor(type, alert_lg) {
    this._super()
    this.setVisible(false)
    this.bg = new Sprite(alert_lg)
    this.bg.setPosition(size.width / 2, size.height / 2)
    this.title = new LabelTTF('创建房间', '', 30)
    this.title.setPosition(size.width / 2, size.height / 2 + this.bg.height / 2 - 35)
    this.title.setFontFillColor(cc.color('#fdd349'))
    this.sub_title = new LabelTTF(`游戏类型:${type}`, '', 15)
    this.sub_title.setPosition(size.width / 2, size.height / 2 + this.bg.height / 2 - 65)

    this.close_button = new Button(globalResources.close, globalResources.close_on)
    this.close_button.setPosition((size.width + this.bg.width - 20) / 2, (size.height + this.bg.height - 20) / 2)

    this.close_button.addClickEventListener(() => {
      if (!this.parent.onClickCreateRoomClose) this.hide()
      else {
        if (this.parent.onClickCreateRoomClose(type))
          this.hide()
      }
    })

    eventManager.addListener({
      event: EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: (touch, event) => {
        return !(!event.getCurrentTarget().isVisible() || (!isTouchInside(event.getCurrentTarget(), touch)))
      },
    }, this)
    return true
  },
  onEnter() {
    this._super()

    this.addChild(this.bg)
    this.addChild(this.title)
    this.addChild(this.sub_title)
    this.addChild(this.close_button)
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
  show() {
    fadeIn(this, 10, 0.01)
  },
  hide() {
    fadeOut(this, 10, 0.01)
  },
  setOpacity(opacity) {
    for (let node of this.children) {
      node.setOpacity(opacity)
    }
  },
})
