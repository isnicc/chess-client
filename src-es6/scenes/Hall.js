/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {Scene} from '@cc'
import Setting from 'layers/Setting'

const resources = {}

const Class = Scene.extend({
  ctor() {
    this._super()
    this.setting = new Setting

    this.addChild(this.setting)
  }
})

Class.resources = resources
Class.className = 'Hall'

export default Class