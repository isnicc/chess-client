/**
 * Created by zhuangjianjia on 17/5/20.
 */
import cc, {
  Layer,
  ControlSlider,
  winSize as size,
  Sprite,
  LabelTTF,
} from '@cc'
import {
  fadeIn,
  fadeOut,
  bindClick,
  mapFadeInOutPanel,
} from '../../utils/core'
import globalResources from '../../resources'
import {Button} from '@ccui'

// 打补丁～
ControlSlider.prototype.setOpacity = function (c) {
  mapFadeInOutPanel.setOpacity.call(this, c)
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

export default Layer.extend({
  ctor(progress, progress_bg, sieve) {
    this._super()
    this.setVisible(false)
    bindClick(this)
    this.bg = new Sprite(globalResources.alert_md)
    this.bg.setPosition(size.width / 2, size.height / 2)
    this.title = new LabelTTF('设置中心', '', 30)
    this.title.setPosition(size.width / 2, size.height / 2 + this.bg.height / 2 - 35)
    this.title.setFontFillColor(cc.color('#fdd349'))
    this.sub_title = new LabelTTF('用户设置 & 系统设置', '', 15)
    this.sub_title.setPosition(size.width / 2, size.height / 2 + this.bg.height / 2 - 65)

    this.close_button = new Button(globalResources.close, globalResources.close_on)
    this.close_button.setPosition((size.width + this.bg.width - 20) / 2, (size.height + this.bg.height - 20) / 2)

    bindClick(this.close_button, () => {
      if (!this.parent.onClickSettingClose) this.hide()
      else {
        if (this.parent.onClickSettingClose())
          this.hide()
      }
    })

    let bgSlider = new ControlSlider(progress_bg, progress, sieve)
    bgSlider.setMinimumValue(0)
    bgSlider.setMaximumValue(1)
    bgSlider.setPosition(size.width / 2, size.height / 2 + 100)

    bgSlider.addTargetWithActionForControlEvents(this, (sender, controlEvent) => {
      this.parent.bgSliderUpdate && this.parent.bgSliderUpdate(sender.getValue().toFixed(2))
    }, cc.CONTROL_EVENT_VALUECHANGED)
    this.bgSlider = bgSlider

    let effectSlider = new ControlSlider(progress_bg, progress, sieve)
    effectSlider.setMinimumValue(0)
    effectSlider.setMaximumValue(1)
    effectSlider.setPosition(size.width / 2, size.height / 2 - 100)
    effectSlider.addTargetWithActionForControlEvents(this, (sender, controlEvent) => {
      this.parent.effectSliderUpdate && this.parent.effectSliderUpdate(sender.getValue().toFixed(2))
    }, cc.CONTROL_EVENT_VALUECHANGED)
    this.effectSlider = effectSlider

    this.addChild(this.bg)
    this.addChild(this.title)
    this.addChild(this.sub_title)
    this.addChild(this.close_button)
    this.addChild(this.bgSlider)
    this.addChild(this.effectSlider)
    return true
  },
  onEnter() {
    this._super()
  },
  onEnterTransitionDidFinish() {
    this._super()

  },
  onExitTransitionDidStart() {
    this._super()

  },
  onExit() {
    this._super()

  },
  show() {
    this._show()
  },
  hide() {
    this._hide()
  },
  ...mapFadeInOutPanel,
  setBgVolume(v) {
    this.bgSlider.setValue(v)
  },
  setEffectVolume(v) {
    this.effectSlider.setValue(v)
  },
})