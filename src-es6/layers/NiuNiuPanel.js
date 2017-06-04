/**
 * Created by zhuangjianjia on 17/6/2.
 */

import cc, {Layer} from '@cc'
import Card from 'sprites/Card'
import {offsetCenter, callArray, bindClick} from 'utils/core'
import {bull, bestBull} from 'utils/tools'
import {Button} from '@ccui'

const Class = Layer.extend({
  ctor(resources) {
    this._super()

    this.setVisible(false)
    this.resources = resources

    this.cards = [new Card, new Card, new Card, new Card, new Card]
    this.values = [null, null, null, null, null]
    this.actives = [false, false, false, false, false]

    this.buttons = [new Button(resources.bull, resources.bull_on, resources.bull_off), new Button(resources.bull_null, resources.bull_null_on, resources.bull_null_off)]

    callArray(this.cards, (card, i) => offsetCenter(card, (i - 2) * 110, -250))
    callArray(this.cards, (card, i) => {
      bindClick(card, () => {
        if (this.special) return false
        if (this.actives.reduce((v, v2) => v + v2, 0) === 3 && !this.actives[i]) return false
        this._toggleCard(i)

        this._calHasBull()
      }, null)
      this.addChild(card)
    })

    callArray(this.buttons, (btn, i) => offsetCenter(btn, i ? 100 : -100, -100))
    callArray(this.buttons, btn => btn.setEnabled(false) || this.addChild(btn))

    bindClick(this.buttons, () => this.parent.onPostCard && this.parent.onPostCard([...this.values.filter((v, i) => this.actives[i]), ...this.values.filter((v, i) => !this.actives[i])], this.special))

  },

  setValues(values) {
    this.cards.forEach((card, i) => {
      if (this.actives[i]) {
        this._toggleCard(i)
      }
    })

    this.special = false
    this.values = values
    this.bestBull = bestBull(this.values)

    callArray(this.cards, (card, i) => card.setType(this.values[i].toString()))

    let [num, best] = this.bestBull
    if (num > 0 && num <= 10) { // 有牛
      this._toggleCard(this.values.indexOf(best[0]))
      this._toggleCard(this.values.indexOf(best[1]))
      this._toggleCard(this.values.indexOf(best[2]))
    }
    if (num > 10) {
      this.special = true
    }
    this._calHasBull()
  },

  _calHasBull() {
    if (this.special) {
      this.buttons[0].setEnabled(true)
      this.buttons[1].setEnabled(false)
      this.buttons[0].loadTextures(this.resources.bull_special, this.resources.bull_special_on, this.resources.bull_special_off)
    } else {
      this.buttons[0].loadTextures(this.resources.bull, this.resources.bull_on, this.resources.bull_off)
      if (this.actives.reduce((v, v2) => v + v2, 0) === 3) {
        let num = bull([...this.values.filter((v, i) => this.actives[i]), ...this.values.filter((v, i) => !this.actives[i])])
        if (num > 0) {
          this.buttons[0].setEnabled(true)
          this.buttons[1].setEnabled(false)
        } else {
          this.buttons[0].setEnabled(false)
          this.buttons[1].setEnabled(true)
        }
      } else {
        callArray(this.buttons, btn => btn.setEnabled(false))
      }
    }
  },

  _toggleCard(i) {
    let card = this.cards[i]
    this.actives[i] = !this.actives[i]
    let pos = this.actives[i] ? cc.p(card.x, card.y + 20) : cc.p(card.x, card.y - 20)
    card.setPosition(pos)
  }
})

export default Class

