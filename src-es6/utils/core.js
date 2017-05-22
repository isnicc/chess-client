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
  return new Promise(resolve => {
    let opacity = 1,
      opacityFunc = () => {
        layer.setOpacity(opacity += step)
        if (opacity >= max) {
          resolve()
          layer.setOpacity(max)
          layer.unschedule(opacityFunc)
        }
      }

    layer.setOpacity(opacity)
    layer.setVisible(true)
    layer.schedule(opacityFunc, interval)
  })
}

export const fadeOut = (layer, step, interval, max = 255) => {
  return new Promise(resolve => {
    let opacity = max,
      opacityFunc = () => {
        layer.setOpacity(opacity -= step)
        if (opacity <= 0) {
          layer.setOpacity(0)
          layer.unschedule(opacityFunc)
          layer.setVisible(false)
          resolve()
        }
      }

    layer.setOpacity(opacity)
    layer.schedule(opacityFunc, interval)
  })
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
        if (target.parent) {
          if (target.parent.isVisible() === false) return false
          if (target.opacity <= 0) return false
        }
        if (target.isVisible() === false) return false
        if (target.opacity <= 0) return false
        if (isTouchInside(target, touch) === false) return false

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

export const mapFadeInOutPanel = {
  setOpacity(opacity) {
    this._super && this._super(opacity)
    for (let node of this.children) {
      node.setOpacity(opacity)
    }
  },
  _show(step = 25, inter = 0.0066667, maxOpacity = 255) {
    for (let node of this.children) {
      node.setVisible(true)
    }
    fadeIn(this, step, inter, maxOpacity)
  },
  async _hide(step = 25, inter = 0.0066667, maxOpacity = 255) {
    await fadeOut(this, step, inter, maxOpacity)
    for (let node of this.children) {
      node.setVisible(false)
    }
  },
}
