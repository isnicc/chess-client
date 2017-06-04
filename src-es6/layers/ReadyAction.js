/**
 * Created by zhuangjianjia on 17/6/2.
 */

import cc, {Layer} from '@cc'
import {ui} from 'src/resources'
import {Button} from '@ccui'
import {offsetCenter, callArray, bindClick} from 'utils/core'

const Class = Layer.extend({
  is_ready: false,
  ctor(resources) {
    this._super()
    this.ready = new Button(ui.ready, ui.ready_on, ui.ready_off)
    this.unready = new Button(ui.unready, ui.unready_on, ui.unready_off)
    callArray([this.ready, this.unready], n => offsetCenter(n, 0, -100))
    callArray([this.ready, this.unready], n => this.addChild(n))
    this.unready.setVisible(false)
    bindClick([this.ready, this.unready], () => this.setReady(this.is_ready))
  },
  setReady(ready){
    this.is_ready = ready;
    (this.is_ready ? this.unready : this.ready).setVisible(false)
    this.is_ready = !this.is_ready;
    (this.is_ready ? this.unready : this.ready).setVisible(true)
    this.parent.onReadyChange && this.parent.onReadyChange(this.is_ready)
  }
})

export default Class
