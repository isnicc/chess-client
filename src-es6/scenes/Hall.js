/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {Scene, Sprite} from '@cc'
import Setting from 'layers/Setting'
import {bindClick, offsetCenter, offsetUpLeft} from 'utils/core'
import {getUser} from 'src/auth'
import {loadImg} from 'utils/loader'

const resources = {
  bg: 'res/ui/bg/hall.png',
  mm: 'res/ui/bg/mm.png',
}

const Class = Scene.extend({
  async ctor() {
    this._super()

    this.userInfo = getUser()
    this.setting = new Setting
    this.bg = new Sprite(resources.bg)
    offsetCenter(this.bg)
    this.mm = new Sprite(resources.mm)
    offsetCenter(this.mm, 0, -50)

    this.avatar = new Sprite
    offsetUpLeft(this.avatar, 70, 70)
    bindClick(this.avatar, () => this.setting.show())

    this.addChild(this.bg)
    this.addChild(this.mm)

    this.addChild(this.avatar)
    this.addChild(this.setting)

    let img = await loadImg(this.userInfo.avatar)
    this.avatar.setTexture(img)
    this.avatar.setScale(100 / this.avatar.getContentSize().width)
  },
})

Class.resources = resources
Class.className = 'Hall'

export default Class