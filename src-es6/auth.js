/**
 * Created by zhuangjianjia on 17-6-7.
 */
import {getItem, setItem} from 'utils/store'

const USER_KEY = 'user'

export const getUser = () => JSON.parse(getItem(USER_KEY, JSON.stringify({
  id: null,
  open_id: null,
  login_key: null,
  nickname: null,
  avatar: null,
  diamond: null,
})))

export const setUser = user => setItem(USER_KEY, JSON.stringify(user))