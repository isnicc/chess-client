/**
 * Created by zhuangjianjia on 17-4-26.
 */
import {Buffer} from 'safe-buffer'

import cc from '@cc'

export default class Packet {
  constructor(data = null) {
    this.offset = 0
    if (typeof data === 'string') {
      this.buffer = Buffer.from(data) // Uint8Array
    } else {
      this.buffer = Buffer.alloc(parseInt(data)) // Uint8Array
    }
  }

  toPack() {
    let buf = Buffer.alloc(4)
    let length = this.offset
    buf.writeUInt32BE(length)
    return buf.toString() + this.read(0, length)
  }

  write(buf, offset, length) {
    return this.buffer.write(buf, offset, length)
  }

  read(start, length) {
    return this.buffer.slice(start, start + length).toString()
  }

  resize(n) {
    if (n <= 0) {
      return
    }
    this.offset = 0
    if (this.buffer.length > n) {
      // 截断
      this.buffer = this.buffer.slice(0, n)
    } else if (this.buffer.length < n) {
      // 变长
      let data = this.buffer.toString()
      this.buffer = Buffer.alloc(n)
      this.write(data)
    }
  }

  toString() {
    return this.buffer.slice(0, this.offset).toString()
  }

  toHexString() {
    return Array.from(this.buffer.slice(0, this.offset).values()).map(n => n.toString(16).padStart(2, '0')).join(' ')
  }

  readByte() {
    try {
      let val = this.buffer.readInt8(this.offset)
      this.offset++
      return val
    } catch (e) {
      return null
    }
  }

  readUByte() {
    try {
      let val = this.buffer.readUInt8(this.offset)
      this.offset++
      return val
    } catch (e) {
      return null
    }
  }

  readShort() {
    try {
      let val = this.buffer.readInt16BE(this.offset)
      this.offset += 2
      return val
    } catch (e) {
      return null
    }
  }

  readUShort() {
    try {
      let val = this.buffer.readUInt16BE(this.offset)
      this.offset += 2
      return val
    } catch (e) {
      return null
    }
  }

  readInt() {
    try {
      let val = this.buffer.readInt32BE(this.offset)
      this.offset += 4
      return val
    } catch (e) {
      return null
    }
  }

  readUInt() {
    try {
      let val = this.buffer.readUInt32BE(this.offset)
      this.offset += 4
      return val
    } catch (e) {
      return null
    }
  }

  readFloat() {
    try {
      let val = this.buffer.readFloatBE(this.offset)
      this.offset += 4
      return val
    } catch (e) {
      return null
    }
  }

  readDouble() {
    try {
      let val = this.buffer.readDoubleBE(this.offset)
      this.offset += 8
      return val
    } catch (e) {
      return null
    }
  }

  readString() {
    let l = this.readUInt()
    if (l > 0) {
      let str = this.read(this.offset, l)
      this.offset += str.length
      return str
    } else {
      return null
    }
  }

  writeByte(byte) {
    try {
      this.buffer.writeInt8(byte, this.offset)
      this.offset += 1
      return byte
    } catch (e) {
      return null
    }
  }

  writeUByte(ubyte) {
    try {
      this.buffer.writeUInt8(ubyte, this.offset)
      this.offset += 1
      return ubyte
    } catch (e) {
      return null
    }
  }

  writeShort(short) {
    try {
      this.buffer.writeInt16BE(short, this.offset)
      this.offset += 2
      return short
    } catch (e) {
      return null
    }
  }

  writeUShort(ushort) {
    try {
      this.buffer.writeUInt16BE(ushort, this.offset)
      this.offset += 2
      return ushort
    } catch (e) {
      return null
    }
  }

  writeInt(int) {
    try {
      this.buffer.writeInt32BE(int, this.offset)
      this.offset += 4
      return int
    } catch (e) {
      return null
    }
  }

  writeUInt(uint) {
    try {
      this.buffer.writeUInt32BE(uint, this.offset)
      this.offset += 4
      return uint
    } catch (e) {
      return null
    }
  }

  writeFloat(float) {
    try {
      this.buffer.writeFloatBE(float, this.offset)
      this.offset += 4
      return float
    } catch (e) {
      return null
    }
  }

  writeDouble(double) {
    try {
      this.buffer.writeDoubleBE(double, this.offset)
      this.offset += 8
      return double
    } catch (e) {
      return null
    }
  }

  writeString(string) {
    try {
      if (string.length === this.writeUInt(string.length)) {
        if (string.length === this.write(string, this.offset, string.length)) {
          this.offset += string.length
          return string
        }
      }
    } catch (e) {
    }
    return null
  }
}