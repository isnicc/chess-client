/**
 * Created by zhuangjianjia on 17/5/17.
 */
import cc, {
  Layer,
  winSize as size,
  Sprite,
  LabelTTF,
  DrawNode,
  ClippingNode,
} from '@cc'
import {loadText} from '../../utils/promise'

export default Layer.extend({
  ctor(bg, mm, hall_bottom_bg, text_anti_addiction, message_bar, message_icon, message_url) {
    this._super()

    this.bgSprite = new Sprite(bg)
    this.bgSprite.attr({
      x: size.width / 2,
      y: size.height / 2,
    })

    this.mmSprite = new Sprite(mm)
    this.mmSprite.attr({
      x: size.width / 2,
      y: this.mmSprite.height / 2,
    })

    this.bottom_bg = new Sprite(hall_bottom_bg)
    this.bottom_bg.attr({
      x: size.width / 2,
      y: this.bottom_bg.height / 2,
    })

    this.text_anti_addiction = new Sprite(text_anti_addiction)
    this.text_anti_addiction.attr({
      x: size.width / 2/* - this.text_anti_addiction.width / 2*/,
      y: this.text_anti_addiction.height / 2 + 8,
    })

    this.message_bar = new ClippingNode(new Sprite(message_bar))
    this.message_bar.attr({
      x: size.width - 340,
      y: size.height - 50,
    })

    this.message_text = new LabelTTF("message", '', 20)
    this.message_text.setColor(cc.color('#ffffff'))
    this.message_text.setAnchorPoint(0, 0.5)
    this.message_text.setPosition(340, 0)
    this.message_bar.addChild(new Sprite(message_bar))
    this.message_bar.addChild(this.message_text)
    this.message_icon = new Sprite(message_icon)
    this.message_icon.attr({
      x: size.width - 650,
      y: size.height - 50,
    })
    let offset = -(340 + this.message_text.width)
    this.schedule(async() => {
      if (offset <= -(340 + this.message_text.width)) {
        let message = 'message'
        try {
          message = await loadText(message_url)
        } catch (e) {
          message = '获取失败'
        }
        offset = 340
        this.message_text.setString(message)
      }
      this.message_text.setPosition(--offset, 0)
    }, 0.01)
    return true
  },
  onEnter() {
    this._super()

    this.addChild(this.bgSprite)
    this.addChild(this.mmSprite)
    this.addChild(this.bottom_bg)
    this.addChild(this.text_anti_addiction)
    this.addChild(this.message_bar)
    this.addChild(this.message_icon)
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
})