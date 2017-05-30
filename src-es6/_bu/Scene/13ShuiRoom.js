/**
 * Created by zhuangjianjia on 17/5/23.
 */
import cc, {
  Scene,
  winSize as size,
  Rect,
  Sprite,
} from '@cc'
import Card from '../Sprite/Card'
import {get} from '../utils/registry'

export const resources = {
  cards_plist: 'res/game/cards.plist',
  cards: 'res/game/cards.png',
  bg: 'res/ui/bg/room.png',
}

export default Scene.extend({
  ctor() {
    this._super()
    cc.spriteFrameCache.addSpriteFrames(resources.cards_plist, get('cards', () => cc.textureCache.addImage(resources.cards)))

    this.bg = new Sprite(resources.bg)
    this.bg.setPosition(size.width / 2, size.height / 2)
    this.addChild(this.bg)
    return true
  },
  onEnter() {
    this._super()

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
})


// for (let i = 1; i < 14; ++i) {
//   let card = new Card(`heitao${i}`)
//   card.setPosition(50 + (i - 1) * 95, 600)
//   this.addChild(card)
//   let card2 = new Card(`meihua${i}`)
//   card2.setPosition(50 + (i - 1) * 95, 450)
//   this.addChild(card2)
//   let card3 = new Card(`fangkuai${i}`)
//   card3.setPosition(50 + (i - 1) * 95, 300)
//   this.addChild(card3)
//   let card4 = new Card(`hongxin${i}`)
//   card4.setPosition(50 + (i - 1) * 95, 150)
//   this.addChild(card4)
// }