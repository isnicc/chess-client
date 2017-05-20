import cc from '@cc'
import {res} from '../resources'

export default cc.LayerColor.extend({
  ctor() {
    this._super(cc.color(255, 255, 255, 255))
    let size = cc.winSize
    let label = new cc.LabelTTF('hi~', 'Arial', 38)
    label.attr({
      x: size.width / 2,
      y: size.height / 2 + 200,
      color: cc.color(0, 0, 0, 0)
    })
    this.addChild(label)

    let sprite = new cc.Sprite(res('HelloWorld.png'))
    cc.log({
      x: size.width / 2,
      y: size.height / 2,
    })
    sprite.attr({
      x: size.width / 2,
      y: size.height / 2,
    })

    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: (touch, event) => {
        let pos = touch.getLocation();
        let target = event.getCurrentTarget();
        if (!cc.rectContainsPoint(target.getBoundingBox(), pos)) return false
        cc.log('click');
      },
    }, sprite)

    this.addChild(sprite)

    return true
  },
})