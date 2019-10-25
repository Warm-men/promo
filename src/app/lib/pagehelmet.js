import { PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { parseQueryString } from 'src/app/lib/parseQueryString.js'
import PropTypes from 'prop-types'
import deviceEnv from 'src/app/lib/device_env.js'

export default class PageHelmet extends PureComponent {
  componentDidMount() {
    this.postMiniApp()
  }

  componentWillReceiveProps(nextProps) {
    if (this.isUpdateInfo(this.props, nextProps)) {
      console.log(JSON.stringify(nextProps))
      this.postMiniApp(nextProps)
    }
  }

  postMiniApp = newProps => {
    const props = newProps || this.props
    if (props.isNotPostMsg) {
      return null
    }
    // NOTE:小程序环境postMessage处理ios分享
    if (deviceEnv(window.navigator.userAgent) === 'mini_app') {
      const { shareUrl, miniAppShareImgUrl, shareTitle } = props
      // NOTE：因helmet影响，title不是进入界面就是正确的title，需要在页面更换标题后进行postMessage处理
      const url =
        (shareUrl && this.handleUrlOpenId(shareUrl)) || window.location.href
      const imageUrl =
        miniAppShareImgUrl || 'https://static.letote.cn/logo/mini_app.png'
      const data = {
        url,
        title: shareTitle || '一件衣服价格，穿遍全球服饰',
        imageUrl
      }
      wx.miniProgram.postMessage({ data })
    }
  }

  handleUrlOpenId = share_url => {
    const params = parseQueryString(share_url)
    if (params && params.wechat_mini_app_openid) {
      delete params['wechat_mini_app_openid']
      let url = share_url.split('?')[0]
      for (let key in params) {
        url += `${url.indexOf('?') > -1 ? '&' : '?'}${key}=${params[key]}`
      }
      return url
    } else {
      return share_url
    }
  }

  isUpdateInfo = (old_props, new_props) => {
    const { shareUrl, shareImg, shareTitle } = old_props
    return (
      shareUrl !== new_props.shareUrl ||
      shareImg !== new_props.shareImg ||
      shareTitle !== new_props.shareTitle
    )
  }

  render() {
    return (
      <Helmet>
        <title>{this.props.title}</title>
        <link rel="canonical" href={this.props.link} />
      </Helmet>
    )
  }
}

PageHelmet.defaultProps = {
  link: window.location.pathname
}

PageHelmet.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}
