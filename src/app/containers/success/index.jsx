import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import PageHelmet from 'src/app/lib/pagehelmet'

const getStae = state => {
  const { customer, app } = state
  return {
    customer: customer,
    isWechat: app.isWechat
  }
}

@connect(getStae)
export default class ActivitySuccess extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isSuccess: false,
      isShowTips: false
    }
    this.QRCode = props.QRCode || require('./images/wechat.jpeg')
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleDownload = () => {
    const { gotoDownLoad } = this.props
    if (gotoDownLoad) {
      gotoDownLoad()
    } else {
      window.location.href = global.AppDownloadLink
    }
  }

  renderWechat = () => {
    const { isWechat } = this.props
    return (
      <div>
        <div className="desc-container">
          <div className="details">请立即关注我们，开始使用吧！</div>
          <img src={this.QRCode} alt="" className="referral-code" />
          {!isWechat && (
            <p className="follow-tips">截图页面至相册，用微信扫一扫即可轻松</p>
          )}
          <p className="follow-tips">
            {!isWechat
              ? `关注“LeTote托特衣箱”公众号`
              : '长按二维码关注“LeTote托特衣箱”'}
          </p>
        </div>
        <div className="download-box">
          <img className="logo" src={require('./images/logo.svg')} alt="" />
          <div className="text-box">
            <p className="large">下载“托特衣箱APP”</p>
            <p className="middle">立享会员服务</p>
          </div>
          <span className="app-btn" onClick={this.handleDownload}>
            去下载
          </span>
        </div>
      </div>
    )
  }

  renderOther = () => {
    return (
      <div className="desc-container">
        <div className="details">请下载“托特衣箱APP”，开始使用吧！</div>
        <span className="other-btn" onClick={this.handleDownload}>
          下载APP
        </span>
        <p className="other-text">或在微信内搜索“LeTote托特衣箱”公众号关注</p>
      </div>
    )
  }

  render() {
    const { isWechat, QRCode, desc, icon } = this.props
    return (
      <div className="referral-success">
        <PageHelmet title="领取结果" link={`/kol_success`} />
        <img
          src={icon || require('./images/success.svg')}
          alt="referral_img"
          className="refer-suc"
        />
        <p className="desc">{desc || '领取成功'}</p>
        {isWechat || !_.isEmpty(QRCode)
          ? this.renderWechat()
          : this.renderOther()}
      </div>
    )
  }
}
