/**
 * Created by zhuangjianjia on 17-6-7.
 */
import cc from '@cc'
import {ENTER_ROOM} from 'packets/sender'
import Packet from 'datastructs/Packet'

export default (socket, roomId) => {
  let packet = new Packet(ENTER_ROOM)

  packet.writeString(roomId)

  socket.send(packet.toArrayBuffer())
  cc.log('发送进入房间封包', packet.toHexString())
}
