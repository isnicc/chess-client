/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {Scene} from '@cc'

const resources = {}

const Class = Scene.extend({
  ctor() {
    this._super()
  }
})

Class.resources = resources
Class.className = 'Hall'

export default Class