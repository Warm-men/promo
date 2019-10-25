import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PageHelmet from 'src/app/lib/pagehelmet'
import { parseQueryString } from 'src/app/lib/parseQueryString'
import { withRouter } from 'react-router-dom'
import Actions from 'src/app/actions/actions'
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
export default class NewYearActivitySuccess extends PureComponent {
  constructor(props) {
    super(props)
    const { search } = props.location
    this.query = parseQueryString(search)
  }

  componentDidMount() {
    this.props.dispatch(Actions.currentCustomer.fetchMe())
    window.scrollTo(0, 0)
  }

  handleClick = () => {
    window.location.href = `https://${window.location.host}${decodeURIComponent(
      this.query.successLink
    )}`
  }

  render() {
    return (
      <div className="coupon-success">
        <PageHelmet title="领取结果" link="/coupon-success" />
        <div className="success-box">
          <img
            src={require('./img/success.png')}
            alt="referral_img"
            className="success-icon"
          />
          <h5 className="success-tips">领取成功</h5>
          <div className="success-btn" onClick={this.handleClick}>
            去使用
          </div>
          <div className="success-text" onClick={this.props.history.goBack}>
            先逛逛
          </div>
        </div>
      </div>
    )
  }
}
