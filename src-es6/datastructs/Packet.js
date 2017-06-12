/**
 * Created by zhuangjianjia on 17-6-7.
 */
import {Buffer} from 'safe-buffer'

export default class Packet {
  /**
   * 包体积
   * @type {number}
   */
  size = 32
  /**
   * 包长度
   * @type {number}
   */
  length = 6

  /**
   *
   * @type {Buffer}
   */
  buffer = null

  static fromHexString(hex, sep = ' ') {
    return new Packet(Buffer.from(hex.split(sep).join(''), 'hex'))
  }

  /**
   * 构造函数
   * @param data
   * @param size
   */
  constructor(data, size = 32) {
    size = size || this.size
    if (typeof data === "number") {
      this.buffer = Buffer.alloc(size)
      this.writeHead(data)
      return
    } else {
      if (data instanceof Buffer || typeof data === 'string' || data instanceof ArrayBuffer) {
        this.buffer = data instanceof Buffer ? data : Buffer.from(data)
        this.length = this.readPackLength()
        this.size = this.length
        if (this.length !== this.buffer.length) {
          throw new Error('非法内容')
        }
        return
      }
    }
    throw new Error('非法的类型')
  }

  writeHead(head) {
    this.buffer.writeUInt16BE(head, 4, false)
  }

  writePackLength(packLength) {
    this.buffer.writeUInt32BE(packLength, 0, false)
  }

  readHead() {
    return this.buffer.readUInt16BE(4, false)
  }

  readPackLength() {
    return this.buffer.readUInt32BE(0, false)
  }

  lengthWritable(length) {
    if (this.length + length > this.size) {
      this.size = Math.pow(2, Math.ceil(Math.log2(Math.max(this.length + length, this.size))))
      let newBuf = Buffer.alloc(this.size)
      this.buffer.copy(newBuf, 0, 0, this.length)
      this.buffer = newBuf
    }
  }

  writeByte(byte) {
    this.lengthWritable(1)
    this.buffer.writeInt8(byte, this.length, false)
    this.length += 1
  }

  writeUByte(byte) {
    this.lengthWritable(1)
    this.buffer.writeUInt8(byte, this.length, false)
    this.length += 1
  }

  writeShort(short) {
    this.lengthWritable(2)
    this.buffer.writeInt16BE(short, this.length, false)
    this.length += 2
  }

  writeUShort(short) {
    this.lengthWritable(2)
    this.buffer.writeUInt16BE(short, this.length, false)
    this.length += 2
  }

  writeInt(int) {
    this.lengthWritable(4)
    this.buffer.writeInt32BE(int, this.length, false)
    this.length += 4
  }

  writeUInt(int) {
    this.lengthWritable(4)
    this.buffer.writeUInt32BE(int, this.length, false)
    this.length += 4
  }

  writeLong(long) {
    this.lengthWritable(8)
    this.buffer.writeIntBE(long, this.length, 8, false)
    this.length += 8
  }

  writeULong(long) {
    this.lengthWritable(8)
    this.buffer.writeUIntBE(long, this.length, 8, false)
    this.length += 8
  }

  writeFloat(float) {
    this.lengthWritable(4)
    this.buffer.writeFloatBE(float, this.length, false)
    this.length += 4
  }

  writeDouble(double) {
    this.lengthWritable(8)
    this.buffer.writeDoubleBE(double, this.length, false)
    this.length += 8
  }

  writeString(string) {
    if (typeof string !== "string") {
      throw new Error('必须写入字符串')
    }
    let buf = Buffer.from(string)
    this.writeUInt(buf.length)
    this.lengthWritable(buf.length)
    this.buffer.write(buf.toString(), this.length, buf.length)
    this.length += buf.length
  }

  writeRandomByte(repeat = 1) {
    for (let i = 0; i < repeat; ++i) {
      this.writeUByte(Math.floor(Math.random() * 256))
    }
  }

  writeRandomShort(repeat = 1) {
    for (let i = 0; i < repeat; ++i) {
      this.writeUShort(Math.floor(Math.random() * 65536))
    }
  }

  writeRandomInt(repeat = 1) {
    for (let i = 0; i < repeat; ++i) {
      this.writeUInt(Math.floor(Math.random() * 4294967296))
    }
  }

  /**
   * 读偏移量
   * @type {number}
   */
  offset = 6

  lengthCheckRead(length) {
    if (this.offset + length > this.length) {
      throw new Error('超出可读范围')
    }
  }

  readByte() {
    this.lengthCheckRead(1)
    let b = this.buffer.readInt8(this.offset, false)
    this.offset += 1
    return b
  }

  readUByte() {
    this.lengthCheckRead(1)
    let b = this.buffer.readUInt8(this.offset, false)
    this.offset += 1
    return b
  }

  readShort() {
    this.lengthCheckRead(2)
    let b = this.buffer.readInt16BE(this.offset, false)
    this.offset += 2
    return b
  }

  readUShort() {
    this.lengthCheckRead(2)
    let b = this.buffer.readUInt16BE(this.offset, false)
    this.offset += 2
    return b
  }

  readInt() {
    this.lengthCheckRead(4)
    let b = this.buffer.readInt32BE(this.offset, false)
    this.offset += 4
    return b
  }

  readUInt() {
    this.lengthCheckRead(4)
    let b = this.buffer.readUInt32BE(this.offset, false)
    this.offset += 4
    return b
  }

  readLong() {
    this.lengthCheckRead(8)
    let b = this.buffer.readIntBE(this.offset, 8, false)
    this.offset += 8
    return b
  }

  readULong() {
    this.lengthCheckRead(8)
    let b = this.buffer.readUIntBE(this.offset, 8, false)
    this.offset += 8
    return b
  }

  readFloat() {
    this.lengthCheckRead(4)
    let b = this.buffer.readFloatBE(this.offset, false)
    this.offset += 4
    return b
  }

  readDouble() {
    this.lengthCheckRead(8)
    let b = this.buffer.readDoubleBE(this.offset, false)
    this.offset += 8
    return b
  }

  readString() {
    this.lengthCheckRead(4)
    let length = this.readUInt()
    this.lengthCheckRead(length)
    let b = this.buffer.toString('utf8', this.offset, this.offset + length)
    this.offset += length
    return b
  }

  skip(length) {
    this.lengthCheckRead(length)
    this.offset += length
  }

  toString() {
    this.writePackLength(this.length)
    return this.buffer.toString('ascii', 0, this.length)
  }

  toHexString(sep = ' ') {
    this.writePackLength(this.length)
    return this.buffer.toString('hex', 0, this.length).split('').map((c, i, arr) => i % 2 === 0 ? c + arr[i + 1] : null).filter(v => v).join(sep)
  }

  toArrayBuffer() {
    this.writePackLength(this.length)
    return this.buffer.slice(0, this.length)
  }
}