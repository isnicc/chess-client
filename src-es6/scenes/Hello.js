/**
 * Created by zhuangjianjia on 17-6-1.
 */
import cc, {Scene} from '@cc'
import {bindClick} from 'utils/core'

export default class Hello extends Scene {
  static resources = {}

  constructor() {
    super()

    this.label = new cc.LabelTTF('aaa', '', 40)
    this.label.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
    this.addChild(this.label)
    bindClick(this.label, () => {
      cc.log(1)
    })
  }
}