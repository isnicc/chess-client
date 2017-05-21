/**
 * Created by zhuangjianjia on 17/5/2.
 */
import cc, {
  Scene,
  director,
} from '@cc'
import BgLayer from '../Layer/Hall/Bg'
import UserLayer from '../Layer/Hall/User'
import GameLayer from '../Layer/Hall/Game'
import EnterRoomNumberLayer from '../Layer/Hall/EnterRoomNumber'
import {uiPath} from '../utils/path'
import {loadImg, loadText} from '../utils/promise'
import Loading from '../Common/Layer/Loading'
import Alert from '../Common/Layer/Alert'
import CreateNiuNiuRoom from '../Layer/Hall/CreateNiuNiuRoom'
import Create13ShuiRoom from '../Layer/Hall/Create13ShuiRoom'

export const resources = {
  bg: uiPath('bg/hall.png'),
  mm: uiPath('bg/mm.png'),
  hall_bottom_bg: uiPath('bg/hall_bottom_bg.png'),
  text_anti_addiction: uiPath('text/anti_addiction.png'),
  message_icon: uiPath('icon/message.png'),
  message_bar: uiPath('bg/message_bar.png'),

  avatar_border: uiPath('bg/avatar.png'),
  avatar_bg: uiPath('bg/avatar_bg.png'),
  icon_diamond: uiPath('icon/diamond.png'),
  diamond_bar: uiPath('bg/diamond_bar.png'),

  niuniu: uiPath('button/niuniu.png'),
  niuniu_on: uiPath('button/niuniu_on.png'),
  _13shui: uiPath('button/13shui.png'),
  _13shui_on: uiPath('button/13shui_on.png'),
  game_bg: uiPath('bg/game_bg.png'),

  resume_room: uiPath('button/resume_room.png'),
  resume_room_on: uiPath('button/resume_room_on.png'),
  resume_room_off: uiPath('button/resume_room_off.png'),

  enter_room: uiPath('button/enter_room.png'),
  enter_room_on: uiPath('button/enter_room_on.png'),
  enter_room_off: uiPath('button/enter_room_off.png'),

  alert_md: uiPath('bg/alert_md.png'),
  alert_lg: uiPath('bg/alert_lg.png'),
  number_bg: uiPath('bg/number_bg.png'),
  num0: uiPath('button/num0.png'),
  num0_on: uiPath('button/num0_on.png'),
  num1: uiPath('button/num1.png'),
  num1_on: uiPath('button/num1_on.png'),
  num2: uiPath('button/num2.png'),
  num2_on: uiPath('button/num2_on.png'),
  num3: uiPath('button/num3.png'),
  num3_on: uiPath('button/num3_on.png'),
  num4: uiPath('button/num4.png'),
  num4_on: uiPath('button/num4_on.png'),
  num5: uiPath('button/num5.png'),
  num5_on: uiPath('button/num5_on.png'),
  num6: uiPath('button/num6.png'),
  num6_on: uiPath('button/num6_on.png'),
  num7: uiPath('button/num7.png'),
  num7_on: uiPath('button/num7_on.png'),
  num8: uiPath('button/num8.png'),
  num8_on: uiPath('button/num8_on.png'),
  num9: uiPath('button/num9.png'),
  num9_on: uiPath('button/num9_on.png'),
  delete_number_btn: uiPath('button/delete_number_btn.png'),
  delete_number_btn_on: uiPath('button/delete_number_btn_on.png'),
}

export default Scene.extend({
  ctor() {
    this._super()

    this.bg = new BgLayer(resources.bg, resources.mm, resources.hall_bottom_bg, resources.text_anti_addiction, resources.message_bar, resources.message_icon, 'http://127.0.0.1:8000/res/message.txt')
    this.Iuser = new UserLayer(resources.avatar_border, resources.avatar_bg, resources.icon_diamond, resources.diamond_bar)
    this.Igame = new GameLayer(resources.niuniu, resources.niuniu_on, resources._13shui, resources._13shui_on, resources.resume_room, resources.resume_room_on, resources.resume_room_off, resources.enter_room, resources.enter_room_on, resources.enter_room_off, resources.game_bg)
    this.loading = new Loading
    this.alert = new Alert

    this.enter_room_number = new EnterRoomNumberLayer(resources.alert_md, resources.number_bg, [
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
    ], resources.delete_number_btn, resources.delete_number_btn_on)

    this.createNiuNiu = new CreateNiuNiuRoom("牛牛", resources.alert_md)
    this.create13Shui = new Create13ShuiRoom("十三水", resources.alert_md)

    // let img = await loadImg('http://127.0.0.1:8000/res/ui/avatar.png')
    // this.Iuser.setAvatar(img)
    // this.Iuser.setNickname('我甲你尚好就狗家')
    // this.Iuser.setUserId(19999)
    // this.Iuser.setDiamond(999)

    return true
  },
  onEnter() {
    this._super()

    this.addChild(this.bg)
    this.addChild(this.Iuser)
    this.addChild(this.Igame)
    this.addChild(this.enter_room_number)
    this.addChild(this.createNiuNiu)
    this.addChild(this.create13Shui)
    this.addChild(this.loading)
    this.addChild(this.alert)
  },
  onEnterTransitionDidFinish() {
    this._super()

  },
  onExitTransitionDidStart(){
    this._super()

  },
  onExit() {
    this._super()

  },

  onClickEnterRoom() {
    this.Igame.enter_room_btn.setEnabled(false)
    this.enter_room_number.show()
  },
  onClickEnterRoomClose() {
    this.Igame.enter_room_btn.setEnabled(true)
    return true
  },
  onEnterRoom(room_number) {
    this.Igame.enter_room_btn.setEnabled(true)
    this.loading.show('加载中')
    this.scheduleOnce(() => {
      this.loading.hide()
      this.alert.show('不存在的房间')
    }, 0.5)
    cc.log('进入房间', room_number)
  },
  onClickResumeRoom() {
    cc.log('resume')
  },
  onClickAvatar() {
    cc.log('avatar')
  },
  onClick13Shui() {
    this.Igame._13shui_btn.setEnabled(false)
    this.create13Shui.show()
  },
  onClickNiuNiu() {
    this.Igame.niuniu_btn.setEnabled(false)
    this.createNiuNiu.show()
  },
  onClickCreateRoomClose(type) {
    if (type === '牛牛')
      this.Igame.niuniu_btn.setEnabled(true)
    else this.Igame._13shui_btn.setEnabled(true)
    return true
  },
})
