import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProgressiveImage from 'src/app/components/ProgressiveImage'
import { hash_sha256 } from 'src/app/lib/hash'
import { parseQueryString } from 'src/app/lib/parseQueryString'
import GetCodeBtn from '../sesamecredit/getcodebtn'
import PhoneCode from 'src/app/lib/phonecode'
import PageHelmet from 'src/app/lib/pagehelmet'
import Actions from 'src/app/actions/actions'
import authentications from 'src/app/lib/authentication'
import TipsModal from './tips_modal'
import { placeholder_500_750 } from 'src/assets/placeholder'
import LoadingViewContainer from 'src/app/components/LoadingViewContainer'
import dateFns from 'date-fns'
import ActivityEnd from './activity_end'
import ActivitySuccess from '../success'
import deviceType from 'src/app/lib/device_type'
import './index.scss'
import wxInit from 'src/app/lib/wx_config.js'

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
export default class KolActivity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tel: null,
      code: null,
      confirmModal: false,
      errorModal: false,
      errorContent: null,
      config: {}
    }
    const { search } = props.location
    const query = parseQueryString(search)
    this.configUrl = query.config
    this.utmData = {}
    if (!_.isEmpty(query)) {
      _.map(query, (v, k) => {
        if (_.includes(k, 'utm')) {
          this.utmData[k] = v
        }
      })
    }
    this.verificationCode = null
  }

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

  handleGetConfig = () => {
    this.props.dispatch(
      Actions.KolActivity.getActivityConfig(
        this.configUrl,
        this.getConfigSuccess
      )
    )
  }

  getConfigSuccess = (dispatch, data) => {
    this.props.dispatch(
      Actions.operation.getOperationPlan(data.operationPlanSlug, () => {
        this.setState({ config: data }, this.wxReady)
      })
    )
    setTimeout(() => {
      const { search } = window.location
      if (_.includes(search, 'custom_share')) {
        const msg = JSON.stringify({
          shareTitle: data.shareTitle,
          shareLink: data.shareLink,
          shareImgUrl: data.shareImgUrl,
          shareDesc: data.shareDesc,
          type: 'landing',
          title: data.title
        })
        window.postMessage(msg, '*')
      } else {
        const msg = JSON.stringify(data.title)
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

  setTips = content => {
    this.props.dispatch(
      Actions.tips.changeTips({
        isShow: true,
        content
      })
    )
  }

  hasValidTel = () => {
    const regExpPhone = PhoneCode.regExpPhone(this.state.tel)
    if (!regExpPhone) {
      this.setTips('你输入的手机号不正确！')
      return false
    }
    if (this.props.authentication.isSubscriber) {
      this.setTips('你已经是我们的老朋友啦，此活动仅限非会员参加')
      return null
    }
    return regExpPhone
  }

  postCode = () => {
    this.props.dispatch(
      Actions.sesameCredit.getPhoneCode(
        this.state.tel,
        this.getCodeSuccess,
        this.getCodeError
      )
    )
  }

  getCodeSuccess = (dispatch, data) => {
    const { SendVerificationCode } = data.data
    this.verificationCode = SendVerificationCode
  }

  getCodeError = (dispatch, data) => {
    if (data.errors && data.errors.length > 0) {
      this.setTips(data.errors[0].message)
    }
  }

  hasValidCode = code => {
    const hashcode = this.verificationCode && code + this.verificationCode.salt
    if (
      hashcode &&
      this.verificationCode &&
      hash_sha256(hashcode) === this.verificationCode.hashed_code
    ) {
      return true
    }
    return false
  }

  handleUserTel = e => this.setState({ tel: e.target.value })

  handlePhoneCode = e => this.setState({ code: e.target.value })

  handleJoinUs = () => {
    if (this.props.authentication.isSubscriber) {
      this.setTips('你已经是我们的老朋友啦，此活动仅限非会员参加')
      return null
    }
    if (_.isEmpty(this.state.code) && _.isEmpty(this.state.tel)) {
      this.setTips('请输入手机号与验证码')
    } else if (_.isEmpty(this.state.tel)) {
      this.setTips('请输入正确的手机号码！')
    } else if (!PhoneCode.regExpPhone(this.state.tel)) {
      this.setTips('你输入的手机号不正确！')
    } else if (_.isEmpty(this.state.code)) {
      this.setTips('请输入验证码！')
    } else if (!this.hasValidCode(this.state.code)) {
      this.setTips('验证码有误')
    } else {
      //NOTE: 用户注册
      this.regularSubmit()
    }
  }

  regularSubmit = () => {
    if (this.props.isWechat) {
      // NOTE:手机号为空或者用户手机号和输入的不一致需要update
      const { telephone } = this.props.customer
      if (
        _.isEmpty(telephone) ||
        parseInt(telephone, 10) !== parseInt(this.state.tel, 10)
      ) {
        this.props.dispatch(
          Actions.customer.update(
            {
              telephone: this.state.tel,
              verification_code: this.state.code
            },
            (dispatch, data) => {
              const { UpdateCustomer } = data.data
              if (UpdateCustomer.error) {
                return null
              }
              this.getSaveWallet()
            },
            (dispatch, data) => {
              if (data.errors && data.errors.length > 0) {
                this.props.dispatch(
                  Actions.tips.changeTips({
                    isShow: true,
                    content: data.errors[0].message
                  })
                )
              }
            }
          )
        )
      } else {
        this.getSaveWallet()
      }
      return null
    }
    const data = {
      customer: {
        telephone: this.state.tel,
        verification_code: this.state.code
      }
    }
    this.props.dispatch(
      Actions.browserCustomer.browserSignUp({
        data,
        success: this.handleRegisterSuccess,
        error: this.handleRegisterError,
        utmUrl: this.handleUtmUrl()
      })
    )
  }

  handleUtmUrl = url => {
    let utmUrl = url || '/profile'
    _.map(
      this.utmData,
      (v, k) => (utmUrl += `${utmUrl.indexOf('?') > -1 ? '&' : '?'}${k}=${v}`)
    )
    return utmUrl
  }

  handleRegisterSuccess = (dispatch, data) => {
    if (data.errors && data.errors.length > 0) {
      this.setTips(data.errors[0].message)
      return null
    }
    const { subscription } = data
    if (subscription && subscription.id) {
      this.setTips('你已经是我们的老朋友啦，此活动仅限非会员参加')
    } else {
      dispatch(Actions.currentCustomer.fetchMe())
      this.getSaveWallet()
    }
  }

  handleRegisterError = (dispatch, data) => {
    data && this.setTips(data.message)
  }

  getSaveWallet = () => {
    const { promoCode } = this.state.config
    // NOTE:运营传入FakerPromoCode，不需要进行领取，直接告诉成功结果
    if (promoCode === 'FakerPromoCode') {
      this.getSaveWalletSuccess()
      return null
    }
    let input = {
      promo_code: promoCode
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
    const { convert_id } = this.state.config
    this.setState({
      confirmModal: true
    })
    convert_id && window._taq.push({ convert_id, event_type: 'button' })
  }

  getSaveWalletError = (dispatch, data) => {
    this.props.dispatch(
      Actions.tips.changeTips({
        isShow: false,
        content: null
      })
    )
    this.setState({
      errorModal: true,
      errorContent: data.errors[0].message
    })
  }

  gotoDownLoad = () => {
    const { defaultLink, appLink, spareLink } = this.state.config
    let url = appLink || defaultLink
    if (deviceType().isAndroid && !this.props.isWechat) {
      // NOTE:兼容101活动，目前101只有appLink
      url = spareLink || defaultLink || appLink
    }
    window.location.href = url
  }

  handleConfirmModal = () => {
    this.setState({
      confirmModal: true
    })
  }

  hideConfirmModal = () => {
    this.setState({
      confirmModal: false
    })
  }

  handleErrorModal = () => {
    this.setState({
      errorModal: true
    })
  }

  hideErrorModal = () => {
    this.setState({
      errorModal: false
    })
  }

  renderHeader = () => {
    const { header } = this.state.config
    if (_.isArray(header)) {
      return _.map(header, (v, k) => (
        <ProgressiveImage key={k} src={v} placeholder={placeholder_500_750}>
          {image => <img src={image} alt="" />}
        </ProgressiveImage>
      ))
    } else {
      return <div dangerouslySetInnerHTML={{ __html: header }} />
    }
  }

  renderFooter = () => {
    const { footer } = this.state.config
    if (_.isArray(footer)) {
      return _.map(footer, (v, k) => (
        <ProgressiveImage key={k} src={v} placeholder={placeholder_500_750}>
          {image => <img src={image} alt="" />}
        </ProgressiveImage>
      ))
    } else {
      return <div dangerouslySetInnerHTML={{ __html: footer }} />
    }
  }

  isValidActivity = () => {
    const { operation } = this.props
    if (!_.isEmpty(operation)) {
      const { started_at, ended_at } = operation.operation_plan
      const isValid = dateFns.isWithinRange(
        new Date(),
        new Date(started_at),
        new Date(ended_at)
      )
      return isValid
    }
    return false
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

  render() {
    const { config, confirmModal, errorModal, errorContent } = this.state
    if (this.isEmptyData()) return <LoadingViewContainer />
    if (!this.isValidActivity()) {
      return <ActivityEnd />
    }
    if (confirmModal) {
      return (
        <ActivitySuccess
          gotoDownLoad={this.gotoDownLoad}
          QRCode={config.QRCode}
        />
      )
    }
    return (
      <div className="kol-activity">
        <PageHelmet
          title={config.title}
          link="/kol_activity"
          shareTitle={config.shareTitle}
          shareUrl={config.shareLink}
          miniAppShareImgUrl={config.miniAppShareImgUrl}
        />
        {this.renderHeader()}
        <div className="input-box">
          <input
            type="tel"
            placeholder="请输入你的手机号码"
            className="phone-number"
            maxLength="11"
            onChange={this.handleUserTel}
          />
          <div className="code-number">
            <input
              type="tel"
              placeholder="请输入验证码"
              maxLength="4"
              className="user-tel"
              onChange={this.handlePhoneCode}
            />
            <GetCodeBtn
              regExpPhone={this.hasValidTel}
              getTime={60}
              postCode={this.postCode}
              isH5
            />
          </div>
          <button className="join-us" onClick={this.handleJoinUs}>
            {config.buttonText || '加入领取福利'}
          </button>
        </div>
        {this.renderFooter()}
        {errorModal && (
          <TipsModal
            icon={require('src/app/containers/kol_activity/images/error.png')}
            title="领取失败"
            handleClose={this.hideErrorModal}
          >
            <p className="content">{errorContent}</p>
          </TipsModal>
        )}
      </div>
    )
  }
}
