/**
 * Created by zhuangjianjia on 17/4/30.
 */

import axios from 'axios'

const client = axios.create({
  baseURL: 'http://0.0.0.0:8001',
  timeout: 1000,
})

export const httpGet = (url, config) => client.get(url, config)

