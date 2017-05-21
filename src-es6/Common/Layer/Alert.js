/**
 * Created by zhuangjianjia on 17/5/3.
 */
import cc, {
  Layer,
  Sprite,
  eventManager,
  EventListener,
} from '@cc'
import {Button} from '@ccui'

import globalResources from '../../resources'
import {isTouchInside, fadeIn, fadeOut} from '../../utils/core'

export default Layer.extend({
  ctor() {
    this._super()

    let size = cc.winSize
    this.setVisible(false)

    this.bg = new Sprite(globalResources.ui_bg_alert)
    this.bg.attr({
      x: size.width / 2,
      y: size.height / 2,
    })

    this.text_tip = new Sprite(globalResources.alert_tip)
    this.text_tip.attr({
      x: (size.width) / 2,
      y: (size.height + this.bg.height - 75) / 2,
    })

    this.close_button = new Button(globalResources.close, globalResources.close_on)
    this.close_button.attr({
      x: (size.width + this.bg.width - 20) / 2,
      y: (size.height + this.bg.height - 20) / 2,
    })

    this.ok_button = new Button(globalResources.ok, globalResources.ok_on)
    this.ok_button.attr({
      x: (size.width) / 2,
      y: (size.height - this.bg.height + 150) / 2,
    })

    this.alert_content = new cc.LabelTTF('', 'Arial', 35)
    this.alert_content.setColor(cc.color(0, 0, 0))

    this.close_button.addClickEventListener(() => this.hide())
    this.ok_button.addClickEventListener(() => this.hide())

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
    this.addChild(this.close_button)
    this.addChild(this.ok_button)
    this.addChild(this.text_tip)
    this.addChild(this.alert_content)
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
  show(content = '提示内容') {
    this.content(content)
    fadeIn(this, 10, 0.01)
  },
  hide() {
    fadeOut(this, 10, 0.01)
  },
  content(content = '提示内容') {
    let {x, y} = this.bg
    this.alert_content.setString(content)
    this.alert_content.setPosition(x, y + 10)
  },
  setOpacity(opacity) {
    for(let node of this.children) {
      node.setOpacity(opacity)
    }
  },
})
