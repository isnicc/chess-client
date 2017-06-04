/**
 * Created by zhuangjianjia on 17/6/2.
 */

import cc, {Layer, Sprite} from '@cc'
import {offsetCenter, callArray, bindClick} from 'utils/core'

const Class = Layer.extend({
  ctor(resources) {
    this._super()

    this.bg = new Sprite(resources.bg)
    offsetCenter(this.bg)

    this.addChild(this.bg)
  }
})

export default Class
