/**
 * Created by zhuangjianjia on 17-6-1.
 */
import cc, {Layer, Sprite, LabelTTF} from '@cc'
import {ui} from 'src/resources'
import {Button} from '@ccui'
import {bindClick, fadeIn, fadeOut} from 'utils/core'

export const TYPE_MD = 'md'
export const TYPE_LG = 'lg'
export const TYPE_SM = 'sm'

const Class = Layer.extend({
    ctor(type = TYPE_MD) {
      this._super()
      let size = cc.winSize
      this.hide()

      if (type === TYPE_SM) this.bg = new Sprite(ui.prompt_sm)
      else if (type === TYPE_MD) this.bg = new Sprite(ui.prompt_md)
      else this.bg = new Sprite(ui.prompt_lg)
      this.bg.setPosition(size.width / 2, size.height / 2)

      this.close = new Button(ui.prompt_close, ui.prompt_close_on)
      this.close.setPosition(size.width / 2 + this.bg.width / 2 - 10, size.height / 2 + this.bg.height / 2 - 10)

      this.title = new LabelTTF('温馨提示', null, 30)
      this.title.setPosition(size.width / 2, size.height / 2 + this.bg.height / 2 - 40)
      this.title.setColor(cc.color('#ffffff'))

      this.addChild(this.bg)
      this.addChild(this.close)
      this.addChild(this.title)
      bindClick(this.close, () => this.onClose())
    },

    setTitle(title, color) {
      this.title.setString(title)
      color && this.title.setColor(color)
    },

    onClose() {
      this.hide()
    },

    show(step = 25, inter = 0.0066667, maxOpacity = 255) {
      for (let node of this.children) {
        node.setVisible(true)
      }
      fadeIn(this, step, inter, maxOpacity)
    },

    async hide(step = 25, inter = 0.0066667, maxOpacity = 255) {
      await fadeOut(this, step, inter, maxOpacity)
      for (let node of this.children) {
        node.setVisible(false)
      }
    },

    setOpacity(opacity) {
      super.setOpacity(opacity)
      for (let node of this.children) {
        node.setOpacity(opacity)
      }
    },
  }
)

export default Class