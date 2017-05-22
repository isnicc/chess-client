/**
 * Created by zhuangjianjia on 17/5/17.
 */
import cc, {
  Layer,
  Sprite,
  ClippingNode,
  LabelTTF,
  eventManager,
  EventListener,
} from '@cc'
import {bindClick} from '../../utils/core'

export default Layer.extend({
  ctor(border, mask, diamond, diamond_bar) {
    this._super()

    this.border = new Sprite(border)
    this.border.setPosition(80, cc.winSize.height - 50)

    let _avatar = new Sprite(mask)
    this.avatarCliper = new ClippingNode(_avatar)
    this.avatarCliper.setAlphaThreshold(0)
    this.avatarCliper.setPosition(80, cc.winSize.height - 50)

    this.nickname_text = new LabelTTF('昵称', '', 30)
    this.nickname_text.setPosition(130, cc.winSize.height - 35)
    this.nickname_text.setAnchorPoint(0, 0.5)
    this.user_id_text = new LabelTTF('id', '', 20)
    this.user_id_text.setPosition(130, cc.winSize.height - 65)
    this.user_id_text.setAnchorPoint(0, 0.5)
    this.icon_diamond = new Sprite(diamond)
    this.icon_diamond.setPosition(cc.winSize.width - 830, cc.winSize.height - 50)
    this.diamond_bar = new Sprite(diamond_bar)
    this.diamond_bar.setPosition(cc.winSize.width - 780, cc.winSize.height - 50)
    this.diamond = new LabelTTF('0', '', 30)
    this.diamond.setPosition(cc.winSize.width - 770, cc.winSize.height - 50)
    return true
  },
  onEnter() {
    this._super()
    this.addChild(this.border)
    this.addChild(this.avatarCliper)
    this.addChild(this.nickname_text)
    this.addChild(this.user_id_text)
    this.addChild(this.diamond_bar)
    this.addChild(this.icon_diamond)
    this.addChild(this.diamond)
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

  setAvatar(img) {
    let avatar = new cc.Sprite(img)
    this.avatarCliper.addChild(avatar)
    avatar.setScale(88 / avatar.width)

    bindClick(avatar, () => this.parent.onClickAvatar())
  },
  setNickname(nickname) {
    this.nickname_text.setString(nickname)
  },
  setUserId(id) {
    this.user_id_text.setString(`id:${id}`)
  },
  setDiamond(diamond) {
    this.diamond.setString(diamond)
  },
})