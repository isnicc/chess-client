/**
 * Created by zhuangjianjia on 17/6/5.
 */
import cc, {Sprite} from '@cc'
import {bindClick} from 'utils/core'
import {ui as resources} from 'src/resources'

const Class = Sprite.extend({
  skin: 1,
  checked: false,
  ctor(skin = 1) {
    this._super()

    this.skin = skin
    this.setChecked(false)

    bindClick(this, () => this.toggle())
  },
  setChecked(flag) {
    this.checked = flag
    if (flag) {
      this.setTexture(resources[`checkbox${this.skin}`])
    } else {
      this.setTexture(resources[`checkbox${this.skin}_on`])
    }
  },
  toggle() {
    this.setChecked(!this.checked)
  },
})

export default Class