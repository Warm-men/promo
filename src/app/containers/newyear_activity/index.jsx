import { connect } from 'react-redux'
import PageHelmet from 'src/app/lib/pagehelmet'
import Actions from 'src/app/actions/actions'
import authentications from 'src/app/lib/authentication'
import LoadingViewContainer from 'src/app/components/LoadingViewContainer'
import { parseQueryString } from 'src/app/lib/parseQueryString'
import ActivityEnd from '../kol_activity/activity_end'
import BaseConfig from '../base_config'
import { withRouter } from 'react-router-dom'
import * as CARD_TYPE from 'src/app/lib/card_type.js'
import ProgressiveImage from 'src/app/components/ProgressiveImage'
import { placeholder_500_750 } from 'src/assets/placeholder'
import '../seventy_nine/index.scss'
import './index.scss'

const getState = state => {
  const { customer, operation } = state
  return {
    customer,
    isWechat: /MicroMessenger/i.test(navigator.userAgent),
    authentication: authentications(customer),
    operation
  }
}

@withRouter
@connect(getState)
export default class NewYearActivity extends BaseConfig {
  constructor(props) {
    super(props)
    this.state = {
      config: null
    }
    this.query = parseQueryString(props.location.search)
    this.configUrl = this.query.config
    this.renderHeader = []
    this.renderFooter = []

    this.renderHeader = [
      require('./member/img_01.png'),
      require('./member/img_02.png'),
      require('./member/img_03.png')
    ]
    this.renderFooter = [
      require('./member/img_05.png'),
      require('./member/img_06.png'),
      require('./member/img_07.png'),
      require('./member/img_08.png'),
      require('./member/img_09.png')
    ]
    this.btnImg = require('./member/img_04.png')
  }

  componentDidMount() {
    this.handleGetConfig()
    // NOTE：百度统计页面访问
    window._hmt.push(['_trackPageview', window.location.href])
  }

  getConfigSuccess = (dispatch, data) => {
    this.props.dispatch(
      Actions.operation.getOperationPlan(data.operationPlanSlug, () => {
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
      })
    )
  }

  getSaveWallet = e => {
    // const { promoCode } = this.state.config
    // // NOTE:运营传入FakerPromoCode，不需要进行领取，直接告诉成功结果
    // if (promoCode === 'FakerPromoCode') {
    //   this.getSaveWalletSuccess()
    //   return null
    // }
    e.preventDefault()
    const { operation_plan } = this.props.operation
    let input = {
      promo_code: operation_plan.promo_code.code
    }
    if (!_.isEmpty(this.utmData)) {
      input['marketing_attribution'] = this.utmData
    }
    this.props.dispatch(
      Actions.KolActivity.getPromoCodeToWallet(
        input,
        this.getSaveWalletSuccess,
        this.getSaveWalletError
      )
    )
  }

  getSaveWalletSuccess = (dispatch, data) => {
    const { config } = this.state
    let successLink = config.successLink
    const { authentication, customer } = this.props
    if (authentication.isValidSubscriber) {
      const { interval } = customer.subscription.subscription_type
      if (interval === CARD_TYPE.ANNUAL_CARD_TYPE) {
        successLink = '/plans?sub_type=annual_card'
      }
    }
    this.props.history.push(
      `/promo/coupon_success?successLink=${encodeURIComponent(successLink)}`
    )
  }

  getSaveWalletError = (dispatch, data) => {
    this.props.dispatch(
      Actions.tips.changeTips({
        isShow: false,
        content: null
      })
    )
    this.props.history.push('/promo/coupon_fail')
  }

  gotoPlans = () => {
    window.location.href = `https://${window.location.host}/plans`
  }

  render() {
    const { config } = this.state
    if (this.isEmptyData()) return <LoadingViewContainer />
    if (!this.isValidActivity()) {
      return <ActivityEnd />
    }
    return (
      <div className="seventy-nine">
        <PageHelmet title={config.title} link="/newyear_activity" />
        {_.map(this.renderHeader, (v, k) => {
          return (
            <ProgressiveImage key={k} src={v} placeholder={placeholder_500_750}>
              {image => <img src={image} alt="" />}
            </ProgressiveImage>
          )
        })}
        <div className="newyear-btn-box">
          <img src={this.btnImg} alt="" />
          <div className="newyear-btn" onClick={this.getSaveWallet}>
            <img src={require('./images/100.png')} alt="" />
          </div>
        </div>
        {_.map(this.renderFooter, (v, k) => {
          return <img key={k} src={v} alt="" />
        })}
        {!config.isHideBtn && (
          <div className="bottom-btn">
            <div className="join-btn" onClick={this.gotoPlans}>
              {config.btnText || '立即开启 · 百变时尚之旅'}
            </div>
          </div>
        )}
      </div>
    )
  }
}
