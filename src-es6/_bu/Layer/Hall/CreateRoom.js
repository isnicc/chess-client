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
  mapFadeInOutPanel,
} from '../../utils/core'
import globalResources from '../../resources'
import {Button} from '@ccui'
import {get} from '../../utils/registry'

export default Layer.extend({
  settings: {
    '牛牛': {
      active: {
        round_count: null, // 回合数
        player_count: null, // 玩家数量
        master_mode: null, // 坐庄模式
      },
      round_count: [],
      player_count: [],
      master_mode: [],
    },
    '十三水': {
      active: {
        round_count: null, // 回合数
        player_count: null, // 玩家数量
        master_mode: null, // 坐庄模式
      },
      round_count: [],
      player_count: [],
      master_mode: [],
    },
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
            round_count: this.settings[this.type].active.round_count, // 回合数
            player_count: this.settings[this.type].active.player_count, // 玩家数量
            master_mode: this.settings[this.type].active.master_mode, // 坐庄模式
          }))
          this.hide()
      }
    })

    this.addChild(this.bg)
    this.addChild(this.title)
    this.addChild(this.sub_title)
    this.addChild(this.close_button)
    this.addChild(this.round_count_label)
    this.addChild(this.player_count_label)
    this.addChild(this.master_mode_label)
    this.addChild(this.create_room)
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
  show(type) {
    this.type = type
    this.sub_title.setString(`游戏类型:${type}`)
    this._show()
    for (let n of this.children) {
      if (!n.type) n.setVisible(true)
      else if (n.type === type) n.setVisible(true)
      else n.setVisible(false)
    }
  },
  hide() {
    this._hide()
  },
  initSettings(type, settings) {
    const map = ['round_count', 'player_count', 'master_mode']
    const offsetY = {
      round_count: 120,
      player_count: 10,
      master_mode: -100,
    }

    const checkbox_texture = get('checkbox_texture', () => cc.textureCache.addImage(globalResources.checkbox2)),
      checkbox_on_texture = get('checkbox_on_texture', () => cc.textureCache.addImage(globalResources.checkbox2_on))

    map.forEach(n => {
      if (settings[n]) {
        for (let i in settings[n]) {
          let setting = settings[n][i]
          let checkbox = new Sprite(checkbox_texture)
          let label = new LabelTTF(setting.label, '', 40)
          checkbox.setPosition(size.width / 2 - 200 + 180 * (i % 3), size.height / 2 + offsetY[n] - 60 * parseInt(i / 3))
          checkbox.setVisible(false)
          label.setPosition(size.width / 2 - 245 + 180 * (i % 3) + 75, size.height / 2 + offsetY[n] - 60 * parseInt(i / 3))
          label.setAnchorPoint(0, 0.5)
          label.setColor(cc.color('#000000'))
          label.setVisible(false)
          let cb = () => {
            if (this.settings[type]['active'][n] === setting.value) {
              checkbox.setTexture(checkbox_texture)
              this.settings[type]['active'][n] = null
            } else {
              if (this.settings[type]['active'][`${n}_checkbox`]) {
                this.settings[type]['active'][`${n}_checkbox`].setTexture(checkbox_texture)
              }
              checkbox.setTexture(checkbox_on_texture)
              this.settings[type]['active'][n] = setting.value
              this.settings[type]['active'][`${n}_checkbox`] = checkbox
            }
          }
          bindClick(checkbox, () => cb.call(this))
          bindClick(label, () => cb.call(this))
          if (parseInt(i) === 0) cb.call(this)
          this.settings[type][n].push(checkbox)
          this.settings[type][n].push(label)
        }
        for (let node of this.settings[type][n]) {
          node.type = type
          this.addChild(node)
        }
      }
    })
  },
  ...mapFadeInOutPanel,
})
