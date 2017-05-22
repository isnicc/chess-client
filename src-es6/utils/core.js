/**
 * Created by zhuangjianjia on 17/5/2.
 */
import cc, {
  EventListener,
  eventManager,
  audioEngine,
} from '@cc'
import globalResource from '../resources'
import {Button} from '@ccui'

export const canWechatLogin = () => {
  return false
}

export const isTouchInside = (owner, touch) => {
  if (!owner || !owner.getParent()) return false
  let touchLocation = owner.getParent().convertToNodeSpace(touch.getLocation())
  return cc.rectContainsPoint(owner.getBoundingBox(), touchLocation)
}

export const fadeIn = (layer, step, interval, max = 255) => {
  let opacity = 1,
    opacityFunc = () => {
      layer.setOpacity(opacity += step)
      if (opacity >= max) {
        layer.setOpacity(max)
        layer.unschedule(opacityFunc)
      }
    }

  layer.setOpacity(opacity)
  layer.setVisible(true)
  layer.schedule(opacityFunc, interval)
}

export const fadeOut = (layer, step, interval, max = 255) => {
  let opacity = max,
    opacityFunc = () => {
      layer.setOpacity(opacity -= step)
      if (opacity <= 0) {
        layer.setOpacity(0)
        layer.unschedule(opacityFunc)
        layer.setVisible(false)
      }
    }

  layer.setOpacity(opacity)
  layer.schedule(opacityFunc, interval)
}

export const bindClick = (sprite, callback, bling = clickBling) => {
  if (sprite instanceof Array) {
    sprite.forEach(e => bindClick(e, callback))
  }
  else if (sprite instanceof Button) {
    sprite.addClickEventListener(() => {
      bling()
      callback && callback()
    })
  } else {
    const ev = {
      event: EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: (touch, event) => {
        let target = event.getCurrentTarget()
        if (!target.isVisible()) return false
        if (!isTouchInside(target, touch)) return false

        if (callback) {
          bling()
          callback(touch, event)
        }
        return true
      },
    }
    eventManager.addListener(ev, sprite)
  }
}

export const clickBling = () => audioEngine.playEffect(globalResource.audio_click)