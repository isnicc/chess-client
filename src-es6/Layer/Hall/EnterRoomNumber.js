/**
 * Created by zhuangjianjia on 17/5/20.
 */
import cc, {
  Layer,
  winSize as size,
  Sprite,
  eventManager,
  EventListener,
  LabelTTF,
} from '@cc'
import {bindClick, fadeIn, fadeOut, mapFadeInOutPanel} from '../../utils/core'
import globalResources from '../../resources'
import {Button} from '@ccui'

export default Layer.extend({
  numbers: [],
  ctor(alert_md,
       number_bg,
       num_btns,
       delete_number_btn,
       delete_number_btn_on) {
    this._super()
    this.setVisible(false)

    this.bg = new Sprite(alert_md)
    this.bg.setPosition(size.width / 2, size.height / 2)

    this.title = new LabelTTF('加入房间', '', 30)
    this.title.setPosition(size.width / 2, size.height / 2 + this.bg.height / 2 - 35)
    this.title.setFontFillColor(cc.color('#fdd349'))

    this.sub_title = new LabelTTF('请输入房间号', '', 15)
    this.sub_title.setPosition(size.width / 2, size.height / 2 + this.bg.height / 2 - 65)

    this.close_button = new Button(globalResources.close, globalResources.close_on)
    this.close_button.setPosition((size.width + this.bg.width - 20) / 2, (size.height + this.bg.height - 20) / 2)

    let nums = []
    for (let i = 0; i < 10; ++i) {
      nums[i] = new Button(num_btns[i][0], num_btns[i][1])
      nums[i].setPosition(size.width / 2 - 250 + i % 4 * 170, size.height / 2 + 50 - parseInt(i / 4) * 100)
      bindClick(nums[i], () => this.pushNumber(i))
    }
    this.nums = nums

    this.delete_btn = new Button(delete_number_btn, delete_number_btn_on)
    this.delete_btn.setPosition(size.width / 2 - 250 + 425, size.height / 2 + 50 - 200)
    bindClick(this.delete_btn, () => this.popNumber())

    this.inputs = []
    for (let i = 0; i < 6; ++i) {
      this.inputs[i] = [
        new Sprite(number_bg),
        new LabelTTF('', '', 30)
      ]
      this.inputs[i][0].setPosition(size.width / 2 - 250 + i % 6 * 100, size.height / 2 + 140)
      this.inputs[i][1].setPosition(size.width / 2 - 250 + i % 6 * 100, size.height / 2 + 140)
    }
    bindClick(this.close_button, () => {
      if (!this.parent.onClickEnterRoomClose) this.hide()
      else {
        if (this.parent.onClickEnterRoomClose())
          this.hide()
      }
    })

    bindClick(this)
    return true
  },
  onEnter() {
    this._super()
    this.addChild(this.bg)
    this.addChild(this.title)
    this.addChild(this.sub_title)
    this.addChild(this.close_button)
    for (let num of this.nums) this.addChild(num)
    for (let input of this.inputs) {
      this.addChild(input[0])
      this.addChild(input[1])
    }
    this.addChild(this.delete_btn)
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
  show()  {
    this._show()
  },
  hide() {
    this._hide()
  },
  ...mapFadeInOutPanel,
  pushNumber(i) {
    let len = this.numbers.length
    if (len === 6) {
      return false
    }
    this.inputs[len][1].setString(i)
    this.numbers.push(i)
    if (this.numbers.length === 6) {
      let numbers = this.numbers.join('')
      this.hide()
      this.popNumber()
      this.popNumber()
      this.popNumber()
      this.popNumber()
      this.popNumber()
      this.popNumber()
      this.parent.onEnterRoom(numbers)
    }
  },
  popNumber() {
    let len = this.numbers.length
    if (len === 0) return false
    this.inputs[len - 1][1].setString('')
    this.numbers.pop()
  },
})
