/**
 * Created by zhuangjianjia on 17-6-7.
 */
import cc from '@cc'
import {REGIST} from 'packets/sender'
import Packet from 'datastructs/Packet'

export default (socket, open_id = null) => {
  let packet = new Packet(REGIST)

  if (open_id) {
    packet.writeByte(1)
    packet.writeString(open_id)
  }
  else packet.writeByte(0)

  socket.send(packet.toString())
  cc.log('发送注册封包', packet.toHexString())
}
