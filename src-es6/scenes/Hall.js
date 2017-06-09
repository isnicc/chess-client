/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {Scene, Sprite, LabelTTF} from '@cc'
import Setting from 'layers/Setting'
import {bindClick, offsetUp, offsetCenter, offsetUpLeft, offsetLeft, offsetRight} from 'utils/core'
import {getUser} from 'src/auth'
import Alert from 'commons/Alert'
import Loading from 'commons/Loading'
import {loadImg} from 'utils/loader'
import {Button} from '@ccui'
import {mapButtons} from 'utils/resources'
import MessageBar from 'layers/MessageBar'
import EnterRoomPanel from 'layers/EnterRoomPanel'
import {initialization, bindScene, getConnect} from 'src/socket'
import {ENTER_ROOM} from 'packets/receiver'
import EnterRoomPacket from 'packets/EnterRoom'

const resources = {
  bg: 'res/ui/bg/hall.png',
  mm: 'res/ui/bg/mm.png',
  game_bg: 'res/ui/bg/game_bg.png',
  number_bg: 'res/ui/bg/number_bg.png',
  ...mapButtons('ui/button/niuniu'),
  ...mapButtons('ui/button/13shui'),
  ...mapButtons('ui/button/enter_room'),
  ...mapButtons('ui/button/resume_room'),
  ...mapButtons('ui/button/delete_number_btn', false),
  ...mapButtons('ui/button/num0', false),
  ...mapButtons('ui/button/num1', false),
  ...mapButtons('ui/button/num2', false),
  ...mapButtons('ui/button/num3', false),
  ...mapButtons('ui/button/num4', false),
  ...mapButtons('ui/button/num5', false),
  ...mapButtons('ui/button/num6', false),
  ...mapButtons('ui/button/num7', false),
  ...mapButtons('ui/button/num8', false),
  ...mapButtons('ui/button/num9', false),
}

const Class = Scene.extend({
  async ctor() {
    this._super()

    this.alert = new Alert(true)
    this.loading = new Loading

    this.userInfo = getUser()
    cc.log('用户信息', this.userInfo)

    this.setting = new Setting

    // 公告滚动条
    this.message_bar = new MessageBar('http://127.0.0.1:8000/res/message.txt')
    offsetUp(this.message_bar, 50, 250)

    // 背景元素
    this.bg = new Sprite(resources.bg)
    offsetCenter(this.bg)
    this.mm = new Sprite(resources.mm)
    offsetCenter(this.mm, 0, -50)

    // 用户元素
    this.userAvatar = new Sprite
    this.userId = new LabelTTF(`ID:${this.userInfo.id}`, '', 20)
    this.userNickname = new LabelTTF(`昵称:${this.userInfo.nickname}`, '', 30)
    this.userDiamond = new LabelTTF(`钻石:${this.userInfo.diamond}`, '', 30)
    offsetUpLeft(this.userAvatar, 70, 70)
    bindClick(this.userAvatar, () => this.setting.show())
    this.userId.setAnchorPoint(0, 0.5)
    this.userNickname.setAnchorPoint(0, 0.5)
    this.userDiamond.setAnchorPoint(0, 0.5)
    offsetUpLeft(this.userId, 130, 40)
    offsetUpLeft(this.userNickname, 130, 65)
    offsetUpLeft(this.userDiamond, 130, 95)

    // 界面按钮元素
    this._13shui_btn = new Button(resources._13shui, resources._13shui_on, resources._13shui_off)
    offsetLeft(this._13shui_btn, 300, 100)
    this.niuniu_btn = new Button(resources.niuniu, resources.niuniu_on, resources.niuniu_off)
    offsetLeft(this.niuniu_btn, 300, -100)
    this.enter_room_btn = new Button(resources.enter_room, resources.enter_room_on, resources.enter_room_off)
    offsetRight(this.enter_room_btn, 270, 100)
    this.resume_room_btn = new Button(resources.resume_room, resources.resume_room_on, resources.resume_room_off)
    offsetRight(this.resume_room_btn, 280, -100)
    this.resume_room_btn.setEnabled(false)
    this.btn_bg = new Sprite(resources.game_bg)
    offsetRight(this.btn_bg, 280, 0)

    // 输入房间号码面板
    this.enter_room_panel = new EnterRoomPanel({
      delete_number_btn: resources.delete_number_btn,
      delete_number_btn_on: resources.delete_number_btn_on,
      number_bg: resources.number_bg,
      num_btns: [
        [resources.num0, resources.num0_on],
        [resources.num1, resources.num1_on],
        [resources.num2, resources.num2_on],
        [resources.num3, resources.num3_on],
        [resources.num4, resources.num4_on],
        [resources.num5, resources.num5_on],
        [resources.num6, resources.num6_on],
        [resources.num7, resources.num7_on],
        [resources.num8, resources.num8_on],
        [resources.num9, resources.num9_on]
      ],
    })

    bindClick(this.enter_room_btn, () => this.enter_room_panel.show())

    this.addChild(this.bg)
    this.addChild(this.mm)
    this.addChild(this.userAvatar)
    this.addChild(this.userId)
    this.addChild(this.userNickname)
    this.addChild(this.userDiamond)
    this.addChild(this.message_bar)
    this.addChild(this._13shui_btn)
    this.addChild(this.niuniu_btn)
    this.addChild(this.btn_bg)
    this.addChild(this.enter_room_btn)
    this.addChild(this.resume_room_btn)
    this.addChild(this.enter_room_panel)
    this.addChild(this.setting)
    this.addChild(this.loading)
    this.addChild(this.alert)

    let img = await loadImg(this.userInfo.avatar)
    this.userAvatar.setTexture(img)
    this.userAvatar.setScale(100 / this.userAvatar.getContentSize().width)
  },
  onEnter() {
    this._super()

    bindScene(this)
  },
  onEnterRoom(roomId) {
    cc.log('进入房间', roomId)
    this.loading.setTitle('加载中...').show()
    EnterRoomPacket(getConnect(), roomId)
  },
  onWsMessage({data, target}) {
    let packet = new Packet(data)
    cc.log('接收', packet.toHexString())
    switch (packet.readHead()) {
      case ENTER_ROOM:
        break;
      default:
        break;
    }
  },
  onWsClose(err) {
    this.loading.setTitle('链接中...').show()
    this.alert.show('断开链接', '错误', false)
  },
})

Class.resources = resources
Class.className = 'Hall'

export default Class