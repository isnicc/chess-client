/**
 * Created by zhuangjianjia on 17-6-7.
 */
import cc from '@cc'
import {LOGIN} from 'packets/headers'
import Packet from 'datastructs/Packet'

export default (socket, loginKey) => {
  let packet = new Packet(LOGIN)

  packet.writeRandomByte()

  packet.writeString(loginKey)

  socket.send(packet.toString())
  cc.log('发送封包', packet.toHexString())
}
