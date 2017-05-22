/**
 * Created by zhuangjianjia on 17/5/21.
 */
import cc, {
  Layer,
  winSize as size,
  Sprite,
  eventManager,
  EventListener,
  LabelTTF,
} from '@cc'
import {
  fadeIn,
  fadeOut,
  bindClick,
} from '../../utils/core'
import globalResources from '../../resources'
import {Button} from '@ccui'

export default Layer.extend({
  round_count: null, // 回合数
  player_count: null, // 玩家数量
  master_mode: null, // 坐庄模式
  settings: {
    round_count: [],
    player_count: [],
    master_mode: [],
  },
  ctor(alert_md, create_room, create_room_on) {
    this._super()

    bindClick(this)

    this.setVisible(false)
    this.bg = new Sprite(alert_md)
    this.bg.setPosition(size.width / 2, size.height / 2)
    this.title = new LabelTTF('创建房间', '', 30)
    this.title.setPosition(size.width / 2, size.height / 2 + this.bg.height / 2 - 35)
    this.title.setFontFillColor(cc.color('#fdd349'))
    this.sub_title = new LabelTTF('游戏类型', '', 15)
    this.sub_title.setPosition(size.width / 2, size.height / 2 + this.bg.height / 2 - 65)

    this.round_count_label = new LabelTTF('局数:', '', 40)
    this.round_count_label.setAnchorPoint(0, 0.5)
    this.round_count_label.setPosition(size.width / 2 - 350, size.height / 2 + 120)
    this.round_count_label.setColor(cc.color('#333333'))
    this.player_count_label = new LabelTTF('人数:', '', 40)
    this.player_count_label.setAnchorPoint(0, 0.5)
    this.player_count_label.setPosition(size.width / 2 - 350, size.height / 2 + 10)
    this.player_count_label.setColor(cc.color('#333333'))
    this.master_mode_label = new LabelTTF('模式:', '', 40)
    this.master_mode_label.setAnchorPoint(0, 0.5)
    this.master_mode_label.setPosition(size.width / 2 - 350, size.height / 2 - 100)
    this.master_mode_label.setColor(cc.color('#333333'))

    this.close_button = new Button(globalResources.close, globalResources.close_on)
    this.close_button.setPosition((size.width + this.bg.width - 20) / 2, (size.height + this.bg.height - 20) / 2)

    bindClick(this.close_button, () => {
      if (!this.parent.onClickCreateRoomClose) this.hide()
      else {
        if (this.parent.onClickCreateRoomClose(this.type))
          this.hide()
      }
    })

    this.create_room = new Button(create_room, create_room_on)
    this.create_room.setPosition(size.width / 2, size.height / 2 - 200)

    bindClick(this.create_room, () => {
      if (!this.parent.onClickCreateRoom) this.hide()
      else {
        if (this.parent.onClickCreateRoom(this.type, {
            round_count: this.round_count, // 回合数
            player_count: this.player_count, // 玩家数量
            master_mode: this.master_mode, // 坐庄模式
          }))
          this.hide()
      }
    })

    return true
  },
  onEnter() {
    this._super()

    this.addChild(this.bg)
    this.addChild(this.title)
    this.addChild(this.sub_title)
    this.addChild(this.close_button)
    this.addChild(this.round_count_label)
    this.addChild(this.player_count_label)
    this.addChild(this.master_mode_label)
    this.addChild(this.create_room)
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
  show(type, settings) {
    this.type = type
    this.sub_title.setString(`游戏类型:${type}`)
    this.clearSettings()
    this.createSettings(settings)
    fadeIn(this, 25, 0.0066667)
  },
  hide() {
    fadeOut(this, 25, 0.0066667)
  },
  clearSettings() {
    for (let setting of this.settings.round_count) {
      this.removeChild(setting)
    }
    for (let setting of this.settings.player_count) {
      this.removeChild(setting)
    }
    for (let setting of this.settings.master_mode) {
      this.removeChild(setting)
    }
    this.round_count = null
    this.player_count = null
    this.master_mode = null
    this.settings = {
      round_count: [],
      player_count: [],
      master_mode: [],
    }
  },
  createSettings(settings) {
    let map = ['round_count', 'player_count', 'master_mode']
    let offsetY = {
      round_count: 120,
      player_count: 10,
      master_mode: -100,
    }

    map.forEach(n => {
      if (settings[n]) {
        for (let i in settings[n]) {
          let setting = settings[n][i]
          let checkbox = Sprite.create(globalResources.checkbox2)
          let label = new LabelTTF(setting.label, '', 40)
          checkbox.setPosition(size.width / 2 - 200 + 180 * (i % 3), size.height / 2 + offsetY[n] - 60 * parseInt(i / 3))
          label.setPosition(size.width / 2 - 245 + 180 * (i % 3) + 70, size.height / 2 + offsetY[n] - 60 * parseInt(i / 3))
          label.setAnchorPoint(0, 0.5)
          label.setColor(cc.color('#000000'))
          let cb = function () {
            if (this[n] === setting.value) {
              checkbox.setTexture(globalResources.checkbox2)
              this[n] = null
            } else {
              if (this[`${n}_checkbox`]) {
                this[`${n}_checkbox`].setTexture(globalResources.checkbox2)
              }
              checkbox.setTexture(globalResources.checkbox2_on)
              this[n] = setting.value
              this[`${n}_checkbox`] = checkbox
            }
          }
          bindClick(checkbox, () => cb.call(this))
          bindClick(label, () => cb.call(this))
          if (parseInt(i) === 0) cb.call(this)
          this.settings[n].push(checkbox)
          this.settings[n].push(label)
        }
        for (let node of this.settings[n]) {
          this.addChild(node)
        }
      }
    })
  },
  setOpacity(opacity) {
    for (let node of this.children) {
      node.setOpacity(opacity)
    }
  },
})
