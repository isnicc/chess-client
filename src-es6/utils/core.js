/**
 * Created by zhuangjianjia on 17-6-1.
 */
import cc, {
  director, TransitionFade,
  EventListener, eventManager,
} from '@cc'
import {preload} from 'utils/loader'
import {get} from 'utils/registry'
import {Button} from '@ccui'
import {playBling} from 'src/audio'

export const runScene = (() => async(sceneClass) => {
  let scene = await get(sceneClass.toString(), async() => {
    const resources = sceneClass.resources || []
    await preload(resources)
    return new sceneClass
  })
  director.runScene(new TransitionFade(0.33, scene))
})()


export const bindClick = (sprite, callback, bling = playBling) => {
  if (sprite instanceof Array) {
    sprite.forEach(e => bindClick(e, callback, bling))
  } else if (sprite instanceof Button) {
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

export const isTouchInside = (owner, touch) => {
  if (!owner || !owner.getParent()) return false
  let touchLocation = owner.getParent().convertToNodeSpace(touch.getLocation())
  return cc.rectContainsPoint(owner.getBoundingBox(), touchLocation)
}