/**
 * Created by zhuangjianjia on 17-6-9.
 */
import cc, {Layer, Sprite, LabelTTF, ClippingNode} from '@cc'
import {bindClick, offsetUp} from 'utils/core'
import {ui} from 'src/resources'
import {loadText} from 'utils/loader'

const Class = Layer.extend({
  ctor(message_url) {
    this._super()

    this.bg = new ClippingNode(new Sprite(ui.message_bar))
    this.bg.setPosition(0, 0)

    this.message = new LabelTTF("message", '', 20)
    this.message.setColor(cc.color('#ffffff'))
    this.message.setAnchorPoint(0, 0.5)
    this.message.setPosition(340, 0)

    this.message_bar = new Sprite(ui.message_bar)
    this.bg.addChild(this.message_bar)
    this.bg.addChild(this.message)

    this.icon = new Sprite(ui.message_icon)
    this.icon.setPosition(-350, 0)

    let offset = -400
    let circle = 0
    this.schedule(async() => {
      if (offset <= -400) {
        circle++
        if (circle % 5 === 1) {
          let message
          try {
            message = await loadText(message_url)
          } catch (e) {
            message = '获取失败'
          }
          this.message.setString(message)
        }
        offset = 300
        if (circle % 1000 === 0) circle = 0
      }
      this.message.setPosition(offset -= 5, 0)
    }, 0.05)

    this.addChild(this.bg)
    this.addChild(this.icon)
  },
})

export default Class
