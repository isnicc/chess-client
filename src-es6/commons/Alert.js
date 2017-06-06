/**
 * Created by zhuangjianjia on 17-6-5.
 */
import cc, {LabelTTF} from '@cc'
import Prompt, {TYPE_SM} from 'commons/Prompt'
import {offsetCenter, bindClick} from 'utils/core'

const Class = Prompt.extend({
  ctor(flag = false) {
    this._super(TYPE_SM)

    this.message = new LabelTTF('', '', 30)
    this.message.setColor(cc.color('#000000'))
    offsetCenter(this.message, 0, -20)
    this.addChild(this.message)

    if (flag) {
      bindClick(this)
    }
  },
  show(msg, title = null, closed = true) {
    title && this.setTitle(title)
    this.message.setString(msg)
    let {width, height} = this.message.getContentSize()
    if (width <= 450) {
      this.message.setDimensions(cc.size(0, 0))
    } else {
      this.message.setDimensions(cc.size(450, Math.ceil(width / 450) * height))
    }
    this._super()
    if (closed) {
      this.close.setVisible(true)
    } else {
      this.close.setVisible(false)
    }
  },
})

export default Class