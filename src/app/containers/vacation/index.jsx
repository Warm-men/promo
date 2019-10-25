import { connect } from 'react-redux'
import PageHelmet from 'src/app/lib/pagehelmet'
import Actions from 'src/app/actions/actions'
import authentications from 'src/app/lib/authentication'
import LoadingViewContainer from 'src/app/components/LoadingViewContainer'
import ActivityEnd from '../kol_activity/activity_end'
import BaseConfig from '../base_config'
import '../seventy_nine/index.scss'

const getState = state => {
  const { customer, operation } = state
  return {
    customer,
    isWechat: /MicroMessenger/i.test(navigator.userAgent),
    authentication: authentications(customer),
    operation
  }
}
@connect(getState)
export default class Vacation extends BaseConfig {
  componentDidMount() {
    this.handleGetConfig()
    // NOTE：百度统计页面访问
    window._hmt.push(['_trackPageview', window.location.href])
    if (!this.props.isWechat) {
      const { customer } = this.props
      const isLogin = !_.isEmpty(customer) && !_.isEmpty(customer.id)
      if (isLogin) {
        const input = {
          clientMutationId: `${customer.id}`
        }
        this.props.dispatch(Actions.customer.gqsignout(input, () => {}))
      }
    }
  }

  gotoLogin = () => {
    let baseUrl = `https://${window.location.host}/mplans?url=/mplans`
    if (!_.isEmpty(this.query)) {
      const { config } = this.state
      _.map(this.query, (v, k) => {
        if (_.includes(k, 'utm')) {
          baseUrl += `${baseUrl.indexOf('?') > -1 ? '&' : '?'}${k}=${v}`
        }
      })
      baseUrl += `&start_time=${config.start_time}&end_time=${config.end_time}`
    }
    window.location.href = baseUrl
  }

  render() {
    const { config } = this.state
    if (this.isEmptyData()) return <LoadingViewContainer />
    if (!this.isValidActivity()) {
      return <ActivityEnd />
    }
    return (
      <div className="seventy-nine">
        <PageHelmet
          title={config.title}
          link="/kol_activity"
          shareTitle={config.shareTitle}
          shareUrl={config.shareLink}
          miniAppShareImgUrl={config.miniAppShareImgUrl}
        />
        {this.renderImages()}
        <div className="bottom-btn">
          <div className="join-btn" onClick={this.gotoLogin}>
            {config.btnText}
          </div>
        </div>
      </div>
    )
  }
}
