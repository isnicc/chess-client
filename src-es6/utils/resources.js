/**
 * Created by zhuangjianjia on 17-6-9.
 */

export const mapButtons = (url, off = true, on = true) => {
  let path = url.split('/').filter(v => v)
  let base = path.pop().split('.').shift()
  if (path[0] !== 'res') {
    path.unshift('res')
  }
  path = path.join('/')
  let k = base
  if (/^[0-9]/.test(base)) {
    k = '_' + base
  }
  let btn = {
    [k]: `${path}/${base}.png`,
  }
  if (on) btn[`${k}_on`] = `${path}/${base}_on.png`
  if (off) btn[`${k}_off`] = `${path}/${base}_off.png`
  return btn
}
