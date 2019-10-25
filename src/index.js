import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/desktop'
// import registerServiceWorker from './registerServiceWorker'

import './app/global'
import './assets/stylesheets/all.scss'

const fisrt_url = window.location.href.split('return_uri=')

global.USER_HOST =
  process.env.WECHAT_BROKER_HOST || `https://${window.location.host}`
/**
 * iOS 策略:
 * 1. 记住第一次进来的url，进行config认证
 * 2. 从wechat-dev.letote.cn || wechat-dev.letote.cn/ 进入时可能会config认证失败
 * yo yo yo !!!
 * 故做已下处理 如若不知其意 please ask me
 */
global.FIRST_URL = fisrt_url[1] ? fisrt_url[1] : fisrt_url[0]
// .replace(/\/$/, '/home')
// .replace(/.cn\/\?/, '.cn/home?')

ReactDOM.render(<App />, document.getElementById('root'))
//NOTE: 暂时去掉
// registerServiceWorker()
