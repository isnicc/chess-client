/**
 * Created by zhuangjianjia on 17/6/5.
 */
import cc, {
  audioEngine,
  LabelTTF,
  ControlSlider,
} from '@cc'
import Prompt, {TYPE_MD} from 'commons/Prompt'
import {offsetCenter, bindClick, callArray} from 'utils/core'
import {ui} from 'src/resources'
import {getBgVolumn, getEffectVolumn, setBgVolunm, setEffectVolunm} from 'src/audio'

// 打补丁～
ControlSlider.prototype.setOpacity = function (c) {
  this._super && this._super(c)
  callArray(this.children, child => child.setOpacity(c))
}

ControlSlider.prototype.setVisible = function (b) {
  if (b) {
    if (this._real_x) {
      this.setPosition(this._real_x, this._real_y)
    }
  } else {
    this._real_x = this.x
    this._real_y = this.y
    this.setPosition(999999, 999999)
  }
  for (let node of this.children) {
    node.setVisible(b)
    if (b) node.setScale(1)
    else node.setScale(0)
  }
}
const Class = Prompt.extend({
  ctor() {
    this._super(TYPE_MD)

    this.setTitle('设置中心')

    let bgSlider = new ControlSlider(ui.progress_bg, ui.progress, ui.sieve)
    bgSlider.setMinimumValue(0)
    bgSlider.setMaximumValue(1)
    offsetCenter(bgSlider, 0, 100)

    bgSlider.addTargetWithActionForControlEvents(this, (sender, controlEvent) => audioEngine.setMusicVolume(sender.getValue().toFixed(2)) || setBgVolunm(sender.getValue().toFixed(2)), cc.CONTROL_EVENT_VALUECHANGED)
    this.bgSlider = bgSlider

    let effectSlider = new ControlSlider(ui.progress_bg, ui.progress, ui.sieve)
    effectSlider.setMinimumValue(0)
    effectSlider.setMaximumValue(1)
    offsetCenter(effectSlider, 0, -100)
    effectSlider.addTargetWithActionForControlEvents(this, (sender, controlEvent) => audioEngine.setEffectsVolume(sender.getValue().toFixed(2)) || setEffectVolunm(sender.getValue().toFixed(2)), cc.CONTROL_EVENT_VALUECHANGED)
    this.effectSlider = effectSlider

    this.addChild(this.bgSlider)
    this.addChild(this.effectSlider)
    bindClick(this)
  },
  show() {
    this.bgSlider.setValue(getBgVolumn())
    this.effectSlider.setValue(getEffectVolumn())
    this._super()
  },
})

export default Class