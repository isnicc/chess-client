/**
 * Created by zhuangjianjia on 17/5/1.
 */
import base64_encode from 'locutus/php/url/base64_encode'
import base64_decode from 'locutus/php/url/base64_decode'
import {md5, ord, chr} from 'locutus/php/strings'
import {microtime, time} from 'locutus/php/datetime'

const createBox = cryptkey => {
  let box = new Array(256).fill(0).map((v, i) => i)
  let rndkey = new Array(256).fill(0).map((v, i) => cryptkey.charCodeAt(i % cryptkey.length))

  for (let i = 0, j = 0; i < 256; ++i) {
    j = (j + box[i] + rndkey[i]) % 256;
    [box[i], box[j]] = [box[j], box[i]]
  }
  return box
}

export const encode = (str, key = '', expiry = 0) => {
  let ckey_length = 4
  key = md5(key)
  let keya = md5(key.substr(0, 16))
  let keyb = md5(key.substr(16, 16))
  let md5_time = md5(microtime()), keyc = md5_time.substr(md5_time.length - ckey_length, ckey_length)
  let cryptkey = keya + md5(keya + keyc)

  let strbuf

  expiry = expiry ? expiry + time() : 0
  str = expiry.toString().substr(0, 10).padStart(10, '0') + md5(str + keyb).substr(0, 16) + str
  strbuf = str

  let box = createBox(cryptkey)
  // 核心加解密部分
  let s = ''
  for (let a = 0, i = 0, j = 0; i < strbuf.length; ++i) {
    a = (a + 1) % 256
    j = (j + box[a]) % 256;
    [box[a], box[j]] = [box[j], box[a]]
    // 从密匙簿得出密匙进行异或，再转成字符
    s += chr(ord(strbuf[i]) ^ (box[(box[a] + box[j]) % 256]))
  }
  s = base64_encode(s)
  s = s.replace(/=/g, '')
  s = keyc + s

  return s
}

export const decode = (str, key = '') => {
  let ckey_length = 4
  key = md5(key.toString())
  let keya = md5(key.substr(0, 16))
  let keyb = md5(key.substr(16, 16))
  let keyc = str.substr(0, ckey_length)
  let cryptkey = keya + md5(keya + keyc)

  let strbuf

  str = str.substr(ckey_length)
  strbuf = base64_decode(str)

  let box = createBox(cryptkey)
  // 核心加解密部分
  let s = ''
  for (let a = 0, i = 0, j = 0; i < strbuf.length; ++i) {
    a = (a + 1) % 256
    j = (j + box[a]) % 256;
    [box[a], box[j]] = [box[j], box[a]]
    // 从密匙簿得出密匙进行异或，再转成字符
    s += chr(ord(strbuf[i]) ^ (box[(box[a] + box[j]) % 256]))
  }

  // 校验
  if ((s.substr(0, 10) == 0 || s.substr(0, 10) - time() > 0) && s.substr(10, 16) == md5(s.substr(26) + keyb).substr(0, 16)) {
    return s.substr(26)
  }
  return ''
}
