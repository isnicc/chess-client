/**
 * Created by zhuangjianjia on 17-6-1.
 */
import cc, {
  director,
  TransitionFade,
  EventListener,
  eventManager,
} from '@cc'
import {preload} from 'utils/loader'
import {get} from 'utils/registry'
import {Button} from '@ccui'
import {playBling} from 'src/audio'

export const runScene = async sceneClass => {
  let scene = await get(sceneClass.className || sceneClass.toString(), async() => {
    const resources = sceneClass.resources || []
    await preload(resources)
    return new sceneClass
  })
  let transition = new TransitionFade(1, scene)
  director.runScene(transition)
}

export const bindClick = (sprite, callback, bling = playBling) => {
  if (sprite instanceof Array) {
    callArray(sprite, n => bindClick(n, callback, bling))
  } else if (sprite instanceof Button) {
    sprite.addClickEventListener(() => {
      bling && bling()
      callback && callback(sprite)
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
          bling && bling()
          callback(sprite, touch, event)
        }
        return true
      },
    }
    eventManager.addListener(ev, sprite)
  }
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

export const offsetCenter = (node, offsetX = 0, offsetY = 0) => node.setPosition(cc.winSize.width / 2 + offsetX, cc.winSize.height / 2 + offsetY)

export const offsetUpLeft = (node, offsetX = 0, offsetY = 0) => node.setPosition(offsetX, cc.winSize.height - offsetY)

export const offsetUpRight = (node, x = 0, y = 0) => node.setPosition(cc.winSize.width - x, cc.winSize.height - y)

export const offsetDownRight = (node, x = 0, y = 0) => node.setPosition(cc.winSize.width - x, y)

export const offsetDownLeft = (node, x = 0, y = 0) => node.setPosition(x, y)

export const offsetUp = (node, offset = 0, offsetX = 0) => offsetCenter(node, offsetX, cc.winSize.height / 2 - offset)

export const offsetRight = (node, offset = 0, offsetY = 0) => offsetCenter(node, cc.winSize.width / 2 - offset, offsetY)

export const offsetDown = (node, offset = 0, offsetX = 0) => offsetCenter(node, offsetX, offset - cc.winSize.height / 2)

export const offsetLeft = (node, offset = 0, offsetY = 0) => offsetCenter(node, offset - cc.winSize.width / 2, offsetY)

export const callArray = (array, callback) => array.forEach((obj, i) => callback(obj, i))

