/**
 * Created by zhuangjianjia on 17/5/2.
 */
import cc from '@cc'

export default cc.Layer.extend({
  ctor(logo) {
    this._super()

    this.logoSprite = new cc.Sprite(logo)

    let size = cc.winSize
    this.logoSprite.attr({
      x: size.width / 2,
      y: size.height / 2,
    })
  },
  onEnter() {
    this._super()
    this.addChild(this.logoSprite)
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