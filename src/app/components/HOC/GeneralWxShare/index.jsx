import wxInit from 'src/app/lib/wx_config'
import deviceType from 'src/app/lib/device_type'

const GeneralWxShare = WrapperComponent =>
  class extends React.Component {
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

    onMenuShareTimeline = () => {
      wx.onMenuShareTimeline({
        title: `Le Tote 托特衣箱`,
        link: `https://${window.location.host}/home`,
        imgUrl: 'https://qimg.letote.cn/logo/12logo400x400.png',
        fail: () => wxInit(true, this.onMenuShareTimeline)
      })
    }

    onMenuShareAppMessage = () => {
      wx.onMenuShareAppMessage({
        title: `Le Tote 托特衣箱`,
        desc:
          '来自美国的时装共享平台，一件衣服价格，每日不同造型，全球时装任意换',
        link: `https://${window.location.host}/home`,
        imgUrl: 'https://qimg.letote.cn/logo/12logo400x400.png',
        type: 'link',
        fail: () => wxInit(true, this.onMenuShareAppMessage)
      })
    }

    render() {
      return <WrapperComponent {...this.props} />
    }
  }

export default GeneralWxShare
