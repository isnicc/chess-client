/**
 * Created by zhuangjianjia on 17-4-26.
 */
import cc from '@cc'

const WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;

const host = '0.0.0.0'
const port = 8484

const binds = {}

let connector = null,
  connected = false,
  tryTimes = 0

const callFunc = (obj, func, ...params) => {
  if (func in obj === true && typeof obj[func] === 'function') {
    obj[func].call(obj, ...params)
  }
}

export const isConnect = () => connected

export const register = (bind) => {
  if (bind && bind.__instanceId > 0) {
    binds[bind.__instanceId] = bind
  }
}

export const unregister = (bind) => {
  if (bind && bind.__instanceId > 0) {
    delete binds[bind.__instanceId]
  }
}

export const getConnection = () => connector || (connector = (() => {
  let ws = new WebSocket(`ws://${host}:${port}`)
  ws.onopen = e => {
    connected = true
    for (let i in binds) callFunc(binds[i], 'onWsOpen', e)
  }
  ws.onmessage = e => {
    for (let i in binds) callFunc(binds[i], 'onWsMessage', e)
  }
  ws.onerror = e => {
    for (let i in binds) {
      callFunc(binds[i], 'onWsError', e)
    }
  }
  ws.onclose = e => {
    for (let i in binds) callFunc(binds[i], 'onWsClose', e)
  }
  return ws
})())

export const tryConnect = () => {
  if (isConnect() === false) {
    connector = null
    getConnection()
  }
}

export const close = () => {
  if (connected) {
    (connected = false) || getConnection().close()
  } else {
    cc.log('尚未连接')
  }
}

export const send = pack => {
  if (connected) {
    getConnection().send(pack)
  } else {
    cc.log('尚未连接')
  }
}