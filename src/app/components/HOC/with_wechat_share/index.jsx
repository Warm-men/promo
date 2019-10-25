import wxInit from 'src/app/lib/wx_config'
import deviceType from 'src/app/lib/device_type'

const withWechatShare = WrappedComponent => {
  class WithWechatShare extends React.Component {
    constructor(props) {
      super(props)
      this.whiteList = [
        '/new_product',
        '/collections',
        '/brands',
        '/filterTerms'
      ]
    }

    componentDidMount() {
      if (deviceType().isiOS) {
        wxInit()
      } else {
        wxInit(true, null, true)
      }
      wx.ready(() => {
        this.onMenuShareTimeline()
        this.onMenuShareAppMessage()
      })
    }

    WechatShareList = Url => {
      const locationUrl = window.location.href
      let shareUrl = Url || `https://${window.location.host}/home`
      for (let index = 0; index < this.whiteList.length; index++) {
        if (locationUrl.match(this.whiteList[index])) {
          shareUrl = locationUrl
        }
      }
      return shareUrl
    }

    onMenuShareTimeline = () => {
      wx.onMenuShareTimeline({
        title: `Le Tote 托特衣箱`,
        link: this.WechatShareList(), // 分享链接，该链接域名必须与当前企业的名一致
        imgUrl: 'https://qimg.letote.cn/logo/12logo400x400.png', // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
        },
        fail: error => {
          wxInit(true, this.onMenuShareTimeline)
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          // this.sharingGuidanceDismiss()
        }
      })
    }

    onMenuShareAppMessage = () => {
      wx.onMenuShareAppMessage({
        title: `Le Tote 托特衣箱`, // 分享标题
        desc:
          '来自美国的时装共享平台，一件衣服价格，每日不同造型，全球时装任意换', // 分享描述
        link: this.WechatShareList(), // 分享链接，该链接域名必须与当前企业的名一致
        imgUrl: 'https://qimg.letote.cn/logo/12logo400x400.png', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          // this.sharingGuidanceDismiss()
        },
        fail: error => {
          wxInit(true, this.onMenuShareAppMessage)
        },
        cancel: function() {
          // this.sharingGuidanceDismiss()
          // 用户取消分享后执行的回调函数
        }
      })
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return WithWechatShare
}

export default withWechatShare
