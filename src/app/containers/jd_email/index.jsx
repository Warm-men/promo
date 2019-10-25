import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProgressiveImage from 'src/app/components/ProgressiveImage'
import { parseQueryString } from 'src/app/lib/parseQueryString'
import PageHelmet from 'src/app/lib/pagehelmet'
import Actions from 'src/app/actions/actions'
import authentications from 'src/app/lib/authentication'
import { placeholder_500_750 } from 'src/assets/placeholder'
import LoadingViewContainer from 'src/app/components/LoadingViewContainer'
import dateFns from 'date-fns'
import GetCodeBtn from 'src/app/containers/sesamecredit/getcodebtn.jsx'
import PhoneCode from 'src/app/lib/phonecode'
import { hash_sha256 } from 'src/app/lib/hash'
import ActivitySuccess from 'src/app/containers/success/index.jsx'
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
export default class JdEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tel: null,
      code: null,
      email: null,
      confirmModal: false,
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
    const slug = data.operationPlanSlug || 'JD79'
    this.props.dispatch(
      Actions.operation.getOperationPlan(slug, () => {
        this.setState({
          config: data
        })
      })
    )
  }

  setTips = content => {
    this.props.dispatch(
      Actions.tips.changeTips({
        isShow: true,
        content
      })
    )
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

  isEmptyData = () => {
    const { config } = this.state
    const { isWechat, customer } = this.props
    if (isWechat) {
      return _.isEmpty(config) || _.isEmpty(customer)
    } else {
      return _.isEmpty(config)
    }
  }

  handleJudgeData = () => {
    if (
      _.isEmpty(this.state.code) &&
      _.isEmpty(this.state.tel) &&
      _.isEmpty(this.state.email)
    ) {
      const { config } = this.state
      this.setTips(`请输入手机号、验证码${config.isHideEmail ? '' : '与邮箱'}`)
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
      this.handleApply()
    }
  }

  handleApply = () => {
    const { email, config } = this.state
    if (config.isHideEmail) {
      this.submitBrowserSignUp()
      return null
    }
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(email)) {
      this.setTips('请输入正确的邮箱!')
      return null
    }
    this.submitBrowserSignUp()
  }

  submitBrowserSignUp = () => {
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
            this.submitEmail()
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
    }
  }

  submitEmail = () => {
    const { dispatch, operation } = this.props
    const { operation_plan } = operation
    const { config } = this.state
    if (config.isHideEmail) {
      dispatch(
        Actions.operation.addToCustomerOperationPlan({
          operation_plan_id: Number(operation_plan.id),
          success: () => {
            this.setState({
              confirmModal: true
            })
          }
        })
      )
      return null
    }
    dispatch(
      Actions.operation.addToCustomerOperationPlan({
        operation_plan_id: Number(operation_plan.id),
        plan_attributes: [
          {
            name: 'email',
            value: this.state.email
          }
        ],
        success: () => {
          this.setState({
            confirmModal: true
          })
        }
      })
    )
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

  hasValidTel = () => {
    const regExpPhone = PhoneCode.regExpPhone(this.state.tel)
    if (!regExpPhone) {
      this.setTips('你输入的手机号不正确！')
      return false
    }
    return regExpPhone
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

  handleEmailChange = e => this.setState({ email: e.target.value })

  handleUserTel = e => this.setState({ tel: e.target.value })

  handlePhoneCode = e => this.setState({ code: e.target.value })

  render() {
    const { config, confirmModal } = this.state
    if (this.isEmptyData()) return <LoadingViewContainer />
    if (!this.isValidActivity()) {
      return (
        <ActivitySuccess
          QRCode={require('./qrcode.jpeg')}
          icon={require('./end.svg')}
          desc="活动已结束"
        />
      )
    }
    if (confirmModal) {
      return (
        <ActivitySuccess
          desc="参加活动成功"
          gotoDownLoad={this.gotoDownLoad}
          QRCode={require('./qrcode.jpeg')}
        />
      )
    }
    return (
      <div className="jd">
        <PageHelmet title={config.title} link="/promo/jd/email/homepage" />
        {this.renderHeader()}
        <div className="jd-email">
          <img
            src={
              !config.isHideEmail
                ? require('./bg_1127.png')
                : require('./other_bg.png')
            }
            alt=""
          />
          <div className="operation-box">
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
            {!config.isHideEmail && (
              <input
                type="email"
                placeholder="请输入你的公司邮箱"
                onChange={this.handleEmailChange}
              />
            )}
            <div className="button" onClick={this.handleJudgeData}>
              立即申请
            </div>
          </div>
        </div>
        {this.renderFooter()}
      </div>
    )
  }
}
