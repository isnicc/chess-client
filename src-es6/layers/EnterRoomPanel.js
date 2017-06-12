/**
 * Created by zhuangjianjia on 17/5/20.
 */
import Prompt, {TYPE_MD} from 'commons/Prompt'
import cc, {
  Layer,
  winSize as size,
  Sprite,
  eventManager,
  EventListener,
  LabelTTF,
} from '@cc'
import {bindClick} from 'utils/core'
import {Button} from '@ccui'

const Class = Prompt.extend({
  numbers: [],
  ctor(resources) {
    this._super(TYPE_MD)
    this.setTitle('加入房间')

    let nums = []
    for (let i = 0; i < 10; ++i) {
      nums[i] = new Button(resources.num_btns[i][0], resources.num_btns[i][1])
      nums[i].setPosition(size.width / 2 - 250 + i % 4 * 170, size.height / 2 + 50 - parseInt(i / 4) * 100)
      bindClick(nums[i], () => this.pushNumber(i))
    }
    this.nums = nums

    this.delete_btn = new Button(resources.delete_number_btn, resources.delete_number_btn_on)
    this.delete_btn.setPosition(size.width / 2 - 250 + 425, size.height / 2 + 50 - 200)
    bindClick(this.delete_btn, () => this.popNumber())

    this.inputs = []
    for (let i = 0; i < 6; ++i) {
      this.inputs[i] = [
        new Sprite(resources.number_bg),
        new LabelTTF('', '', 30)
      ]
      this.inputs[i][0].setPosition(size.width / 2 - 250 + i % 6 * 100, size.height / 2 + 140)
      this.inputs[i][1].setPosition(size.width / 2 - 250 + i % 6 * 100, size.height / 2 + 140)
    }

    for (let num of this.nums) this.addChild(num)
    for (let input of this.inputs) {
      this.addChild(input[0])
      this.addChild(input[1])
    }
    this.addChild(this.delete_btn)
    bindClick(this)
  },
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
      this.parent.onEnterRoom && this.parent.onEnterRoom(numbers)
    }
  },
  popNumber() {
    let len = this.numbers.length
    if (len === 0) return false
    this.inputs[len - 1][1].setString('')
    this.numbers.pop()
  },
})

export default Class
