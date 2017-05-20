/**
 * Created by zhuangjianjia on 17/5/17.
 */
import cc, {
  Layer,
  MenuItemImage,
  Menu,
  winSize as size,
  Sprite,
} from '@cc'

export default Layer.extend({
  ctor(niuniu, niuniu_on, _13shui, _13shui_on, resume, resume_on, resume_off, enter, enter_on, enter_off, game_btn_bg) {
    this._super()

    this.niuniu_btn = new MenuItemImage(niuniu, niuniu_on, () => this.parent.onClickNiuNiu())

    this._13shui_btn = new MenuItemImage(_13shui, _13shui_on, () => this.parent.onClick13Shui())

    this.niuniu_btn.setPosition(size.width / 2 - 380, size.height / 2 - 75)
    this._13shui_btn.setPosition(size.width / 2 - 380, size.height / 2 + 100)

    this.menu = new Menu(this.niuniu_btn, this._13shui_btn)
    this.menu.setPosition(0, 0)

    this.room_bg = new Sprite(game_btn_bg)
    this.room_bg.setPosition(size.width / 2 + 380, size.height / 2)

    this.enter_room_btn = new MenuItemImage(enter, enter_on, enter_off, () => this.parent.onClickEnterRoom(), this)
    this.enter_room_btn.setPosition(size.width / 2 + 390, size.height / 2 + 100)
    this.resume_room_btn = new MenuItemImage(resume, resume_on, resume_off, () => this.parent.onClickResumeRoom(), this)
    this.resume_room_btn.setPosition(size.width / 2 + 380, size.height / 2 - 75)
    this.resume_room_btn.setEnabled(false)
    this.room_menu = new Menu(this.enter_room_btn, this.resume_room_btn)
    this.room_menu.setPosition(0, 0)
    return true
  },
  onEnter() {
    this._super()
    this.addChild(this.menu)
    this.addChild(this.room_bg)
    this.addChild(this.room_menu)
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
})