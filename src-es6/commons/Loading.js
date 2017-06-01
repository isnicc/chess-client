/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {LayerColor, Sprite, RepeatForever, RotateBy, LabelTTF} from '@cc'
import {ui} from 'src/resources'
import {bindClick, fadeIn, fadeOut} from 'utils/core'


export default class Loading extends LayerColor {
  constructor() {
    super(cc.color(0, 0, 0, 0))
    this.hide()

    const size = cc.winSize
    this.icon = new Sprite(ui.loading_icon)
    this.icon.setScale(size.height / 8 / this.icon.height)
    this.icon.setPosition(size.width / 2, size.height / 2)

    let action = new RepeatForever(new RotateBy(2, -360, -360))
    this.icon.runAction(action)

    this.label = new LabelTTF('加载中...', 'Arial', 20)
    this.label.setPosition(size.width / 2, size.height / 2 - size.height / 8)

    this.addChild(this.icon)
    this.addChild(this.label)
    bindClick(this)
  }

  setTitle(title, color) {
    this.label.setString(title)
    color && this.label.setColor(color)
  }

  show(step = 25, inter = 0.0066667, maxOpacity = 200) {
    for (let node of this.children) {
      node.setVisible(true)
    }
    fadeIn(this, step, inter, maxOpacity)
  }

  async hide(step = 25, inter = 0.0066667, maxOpacity = 200) {
    await fadeOut(this, step, inter, maxOpacity)
    for (let node of this.children) {
      node.setVisible(false)
    }
  }

  setOpacity(opacity) {
    super.setOpacity(opacity)
    for (let node of this.children) {
      node.setOpacity(opacity)
    }
  }
}
