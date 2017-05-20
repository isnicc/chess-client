/**
 * Created by zhuangjianjia on 17/5/2.
 */
import cc from '@cc'

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