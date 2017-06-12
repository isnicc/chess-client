/**
 * Created by zhuangjianjia on 17-6-7.
 */
import cc from '@cc'
import {HELLO} from 'packets/sender'
import Packet from 'datastructs/Packet'
import {VERSION} from 'src/constances'

export default socket => {
  let packet = new Packet(HELLO)

  packet.writeRandomByte()

  cc.log('发送Hello封包', packet.toHexString())
  socket.send(packet.toArrayBuffer())
}
