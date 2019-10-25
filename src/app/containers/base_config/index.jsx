import React from 'react'
import Actions from 'src/app/actions/actions'
import { parseQueryString } from 'src/app/lib/parseQueryString'
import ProgressiveImage from 'src/app/components/ProgressiveImage'
import { placeholder_500_750 } from 'src/assets/placeholder'
import dateFns from 'date-fns'
import wxInit from 'src/app/lib/wx_config.js'
import deviceType from 'src/app/lib/device_type'
export default class BaseConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config: null
    }
    this.query = parseQueryString(props.location.search)
    this.configUrl = this.query.config
  }

  componentDidMount() {
    this.handleGetConfig()
    // NOTE：百度统计页面访问
    window._hmt.push(['_trackPageview', window.location.href])
    if (!_.isEmpty(this.query.customer_id)) {
      try {
        window.Sensors.login(this.query.customer_id)
        window.Sensors.quick('autoTrack')
      } catch (error) {
        console.log(error)
      }
    }
  }

  handleGetConfig = () => {
    this.props.dispatch(
      Actions.KolActivity.getActivityConfig(
        this.configUrl,
        this.getConfigSuccess
      )
    )
  }

  getConfigSuccess = (dispatch, data) => {
    this.setState({ config: data }, this.wxReady)
    setTimeout(() => {
      const { search } = window.location
      if (_.includes(search, 'custom_share')) {
        const msg = JSON.stringify({
          shareTitle: data.shareTitle,
          shareLink: data.shareLink,
          shareImgUrl: data.shareImgUrl,
          shareDesc: data.shareDesc,
          type: 'landing',
          title: data.title,
          miniAppShareImgUrl: data.miniAppShareImgUrl
        })
        window.postMessage(msg, '*')
      } else {
        const msg = data.title
        window.postMessage(msg, '*')
      }
    }, 1000)
  }

  wxReady = () => {
    if (deviceType().isiOS) {
      wxInit()
    } else {
      wxInit(true, null, true)
    }
    wx.ready(() => {
      this.wxMenuShareTimeline()
      this.wxMenuShareAppMessage()
    })
  }

  wxMenuShareTimeline = () => {
    const { shareTitle, shareImgUrl, shareLink } = this.state.config
    wx.onMenuShareTimeline({
      title: shareTitle || 'Le Tote 托特衣箱',
      link: shareLink || window.location.href,
      imgUrl: shareImgUrl || 'https://qimg.letote.cn/logo/12logo400x400.png',
      success: () => {},
      trigger: () => {},
      fail: () => wxInit(true, this.wxMenuShareTimeline)
    })
  }

  wxMenuShareAppMessage = () => {
    const { shareTitle, shareImgUrl, shareLink, shareDesc } = this.state.config
    wx.onMenuShareAppMessage({
      title: shareTitle || 'Le Tote 托特衣箱',
      desc:
        shareDesc ||
        '来自美国的时装共享平台，一件衣服价格，每日不同造型，全球时装任意换',
      link: shareLink || window.location.href,
      imgUrl: shareImgUrl || 'https://qimg.letote.cn/logo/12logo400x400.png',
      success: () => {},
      trigger: () => {},
      fail: () => wxInit(true, this.wxMenuShareAppMessage)
    })
  }

  renderImages = () => {
    if (this.state.config) {
      const { images, clickable_images } = this.state.config
      if (!_.isEmpty(clickable_images)) {
        return _.map(clickable_images, (v, k) => (
          <ProgressiveImage
            key={k}
            src={v.url}
            placeholder={placeholder_500_750}
          >
            {image => (
              <img onClick={this.handleRedirect(v.direct)} src={image} alt="" />
            )}
          </ProgressiveImage>
        ))
      }
      if (_.isArray(images)) {
        return _.map(images, (v, k) => (
          <ProgressiveImage key={k} src={v} placeholder={placeholder_500_750}>
            {image => <img src={image} alt="" />}
          </ProgressiveImage>
        ))
      } else {
        return <div dangerouslySetInnerHTML={{ __html: images }} />
      }
    }
  }

  handleRedirect = url => () => {
    if (url) {
      if (_.includes(url, 'https://')) {
        window.location.href = url
      } else {
        window.location.href = `https://${window.location.host}${url}`
      }
    }
  }

  isEmptyData = () => {
    const { config } = this.state
    const { isWechat, customer } = this.props
    if (isWechat) {
      return _.isEmpty(config) || _.isEmpty(customer)
    } else {
      return _.isEmpty(config)
    }
  }

  isValidActivity = () => {
    const { config } = this.state
    const { operation } = this.props
    if (!_.isEmpty(config)) {
      let { start_time, end_time } = config
      const { operation_plan } = operation
      return dateFns.isWithinRange(
        new Date(),
        new Date(start_time || operation_plan.started_at),
        new Date(end_time || operation_plan.ended_at)
      )
    }
    return false
  }
}
