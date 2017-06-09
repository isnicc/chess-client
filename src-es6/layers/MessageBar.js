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
    // offsetUp(this.bg, 50, -340)

    this.message = new LabelTTF("message", '', 20)
    this.message.setColor(cc.color('#ffffff'))
    this.message.setAnchorPoint(0, 0.5)
    this.message.setPosition(340, 0)

    this.bg.addChild(new Sprite(ui.message_bar))
    this.bg.addChild(this.message)

    this.icon = new Sprite(ui.message_icon)
    this.icon.setPosition(-350, 0)

    let offset = -(340 + this.message.width)
    this.schedule(async() => {
      if (offset <= -(340 + this.message.width)) {
        let message = 'message'
        try {
          message = await loadText(message_url)
        } catch (e) {
          cc.log('获取消息失败', e)
          message = '获取失败'
        }
        offset = 340
        this.message.setString(message)
      }
      this.message.setPosition(--offset, 0)
    }, 0.01)

    this.addChild(this.bg)
    this.addChild(this.icon)
  },
})

export default Class
