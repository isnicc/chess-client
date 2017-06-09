/**
 * Created by zhuangjianjia on 17/6/1.
 */
import cc, {Scene, Sprite, winSize} from '@cc'
import CardData from 'datastructs/Card'
import NiuNiuPanel from 'layers/NiuNiuPanel'
import RoomInfo from 'layers/RoomInfo'
import {offsetCenter, callArray, bindClick} from 'utils/core'
import {mapButtons} from 'utils/resources'

const resources = {
  bg: 'res/game/niuniu/bg/bg.png',
  ...mapButtons('game/niuniu/buttons/bull'),
  ...mapButtons('game/niuniu/buttons/bull_null'),
  ...mapButtons('game/niuniu/buttons/bull_special'),
}

const Class = Scene.extend({
  ctor() {
    this._super()

    this.roomUsers = '所有玩家信息 ＋ 玩家状态'

    this.bg = new Sprite(resources.bg)
    offsetCenter(this.bg)

    this.roomInfo = new RoomInfo(resources)
    this.niuniuPanel = new NiuNiuPanel(resources)

    this.addChild(this.bg)
    this.addChild(this.roomInfo)
    this.addChild(this.niuniuPanel)

    this.niuniuPanel.setValues([new CardData('meihua8'), new CardData('fangkuai1'), new CardData('hongxin1'), new CardData('heitao1'), new CardData('meihua2')])
    this.niuniuPanel.setVisible(true)
  },
  onPostCard(cards, special){
    this.niuniuPanel.setVisible(false)
    cc.log(cards, special)
  },
  onReadyChange(ready) {
    cc.log('更改准备', ready)
  }
})

Class.resources = resources
Class.className = 'NiuNiuRoom'

export default Class