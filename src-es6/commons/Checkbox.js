/**
 * Created by zhuangjianjia on 17/6/5.
 */
import cc, {Sprite} from '@cc'
import {bindClick} from 'utils/core'
import {ui as resources} from 'src/resources'

const Class = Sprite.extend({
  skin: 1,
  checked: false,
  siblings: null,
  siblings_only: false,
  ctor(skin = 1, flag = false) {
    this._super()

    this.skin = skin
    this.setChecked(flag)

    bindClick(this, () => this.toggle())
  },
  setChecked(flag) {
    this.checked = flag
    if (!flag) {
      this.setTexture(resources[`checkbox${this.skin}`])
    } else {
      this.setTexture(resources[`checkbox${this.skin}_on`])
    }
  },
  toggle() {
    if (this.checked && this.siblings_only && this.siblings) {
      if (this.siblings.every(c => c.checked === false) === true) {
        return
      }
    }
    this.setChecked(!this.checked)
    if (this.siblings) {
      this.siblings.forEach(c => c.setChecked(false))
    }
  },
})

export default Class