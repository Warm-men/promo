import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PageHelmet from 'src/app/lib/pagehelmet'
import { withRouter } from 'react-router-dom'
import './index.scss'

const getStae = state => {
  const { customer, app } = state
  return {
    customer: customer,
    isWechat: app.isWechat
  }
}

@connect(getStae)
@withRouter
export default class NewYearActivityFail extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="coupon-success">
        <PageHelmet title="领取结果" link="/coupon-success" />
        <div className="fail-box">
          <img
            src={require('./img/fail.png')}
            alt="referral_img"
            className="fail-icon"
          />
          <h5 className="fail-tips">领取失败</h5>
          <div className="fail-text">本优惠券仅限领取一次</div>
          <div className="fail-btn" onClick={this.props.history.goBack}>
            返回
          </div>
        </div>
      </div>
    )
  }
}
