/**
 * Created by zhuangjianjia on 17-6-12.
 */
import cc, {
  Layer,
  winSize as size,
  Sprite,
  eventManager,
  EventListener,
  LabelTTF,
} from '@cc'
import Prompt, {TYPE_MD} from 'commons/Prompt'
import {bindClick, offsetCenter, callArray} from 'utils/core'
import {Button} from '@ccui'
import Checkbox from 'commons/Checkbox'

const
  types = ['player_count', 'round_count', 'master_mode',]

const Class = Prompt.extend({
  game: null,

  options: {
    master_mode: [],
    player_count: [],
    round_count: [],
  },

  raw_options: null,
  ctor(resources) {
    this._super(TYPE_MD)
    this.setTitle('创建房间')

    let master_mode_label = new LabelTTF('Master模式', '', 30),
      player_count_label = new LabelTTF('玩家人数', '', 30),
      round_count_label = new LabelTTF('游戏回合数', '', 30)

    callArray([player_count_label, round_count_label, master_mode_label], (r, i) => {
      r.setColor(cc.color('#000000'))
      r.setAnchorPoint(0, 0.5)
      offsetCenter(r, -350, -120 * i + 150)
      this.addChild(r)
    })

    this.create_btn = new Button(resources.create_room, resources.create_room_on)
    bindClick(this.create_btn, () => {
      this.parent.onCreateRoom && (() => {
        this.options[t].filter(o => o.checkbox.checked)
        this.parent.onCreateRoom()
      })()
    })
    offsetCenter(this.create_btn, 0, -300)

    bindClick(this)

  },
  setOptions(options) {
    if (JSON.stringify(options) === JSON.stringify(this.raw_options)) { // 不需要更新
      return
    }

    this.master_mode = null
    this.player_count = null
    this.round_count = null

    callArray(types, t => {
      for (let option of this.options[t]) {
        option.label.removeFromParent(true)
        option.checkbox.removeFromParent(true)
      }
    })

    if (!options.master_mode) return null
    if (!options.player_count) return null
    if (!options.round_count) return null

    this.raw_options = options
    this.options = {
      master_mode: [],
      player_count: [],
      round_count: [],
    }

    callArray(types, t => {
      for (let option of options[t]) {
        this.options[t].push({
          label: new LabelTTF(option.label, '', 30),
          checkbox: new Checkbox(2),
          value: option.value,
        })
      }
    })

    callArray(types, (t, ti) => {
      for (let i in this.options[t]) {
        let option = this.options[t][i]
        option.label.setColor(cc.color('#000000'))
        option.label.setAnchorPoint(0, 0.5)
        option.checkbox.setAnchorPoint(0, 0.5)
        offsetCenter(option.label, -100 + (i % 3) * 200, -120 * ti + 150 - 60 * parseInt(i / 3))
        offsetCenter(option.checkbox, -150 + (i % 3) * 200, -120 * ti + 150 - 60 * parseInt(i / 3))
        bindClick(option.label, () => option.checkbox.toggle())
        option.checkbox.siblings_only = true
        option.checkbox.siblings = this.options[t].map(o => o.checkbox).filter(c => c !== option.checkbox)
        this.addChild(option.label)
        this.addChild(option.checkbox)
      }

      for (let i in this.options[t]) {
        if (i == 0) {
          this.options[t][i].checkbox.setChecked(true)
        }
      }
    })


  },
  setGame(game) {
    this.game = game
  },
})

export default Class