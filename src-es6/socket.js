/**
 * Created by zhuangjianjia on 17-6-6.
 */
import {WS_IP, WS_PORT} from 'src/config'

let socket = null

let scene = null

export const getConnect = () => {
  if (!socket) {
    socket = new WebSocket(`ws://${WS_IP}:${WS_PORT}`)
  }
  return socket
}

export const bindScene = _scene => scene = _scene

export const getBindScene = () => scene

export const callSceneCallback = (callBackName, evt, defaultCallback = {}) => {
  let scene = getBindScene()
  let callDefault = true
  if (scene && scene[callBackName]) {
    callDefault = scene[callBackName].call(scene, evt)
  }
  if (callDefault !== false) {
    defaultCallback[callBackName] && defaultCallback[callBackName].call(scene, evt)
  }
}

export const initialization = (defaultCallback = {}) => {
  let socket = getConnect()

  socket.onopen = evt => callSceneCallback('onWsOpen', evt, defaultCallback)

  socket.onmessage = evt => callSceneCallback('onWsMessage', evt, defaultCallback)

  socket.onerror = evt => callSceneCallback('onWsError', evt, defaultCallback)

  socket.onclose = evt => callSceneCallback('onWsClose', evt, defaultCallback)
}