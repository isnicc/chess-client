/**
 * Created by zhuangjianjia on 17-6-7.
 */
import {HELLO} from 'packets/headers'
import Packet from 'datastructs/Packet'

export default socket => {
  let packet = new Packet(HELLO)

  packet.writeString('hello')

  cc.log(packet.toHexString())
  socket.send(packet.toString())
}
