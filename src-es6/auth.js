/**
 * Created by zhuangjianjia on 17-6-7.
 */
import {getItem, setItem} from 'utils/store'

const USER_KEY = 'user'

export const getUser = () => getItem(USER_KEY, {
  id: null,
  open_id: null,
  login_key: null,
  nickname: null,
  avatar: null,
})