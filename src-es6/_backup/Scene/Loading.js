import cc from '@cc'

const LoadingScene = cc.Scene.extend({
  _label: null,
  _bgLayer: null,
  _endLoadingCb: null,

  resources: null,
  cb: null,
  target: null,

  loadTime: 1,

  ctor(resources, cb, target) {
    this._super()

    if (cc.isString(resources)) resources = [resources]
    this.resources = resources || []
    this.cb = cb
    this.target = target || this

    let bgLayer = this._bgLayer = new cc.LayerColor(cc.color(255, 255, 255, 255))
    this.addChild(bgLayer)
    let label = this._label = new cc.LabelTTF('加载中...', 'Arial', 24)
    label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, 0)))
    label.setColor(cc.color(0, 0, 0))
    bgLayer.addChild(label)
    return true
  },
  onEnter() {
    this._super()
    this.scheduleOnce(this._endLoading, this.loadTime)
    this._startLoading()
  },
  onExit() {
    this._super()
    // 解除绑定事件
  },
  onExitTransitionDidStart() {
    this._super()
  },
  _startLoading() {
    cc.loader.load(this.resources, (result, count, loadedCount) => {
      loadedCount += 1
      if (loadedCount === count) {
        this._label.setString('加载完成')
      } else {
        this._label.setString("加载 " + ((loadedCount / count * 100) | 0) + "%")
      }
    }, () => {
      if (this._endLoadingCb === true) {
        this.cb && this.cb.call(this.target)
      } else {
        this._endLoadingCb = this.cb
      }
    })
  },

  _endLoading() {
    this._endLoadingCb && this._endLoadingCb.call(this.target)
    this._endLoadingCb = true
  },
})

export default LoadingScene