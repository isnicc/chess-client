/**
 * Created by zhuangjianjia on 17/4/30.
 */
import Pack from '../Common/Packet'

const LOGIN = 0;

export default function pack(login_key) {
  let pack = new Pack(100)
  pack.writeUInt(LOGIN) // 包头
}