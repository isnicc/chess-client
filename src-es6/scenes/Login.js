/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {Scene} from '@cc'
import {VERSION} from 'src/constances'
import {runScene} from 'utils/core'
import Hello from 'scenes/Hello'
import Alert from 'commons/Alert'
import Loading from 'commons/Loading'

const resources = {}

const Class = Scene.extend({
  ctor() {
    this._super()

    this.alert = new Alert
    this.loading = new Loading

    this.addChild(this.alert)
    this.addChild(this.loading)
  },

  onEnterTransitionDidFinish() {
    this._super()

  },
})

Class.resources = resources
Class.className = 'Login'

export default Class