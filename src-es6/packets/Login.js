/**
 * Created by zhuangjianjia on 17-6-7.
 */
import cc from '@cc'
import {LOGIN} from 'packets/sender'
import Packet from 'datastructs/Packet'

export default (socket, loginKey) => {
  let packet = new Packet(LOGIN)

  packet.writeString(loginKey)

  socket.send(packet.toString())
  cc.log('发送封包', packet.toHexString())
}
