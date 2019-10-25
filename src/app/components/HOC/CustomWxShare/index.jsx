import wxInit from 'src/app/lib/wx_config'
import deviceType from 'src/app/lib/device_type'

const CustomWxShareHOC = WrapperComponent =>
  class extends React.Component {
    componentDidMount() {
      if (deviceType().isiOS) {
        wxInit()
      } else {
        wxInit(true, null, true)
      }
      const share_params = this.props.share_params
      wx.ready(() => {
        this.onMenuShareTimeline(share_params)
        this.onMenuShareAppMessage(share_params)
      })
    }

    handleAnalyze = () => {
      const { analyzeAction, analyzeLabel } = this.props
      if (_.isEmpty(analyzeAction) || _.isEmpty(analyzeLabel)) {
        return null
      }
      window.analytics.track('share', analyzeLabel, analyzeAction)
    }

    onMenuShareTimeline = share_params => {
      wx.onMenuShareTimeline({
        title: (share_params && share_params.title) || `Le Tote 托特衣箱`,
        link:
          (share_params && share_params.link) ||
          `https://${window.location.host}/home`,
        imgUrl:
          (share_params && share_params.imgUrl) ||
          'https://qimg.letote.cn/logo/12logo400x400.png',
        fail: () => wxInit(true, this.onMenuShareTimeline),
        complete: this.handleAnalyze
      })
    }

    onMenuShareAppMessage = share_params => {
      wx.onMenuShareAppMessage({
        title: (share_params && share_params.title) || `Le Tote 托特衣箱`,
        desc:
          (share_params && share_params.desc) ||
          '来自美国的时装共享平台，一件衣服价格，每日不同造型，全球时装任意换',
        link:
          (share_params && share_params.link) ||
          `https://${window.location.host}/home`,
        imgUrl:
          (share_params && share_params.imgUrl) ||
          'https://qimg.letote.cn/logo/12logo400x400.png',
        type: 'link',
        fail: () => wxInit(true, this.onMenuShareAppMessage),
        complete: this.handleAnalyze
      })
    }

    render() {
      return <WrapperComponent {...this.props} />
    }
  }

export default CustomWxShareHOC
