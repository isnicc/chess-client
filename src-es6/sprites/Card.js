/**
 * Created by zhuangjianjia on 17/5/23.
 */
import cc, {
  Sprite,
  spriteFrameCache,
  textureCache,
} from '@cc'
import {cards, ui} from 'src/resources'
import {get} from 'utils/registry'

// 黑桃、红桃、方角、梅花

let inited = false

const init = () => {
  if (!inited) {
    inited = true
    spriteFrameCache.addSpriteFrames(ui.cards_plist, get('cards', () => textureCache.addImage(ui.cards_bg)))
  }
}

export default Sprite.extend({
  ctor(type) {
    init()
    this._super()
    if (type) {
      this.setType(type)
    }
  },
  setType(type) {
    if (cards[type]) {
      this.value = type
      this.setSpriteFrame(spriteFrameCache.getSpriteFrame(cards[type]))
    }
  }
})
